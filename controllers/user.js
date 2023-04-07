const Note = require('../models/Note');
const User = require('../models/User');
const moment = require('moment');

const formatDate = (date, format) => moment(date).format(format);

exports.getProfile = (req, res) => {
    try {
        let currentUser = res.locals.user;
        pageTitle = `Profile`;
        currentUser.createdDate = formatDate(currentUser.createdAt, 'LLLL');
        //console.log(currentUser.createdDate)
        res.render('profile', { pageTitle, user: currentUser });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getMyNotes = async (req, res) => {
    try {
        let currentUser = res.locals.user;
        const notes = await Note.find({ user: currentUser }).lean();
        res.render('myNotes', { notes });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getUserNotes = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId }).lean();
        const userNotes = await Note.find({ user: userId }).lean();
        userNotes.map(note => { note.createdAt = formatDate(note.createdAt, 'LL') });
        console.log(user);
        res.render('userNotes', { userNotes, user });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean();
        //console.log(users);
        pageTitle = `Enrolled Users`;
        res.render('users', { pageTitle, users, usersActive: true });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.postCreateNote = async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            user: res.locals.user
        });
        await Note.create(note);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}