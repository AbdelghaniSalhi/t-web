const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true
    },
    currency: {
        type: String
    },
    role: {
        type: String,
    },
    cryptoCurrencies: {
        type: Array,
        of: String,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;