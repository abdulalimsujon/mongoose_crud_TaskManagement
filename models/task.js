const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'add a task']
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: "User"

    }]





}, {

    timestamps: true, versionKey: false

})
// const Task = mongoose.model('task', taskSchema);



// taskSchema.methods = {
//     findCompleted: function () {
//         return mongoose.model("task").find({ completed: true })
//     }
// }

// taskSchema.statics = {
//     find: function () {
//         return this.find({ name: /a/i });
//     }
// }


module.exports = taskSchema;