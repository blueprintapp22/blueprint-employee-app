const mongoose = require('mongoose')
const UserSchema = require('./user')
const InvoiceSchema = require('./Invoice')

const User = mongoose.model('User', UserSchema)
const Invoice = mongoose.model('Invoice', InvoiceSchema)

module.exports = {
  User,
  Invoice
}
