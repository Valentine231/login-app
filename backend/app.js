const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, './config.env') }) 
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors');
const router = require('./routes')


// initialize express
const app = express()
app.use(cors())
app.use(express.json())

// Load config

app.use(morgan('dev'))
app.use('/api/v1', router)
app.use('*', (req, res) => {
    // console.log(req.url)
    res.status(404).json({message: 'this route does not exist', status: 'fail'})
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('### Connecting to Database ###')
        console.log(process.env.PORT)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }).catch(err => {
        console.log(err)
        process.exit(1)
    })

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`)
// })
