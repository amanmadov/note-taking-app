const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	googleId: {
		type: String,
	},
	displayName: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', UserSchema);
