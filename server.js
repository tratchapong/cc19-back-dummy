require('dotenv').config()
const express = require('express')
const notFound = require('./middlewares/not-found')
const errorHandling = require('./middlewares/error-handling')
const { profilePic, login } = require('./controllers/x-controller')
const cors = require('cors')
const authenticate = require('./middlewares/authenticate')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/login', login)
app.patch('/profile-pic', authenticate , profilePic)

app.use(notFound)
app.use(errorHandling)



const port = process.env.PORT || 8000
app.listen(port, ()=>console.log('Server on ', port))