const router = require('express').Router();
const { getRandomNotes } = require('../controllers/note');
const { ensureAuth } = require('../middleware/authorize');

router.get('/random', ensureAuth, getRandomNotes);

module.exports = router;