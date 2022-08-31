const express = require('express')
const db = require('./db')
const cors = require('cors')
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')
// const AppRouter = require('./routes/AppRouter')
const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
// app.use('/app', AppRouter)
app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
