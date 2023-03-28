const router = require('express').Router()
const { getSignup } = require('../../controllers/authentication/signup');

router.get('/signup', getSignup);

module.exports = router;