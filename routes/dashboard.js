const router = require('express').Router();
const { getDashboard } = require('../controllers/dashboard');
const { ensureAuth } = require('../middleware/authorize');

router.get('/dashboard', ensureAuth, getDashboard);
//router.get('/dashboard', getDashboard);

module.exports = router;