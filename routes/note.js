const router = require('express').Router();
const { getRandomNotes, getNoteDetails, getNoteEditForm, postNoteEditForm } = require('../controllers/note');
const { ensureAuth } = require('../middleware/authorize');

router.get('/random', ensureAuth, getRandomNotes);
router.get('/:id', ensureAuth, getNoteDetails);
router.get('/edit/:id', ensureAuth, getNoteEditForm);
router.post('/edit/:id', ensureAuth, postNoteEditForm);

module.exports = router;