const router = require('express').Router()
const {getPageNotFound} = require('../../controllers/authentication/404');

router.get('/404', getPageNotFound);

module.exports = router;