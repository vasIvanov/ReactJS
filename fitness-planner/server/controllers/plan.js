const models = require('../models');

module.exports = {
    get: (req, res, next) => {
      const limit = +req.query.limit;
      const userId = req.query.userId;
      const query = req.query.query;
      
      if (limit) {
        models.Plan.find().sort({ _id: -1 }).limit(limit)
          .then((plans) => res.send(plans))
          .catch(next);
        return;
      }

      if(query) {
        models.Plan.find()
          .then(plans => {
            const filteredPlans = plans.filter(plan => {console.log(plan.name.toLowerCase().includes(query));  return plan.name.toLowerCase().includes(query)});
            res.send(filteredPlans);
          }).catch(next)
        return;
      }
    //   if(userId) {
    //     models.Plan.find({author: userId}).populate('author').sort({ _id: -1 })
    //       .then((origamies) => res.send(origamies))
    //       .catch(next);
    //     return;
    //   }
      models.Plan.find().sort({ _id: -1 })
        .then((plan) => res.send(plan))
        .catch(next);
    },

    getOne: (req, res) => {
        const id = req.params.id;
        models.Plan.findOne({_id: id}).then(r => {
            res.send(r);
        })
    },
  
    post: (req, res, next) => {
        const { 
          name, 
          imageUrl,
          goal,
          level,
          details,
          exercices
        } = req.body;
      const { _id } = req.user;
  
      models.Plan.create({  
            name, 
            imageUrl,
            goal,
            level,
            details,
            exercices
         })
        .then((createdPlan) => {
          return Promise.all([ models.Plan.findOne({ _id: createdPlan._id })]);
        })
        .then(([planObj]) => {
          res.send(planObj);
        })
        .catch(next);
    },
  
    put: (req, res, next) => {
      const id = req.params.id;
      const { name, 
        imageUrl,
        goal,
        level,
        details,
        exercices } = req.body;
      models.Plan.updateOne({ _id: id }, { name, 
        imageUrl,
        goal,
        level,
        details,
        exercices })
        .then((updatedPlan) => res.send(updatedPlan))
        .catch(next)
    },
  
    delete: (req, res, next) => {
      const id = req.params.id;
      models.Plan.deleteOne({ _id: id })
        .then((removedPlan) => res.send(removedPlan))
        .catch(next)
    }
  };