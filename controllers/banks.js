const Bank = require('../models/Bank.js');
const ErrorResponse = require('../utils/errorResponse.js');
const resolve = require('../middleware/response.js')

module.exports = {
   get,
   createMany,
   create,
   update,
   remove
}

async function get(req, res, next) {
   try {
      const data = await Bank.find();
      resolve.success(res, 200, 'Banks', data)
   } catch (err) {
      next(new ErrorResponse(err.message))
   }
}

async function createMany(req, res, next) {
   try {
      const data = await Bank.insertMany(req.body)
      resolve.success(res, 201, 'lenders inserted successfully', data)
   } catch (err) {
      next(new ErrorResponse(err.message, 400))
   }
}

async function create(req, res, next) {
   try {
      const data = new Bank(req.body)
      await data.save()
      resolve.success(res, 201, `${data.bank} created successfully`, data)
   } catch (err) {
      next(new ErrorResponse(err.message, 400))
   }
}

async function update(req, res, next) {
   try {
      const data = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      if (!data) return next(new ErrorResponse('Bank not found', 404))
      resolve.success(res, 201, `${data.bank} updated successfully`, data)
   } catch (err) {
      next(new ErrorResponse(err.message, 400))
   }
}

async function remove(req, res, next) {
   try {
      const data = await Bank.findByIdAndDelete(req.params.id);
      if (!data) return next(new ErrorResponse('Bank not found', 404))
      resolve.success(res, 204, 'Bank deleted successfully', data)
   } catch (err) {
      next(new ErrorResponse(err.message))
   }
}
