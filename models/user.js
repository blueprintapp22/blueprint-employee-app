const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const User = new Schema(
  {
    userName: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    access: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', User)
