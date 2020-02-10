const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifié = require ('./verifierToken');
const axios = require('axios');
var CryptoNewsAPI = require('crypto-news-api');
let CryptoCurrency = require ('../models/crypto.models');

// Get all Articles
router.route('/').get((req, res) =>{
    
    axios.get("https://cryptocontrol.io/api/v1/public/news/", {headers :{ "x-api-key": process.env.API_ARTICLES}})
        .then(response => {
            let result = [];
            console.log(response.data)
            let mots = []
            for (let i=0; i<response.data.length; i++){
                let elem = {
                    id : response.data[i]._id,
                    coins : response.data[i].coins,
                    summary: response.data[i].description,
                    url : response.data[i].url,
                    image : response.data[i].thumbnail,
                    source: response.data[i].source,
                }
                result.push(elem);
            }
            res.send(result);
        })    
        .catch(err => res.status(400).json('Error : ' + err));
});



module.exports = router; 