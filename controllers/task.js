const { findById } = require('../models/task');
const Task = require('../models/task')


exports.createTask = async (req, res) => {

    try {
        const task = await Task.create(req.body)

        res.status(200).json(task);


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