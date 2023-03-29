const Note = require('../models/Note');

exports.getDashboard = async (req, res) => {
    try {
        console.log('Getting dashboard..');
        const notes = await Note.find({ user: req.user.id }).lean();
        console.log(notes.length)
        //res.render('dashboard', { name: req.user.firstName, notes });
        res.render('layouts/main', { })
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}