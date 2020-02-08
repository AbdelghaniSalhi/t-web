const router = require('express').Router();
let Article = require('../models/article.models');
const jwt = require('jsonwebtoken');
const verifié = require ('./verifierToken');

// Get all Articles
router.route('/').get((req, res) =>{
    Article.find()
        .then(articles => res.json(articles))
        .catch(err => res.status(400).json('Error : ' + err));
});

// Get By Id Secure Route
router.route('/:articleId').get(verifié, (req, res) =>{
    const id = req.params.articleId;

    Article.findById(id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json('Error : ' + err));
});