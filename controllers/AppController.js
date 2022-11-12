const User = require('../models/user.js')
const Pincode = require('../models/pincode')
const { compareSync } = require('bcrypt')

const getUsers = async (req, res) => {
  try {
    const user = await User.find()
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const createPincode = async (req, res) => {
  try {
    const pinCode = await new Pincode({
      code: 'BOB40'
    })
    pinCode.save()
    res.send(pinCode)
  } catch (error) {}
}
const getPincode = async (req, res) => {
  try {
    const { id } = req.params
    const pinCode = await Pincode.findOne({ _id: id })
    return res.status(200).json({ pinCode })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const togglePincode = async (req, res) => {
  try {
    const { id } = req.params
    const pinCode = await Pincode.findOne({ _id: id })
    pinCode.boolVal = !pinCode.boolVal
    pinCode.save()
    res.send(pinCode)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const updatePincode = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Pincode.updateOne(
      { _id: id },
      {
        $set: {
          code: req.body.code
        }
      }
    )
    return res.status(200).json({ updated })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
module.exports = {
  getUsers,
  getPincode,
  togglePincode,
  createPincode,
  updatePincode
}
