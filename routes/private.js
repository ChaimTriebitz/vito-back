const express = require('express')
const router = express.Router()
const { getPrivateData } = require('../../../auth/node-auth/controllers/private')
const { protect } = require('../../../auth/node-auth/middleware/auth')

router.route('/').get(protect, getPrivateData)

module.exports = router