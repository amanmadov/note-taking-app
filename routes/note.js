const router = require('express').Router();
const { getRandomNotes, getNoteDetails, getNoteEditForm, postNoteEditForm, postDeleteNote } = require('../controllers/note');
const { ensureAuth } = require('../middleware/authorize');

router.get('/random', ensureAuth, getRandomNotes);
router.get('/:id', ensureAuth, getNoteDetails);
router.get('/edit/:id', ensureAuth, getNoteEditForm);
router.post('/edit/:id', ensureAuth, postNoteEditForm);
router.post('/delete-note', ensureAuth, postDeleteNote);

module.exports = router;