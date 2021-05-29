const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const User = require('../models/user');
const Chat = require('../models/chat');
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

router.get('/chats', passport.authenticate('jwt', {session: false}), async ( req, res) => {
    /* const chat_results = await User.getChats(req.user._id);
    if(!chat_results){
        res.json({success: false});
    }
    else{
        res.json({success: true, chats: chat_results});
    } */
    //console.log(req.user._id);
    let chats = await Chat.getChats(db.Types.ObjectId(req.user._id));

    console.log(chats);
    res.json({success: true, chats});
});

router.post('/newchat', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const recip = req.body.username;
    let found_recip = await User.getUserByUsername(recip);

    // if recipient was found
    

    if(found_recip){
        res.json({status: true , recipient_info: found_recip});
    }
    else{
        res.json({status: false});
    }
}); 



/* This route receives an object 
    message_info = {
        user: {
            id,
            username
        },
        message
    }

    Note: the user is the recipient of the chat
*/
router.post('/message', passport.authenticate('jwt', {session: false}), async (req, res) => {
    // Now here we have to store the message in the chat collection and assign the chat id to all users
    // Creating a new chat...
    let newChat = new Chat({
        users: [
            {
                _id: db.Types.ObjectId(req.user._id)
            },
            {
                _id: db.Types.ObjectId(req.body.user.id)
            }
        ],
        messages: [{
            author: req.user._id,
            recip: [req.body.user.username],
            date_time: req.body.datetime,
            message_body: req.body.message
        }]
    });
    let result = await Chat.createChat(newChat);
    //console.log(result);
    /* let newChat_info = {
        author: req.user._id,
        recip: req.body.user.id,
        message: req.body.message
    }; */

    res.json({success: true, result}); 
    //Chat.findOne({_id:})

});
//

module.exports = router;