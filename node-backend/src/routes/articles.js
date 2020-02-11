/*Routeur gérant la récupération des flux RSS
*/

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifié = require ('./verifierToken');
const axios = require('axios');
var CryptoNewsAPI = require('crypto-news-api');
let CryptoCurrency = require ('../models/crypto.models');

//GET Récupère les articles les plus en vogue concernant les CryptoMonnaies
router.route('/').get((req, res) =>{
    
    axios.get("https://cryptocontrol.io/api/v1/public/news/", {headers :{ "x-api-key": process.env.API_ARTICLES}})
        .then(response => {
            let result = [];
            for (let i=0; i<response.data.length; i++){
                let elem = {
                    id : response.data[i]._id,
                    coins : response.data[i].coins,
                    summary: response.data[i].description,
                    titre: response.data[i].title,
                    url : response.data[i].url,
                    image : response.data[i].thumbnail,
                    source: response.data[i].source,
                    date: response.data[i].publishedAt,
                }
                result.push(elem);
            }
            res.send(result);
        })    
        .catch(err => res.status(400).json('Error : ' + err));
});


/*GET   Récupère les articles les plus en vogue concernant uniquement les 
**      Cryptomonnaies auxquelles l'utilisateur est abonné
*/
router.route('/logged').get(verifié, async(req, res) =>{
    let result = [];
    let elem = {};
    let locale = {};
    let response = {};
    for( let i = 0; i < req.user.user.cryptoCurrencies.length; i++){   
        try {
            locale = await CryptoCurrency.findOne({symbol: req.user.user.cryptoCurrencies[i]});
            let response = await axios.get("https://cryptocontrol.io/api/v1/public/news/coin/"+locale.name.toLowerCase(), {headers :{ "x-api-key": process.env.API_ARTICLES}});
            for (let i=0; i<response.data.length; i++){
                elem = {
                    monnaie:locale.name.toLowerCase(),
                    id : response.data[i]._id,
                    summary: response.data[i].description,
                    titre: response.data[i].title,
                    url : response.data[i].url,
                    image : response.data[i].thumbnail,
                    source: response.data[i].source,
                    date: response.data[i].publishedAt,
                }
                result.push(elem);
            }    
        }catch(err){
            res.send(err);
        }
    }
    res.send(result);
});


module.exports = router; 