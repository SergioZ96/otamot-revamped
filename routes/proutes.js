const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
//const user = require('../models/user');

// Register
router.post('/register', (req, res) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
/* 
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        }
        else{
            res.json({success: true, msg: 'User Registered'});
        }
    }); */

    let result = User.addUser(newUser);
    res.json({success: true, user: result});
});

// Authenticate
router.post('/authenticate', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    let user = await User.getUserByEmail(email);
    if(user){
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({data: user}, 'secret', {
                    expiresIn: 604800 // 1 week
                });
    
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else{
                return res.json({success: false, msg: "wrong password"});
            }
        });
    }
    else{
        return res.json({success: false, msg: "User not found"});
    }
    
    //return res.json({success: data, msg: 'User found!'});
    
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.json({user: req.user});
});

router.get('/email/:email', async (req, res) => {
    let email = req.params.email;
    //res.send(email);


    /* 
        Get to the bottom of how this async/await helps us get the value from
        the DB. async/await not necessary on user.js but on the route it is.
    */
    let foundUser = await User.getUserByEmail(email);
    res.json({user: foundUser});
    /* foundUser.then(function(result){
            console.log(result);
            res.json({user: result});
    }); */
    /* console.log(foundUser);
    res.json({user: foundUser}); */

    

});

//

module.exports = router;