const connection  = require('./connection')
const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')


const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/user', userRoute)
app.use('/product', productRoute)



module.exports = app