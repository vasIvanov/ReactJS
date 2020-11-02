const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

module.exports = {
  get: (req, res, next) => {
    models.User.find()
      .then((users) => res.send(users))
      .catch(next)
  },

  post: {
    register: (req, res, next) => {
      const { username, password } = req.body;
      models.User.create({ username, password })
        .then((createdUser) => res.send(createdUser))
        .catch(err => {
          console.log(err);
          
        })
    },

    login: (req, res, next) => {
      const { username, password } = req.body;
      
      models.User.findOne({ username })
        .then((user) => !!user ?  Promise.all([user, user.matchPassword(password)]) : [null, false])
        .then(([user, match]) => {
          if (!match) {
            res.status(401).send('Invalid username or password');
            return;
          }

          const token = utils.jwt.createToken({ id: user._id });
          res.cookie(config.authCookieName, token).send(user);
        })
        .catch(err => {
          console.log(err);
          
        });
    },

    logout: (req, res, next) => {
      const token = req.cookies[config.authCookieName];
      console.log('-'.repeat(100));
      console.log(token);
      console.log('-'.repeat(100));
      res.clearCookie(config.authCookieName).send('Logout successfully!')
    }
  },

  put: (req, res, next) => {
    const id = req.params.id;
    const { username, password, imageUrl } = req.body;
    models.User.update({ _id: id }, { username, password, imageUrl })
      .then((updatedUser) => res.send(updatedUser))
      .catch(next)
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    models.User.deleteOne({ _id: id })
      .then((removedUser) => res.send(removedUser))
      .catch(next)
  }
};