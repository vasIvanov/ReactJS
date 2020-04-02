const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Array } = Schema.Types;

const planSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

    imageUrl: {
        type: String,
        require: true
    },

    goal: {
        type: String
    },

    level: {
        type: String
    },

    details: {
        type: String
    },

    author: { type: ObjectId, ref: "User" },

    exercises: {}
});



module.exports = new Model('Plan', planSchema);