const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const movieRoute = require('./Routes/movieRoute')
require("dotenv").config();

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/movies', movieRoute)

const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI
app.listen(port,(req,res)=>{
    console.log(`Server is running on port: ${port}`);
})

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("MongoDB connected"))
.catch((err) => console.error(err.message))