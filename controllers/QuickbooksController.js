const { compareSync } = require('bcrypt')
const Quickbooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth')

let oauthToken = null

// let qbo = null

let qbo = new Quickbooks(
  process.env.CLIENT_ID,

  process.env.CLIENT_SECRET,

  'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..KWRL5fcTDqNNvYv6hIqzfw.zBsw1fsXKWglhY1MLyeacDTe-WiR6ay5uAorT7tsddCGRwKFR8FU-JPRrPz4xB9KgNyUZWtS7SxBPH9S73ALGlttS55PNVyqi1hgYvXZ8EURpRfCdmU8FiAhVoGNuttcgNaZaqEs9G883eksWWqNvqHblDnM99SmeGc7UAKxndMekI1YWE6-SCNF6mLhdf_L9Zyjd-cKpAPyeMsvAGn89vowIiKCGWke_BNlJxH1YtATAfYiHPsCstBuuGae83oy_vCkOFqml-rbETIIxTS2nFnOE3rKKaJOoCGN2AqNGK5pXUzfu4I14lhK4l6rmkoiAiyJED_ijlPxefOF3YXvOgD6HItEQoN22AlLg5VBKEgyqis5q3VReHQNxMHkDj6fqvfmQYVoWBUufqE1f2Ar1F4kzN1VSzyyBaQRQPCHPwRSp9QuQ1TJ1gFZYYkFSnRX5SIl6LZZazUTt3LErZ3jUuzKilAp1wHCAJ_IWMjF1mloF8gh5KzrKihSf5jugN2Fz4QkKbm5nUI_kwUS2ohMXWeg26I3swVV5auo4Loo_X_Nr8VDEnKwUpkBrAPwudxIdOKD9RXP_PqMSeX1GDUosMSeUrbXSqUX9Mm0qmf7gwQwpdYHBwTAToiGmR_D0Y-nBACtQaS1P1HIgMzyuSomWRfXSlhz6icq_7fwnUzhjnKDctgWq1nJxmuFtSP4O8yS-swimHQ7rn1kIXbJth2boUVQJoRcw0-6XeU8Tj1toqc.i46VGB_oeNHSQvkSDbd9IA',
  false,
  '1342692165',
  false,
  true,
  null,
  '2.0',
  'AB11685761792Osa9WiPR9Rqzh88jup4oQk2SjPFjknWilp0j2'
)

let oauthClient = new OAuthClient({
  clientId: process.env.CLIENT_ID,

  clientSecret: process.env.CLIENT_SECRET,

  environment:
    // process.env.NODE_ENV === 'production' ?
    'production',
  // : 'sandbox',
  redirectUri:
    // process.env.NODE_ENV === 'production'
    //   ?
    // 'https://blueprint-employee-app-production.up.railway.app/bea/quickbooks/callback',
    // : 'http://localhost:3001/bea/quickbooks/callback',
    'https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl',
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

    res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://bpbd.io'
        : 'http://localhost:3000'
    )
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
      if (!invoice.QueryResponse.Invoice) {
        res.send('No invoice found')
      } else {
        res.send(invoice.QueryResponse.Invoice[0].CustomerRef.value)
      }
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
