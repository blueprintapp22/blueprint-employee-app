const User = require('../models/user.js')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })

    // console.log('User:' + user.passwordDigest)
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user._id,
        userName: user.userName,
        access: user.access,
        fullName: user.fullName,
        admin: user.admin
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { email, password, fullName, userName } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await new User({
      email,
      passwordDigest,
      fullName,
      userName
    })
    user.save()
    res.send(user)
  } catch (error) {
    throw error
  }
}
const DeleteUser = async (req, res) => {
  try {
    let { id } = req.params
    let user = await User.deleteOne({ userName: id })
    res.send(user)
  } catch (error) {
    throw error
  }
}
const GrantAccess = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ userName: id })
    if (!user.access) {
      let updated = await User.updateOne(
        { userName: id },
        {
          $set: {
            access: true
          }
        }
      )
      res.send(updated)
    } else {
      let updated = await User.updateOne(
        { userName: id },
        {
          $set: {
            access: false
          }
        }
      )
      res.send(updated)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const MakeAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ userName: id })
    if (!user.admin) {
      let updated = await User.updateOne(
        { userName: id },
        {
          $set: {
            admin: true
          }
        }
      )
      res.send(updated)
    } else {
      let updated = await User.updateOne(
        { userName: id },
        {
          $set: {
            admin: false
          }
        }
      )
      res.send(updated)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Register,
  Login,
  CheckSession,
  DeleteUser,
  GrantAccess,
  MakeAdmin
}
