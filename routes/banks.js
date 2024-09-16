const express = require('express')
const router = express.Router()
const { getBanks,createMany } = require('../controllers/banks')
const { protect } = require('../middleware/auth')

router.route('/').get(protect, getBanks)
router.route('/createMany').post(protect, createMany)

module.exports = router