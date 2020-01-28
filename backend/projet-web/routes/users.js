const router = require('express').Router();
let User = require('../models/user.models');
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err));
});
// Créer un Utilisateur
router.post('/register',async (req,res) => {
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // Verifier que l'email n'existe pas déjà
    const emailExistant = await User.findOne({email : req.body.email});
    if (emailExistant) return res.status(400).send("Email déjà existant");

    // crypter les mdp
     const salt = await bcrypt.genSalt(10);
     const hashMdp = await bcrypt.hash(req.body.password, salt);

    // User a envoyer a la BDD
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password:hashMdp,
        currency: req.body.currency,
        keywords: req.body.keywords,
        cryptoCurrencies: req.body.cryptoCurrencies
    });
    try{
        const savedUser = await user.save();
        res.send( {user : user._id});
    }catch(err) {
        res.status(400).send(err);
    }
});

// Connexion
router.post('/login',async (req,res) => {
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const email = req.body.email;
    const password = req.body.password;

    // Verifier que les champs ne sont pas vides
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    // Verifier que l'email existe
    const emailExistant = await User.findOne({email: req.body.email});
    if (!emailExistant) return res.status(400).send("Email ou Mot de Passe incorrect");

    // Vérifier que le mot de passe est correct
    const mdpValide = await bcrypt.compare(req.body.password, emailExistant.password);
    if (!mdpValide) return res.status(400).send("Email ou Mot de Passe incorrect");

    // création du token
    const token = jwt.sign({_id: emailExistant._id}, {expiresIn: '1h'}, process.env.TOKEN);

    res.header('auth-token', token).send(token);
});

module.exports = router;
