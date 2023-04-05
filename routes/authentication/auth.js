const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
	(req, res) => {
		res.redirect('/dashboard');
	}
);

router.get('/logout', (req, res, next) => {
	req.session.destroy(err => {
		if (err) console.log(err);
		res.redirect('/');
	});
});

module.exports = router;