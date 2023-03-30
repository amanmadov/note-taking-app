const Note = require('../models/Note');

exports.getDashboard = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).lean();
        res.render('layouts/dashboard', { user: req.user });
        // res.render('layouts/main', { })
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}