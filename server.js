const express = require('express');
const path = require('path');
const cors = require('cors'); // for cross origin resource sharing
const passport = require('passport');
const mongoose = require('./config/database');
const Chat = require('./models/chat');
const User = require('./models/user');

const app = express();
const http = require('http').Server(app);
// Added some cors options to prevent 404 errors, on server side as well as on client side
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        credentials: true
    }
});

const port = 3000;

/* Setting up middlewares */

// adding cross origin resource sharing to enable cross-site HTTP requests
app.use(cors());
// parse application/json, parse incoming Request object as a JSON object
app.use(express.json()); 
// parse application/x-www-form-urlencoded, parse incoming Request object if string or arrays
app.use(express.urlencoded({extended: true})); 

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport); 

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

/* app.get('/', (req,res) => {
    res.send("hello world");
}); */

const router = require('./routes/proutes');

app.use('/', router);

/* users array to keep track of users connected to the socket with their current socket.id's */
let users = [];


io.on('connection', (socket) => {

    

    socket.on('setSocket', async (socket_info) => {

        let convos = await User.getChats(socket_info.user_id);
        socket.join(convos);
        socket.join(socket_info.user_id);



        // Used for joining rooms corresponding to socket.ids

            /* let userSocket = {
                socket_id : socket.id,
                user_id : socket_info.user_id
            }
            // Only push the user to the users array if not already there 
            if(!users.some( e => e.user_id == userSocket.user_id)){
                users.push(userSocket);
            }
            // Update the socket.id for the user already in the users array
            else {
                users.find(v => v.user_id === userSocket.user_id).socket_id = socket.id;
            }
            console.log(users); */

        
    })
    // allows our recipient of new conversations to join newly established rooms
    socket.on('join-room', (newchat_id) => {
        socket.join(newchat_id);
    });
   
    
    socket.on('private-message', async (data) => {
        // handles the creation of new chat upon first message being sent
        if(data.newchat){ 
            // if newchat is set to true, meaning that the message is the first of a new conversation

            // create a new chat between user and recipient 
            let newchat = new Chat({
                users: [
                    {
                        _id: mongoose.Types.ObjectId(data.author_id)
                    },
                    {
                        _id: mongoose.Types.ObjectId(data.recipient_id)
                    }
                ],
                messages: [{
                    author: data.author_id,
                    recip: [data.recipient_id],
                    date_time: data.date_time,
                    message_body: data.message
                }]
            });
            // result 
            let result = await Chat.createChat(newchat);
            // get the chat id
            // have the user join the chat, and somehow let the recipient join the chat as well
            //socket.join(result._id);
            // will emit a join-room event to recipient to let them know to join a new room 
            // corresponding to new chat
            //console.log("Telling the recipient to join the new conversation...");
            socket.broadcast.to(data.recipient_id).emit('join-room', result._id);
            //console.log("Relaying to myself what the new chat id is...");
            socket.broadcast.to(data.author_id).emit('newroom-chatid', result._id);
            // After the recipient has joined the new chat room, the user will finally be able to send the 
            // message to the room with the recipient and new chat id
            //console.log("Sening the message to the room so our recipient can see it...");
            socket.broadcast.to(result._id).emit('private-message', data.message);

        }
        else{ // Otherwise if the message does not pertain to a new conversation continue with sending to already existing conversation 
            socket.broadcast.to(data.chat_id).emit('private-message', data.message);
        }
    });
    
    
    
});



http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});



