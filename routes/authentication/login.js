const router = require('express').Router();
const { getLogin } = require('../../controllers/authentication/login');
const { ensureAuth, ensureGuest } = require('../../middleware/authorize');

router.get('/login', ensureGuest, getLogin);

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, async (req, res) => {
    res.redirect('/login');
});

module.exports = router;