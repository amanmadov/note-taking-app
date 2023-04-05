const Note = require('../models/Note');

exports.getDashboard = async (req, res) => {
    try {
        let currentUser = res.locals.user;
        //console.log(currentUser.displayName);
        const notes = await Note.find({ user: currentUser }).lean();
        //console.log(`Notes for user: `, notes)
        res.render('layouts/dashboard', { user: currentUser });
        // res.render('layouts/main', { })
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}