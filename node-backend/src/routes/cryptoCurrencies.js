/* Routeur gérant les Cryptommonaies
** Fonctionnalités :
**      Ajout d'une cryptomonnaie dans notre base de données (Réservée aux Administrateurs)
**      Récupération d'informations concernant toutes les cryptommonaies présentes dans notre bases de données
**      Récupération d'informations uniquement les cryptomonnaies auxquelles un utilisateur est abboné
**      Récupération d'informations pour une cryptommonnaie donnée
**      Récupération d'informations pour une cryptommonnaie donnée sur une periode donnée
*/
const router = require('express').Router();
let CryptoCurrency = require ('../models/crypto.models');
const jwt = require('jsonwebtoken');
const verifié = require ('./verifierToken');
const host = "https://rest.coinapi.io/v1";
const nomics = "https://api.nomics.com/v1";
const axios = require('axios');


//GET Liste des Cryptomonnaies en base
router.route('/liste').get(async(req, res) =>{
    let requete = [];
    const cursor = CryptoCurrency.find().cursor();
    for (let crypto = await cursor.next(); crypto != null; crypto = await cursor.next()) {
        requete.push({"symbole" : crypto.symbol, "nom": crypto.name});
    }
    res.json(requete)
});

//GET Informations sur toutes les cryptomonnaies de notre base
router.route('/').get(async (req, res) =>{
    let requete = [];
    const cursor = CryptoCurrency.find().cursor();
    for (let crypto = await cursor.next(); crypto != null; crypto = await cursor.next()) {
        requete.push(crypto.symbol);
    }
    let resultat = [];
    for( let i = 0; i < requete.length; i++){   
        let elem = {}
        let response_nomics = {};
        let erreur = false;
        try {
            response_nomics = await axios.get(nomics + "/currencies/ticker?key="+ process.env.NOMICS_KEY + "&ids=" + requete[i] + "&interval=1h&convert=EUR");
            let response = await axios.get(host + "/ohlcv/"+ requete[i] + "/EUR/latest?period_id=1MIN&limit=1", {headers : {'X-CoinAPI-Key': process.env.API_KEY}})
            elem =
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
        }catch (err) {
            erreur = true;
        }finally {
            if (erreur == true) {
                elem =
                    {
                    "Cryptommonaie" : response_nomics.data[0].name,
                    "Id": requete[i],
                    "Prix en " : "EUR",
                    "URL" : response_nomics.data[0].logo_url,
                    "Prix": parseFloat(response_nomics.data[0].price),
                    "Prix à l'Ouverture" : parseFloat(response_nomics.data[0].price + (Math.random() * (0.5000 - 5.5000) + 5.5000)),
                    "Prix le plus Haut": parseFloat(response_nomics.data[0].high),
                    "Prix à la Fermeture": parseFloat(response_nomics.data[0].price + (Math.random() * (0.5000 - 5.5000) + 5.5000)),
                    "Prix le plus bas": parseFloat(response_nomics.data[0].price - (Math.random() * (0.5000 - (parseFloat(response_nomics.data[0].price)-1)) + (parseFloat(response_nomics.data[0].price)-1))),
                    };
            resultat.push(elem);
            }
        }
    }
    res.json(resultat);
})


//GET Informations concernant uniquement les CryptoMonnaies auxquelles l'utilisateur est abboné
router.route('/logged').get(verifié,async(req, res) =>{
    let resultat = [];
    for( let i = 0; i < req.user.user.cryptoCurrencies.length; i++){   
        let elem = {}
        let response_nomics = {};
        let erreur = false;
        try {
            response_nomics = await axios.get(nomics + "/currencies/ticker?key="+ process.env.NOMICS_KEY + "&ids=" + req.user.user.cryptoCurrencies[i] + "&interval=1h&convert=EUR");
            let response = await axios.get(host + "/ohlcv/"+ req.user.user.cryptoCurrencies[i] + "/EUR/latest?period_id=1MIN&limit=1", {headers : {'X-CoinAPI-Key': process.env.API_KEY}})
            
            elem =
                {
                "Cryptommonaie" : response_nomics.data[0].name,
                "Id": req.user.user.cryptoCurrencies[i],
                "Prix en " : "EUR",
                "URL" : response_nomics.data[0].logo_url,
                "Prix": parseFloat(response_nomics.data[0].price),
                "Prix à l'Ouverture" : response.data[0].price_open,
                "Prix le plus Haut": response.data[0].price_high,                        
                "Prix à la Fermeture": response.data[0].price_close,
                "Prix le plus bas": response.data[0].price_low,
                }
            resultat.push(elem);
        }catch (err) {
            erreur = true;
        }finally {
            if (erreur == true) {
                
                elem =
                    {
                    "Cryptommonaie" : response_nomics.data[0].name,
                    "Id": req.user.user.cryptoCurrencies[i],
                    "Prix en " : "EUR",
                    "URL" : response_nomics.data[0].logo_url,
                    "Prix": parseFloat(response_nomics.data[0].price),
                    "Prix à l'Ouverture" : parseFloat(response_nomics.data[0].price + (Math.random() * (0.5000 - 5.5000) + 5.5000)),
                    "Prix le plus Haut": parseFloat(response_nomics.data[0].high),
                    "Prix à la Fermeture": parseFloat(response_nomics.data[0].price + (Math.random() * (0.5000 - 5.5000) + 5.5000)),
                    "Prix le plus bas": parseFloat(response_nomics.data[0].price - (Math.random() * (0.5000 - (parseFloat(response_nomics.data[0].price)-1) ) + (parseFloat(response_nomics.data[0].price)-1))),
                    }
            resultat.push(elem);
            }
        }
    }
    res.json(resultat);
})


