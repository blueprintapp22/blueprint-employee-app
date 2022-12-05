const { compareSync } = require('bcrypt')
const Quickbooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth')

let oauthToken = null

let qbo = null

let oauthClient = new OAuthClient({
  clientId: 'ABy3SARYHIrTCQK3JLjAdcXWDSXtfj434vteP44jGYIVPGHuOs',
  clientSecret: 'e24Mns5EUOCFaNjLX95SXPXhW42qZECmhxteuuDs',
  environment: 'sandbox',
  redirectUri: 'http://localhost:3001/bea/quickbooks/callback',
  logging: true
})

const GetToken = (req, res) => {
  try {
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting],
      state: 'intuit-test'
    })

    res.redirect(authUri)
  } catch (error) {
    throw error
  }
}

const Callback = async (req, res) => {
  try {
    await oauthClient.createToken(req.url).then(function (authResponse) {
      oauthToken = JSON.stringify(authResponse.getJson(), null, 2)
    })

    qbo = new Quickbooks(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      oauthClient.getToken().access_token,
      false,
      oauthClient.getToken().realmId,
      false,
      true,
      null,
      '2.0',
      oauthClient.getToken().refresh_token
    )

    console.log(qbo)

    res.redirect('http://localhost:3000')
  } catch (error) {
    throw error
  }
}

const RefreshAccessToken = (req, res) => {
  try {
    oauthClient.refresh().then(function (authResponse) {
      oauthToken = JSON.stringify(authResponse.getJson(), null, 2)
    })
    qbo = new Quickbooks(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      oauthClient.getToken().access_token,
      false,
      oauthClient.getToken().realmId,
      false,
      true,
      null,
      '2.0',
      oauthClient.getToken().refresh_token
    )

    res.send(oauthToken.data)
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
  GetToken,
  Callback,
  RefreshAccessToken
}
