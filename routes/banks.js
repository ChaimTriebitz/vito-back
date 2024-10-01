const express = require('express')
const router = express.Router()
const { get, createMany, create, update, remove } = require('../controllers/banks')
const { protect } = require('../middleware/auth')

router.route('/').get(protect, get)

router.route('/createMany').post(protect, createMany)

router.route('/create').post(protect, create)

router.route('/:id').put(protect, update)

router.route('/:id').delete(protect, remove)

module.exports = router
