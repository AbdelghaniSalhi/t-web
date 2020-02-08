//Libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const port = process.env.PORT || 6200;
// Connexion à la base de données Atlas
const connexion = mongoose.connection;

// Connection to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useFindAndModify: false, useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true});

connexion.once('open', () => {
  console.log("Connecté à la base de donnée");
})

// Routes and Backend Funcioncalities
const usersRouter = require('./src/routes/users');
const postRoute = require('./src/routes/routesprivées');
const cryptosRoute = require('./src/routes/cryptoCurrencies');
// App Instance
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postRoute);
app.use('/cryptos', cryptosRoute);

app.get('/', function (req,res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Wallah ça marche<h1>');
 });

 app.listen(port, function(){
   console.log(`Serveur en ecoute : ${port}`);
 });