const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: [true, 'User must have a name'],
        
    },
    email: {
        type: String,
        required: [true, 'User must have an email'],
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8,
        select: false
    },
    age: {
        type: Number,
        minlength: 5,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;