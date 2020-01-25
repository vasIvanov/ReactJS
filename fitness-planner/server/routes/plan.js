const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.plan.get);
router.get('/:id', controllers.plan.getOne);

router.post('/', auth(), controllers.plan.post);

router.put('/:id', auth(), controllers.plan.put);

router.delete('/:id', auth(), controllers.plan.delete);

module.exports = router;