const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

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

    exercises: {},

    comments: [{user:{type: String}, comment: {type: String}}]
});



module.exports = new Model('Plan', planSchema);