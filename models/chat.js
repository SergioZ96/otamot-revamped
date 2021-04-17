const mongoose = require('../config/database');
const User = require('../models/user');

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

/* Creates a chat between two users in Chat collection. Then stores the chat id in both users' chat array */

ChatSchema.statics.createChat = async function(newChat) {
    try{
        
        let result = await newChat.save();
        // the $in operator helps us call both users by their ids
        // the $push operator pushes the newly created chat_id to both users chats array field
        User.updateMany({_id: { "$in" : [newChat.users[0], newChat.users[1]]}}, {"$push": {"chats": result._id }}, (err) => {
            if (err) { console.log(err) }
        });
        return result;
    }

    catch(err){ throw err; }
}

/* Gets chats for the user through the user's id */

ChatSchema.statics.getChats = async function(user_id) {
    try{
        const chats = await Chat.find({"users": {$in: [user_id]}}).exec();
        return chats;
    }

    catch(err){ throw err; }
}

const Chat = module.exports = mongoose.model('Chat', ChatSchema);
