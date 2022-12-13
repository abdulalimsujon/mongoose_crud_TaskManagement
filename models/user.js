const mongoose = require('mongoose');
const taskSchema = require('./task');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    task: {
        type: mongoose.Types.ObjectId,
        ref: 'Task'
    }
})

module.exports = userSchema;