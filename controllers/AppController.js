const User = require('../models/User')

const getUsers = async (req, res) => {
  try {
    const user = await User.find()
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
module.exports = {
  getUsers
}
