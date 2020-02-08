const router = require('express').Router();
let CryptoCurrency = require ('../models/crypto.models');
const jwt = require('jsonwebtoken');
const verifié = require ('./verifierToken');
const host = "https://rest.coinapi.io/v1";
const nomics = "https://api.nomics.com/v1";
const axios = require('axios');
var resultat = [];

// Liste des Cryptomonnaies en base
router.route('/liste').get((req, res) =>{
    CryptoCurrency.find()
        .then(cryptos => res.json(cryptos))
        .catch(err => res.status(400).json('Error : ' + err));
});

// Get all CryptoCurrencies
router.route('/').get(async (req, res) =>{
    let requete = [];
    const cursor = CryptoCurrency.find().cursor();
    for (let crypto = await cursor.next(); crypto != null; crypto = await cursor.next()) {
        requete.push(crypto.symbol);
    }
    let resultat = [];
    try {
        for( let i = 0; i < requete.length; i++){   
            let response = await axios.get(host + "/ohlcv/"+ requete[i] + "/EUR/latest?period_id=1MIN&limit=1", {headers : {'X-CoinAPI-Key': process.env.API_KEY}})
            //res.send(nomics + "/currencies/ticker?key="+ process.env.NOMICS_KEY + "&ids=" + requete[i] + "&interval=1h&convert=EUR");
            let response_nomics = await axios.get(nomics + "/currencies/ticker?key="+ process.env.NOMICS_KEY + "&ids=" + requete[i] + "&interval=1h&convert=EUR")
            //.then(response_nomics => console.log(response_nomics));
            let elem =
                {
                    "Cryptommonaie" : response_nomics.data[0].name,
                    "Id": requete[i],
                    "Prix en " : "EUR",
                    "URL" : response_nomics.data[0].logo_url,
                    "Prix": parseFloat(response_nomics.data[0].price),
                    "Prix à l'Ouverture" : response.data[0].price_open,
                    "Prix le plus Haut": response.data[0].price_high,
                    "Prix à la Fermeture": response.data[0].price_close,
                    "Prix le plus bas": response.data[0].price_low,
                };
            resultat.push(elem);
        }
        res.json(resultat);
    } catch(err) {
        res.status(400).send(err);
    }
})

// Get By Id Secure Route
router.route('/symbol/:cryptoId').get(verifié,async (req, res) =>{
    const id = req.params.cryptoId;
    const currency = req.user.user.currency;
    

    try {
        let response_nomics = await axios.get(nomics + "/currencies/ticker?key="+ process.env.NOMICS_KEY + "&ids=" + id + "&interval=1h&convert=EUR")
        let response = await axios.get(host + "/ohlcv/" + id + "/" + currency +"/latest?period_id=1MIN&limit=1", {headers : {'X-CoinAPI-Key': process.env.API_KEY}})
            .then(response => res.json(
            {
                "Cryptommonaie" : response_nomics.data[0].name,
                "Id" : id,
                "URL" : response_nomics.data[0].logo_url,
                "Prix": parseFloat(response_nomics.data[0].price),
                "Prix en " : currency,
                "Date" : response.data[0].time_period_end,
                "Prix à l'Ouverture" : response.data[0].price_open,
                "Prix le plus Haut": response.data[0].price_high,
                "Prix à la Fermeture": response.data[0].price_close,
                "Prix le plus bas": response.data[0].price_low,
            }));
        } catch(err) {
        res.status(400).send(err);
        }
    });

// Get By Id and period Secure Route
router.route('/symbol/:cryptoId/period/:period').get(verifié,async (req, res) =>{
    const id = req.params.cryptoId;
    const currency = req.user.user.currency;
    var period = req.params.period;

    if (period == "Jours" || "Heures" || "Minutes") {
        if (period == "Jours") {
            p = "DAY";
            l = "60";
        }
        if (period ==  "Heures") {
            p = "HRS";
            l = "48";
        }    
        if (period == "Minutes") {
            p = "MIN";
            l = "120";
        } 
        try {
            
            //res.send(host + "/ohlcv/" + id + "/" + currency +"/latest?period_id=1"+ p +"&limit=" + l);
            let response_nomics = await axios.get(nomics + "/currencies/ticker?key="+ process.env.NOMICS_KEY + "&ids=" + id + "&interval=1h&convert=EUR")
            let response = await axios.get(host + "/ohlcv/" + id + "/" + currency +"/latest?period_id=1"+ p +"&limit=" + l, {headers : {'X-CoinAPI-Key': process.env.API_KEY}});
            //res.send(response.data)
            let result = [];
            for( let i = 0; i < response.data.length; i++){   
                let elem =
                    {
                        "Cryptommonaie" : response_nomics.data[0].name,
                        "Id" : id,
                        "URL" : response_nomics.data[0].logo_url,
                        "Prix en " : currency,
                        "Date" : response.data[i].time_period_end,
                        "Prix à l'Ouverture" : response.data[i].price_open,
                        "Prix le plus Haut": response.data[i].price_high,
                        "Prix à la Fermeture": response.data[i].price_close,
                        "Prix le plus bas": response.data[i].price_low,
                        "Nombre de transactions": response.data[i].trades_count
                    };
                result.push(elem);
            }
            res.json(result);
        } catch(err) {
            res.status(400).send(err);
        }
    } else {
        res.send(" Les periodes doivent etre : Jours, Minutes, Heures")
    }
});

// Post Secure route
router.post('/',verifié,async (req,res) => {
    // New CryptoCurrency
    if (req.user.user.role == "Administrateur") {
        const cryptoToPost = new CryptoCurrency({
            name: req.body.name,
            symbol: req.body.symbol,
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
        res.status(401).send("Seul un administrateur peut supprimer une cryptomonnaie");
    }

});




module.exports = router;