const config = require('./config/config');
const dbConnection = require('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = 'secret';
const router = require('./routes/');

const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eevxm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(9999);
}).catch(err => {
    console.log(err); 
})
