const express = require('express')
const app = express()
const logger = require('morgan')

const connectToMongoDB = require('./database/connectToMongoDB')

app.use(express.json())
app.use(logger('dev'))

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  connectToMongoDB()
})