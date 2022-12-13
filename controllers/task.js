const { default: mongoose } = require('mongoose');
const { findById } = require('../models/task');
const userSchema = require('../models/user');
const taskSchema = require('../models/task');
const Task = new mongoose.model("task", taskSchema);
const User = new mongoose.model("User", userSchema);

// const Task = require('../models/task')

exports.getAllTask = (req, res) => {
    Task.find({})
        .populate("user", 'name')

        .exec((err, data) => {

            if (err) {
                res.status(500).json({ message: "there is an error!!" })


            } else {
                res.status(200).json({ message: "all task here", data: data })


            }


        })
}



exports.createTask = async (req, res) => {
    const task = new Task({
        ...req.body,
        user: req.userId
    });

    try {
        const singleTask = await task.save();

        await User.updateOne({
            _id: req.userId

        }, {
            $push: {
                task: singleTask._id
            }
        })



        res.status(200).json({ message: 'Task create successfully' });


    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

exports.getTask = async (req, res) => {


    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        res.status(200).json({ task: task })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.status(200).json({ data: task })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json(`No task with id : ${id}`);
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// exports.getCompleted = async (req, res) => {
//     try {

//         const task = new Task();
//         const data = await task.findCompleted();

//         res.status(200).json({ data: data })

//     } catch (error) {
//         res.status(500).json({ error: data })
//     }


// }
// exports.getThing = async (req, res) => {
//     const data = await Todo.find();
//     res.status(200).json({ data: data });

// }