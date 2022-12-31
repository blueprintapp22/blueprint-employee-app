const express = require('express')
const Quickbooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth')
const db = require('./db')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')
const AppRouter = require('./routes/AppRouter')
const app = express()

const PORT = process.env.PORT || 3001

// app.use(
//   cors({
//     origin: 'https://bpbd.io',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: true,
//     optionsSuccessStatus: 200
//   })
// )
// Production: app.use(cors({ origin: 'https://bpbd.io', optionsSuccessStatus: 200 }))

app.use(cors({ origin: 'https://bpbd.io', optionsSuccessStatus: 200 }))
app.use(function (req, res, next) {
  if (req.ip.includes(process.env.WHITELIST)) {
    return res.status(403).send()
  }
  next()
})
app.use(logger('dev'))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
app.use('/bea', AppRouter)

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
