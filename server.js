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

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
app.use('/bea', AppRouter)

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////// Quickbooks SERVER ///////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// let clientId = 'ABPkh6TLJ6WrbWPGa1aoWfLP3NusHNwgP33bX8q26yVnBT50Pc'
// let clientSecret = 'MrLZSS6qFawcQdFahSIE6a5aGoPfjYWYHe62Cztl'
// let oauthToken =
//   'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..lN4zxK4SEuy0jjGVcpRxXw.kgLXEC8YPbBwtS_2ovHKHo2Po76C9vmd1ESTUiU48bJSDYBMhCO99CCMmk7fFpRH3jQuI6u7J8G8Z5sNiKuOd9wi-4AZDMP0Bg6PzbXs_aljNvOaE2VzevbHHdETuOKlWtVwZ3y-WuoT63bnFSX6ek40eLfDyYEB_5w1hDYX3wWrfwSNrUNOG68IJi0zkNQ6lOZpc_ZK4pq3EJxdbim9UOO280wreCdG_TBQUpudyIfJJxYjd9uOiG7yohjaB9JI3gCxAm5-ll-FqtV_L6LMFBG8QUafNUWP2sYMkkclRDTV2rentf2N-BXFW86V1D6S1Rahefs7KH-eTA0aKeqDgEKXb3ctwl09l1BVxTFDzgT84PsZ8S1rFpCj7yHHMk4IuYtShHkOqqHeS5S03QEquGcJHo1fwZqtw-R_IqOtQMrenqu9LuKsFKRyG9xffv1TUjezzHr72pCXazU9DptTPr1D7ejDQRUsphBJ9W-TiWTq40vATPv24tlhp_dNESESwtJ_SI4k9a6DtY6qkohe9j023f5zzgKhKsGytFA10u57SbWgD2-RYnKtHZrcxk3wgdmnTwByYDl6W7ymwNmi983gVIW6lg7guQSjg8SfkS0Yp9gCCNKjJJiNW_RoJMjA9Xf_HiTpT6puUpJsCQtFEzbMRp1rQ_cuUJXsLg7l-7NFhkZ6uljIk9KpVq9dmbqzx4fDrdmS2MxlQZAVZXnBnb4JUfBDg09sL6ZtVsuL46w.7MehU4S_xDDE7sfmk7GJeQ'
// let realmId = '1342692165'
// let refreshToken = 'AB116740541447RtLoxfuzdoYrs3UbeM1q71bYdVrZRbeYx6e0'
// let qbo = new Quickbooks(
//   clientId,
//   clientSecret,
//   oauthToken,
//   false,
//   realmId,
//   false,
//   true,
//   null,
//   '2.0',
//   refreshToken
// )
app.get('/*', (req,res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
