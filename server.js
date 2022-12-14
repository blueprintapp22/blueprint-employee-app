const express = require('express')
const cors = require('cors')
const AuthRouter = require('./routes/AuthRouter')
const AppRouter = require('./routes/AppRouter')
const app = express()

const PORT = process.env.PORT || 3001

app.use(
  cors({
    origin: 'https://bpbd.io',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200
  })
) // Production: app.use(cors({ origin: 'https://bpbd.io', optionsSuccessStatus: 200 }))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
app.use('/bea', AppRouter)

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
