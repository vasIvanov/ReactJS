const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.post('/', auth(), controllers.dance.post);
router.get('/', controllers.dance.get);
router.get('/:id', controllers.dance.getOne);
router.post('/comment/:id', controllers.dance.postComment);
router.get('/comment/:id', controllers.dance.getComments);

module.exports = router;