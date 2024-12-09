const mongoose = require('mongoose');

// Define a sub-schema for notes
const NoteSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now,
   },
   important: {
      type: Boolean,
      default: false,
   },
});

module.exports = NoteSchema;