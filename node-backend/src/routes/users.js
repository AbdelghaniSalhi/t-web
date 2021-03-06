
/*Routeur gérant les utilisateurs 
**  Fonctionnalités: Ajout, Modification de comptes utilisateurs,
**                   Login avec Token JWT
**                   Relogin de l'utilisateur courant lors de la mise a jour de ses informations
**                   Gestion de l'authentification Google
*/
const router = require('express').Router();
let User = require('../models/user.models');
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifié = require ('./verifierToken');
let CryptoCurrency = require ('../models/crypto.models');

// GET retourne tous les utilisateurs en base
router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err));
});

// GET avec Token, récupere le profil d'un utilisateur connecté
router.route('/profile').get(verifié ,(req,res) => {
    res.send(req.user);

});
 
//PUT modifie le profil de l'utilisateur connecté
router.route('/profile').put(verifié, async (req,res) => {
    try{
        let utilisateur = await User.findById(req.user.user._id);
        if (req.body.password){
            let salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        
        let newUser = {
            username : req.body.username ? req.body.username : utilisateur.username,
            email : req.body.email ? req.body.email : utilisateur.email,
            password : req.body.password ? req.body.password : utilisateur.password,
            currency : req.body.currency ? req.body.currency : utilisateur.currency,
            cryptoCurrencies : req.body.cryptoCurrencies ? req.body.cryptoCurrencies : utilisateur.cryptoCurrencies,
            role: utilisateur.role,
        };
            
        let savedUser = await User.findByIdAndUpdate({_id: req.user.user._id}, newUser);
        res.json(savedUser);

    }catch(err) {
        res.status(400).send(err);
    }
})


// POST Crée un nouvel utilisateur
router.post('/register',async (req,res) => {
    // Validation du formulaire d'insctiption
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // Verifier que l'email n'existe pas déjà
    const user = await User.findOne({email : req.body.email});
    if (user) return res.status(400).send("Email déjà existant");

    // Encryption des mots de passe
    const salt = await bcrypt.genSalt(10);
    const hashMdp = await bcrypt.hash(req.body.password, salt);
    
    const mail = req.body.email;
    var role = "Utilisateur";
    let userToPost = {};
    if (mail.localeCompare("lycia.messaoui@epitech.eu") || mail.localeCompare("abdelghani.salhi@epitech.eu") || mail.localeCompare("said.mammar@epitech.eu") || mail.localeCompare("sara.bourahla@epitech.eu") || mail.compare("fateh.oummitouche@epitech.eu")) {
        role = "Administrateur";   
        let requete = [];
        const cursor = CryptoCurrency.find().cursor();
        for (let crypto = await cursor.next(); crypto != null; crypto = await cursor.next()) {
            requete.push(crypto.symbol);
        }
        userToPost = new User({
            username: req.body.username,
            email: req.body.email,
            password:hashMdp,
            currency: req.body.currency,
            cryptoCurrencies: requete,
            role : role
            });
    } else {
        userToPost = new User({
            username: req.body.username,
            email: req.body.email,
            password:hashMdp,
            currency: req.body.currency,
            cryptoCurrencies: [],
            role : role
        });
    }
    
    try{
        const savedUser = await userToPost.save();
        res.send(savedUser);
    }catch(err) {
        res.status(400).send(err);
    }
});


//POST connexion utilisateur, retourne un Token JWT
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

    res.json({"token":token, "role": user.role});
});

//POST reconnexion de l'utilisateur courant après une modification, retourne un Token JWT
router.post('/relogin',async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Verifier que l'email existe
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email ou Mot de Passe incorrect");

    // Vérifier que le mot de passe est correct
    const mdpValide = (req.body.password === user.password);
    if (!mdpValide) return res.status(400).send("Email ou Mot de Passe incorrect");

    // création du token
    const token = jwt.sign({ user }, process.env.TOKEN, { expiresIn: '1h' });

    res.json({"token":token, "role": user.role});
});

/*Authentification Google, gère les deux cas de figure possibles
**  Utilisateur existant, le connecte et retourne un Token JWT
**  Utilisateur non existant, lui crée un compte dans notre Base de Données
*/
router.post('/authGoogle',async (req,res) => {
    const mail = req.body.email;
    const name = req.body.username
    const user = await User.findOne({email: mail});
    
    if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashMdp = await bcrypt.hash("12345", salt);
        var role = "Utilisateur";
        
        let userToPost = new User({
            username: name,
            email: mail,
            password:hashMdp,
            currency: "EUR",
            cryptoCurrencies: [],
            role : role
        });
        try{
            savedUser = await userToPost.save()
            const user = await User.findOne({email: mail});
            const token = jwt.sign({ user }, process.env.TOKEN, { expiresIn: '1h' });
            res.json({"token":token, "role": user.role});
        }catch(err) {
            res.status(400).send(err);
        }
    }else {
        const user = await User.findOne({email: mail});
        const token = jwt.sign({ user }, process.env.TOKEN, { expiresIn: '1h' });
        res.json({"token":token, "role": user.role});
    }

});
module.exports = router;
