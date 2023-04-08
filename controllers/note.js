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
        pageTitle = `Random Notes`;
        pageText = `Here are some random notes...`;
        res.render('random', { randomNotes, pageTitle, pageText, randomActive: true, addMasonryScript: true });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getNoteDetails = async (req, res) => {
    try {
        let noteId = req.params.id;
        const note = await Note.findOne({ _id: noteId }).lean().populate('user', 'displayName');
        pageTitle = `${note.title}`;
        pageText = `Author: ${note.user.displayName}`;
        res.render('note-detail', { note, pageTitle, pageText });
    } catch (err) {
        console.error(err);
        res.render('layouts/authentication/404', { docTitle: 'Error Page' });
    }
}

exports.getNoteEditForm = async (req, res) => {
    try {
        let noteId = req.params.id;
        const note = await Note.findOne({ _id: noteId }).lean().populate('user', 'displayName');
        pageTitle = `Edit Note`;
        pageText = `Use form below to edit the content of your note...`;
        res.render('note-edit-form', { note, pageTitle, pageText });
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