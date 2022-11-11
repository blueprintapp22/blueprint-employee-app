const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Pincode = new Schema(
  {
    boolVal: { type: Boolean, required: true, default: false },
    code: { type: String, required: true, default: '' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pincode', Pincode)
