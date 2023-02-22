const { compareSync } = require('bcrypt')
const Quickbooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth')

let oauthToken = null

// let qbo = null

let qbo = new Quickbooks(
  process.env.CLIENT_ID,

  process.env.CLIENT_SECRET,

  'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..OHN84r_43zWHwWUiX6MsNA.YfDSIfPy2izjHHumHTdDxrs7Hfo__Y5wy_4q41lTqeFHNiwJT663d9wXhT9sI0w3CFHvNs3upYc6BbpTg0b9UbH3hKbiX8sltFiSd6qpahMLoTBfES4kbgrdkrGaMV9NJS5hII9p65cqAPGJw_rIq5sTyvQeUFkgtFH67KKtNVKMn3qDnaWy9PLh4_wWcjgYr1d_cbD_jFaUodF3rVHUlRobUHJB84nVdC6HwciFDEYhqKPGMczqkJdauK72vjA42mo8LWL9B1tEts0D7hgELnq8t7CKE1S9z0qcTZexA_51l7ZEvzE4_QtkNpHqkVvGt11cVmoQ_OOIkPHmYAMpOYR8qtgucbOsfY9sUTXg3EnuFo9NIM_iOVsSNV823nnndj0_6AaELOK7VhY6dtSXg94es2uoxg2eCr8qJuaJZGFFm0vsK5H9ZP7dN9SJtUDtnlSHy9weLhsLNVF-PnnAZ6JaW1TEfimf8mLFCTNdHA3KR-owYQ9v2h_DXzYpXQN8hk_nsuigwmp6imSqJ89u6x6OY6tfCRrPAb1CsGJIHdFmHKpVUQfxyLW3LD9cUHBQqiE7e7ZZtu6UWwBzhP50nhIGwLQIjJVPB8QucixHptiT6Bn0bh4g1NX16stXmi8QYhM9woOdVREFHxOZRUp6uepi7bX-ydBmxZhNXzPGDQ1GXmLQ6TD6d1p3dFahew3RkTFDNTfJAONFeLxKHOEXmpyDfFND3Px1rTig3cDFEwY.Lyfl-apHQ30ln6XWuv9_TQ',
  false,
  '1342692165',
  false,
  true,
  null,
  '2.0',
  'AB11685745415d770qIff4rb7lKs7rOX7r0J0LezG6Ob67S6aD'
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
      if (!invoice) {
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
