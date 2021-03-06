const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.plan.get);
router.get('/:id', controllers.plan.getOne);
router.get('/comment/:id', controllers.plan.getComments);

router.post('/', auth(), controllers.plan.post);
router.post('/comment/:id', controllers.plan.postComment);

router.put('/:id', auth(), controllers.plan.put);

router.delete('/:id', auth(), controllers.plan.delete);

module.exports = router;