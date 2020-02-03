const router = require('express').Router();
let CryptoCurrency = require ('../models/crypto.models');
const jwt = require('jsonwebtoken');
const verifié = require ('./verifierToken');
const host = "https://api.nomics.com/v1";
const axios = require('axios');

// Get all CryptoCurrencies
router.route('/').get(async (req, res) =>{
    try {
        let response = await axios.get(host + "/currencies?key=" + process.env.NOMICS_KEY + "&ids=BTC,ETH,XRP&attributes=id,name,logo_url")
            .then(response => console.log(response));
    } catch(err) {
        res.status(400).send(err);
    }
});

// Get By Id Secure Route
router.route('/symbol/:cryptoId').get(verifié,async (req, res) =>{
    const id = req.params.cryptoId;
    try {
        let response = await axios.get(host + "/currencies/ticker?key=" + process.env.NOMICS_KEY + "&ids="+ id +"&interval=1d,30d" + "&convert=EUR")
            .then(response => res.json(response.data));
        } catch(err) {
        res.status(400).send(err);
    }

    });

// Get By Symbol Secure Route
router.route('/:cryptoSymbol').get(verifié, (req, res) =>{
    const symbol = req.params.cryptoSymbol;

    CryptoCurrency.findOne({symbol : symbol})
        .then(crypto => res.json(crypto))
        .catch(err => res.status(400).json('Error : ' + err));
});



// Post Secure route
router.post('/',verifié,async (req,res) => {
    // New CryptoCurrency
    if (req.user.user.role == "Administrateur") {
        const cryptoToPost = new CryptoCurrency({
            name: req.body.name,
            currentPrice: req.body.currentPrice,
            openingPrice: req.body.openingPrice,
            lowestOfTheDay: req.body.lowestOfTheDay,
            highestOfTheDay : req.body.highestOfTheDay,
            url : req.body.url
        });
        try{
            const savedCrypto = await cryptoToPost.save();
            res.send( {savedCrypto});
        }catch(err) {
            res.status(400).send(err);
        }
    } else {
        res.status(401).send("Seul un administrateur peut ajouter une cryptomonnaie");
    }
});
// Delete by id Secure Route
router.route('/:cryptoId').delete(verifié, async (req,res) => {
    if (req.user.user.role == "Administrateur") {
        const id = req.params.cryptoId;
        const deleted = await CryptoCurrency.findByIdAndDelete(id);
        res.send(deleted);

    } else {
        res.status(401).send("Seul un administrateur peut ajouter une cryptomonnaie");
    }

});




module.exports = router;