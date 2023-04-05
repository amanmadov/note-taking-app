const router = require('express').Router();
const passport = require('passport');
const { getLogin } = require('../../controllers/authentication/login');
const { ensureAuth, ensureGuest } = require('../../middleware/authorize');

router.get('/login', ensureGuest, getLogin);

router.get('/', ensureGuest, async (req, res) => {
	res.redirect('/login');
});

module.exports = router;