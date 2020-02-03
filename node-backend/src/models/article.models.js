const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    articleUrl: {
        type: String,
        required : true,
    },
    imageUrl: {
        type: String,
        required : true
    }
}, {
    timestamps: true,
});

const Article = mongoose.model('Article', article);

module.exports = Article;