const { compareSync } = require('bcrypt')
const Quickbooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth')
const axios = require('axios')

// let clientId = 'ABPkh6TLJ6WrbWPGa1aoWfLP3NusHNwgP33bX8q26yVnBT50Pc'
// let clientSecret = 'MrLZSS6qFawcQdFahSIE6a5aGoPfjYWYHe62Cztl'

let realmId = '1342692165'
let oauthToken = ''
let refreshToken = ''

const oauthClient = new OAuthClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  environment: 'production',
  redirectUri: 'https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl',
  logging: true
})

let qbo = new Quickbooks(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  oauthToken,
  false,
  realmId,
  false,
  true,
  null,
  '2.0',
  refreshToken
)

const GetToken = async (req, res) => {
  try {
    const res = await axios.post(
      `https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer?grant_type=authorization_code&code=${process.env.INTUIT_AUTH_CODE}&redirect_uri=${OAuthClient.redirectUri}`,
      {
        headers: {
          Authorization:
            'Basic QUJQa2g2VExKNldyYldQR2ExYW9XZkxQM051c0hOd2dQMzNiWDhxMjZ5Vm5CVDUwUGM6TXJMWlNTNnFGYXdjUWRGYWhTSUU2YTVhR29QZmpZV1lIZTYyQ3p0bA'
        }
      }
    )

    console.log(res)
    return res
  } catch (error) {
    throw error
  }
}
const BusinessGetter = (req, res) => {
  try {
    let { id } = req.params
    let val
    qbo.findInvoices({ DocNumber: id }, (err, invoice) => {
      if (err) console.log(err)
      res.send(invoice.QueryResponse.Invoice[0].CustomerRef.value)
    })
  } catch (error) {
    res.send(error)
  }
}
const InvoiceChecker = (req, res) => {
  try {
    const { id } = req.params
    qbo.findInvoices(
      [
        {
          field: 'CustomerRef',
          value: id
        }
      ],
      (err, invoice) => {
        if (err) console.log(err)
        console.log('INVOICES: ' + invoice.QueryResponse.Invoice.length)
        res.send(invoice.QueryResponse.Invoice)
      }
    )
  } catch (error) {
    res.send(error)
  }
}
module.exports = {
  BusinessGetter,
  InvoiceChecker,
  GetToken
}
