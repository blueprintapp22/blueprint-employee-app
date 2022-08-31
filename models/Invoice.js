const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Invoice = new Schema(
  {
    station: { type: String, required: true },
    town: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    cityStateZip: { type: String, required: true },
    authorizedBy: { type: String, required: true },
    campaign: { type: String, default: null },
    salesRep: { type: String, required: true },
    dateSold: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Invoice', Invoice)
