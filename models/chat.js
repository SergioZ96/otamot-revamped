const mongoose = require('../config/database');

const ChatSchema = mongoose.Schema({
    users: [
        {type: mongoose.Schema.Types.ObjectId,
         ref: "User"
        }
    ],
    messages: [
        {
        author: String,
        recip: [],
        date_time: String,
        message_body: String
    }]
});

ChatSchema.statics.createChat = async function(newChat) {
    try{
        return await newChat.save();
    }
    catch(err){ throw err; }
}

const Chat = module.exports = mongoose.model('Chat', ChatSchema);