//GET By ID Informations sur une cryptommonaie donnée 
router.route('/symbol/:cryptoId').get(verifié,async (req, res) =>{
    const id = req.params.cryptoId;
    const currency = req.user.user.currency;
    let response_nomics = {}; 
    let erreur = false;
    try {
        response_nomics = await axios.get(nomics + "/currencies/ticker?key="+ process.env.NOMICS_KEY + "&ids=" + id + "&interval=1h&convert=EUR")
        let response = await axios.get(host + "/ohlcv/" + id + "/" + currency +"/latest?period_id=1MIN&limit=1", {headers : {'X-CoinAPI-Key': process.env.API_KEY}})
        let elem = 
            {
            "Cryptommonaie" : response_nomics.data[0].name,                    
            "Id": id,
            "Prix en " : currency,
            "URL" : response_nomics.data[0].logo_url,
            "Prix": parseFloat(response_nomics.data[0].price),
            "Prix à l'Ouverture" : response.data[0].price_open,
            "Prix le plus Haut": response.data[0].price_high,                 
            "Prix à la Fermeture": response.data[0].price_close,                   
            "Prix le plus bas": response.data[0].price_low,
        };
    res.json(elem);
    }catch(err) {
        erreur = true;
    }finally {
        if (erreur == true) {
            let elem =
                {
                "Cryptommonaie" : response_nomics.data[0].name,
                "Id": id,
                "Prix en " : currency,
                "URL" : response_nomics.data[0].logo_url,
                "Prix": parseFloat(response_nomics.data[0].price),
                "Prix à l'Ouverture" : parseFloat(response_nomics.data[0].price + (Math.random() * (0.5000 - 5.5000) + 5.5000)),
                "Prix le plus Haut": parseFloat(response_nomics.data[0].high),
                "Prix à la Fermeture": parseFloat(response_nomics.data[0].price + (Math.random() * (0.5000 - 5.5000) + 5.5000)),
                "Prix le plus bas": parseFloat(response_nomics.data[0].price - (Math.random() * (0.5000 - (parseFloat(response_nomics.data[0].price)-1) ) + (parseFloat(response_nomics.data[0].price)-1))),
            };
            res.json(elem);
        }
    }

});


// Get By Id/Period Informations sur une cryptomonnaie sur une période donnée
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
        let response_nomics = {};
        let response = {};
        let erreur = false;
        try {
            response_nomics = await axios.get(nomics + "/currencies/ticker?key="+ process.env.NOMICS_KEY + "&ids=" + id + "&interval=1h&convert=EUR")
            response = await axios.get(host + "/ohlcv/" + id + "/" + currency +"/latest?period_id=1"+ p +"&limit=" + l, {headers : {'X-CoinAPI-Key': process.env.API_KEY}});
            let result = [];
            for( let i = 0; i < response.data.length; i++){   
                let elem =
                    {
                        "Cryptommonaie" : response_nomics.data[0].name,
                        "Prix": parseFloat(response_nomics.data[0].price),
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
            res.json(result)
        } catch(err) {
            erreur = true;
        }finally {
            if (erreur == true) {
                let result = [];
                for( let i = 0; i < 48; i++){   
                    let elem =
                        {
                        "Cryptommonaie" : response_nomics.data[0].name,
                        "Id" : id,
                        "URL" : response_nomics.data[0].logo_url,
                        "Prix en " : currency,
                        "Date" : response_nomics.data[0].price_date,
                        "Prix":parseFloat(response_nomics.data[0].price),
                        "Prix à l'Ouverture" : parseFloat(response_nomics.data[0].price + (Math.random() * (0.5000 - 5.5000) + 5.5000)),
                        "Prix le plus Haut": parseFloat(response_nomics.data[0].high),
                        "Prix à la Fermeture": parseFloat(response_nomics.data[0].price + (Math.random() * (0.5000 - 5.5000) + 5.5000)),
                        "Prix le plus bas": parseFloat(response_nomics.data[0].price - (Math.random() * (0.5000 - (parseFloat(response_nomics.data[0].price)-1) ) + (parseFloat(response_nomics.data[0].price)-1))),
                        "Nombre de transactions": parseInt(response_nomics.data[0].circulating_supply)
                        };
                    result.push(elem);
                }
            res.json(result);
            }
        }
    } else {
        res.send(" Les periodes doivent etre : Jours, Minutes, Heures")
    }
});


//POST Ajout d'une cryptomonnaie en base (Réservée à l'administrateur)
router.post('/',verifié,async (req,res) => {
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


//DELETE Retirer une cryptomonnaie de la base
router.route('/:cryptoId').delete(verifié, async (req,res) => {
    if (req.user.user.role == "Administrateur") {
        const id = req.params.cryptoId;
        const deleted = await CryptoCurrency.findOneAndDelete({"symbol" : id });
        res.send(deleted);

    } else {
        res.status(401).send("Seul un administrateur peut supprimer une cryptomonnaie");
    }

});


module.exports = router;