const router = require('express').Router();
const verifié = require ('./verifierToken');

router.route('/profile').get(verifié ,(req,res) => {
    res.send(req.user);

});

module.exports = router;