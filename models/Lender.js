const mongoose = require('mongoose');
const NoteSchema = require('../schemas/Note');

const LenderSchema = new mongoose.Schema({
   lender: {
      type: String,
   },
   type: {
      type: [String],
      enum: ['','CMBS', 'Construction Loan', 'Bank', 'Fund', 'Freddie Fannie', 'SBL'],
   },
   deal_size: {
      type: Number,
   },
   contact: {
      type: String,
   },
   position: {
      type: String,
      enum: ['','Team Leader', 'Assistant Vice President', 'Originator', 'Loan Officer', 'MANAGING DIRECTOR'],
   },
   office: {
      type: Number,
   },
   cell: {
      type: Number,
   },
   email: {
      type: String,
      match: [
         /^(?=.{1,256}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)$/,
         'valid email required',
      ]
   },
   notes:{
      type:[NoteSchema]
   }
});

module.exports = mongoose.model('Lender', LenderSchema);
