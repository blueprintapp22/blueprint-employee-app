const mongoose = require('mongoose')
const UserSchema = require('./user')
const InvoiceSchema = require('./Invoice')
const PincodeSchema = require('./pincode')

const User = mongoose.model('User', UserSchema)
const Invoice = mongoose.model('Invoice', InvoiceSchema)
const Pincode = mongoose.model('Pincode', PincodeSchema)

module.exports = {
  User,
  Invoice,
  Pincode
}
