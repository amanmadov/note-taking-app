const router = require('express').Router();
const { getProfile, getUserNotes, getAllUsers } = require('../controllers/user');
const { ensureAuth } = require('../middleware/authorize');

router.get('/profile', ensureAuth, getProfile);
router.get('/notes', ensureAuth, getUserNotes);
router.get('/all', ensureAuth, getAllUsers);

module.exports = router;