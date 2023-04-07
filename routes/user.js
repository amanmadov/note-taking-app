const router = require('express').Router();
const { getProfile, getUserNotes, getAllUsers, postCreateNote } = require('../controllers/user');
const { ensureAuth } = require('../middleware/authorize');

router.get('/profile', ensureAuth, getProfile);
router.get('/notes', ensureAuth, getUserNotes);
router.get('/all', ensureAuth, getAllUsers);
router.post('/create-note', ensureAuth, postCreateNote);

module.exports = router;