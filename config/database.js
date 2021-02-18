const mongoose = require('mongoose');

options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost:27017/otamot', options)
.then(() => console.log('Connected to Database...'))
.catch(err => console.log(err));

module.exports = mongoose;
