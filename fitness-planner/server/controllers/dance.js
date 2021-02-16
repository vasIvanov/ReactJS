const models = require('../models');

module.exports = {
  get: (req, res, next) => {
    const limit = +req.query.limit;
    const userId = req.query.userId;
    const query = req.query.query;

    if (limit) {
      models.Dance.find()
        .sort({ _id: -1 })
        .limit(limit)
        .then((plans) => res.send(plans))
        .catch(next);
      return;
    }

    if (query) {
      models.Dance.find()
        .then((plans) => {
          const filteredPlans = plans.filter((plan) =>
            plan.name.toLowerCase().includes(query)
          );
          res.send(filteredPlans);
        })
        .catch(next);
      return;
    }

    if (userId) {
      models.Dance.find({ author: userId })
        .sort({ _id: -1 })
        .then((plans) => res.send(plans))
        .catch(next);
      return;
    }
    models.Dance.find()
      .sort({ _id: -1 })
      .then((plan) => res.send(plan))
      .catch(next);
  },
  getOne: (req, res) => {
    const id = req.params.id;
    models.Dance.findOne({ _id: id }).then((r) => {
      res.send(r);
    });
  },
  getComments: (req, res) => {
    const id = req.params.id;
    models.Dance.findOne({ _id: id }).then((r) => {
      res.send(r.comments);
    });
  },
  postComment: (req, res, next) => {
    const id = req.params.id;
    const comment = req.body.comment;
    const user = req.body.user;
    models.Dance.updateOne(
      { _id: id },
      { $push: { comments: { user, comment } } }
    )
      .then((updatedPlan) => res.send(updatedPlan))
      .catch(next);
  },
  post: (req, res, next) => {
    const {
      name,
      imageUrl,
      author,
      type,
      details,
    } = req.body;
    const { _id } = req.user;
    models.Dance.create({
      name,
      imageUrl,
      author,
      type,
      details,
    })
      .then((createdDance) => {
        return Promise.all([models.Dance.findOne({ _id: createdDance._id })]);
      })
      .then(([danceObj]) => {
        res.send(danceObj);
      })
      .catch((err) => {
        if (err.errmsg.includes('duplicate key')) {
          res.send({ errMsg: 'Plan name already in use!' });
        }
      });
  },
  put: (req, res, next) => {
    const id = req.params.id;
    const { name, imageUrl, type, details } = req.body;
    models.Dance.updateOne(
      { _id: id },
      { name, imageUrl, type, details }
    )
      .then((updatedPlan) => res.send(updatedPlan))
      .catch((err) => {
        if (err.errmsg.includes('duplicate key')) {
          res.send({ errMsg: 'Dance name already in use!' });
        }
      });
  },
  delete: (req, res, next) => {
    const id = req.params.id;
    models.Dance.deleteOne({ _id: id })
      .then((removedPlan) => res.send(removedPlan))
      .catch(next);
  },
}