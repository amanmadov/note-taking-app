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
            _id: 0,
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