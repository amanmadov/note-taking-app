const Note = require('../models/Note');
const User = require('../models/User');
const moment = require('moment');

const queryRandomNote = async (noteCount) => {
    const notes = await Note.aggregate([{ $sample: { size: noteCount } },
    {
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
        },
    },
    { $unwind: '$user' },
    {
        $project: {
            _id: 1,
            title: 1,
            body: 1,
            status: 1,
            createdAt: 1,
            'user.firstName': 1,
        },
    },
    ]);
    return notes;
}

exports.getRandomNotes = async (req, res) => {
    try {
        const randomNotes = await queryRandomNote(8);
        let pageTitle = `Random Notes`;
        let pageText = `Here are some random notes...`;
        res.render('random', { randomNotes, pageTitle, pageText, randomActive: true, addMasonryScript: true, loggedInUser: res.locals.user });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getNoteDetails = async (req, res) => {
    try {
        let noteId = req.params.id;
        const note = await Note.findOne({ _id: noteId }).lean().populate('user', 'displayName firstName');
        let pageTitle = `${note.title}`;
        let pageText = `Author: ${note.user.displayName}`;
        res.render('note-detail', { note, loggedInUser: res.locals.user });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getNoteEditForm = async (req, res) => {
    try {
        let noteId = req.params.id;
        const note = await Note.findOne({ _id: noteId }).lean().populate('user', 'displayName');
        let pageTitle = `Edit Note`;
        let pageText = `Use form below to edit the content of your note...`;
        res.render('note-edit-form', { note, pageTitle, pageText, loggedInUser: res.locals.user });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.postNoteEditForm = async (req, res) => {
    try {
        let noteId = req.body.id;
        const note = await Note.findById(noteId);
        note.title = req.body.title;
        note.body = req.body.body;
        note.status = req.body.status;
        await note.save();
        res.redirect('/user/notes');
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.postDeleteNote = async (req, res) => {
    try {
        let noteId = req.body.id;
        //TODO: check if author
        await Note.findByIdAndDelete(noteId);
        //console.log(`Note with id ${noteId} has been deleted...`);
        res.redirect('/user/notes');
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}