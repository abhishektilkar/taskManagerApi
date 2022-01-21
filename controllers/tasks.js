const Task = require('../models/Task')

const asyncWrapper = require('../middleware/async')

const getAlltasks = asyncWrapper (async (req,res) => {
    // res.send("get All Tasks Items")
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper (async (req,res) => {
    // res.send("create A Tasks")
   
    const task = await Task.create(req.body)
    res.status(201).json({ task })
    // res.json(req.body)
    
})

const getTask = asyncWrapper (async (req, res) => {
    // res.send("get Task")
    // res.json({id : req.params.id})
    const { id : taskID } = req.params
    const task = await Task.findOne({ _id : taskID })

    if(!task) {
        return req.status(404).json({ msg : `no task with id : ${taskID}` })
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper (async (req, res) => {
    // res.send("Delete Task")
    
    const { id : taskID } = req.params
    const task = await Task.findOneAndDelete({ _id : taskID })
    if(!task) {
        return req.status(404).json({ msg : `no task with id : ${taskID}` })
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper (async (req, res) => {
    
    const { id : taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id : taskID }, req.body, {new : true, runValidators : true})

    if(!task) {
        return req.status(404).json({ msg : `no task with id : ${taskID}` })
    }
    res.status(200).json({ task })
    // res.send("update Task")
})

module.exports = {
    getAlltasks, 
    createTask,
    getTask,
    updateTask,
    deleteTask
}