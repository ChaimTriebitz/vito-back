const Lender = require('../models/Lender.js');
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
      const data = await Lender.find();
      resolve.success(res, 200, 'Lenders', data)
   } catch (err) {
      next(new ErrorResponse(err.message))
   }
}

async function createMany(req, res, next) {
   try {
      const data = await Lender.insertMany(req.body)
      resolve.success(res, 201, 'lenders inserted successfully', data)
   } catch (err) {
      next(new ErrorResponse(err.message, 400))
   }
}

async function create(req, res, next) {
   try {
      const data = new Lender(req.body)
      await data.save()
      resolve.success(res, 201, `${data.lender} created successfully`, data)
   } catch (err) {
      next(new ErrorResponse(err.message, 400))
   }
}

async function update(req, res, next) {

   try {
      const data = await Lender.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      if (!data) return next(new ErrorResponse('Lender not found', 404))
      resolve.success(res, 201, `${data.lender} updated successfully`, data)
   } catch (err) {
      next(new ErrorResponse(err.message, 400))
   }
}

async function remove(req, res, next) {

   try {
      const data = await Lender.findByIdAndDelete(req.params.id);
      if (!data) return next(new ErrorResponse('Lender not found', 404))
      resolve.success(res, 204, 'Lender deleted successfully', data)
   } catch (err) {
      next(new ErrorResponse(err.message))
   }
}
