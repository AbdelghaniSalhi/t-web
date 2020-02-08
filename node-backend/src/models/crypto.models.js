const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cryptoCurrencySchema = new Schema({
    symbol : {
        type:String,
        required: true,
        maxlength :3,
        minlength : 3,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const CryptoCurrency = mongoose.model('CryptoCurrency', cryptoCurrencySchema);

module.exports = CryptoCurrency;