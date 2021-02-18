const mongoose = require('../config/database');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});
/* 
UserSchema.methods.getUserById = function(cb) {
    return this.model('User').findById({ _id : this.id }, cb);
}; */

UserSchema.statics.getUserById = function(id) {
    try{
        return this.findById(id).exec(); // using exec() returns a promise, there fore we dont need to use async/await
    }
    catch(err) {throw err;}
};

UserSchema.statics.getUserByEmail = async function(email) {
    // exec() returns a thenable which is more like a built-in promise
    try{
        return await this.findOne({email: email}).exec();
    }
    catch(err){ throw err; }
    
    /* result.then(function(result) {
        return result;
    }); */
};

UserSchema.statics.addUser = async function(newUser){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            return await newUser.save();
        });
    });
}

UserSchema.statics.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=> {
        if(err) throw err;
        callback(null, isMatch);
    });
}

const User = module.exports = mongoose.model('User', UserSchema);
/* 
module.exports.getUserByEmail = async function(email, callback) {
    return await User.findOne({email: email}, callback);
} */

/* 
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
} */