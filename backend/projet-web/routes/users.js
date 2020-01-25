const router = require('express').Router();
const Joi = require('@hapi/joi');
let User = require('../models/user.models');

const validationschema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    keywords: Joi.array().items(Joi.string()).required().min(3),
    cryptoCurrencies: Joi.array().items(Joi.string()).required().min(3),
    currency: Joi.string().required()
});

router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err));
});

router.post('/register',async (req,res) => {
    const validation = validationschema.validate({});
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password:req.body.password,
        currency: req.body.currency,
        keywords: req.body.keywords,
        cryptoCurrencies: req.body.cryptoCurrencies
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;