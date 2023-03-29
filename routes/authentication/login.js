const router = require('express').Router();
const passport = require('passport');
const { getLogin } = require('../../controllers/authentication/login');
const { ensureAuth, ensureGuest } = require('../../middleware/authorize');

router.get('/login', ensureGuest, getLogin);

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, async (req, res) => {
    res.redirect('/login');
});



// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
  console.log('logging out...');
  console.log(req.session);
  req.logout();
  req.session = null;
  res.redirect('/');
})


module.exports = router;