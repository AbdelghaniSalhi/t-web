/* Module de vérification du token de connexion JWT
*/

const jwt = require('jsonwebtoken');

module.exports =  function authentifier (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Accès refusé');

    try {
        const verifié = jwt.verify(token, process.env.TOKEN);
        req.user = verifié;
        next();
    }catch(err) {
        res.status(400).send('Token invalide');
    }

}

