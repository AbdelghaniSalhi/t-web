 const express = require('express');
 const cors = require('cors');
 const mongoose = require('mongoose');
 const server = express();
 const port = process.env.PORT || 5000;
 const dotenv = require('dotenv');
 const usersRouter = require('./routes/users');

 const connexion = mongoose.connection;
 const postRoute = require('./routes/routesprivées');

 dotenv.config();

 server.use(cors());
 server.use(express.json());

 const uri = process.env.ATLAS_URI;
 mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});


 connexion.once('open',() => {
     console.log("Base de donnée connéctée");
 })



 server.use('/users', usersRouter);
 server.use('/posts', postRoute);

 server.get('/', function (req,res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Wallah ça marches<h1>');
 });

 server.listen(port, function() {
     console.log(`Server en ecoute : ${port}`);
 });
