const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = 'secret';
const express = require('express');

module.exports = (app) => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(express.json());

  app.use(cookieParser(secret));
};
