const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

module.exports = {
  get: (req, res, next) => {
    models.User.find()
      .populate('plans')
      .then((users) => res.send(users))
      .catch(next);
  },

  getInstructors: (req, res, next) => {
    models.User.find({ instructor: true })
      .then((instructors) => res.send(instructors))
      .catch(next);
  },

  post: {
    register: (req, res, next) => {
      const { username, password, city, instructor } = req.body;

      models.User.findOne({ username })
        .then((result) => {
          if (result) {
            return res.send({ errorMessage: 'Username in use' });
          } else {
            models.User.create({ username, password, city, instructor })
              .then((createdUser) => res.send(createdUser))
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch(next);
    },

    login: (req, res, next) => {
      const { username, password } = req.body;
      models.User.findOne({ username })
        .populate('plans')
        .populate('dances')
        .then((user) =>
          !!user
            ? Promise.all([user, user.matchPassword(password)])
            : [null, false]
        )
        .then(([user, match]) => {
          if (!match || !user) {
            return res
              .status(401)
              .send({ errorMessage: 'Invalid username or password' });
          } else {
            const token = utils.jwt.createToken({ id: user._id });
            res.cookie(config.authCookieName, token).send(user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logout: (req, res, next) => {
      const token = req.cookies[config.authCookieName];
      console.log('-'.repeat(100));
      console.log(token);
      console.log('-'.repeat(100));
      res.clearCookie(config.authCookieName).send('Logout successfully!');
    },
  },

  put: (req, res, next) => {
    const id = req.params.id;
    const { planId, add, addDance, danceId, removePlan, removeDance } =
      req.body;
    if (add) {
      models.User.updateOne({ _id: id }, { $push: { plans: planId } })
        .then((updatedUser) => res.send(updatedUser))
        .catch(next);
    } else if (removePlan) {
      models.User.updateOne({ _id: id }, { $pull: { plans: planId } })
        .then((updatedUser) => res.send(updatedUser))
        .catch(next);
    }
    if (addDance) {
      models.User.updateOne({ _id: id }, { $push: { dances: danceId } })
        .then((updatedUser) => res.send(updatedUser))
        .catch(next);
    } else if (removeDance) {
      models.User.updateOne({ _id: id }, { $pull: { dances: danceId } })
        .then((updatedUser) => res.send(updatedUser))
        .catch(next);
    }
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    models.User.deleteOne({ _id: id })
      .then((removedUser) => res.send(removedUser))
      .catch(next);
  },
};
