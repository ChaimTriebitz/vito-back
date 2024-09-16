const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
   bank: {
      type:String,
   },
   contact: {
      type:String,
   },
   position: {
      type:String,
   },
   email: {
      type:String,
      match: [
         /^(?=.{1,256}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)$/
         , 'valid email required'
      ]
   },
   cell: {
      type:Number,
   },
   office: {
      type:Number,
   },
   lender: {
      type:String,
   },
   loan: {
      type:String,
   },
   territories: {
      type:String,
   },
});

module.exports = mongoose.model('Bank', BankSchema);
