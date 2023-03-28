const router = require('express').Router()
const { getLogin } = require('../../controllers/authentication/login');

router.get('/login', getLogin);

module.exports = router;