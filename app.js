const express = require('express')

const tasksRouter = require('./routers/tasks.js')

// const server = express() //
const app = express()
const connectDB = require('./db/connect.js')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

require('dotenv').config()

// Middleware to get data on req.body
app.use(express.static('./public'))

// use of json in project now
app.use(express.json())

// setting up tasksRouter //
app.use('/api/v1/tasks',tasksRouter)

// hannddleing the 404 case
app.use(notFound)


// coustom error middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, (req,res) => {
            console.log("server listening on port 3000")
        })
    } catch (error) {
        console.log(error)
    }
}

start()