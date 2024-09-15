const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [
         true,
         'username required'
      ],
   },
   email: {
      type: String,
      required: [
         true,
         'email required'
      ],
      unique: true,
      match: [
         /^(?=.{1,256}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)$/
         , 'valid email required'
      ]
   },
   password: {
      type: String,
      required: [
         true,
         'password required'
      ],
      minlength: 8,
      select: false,
   },
   avatar: {
      type: String,
   },
   reset_password_token: {
      type: String
   },
   reset_password_expire: {
      type: Date
   },
   images: {
      type: Array
   }
})

UserSchema.pre('save', async function (next) {
   if (!this.isModified('password')) next()
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
   next()
})

UserSchema.methods.matchPasswords = async function (password) {
   return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })
}

UserSchema.methods.getResetPasswordToken = function () {
   const resetToken = crypto.randomBytes(20).toString('hex')
   this.reset_password_token = crypto.createHash('sha256').update(resetToken).digest('hex')
   this.reset_password_expire = Date.now() + 10 * (60 * 1000)
   return resetToken
}

module.exports = mongoose.model('User', UserSchema)