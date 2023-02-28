const { compareSync } = require('bcrypt')
const Quickbooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth')

let oauthToken = null

// let qbo = null

let qbo = new Quickbooks(
  process.env.CLIENT_ID,

  process.env.CLIENT_SECRET,

  'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Mzo5wzH5iVbpeDHhGQfsGw.d-r4ymlYAWOf8stNPODS8P-OqO14OacI0LLndLq1gfmYpOnvRYWY4yekuEahKAva7o0bGnLKxlbA5fxK7gvjvwagV5y4KO-bHi59UGl1Hi-oUSHjsB_jBXhIXLoXIT1MjFuN_OEELARXFTXdpoPMAyNgljiAxkG_wffEiQB1bLmjH_Ng_43p5tVB3kVbta9ABiMoZwAr15bWHfw6XPqGNjiWvTZHE7ciedvt4BquFtuhxqchrx2jycJNXFUOlymQeYEcYdm86NbOZKjpFxahpnKm2TLt1hkyRNXGUFbeNq5UTOzyVuk2aWmTRdeWw8IfYz9dRLgKNfkI-CON8tzkd2cBESZqa_9VQX2jLmnm-TjwpFUqQ1TSoRz72IFEs5g0PSlzLrF1TtPLnm30qXBL44a_lOAZZIPVZ5_sQh-zhv188LkbkasT3hww4ghwFkPXwCbzX9SkEM-FKezriSbBKIZbdgw_SXeSR7xdCOkwP9v5fxD4_yAOB_tnJFct7lvHKpzBzfCLxgAdcou3XW6yKG7Yy40tsA7VxwzERuGdLBxd8w-3GKOJQ88WrkPWuBOhHweZDV2YTogd0yBDZ0tfwK2WkgbTwcAl9m7gg9FkzKGbqmWXPC6Fmfn2o_rVLoZr7nFOsa8dRGQvrriNMF6PJhZNBXVepL5k2eHKNNsMx0ePIs02vnBzvB58auEcppoJICj_XiQwrt7wgbJ2tSRzVpzvlLlfAdTigFGb32dfEAE.iEXxiADFuXvxfmGDKFktXA',
  false,
  '1342692165',
  false,
  true,
  null,
  '2.0',
  'AB11686269909HZeazE2ZHXSUlwJ0etdXcg805WaymQXAwph6G'
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
