const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = 'secret';

    // We have an async function to retrieve value from the Promise returned by getUserById
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        
        let user = await User.getUserById(jwt_payload.data._id);
        
        if (user === null){
            return done(null, false);
        }
        else{ 
            return done(null, user);
        }   


        /* let user = User.getUserById(jwt_payload.data._id);
        user.then( function(u){
            console.log(u);
            if (u === null){
                return done(null, false);
            }
            else{ 
                return done(null, u);
            }   
        }); */
                
    }));
    
}