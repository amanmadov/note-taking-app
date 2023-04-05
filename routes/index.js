const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authorize');
const Story = require('../models/Story');

router.get('/', ensureGuest, (req, res) => {
    res.render('layouts/authentication/login', { layout: false, docTitle: 'Login Page' });
});

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).lean();
        res.render('dashboard', { name: req.user.firstName, notes });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { layout: false, docTitle: 'Error Page' });
    }
});

module.exports = router;
