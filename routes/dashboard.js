const router = require('express').Router();
const { getDashboard } = require('../controllers/dashboard');
const { ensureAuth } = require('../middleware/authorize');

// @desc    Dashboard
// @route   GET /dashboard
// router.get('/dashboard', ensureAuth, getDashboard);
router.get('/dashboard', getDashboard);

module.exports = router;