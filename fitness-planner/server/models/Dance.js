const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const danceSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },

  imageUrl: {
      type: String,
      require: true
  },

  type: {
    type: String
  },

  details: {
    type: String
  },

  author: { type: ObjectId, ref: "User" },

  comments: [{user:{type: String}, comment: {type: String}}]
})

module.exports = new Model('Dance', danceSchema);