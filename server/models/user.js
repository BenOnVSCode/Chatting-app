const mongoose = require('mongoose')


const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    messages:{
        type: [Object] 
    }
});



module.exports = mongoose.model('User', Schema);