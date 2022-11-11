const { compareSync } = require('bcrypt')
const Quickbooks = require('node-quickbooks')

let clientId = 'ABPkh6TLJ6WrbWPGa1aoWfLP3NusHNwgP33bX8q26yVnBT50Pc'
let clientSecret = 'MrLZSS6qFawcQdFahSIE6a5aGoPfjYWYHe62Cztl'
let oauthToken =
  'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0.._dxrq9ggU-bldW3MA4D8Eg.dh18s93SCFsxc0HKfj4ZtP7kpNK-dWkrjNgzdQQsHiflvyD2Gop6iHi53_FLOqYnz7Qa-ym6OcJCmAJa3bxA3E3Zhj6Ew41T7A0e5DOybpHA-NR-GAfi8bWmFHBL9wKuZ65QuLnRmGELh5cEvjCZIU5FcaL26UzJ98orjC7vu3fvEsfmE-MZvRt1DT8mG15cvSFo8jiJ2qZzIWHn-9B3LpyFNP0o0HQk5GDtnG1b8YdrI7x8i5VYDA7Jqm-CRf66Xs5ybtCnOw4dsyaATc8WHQlkLxBjVPzj1pQqLmlL5cPWvHKHBbOdMcxbwNQyepUc_LPiROHm347ZSY8VfENJkKjCh1W_ggeura-kUGhO0nkpqZ7D1YHcNgA6MgA_wSDr4T9sWLkRkEBGrlwAddvG24klct7oIbNjZ0y0PxDPoEs3Hb-WtEphpCYsFLSYIgOi3HZSZA2-G4OhkNN4YERJoKROTRxLyiySUjqhvqu377BsTPbWJvdrW7o2H4JyaB1m9zthRN1NlGCo_eY9ZbSzNnXnKMAmSvZEU6senylEtd0MOZcMezEfX_XWi9nOZTJDJQffLSQkA63IOECM7LFU-b4tVutqooyaS_hu3IIk59QbLG-vXVbhIsR_2LqFqg4GKGNG-SWAHeTATSIinhXtCo2q_T75I_nU8w9WpmfwVPqo0j4DMyCzPYpOKaoVWHtjVTjfWjpKNhNdLtqGygF62pZJtmuIO4AzdO3wonsuwPw.7LG8Uob8RkFx2msU2HI_DA'
let realmId = '1342692165'
let refreshToken = 'AB11674321952ID5GHoqAkCXeX9U45LLUbutCJwJr2ZacfzfwG'

let qbo = new Quickbooks(
  clientId,
  clientSecret,
  oauthToken,
  false,
  realmId,
  false,
  true,
  null,
  '2.0',
  refreshToken
)
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
  InvoiceChecker
}
