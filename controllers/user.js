const Note = require('../models/Note');
const User = require('../models/User');
const moment = require('moment');

const formatDate = date => moment(date).format('LLLL');

exports.getProfile = (req, res) => {
    try {
        let currentUser = res.locals.user;
        pageTitle = `Profile`;
        currentUser.createdDate = formatDate(currentUser.createdAt);
        console.log(currentUser.createdDate)
        res.render('profile', { pageTitle, user: currentUser });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getUserNotes = async (req, res) => {
    try {
        let currentUser = res.locals.user;
        const notes = await Note.find({ user: currentUser }).lean();
        res.render('userNotes', { user: currentUser });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean();
        console.log(users);
        res.render('users', { users,usersActive:true });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}