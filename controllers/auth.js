const crypto = require('crypto');
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail');
const { uploadImage } = require('../utils/cloudinary');

module.exports = {
   register,
   login,
   forgotpassword,
   resetpassword
}

async function register(req, res, next) {
   const { username, email, password, avatar } = req.body
   const uploadedImage = await uploadImage({ username, image: avatar })
   console.log(uploadedImage.public_id);
   try {
      const user = await User.create({ username, email, password, avatar: uploadedImage.public_id })
      sendToken(user, 201, res)
   } catch (err) {
      next(err)
   }
}
async function login(req, res, next) {
   const { email, password } = req.body
   if (!email || !password) return next(new ErrorResponse('Email & Password required', 400))
   try {
      const user = await User.findOne({ email }).select('+password')
      if (!user) return next(new ErrorResponse('Invalid credentials', 401))
      const isMatch = await user.matchPasswords(password)
      if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401))
      sendToken(user, 201, res)
   } catch (error) {
      res.status(500).json({ success: false, error: error.message })
   }
}


async function forgotpassword(req, res, next) {
   console.log(req.params);
   const { email } = req.body

   try {
      const user = await User.findOne({ email })
      if (!user) return next(new ErrorResponse('Email could not be sent', 404))
      const resetToken = user.getResetPasswordToken()
      await user.save()
      const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
      try {
         await sendEmail({
            username: user.username,
            to: user.email,
            intro: 'Welcome to reset password',
            subject: 'Password reset',
            instructions: 'click down ⬇️ here to reset password',
            link: resetUrl
         })
         res.status(200).json({ success: true, data: 'email sent successfully' })
      } catch (error) {
         user.reset_password_token = undefined
         user.reset_password_token = undefined
         await user.save()
         return next(new ErrorResponse('Email could not be sent', 500))
      }
   } catch (error) {
      next(error)
   }
}
async function resetpassword(req, res, next) {
   const reset_password_token = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')
   try {
      const user = await User.findOne({ reset_password_token, reset_password_expire: { $gt: Date.now() } })
      if (!user) return next(new ErrorResponse('invalid reset password', 400))
      user.password = req.body.password
      user.reset_password_token = undefined
      user.reset_password_expire = undefined
      await user.save()
      res.status(201).send({ success: true, message: 'Password reset successfully' })
   } catch (error) {
      next(error)
   }
}

function sendToken(user, statusCode, res) {
   const token = user.getSignedToken()
   res.status(statusCode).json({ success: true, token })
}

