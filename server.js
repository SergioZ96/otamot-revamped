const express = require('express');
const path = require('path');
const cors = require('cors'); // for cross origin resource sharing
const passport = require('passport');
const mongoose = require('./config/database');

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

app.use('/', require('./routes/proutes'));

io.on('connection', (socket) => {
    console.log("A user connected");
    
    socket.emit("test event", 'here is some data');
});

http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});



