const Note = require('../models/Note');

exports.getDashboard = async (req, res) => {
    try {
        let currentUser = res.locals.user;
        //console.log(currentUser.displayName);
        const publicNotes = await Note.find({ status: 'public' }).lean().populate('user');
        pageTitle = `Welcome ${currentUser.displayName}`;
        pageText = 'Start typing your notes....';
        res.render('dashboard', { pageTitle, pageText, publicNotes, user: currentUser, homeActive: true });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}