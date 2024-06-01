const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors');
const connectDB = require('./DB/connectDb');
const userRouter = require('./routes/routes');
const Errorhandle = require('./middlewares/ErrorHandle');
const cloudinary = require('cloudinary')
require('dotenv').config()
const app = express()


//middlewire
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//db connection
connectDB()

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.get('/', (req, res) => res.send("<h1 style='color:red'> wellcome to rest api </h1>"))

///
app.use('/api', userRouter)

app.use(Errorhandle)
app.listen(process.env.PORT, () => {
    console.log(`server is starting on port http://localhost:${process.env.PORT}`.bgGreen)
})