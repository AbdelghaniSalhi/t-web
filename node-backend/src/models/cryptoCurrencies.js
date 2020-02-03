const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cyptoCurrencySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    currentPrice: {
        type: Number,
        required: true,
        lowercase: true,
    },

    openingPrice: {
        type: Number,
        required: true
    },

    lowestOfTheDay: {
        type: Number,
        required: true,

    },

    highestOfTheDay: {
        type: Number,
        required: true,

    },
    url: {
        type: String
    }
}, {
    timestamps: true,
});

const CryptoCurrency = mongoose.model('CryptoCurrency', cryptoCurrencySchema);

module.exports = CryptoCurrency;