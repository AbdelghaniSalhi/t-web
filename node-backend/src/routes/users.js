const router = require('express').Router();
let User = require('../models/user.models');
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifié = require ('./verifierToken');

router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err));
});
//récuperer le profil d'un utilisateur

router.route('/profile').get(verifié ,(req,res) => {
    res.send(req.user);

});
 
//Modifier le profil
router.route('/profile').put(verifié, async (req,res) => {
    try{
        let utilisateur = await User.findById(req.user.user._id);

        let newUser = {
            username : req.body.username ? req.body.username : utilisateur.username,
            email : req.body.email ? req.body.email : utilisateur.email,
            password : req.body.password ? req.body.password : utilisateur.password,
            currency : req.body.currency ? req.body.currency : utilisateur.currency,
            keywords : req.body.keywords ? req.body.keywords : utilisateur.keywords,
            cryptoCurrencies : req.body.cryptoCurrencies ? req.body.cryptoCurrencies : utilisateur.cryptoCurrencies,
            role: utilisateur.role,
        };

        
        let salt = await bcrypt.genSalt(10);
        let hashMdp = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashMdp;
        

        let savedUser = await User.findByIdAndUpdate({_id: req.user.user._id}, newUser);
        res.json(savedUser);

    }catch(err) {
        res.status(400).send(err);
    }
})

module.exports = router;


// Créer un Utilisateur
router.post('/register',async (req,res) => {
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // Verifier que l'email n'existe pas déjà
    const user = await User.findOne({email : req.body.email});
    if (user) return res.status(400).send("Email déjà existant");

    // crypter les mdp
    const salt = await bcrypt.genSalt(10);
    const hashMdp = await bcrypt.hash(req.body.password, salt);
    
    const mail = req.body.email;
    var role = "Utilisateur";
    if (mail.includes("epitech.eu")) role = "Administrateur";
    // User a envoyer a la BDD
    
    const userToPost = new User({
        username: req.body.username,
        email: req.body.email,
        password:hashMdp,
        currency: req.body.currency,
        keywords: req.body.keywords,
        cryptoCurrencies: req.body.cryptoCurrencies,
        role : role
    });
    try{
        const savedUser = await userToPost.save();
        res.send(savedUser);
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
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email ou Mot de Passe incorrect");

    // Vérifier que le mot de passe est correct
    const mdpValide = await bcrypt.compare(req.body.password, user.password);
    if (!mdpValide) return res.status(400).send("Email ou Mot de Passe incorrect");

    // création du token
    const token = jwt.sign({ user }, process.env.TOKEN, { expiresIn: '1h' });

    res.header('auth-token', token).send(user);
});

module.exports = router;
