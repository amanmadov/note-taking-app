const Note = require('../models/Note');
const User = require('../models/User');
const moment = require('moment');

const formatDate = (date, format) => moment(date).format(format);
const daysPassed = (givendate) => moment.duration(givendate.diff(moment().startOf('day'))).asDays();

exports.getProfile = (req, res) => {
    try {
        let currentUser = res.locals.user;
        let pageTitle = `Profile`;
        currentUser.createdDate = formatDate(currentUser.createdAt, 'MMMM Do YYYY');
        currentUser.activeSince = Math.abs(Math.floor(daysPassed(moment(currentUser.createdAt))));
        res.render('profile', { pageTitle, loggedInUser: currentUser });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getMyNotes = async (req, res) => {
    try {
        let currentUser = res.locals.user;
        const notes = await Note.find({ user: currentUser }).lean();
        let pageTitle = `My Notes`;
        let pageText;
        if (notes.length > 0) pageText = `You have created ${notes.length} notes in total...`;
        else pageText = `You have not created any note yet.`;
        res.render('my-notes', { notes, loggedInUser: res.locals.user, pageTitle, pageText });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getUserNotes = async (req, res) => {
    try {
        const userId = req.params.id;
        let userNotes = [];
        let user;
        let isSameUser = false;
        if (userId !== res.locals.user._id.toString()) {
            user = await User.findOne({ _id: userId }).lean();
            userNotes = await Note.find({ user: userId, status: 'public' }).lean().sort({ 'createdAt': -1 }).limit(30);
        } else {
            isSameUser = true;
            user = res.locals.user;
            userNotes = await Note.find({ user: userId }).lean().sort({ 'createdAt': -1 }).limit(30);
        }
        userNotes.map(note => { note.createdAt = formatDate(note.createdAt, 'LL') });
        res.render('user-notes', { userNotes, user, loggedInUser: res.locals.user, isSameUser });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean().sort({ 'createdAt': -1 });
        let pageTitle = `Enrolled Users`;
        res.render('users', { pageTitle, users, loggedInUser: res.locals.user, usersActive: true });
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