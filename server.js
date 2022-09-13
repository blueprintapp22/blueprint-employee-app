const express = require('express')
const db = require('./db')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')
const AppRouter = require('./routes/AppRouter')
// const AppRouter = require('./routes/AppRouter')
const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
app.use('/bea', AppRouter)

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////////////////////////////// DBX SERVER ///////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// axios.defaults.headers.common = {
//   Authorization:
// }
// axios.defaults.headers.post['Content-Type'] = 'text/plain'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.post['Dropbox-API-Arg'] =
//   '/HERMS BODY SHOP OF THE CATSKILLS INC.xlsx'
// const SearchDropbox = async (sQuery) => {
//   const search = await axios.post(
//     'https://api.dropboxapi.com/2/files/search_v2',
//     { query: sQuery }
//   )
//   return search.data.matches
// }

// app.get('/dbx/:query', async (req, res) => {
//   const { query } = req.params
//   const invoices = await SearchDropbox(query)
//   return res.status(200).json({ invoices })
// })
// app.get('/preview', async (req, res) => {
//   const previews = await GetPreview()
//   return previews
// })
app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
