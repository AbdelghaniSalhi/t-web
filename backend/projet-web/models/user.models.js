const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true
    },

    keywords: {
        type: Array,
        of: String,
        minlength: 3,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    cryptoCurrencies: {
        type: Array,
        of: String,
        minlength: 3,
        required: true
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;