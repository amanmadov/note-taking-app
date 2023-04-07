const router = require('express').Router();
const { getProfile, getUserNotes, getMyNotes, getAllUsers, postCreateNote } = require('../controllers/user');
const { ensureAuth } = require('../middleware/authorize');

router.get('/profile', ensureAuth, getProfile);
router.get('/notes', ensureAuth, getMyNotes);
router.get('/all', ensureAuth, getAllUsers);
router.post('/create-note', ensureAuth, postCreateNote);
router.get('/:id', ensureAuth, getUserNotes);

module.exports = router;