const { compareSync } = require('bcrypt')
const Quickbooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth')

let oauthToken = null

// let qbo = null

let qbo = new Quickbooks(
  process.env.CLIENT_ID,

  process.env.CLIENT_SECRET,

  'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Op0OLVhTWOdmf-hCnDbe8w.9Q7zH1ITZysbJz0ltFNAtxFCfLFATJHfkNYNql30NACHeHgtokfgLqCgsGQqF6QLKT8VNkOlfiISzrcVLjMiuS1eWrqgIo-Z5fDPEdS0m7_l9avGOuptNXFfrcdQ20imyUoqTgLuDYqEO0sXlfq3QxanvHTswckSb3Pidf5GNwZ576EYiDKtREAm4AsFs7wIBKlTP35TIy6Bjgz5Rfqsb1cpusXxgnXdYEldQ1nNVNm3br88HO57ETK_5tsh6NagOoCKMMkIirpcee_zWkA8Ote6pIeUy6st3u7gbIOIjGlHtSElNZ1wpQD6N-79YV_TbNNTSXNqlL-xAe09ydZTyXN3GYh8iB62wphuPbpfOww-Es6zXFATVjvnRWOnKenlJDarzNbGB1xwzSm43EZoiQfvJd_GnWIt2_9xUilxxmW5YIYi0q_0tp3wzShbRKZYkthCm0DKYf67uq5FKCROiqM251-w9QWxHbdckkEV83t42zxH_sbfDjWKMR-m9SHY704BaGl5tMWu5pyjb5zJXHUotsAAVieNpDMTw0chSj9PqJCF1W0QPs7bnoYs01EUkIJPHAjds3b4Y5MsOomETeDRwY_eNuhhBIKjzkICWEf0brMRxxWB0jOgqPEhN_coR3cyyqNFu0ftmIEHM1M8lxtbo-nw7As57zhkonZ5xydofkGCX28kyHWE_auq91IabO0JuQ4yBsAIStDGB6t5W2Dvvq8PXzlqOe1Xv4zRYIA.ykJKsWL_ozxFQo3yTjPlEA',
  false,
  '1342692165',
  false,
  true,
  null,
  '2.0',
  'AB11686418867wBBXeRWm3oPDHYGpESNwQZMpgwXOOvL2OICCV'
)

let oauthClient = new OAuthClient({
  clientId: process.env.CLIENT_ID,

  clientSecret: process.env.CLIENT_SECRET,

  environment: 'production',

  redirectUri:
    'https://blueprint-employee-app-production.up.railway.app/bea/quickbooks/callback',

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

    qbo.findInvoices({ DocNumber: id }, (err, invoice) => {
      if (err) console.log(err)
      if (!invoice.QueryResponse.Invoice) {
        res.send("No invoice's found")
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
