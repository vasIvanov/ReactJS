const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
    return mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eevxm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`);
};