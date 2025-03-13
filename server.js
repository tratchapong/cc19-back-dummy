require('dotenv').config()
const express = require('express')
const notFound = require('./middlewares/not-found')
const errorHandling = require('./middlewares/error-handling')
const { upload } = require('./controllers/x-controller')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/upload', upload)

app.use(notFound)
app.use(errorHandling)



const port = process.env.PORT || 8000
app.listen(port, ()=>console.log('Server on ', port))