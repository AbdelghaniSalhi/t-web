//Libraries
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');


//server configuration
var basePath = '/todo';
var port = 6200;



// Connection to DB
mongoose.connect('mongodb://mongodb')
    .then(() => {
      console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });


// Routes and Backend Funcioncalities
var todoListRoutes = require('./src/routes/todoListRoutes');
var postRoute = require('./src/routes/routesprivées');
var usersRouter = require('./src/routes/users');

// App Instance
var app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(basePath, todoListRoutes);
app.use('/users', usersRouter);
app.use('/posts', postRoute);

app.get('/', function (req,res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Wallah ça marches<h1>');
 });

// Execute App
app.listen(port, () => {
  console.log('TodoList Backend running on Port: ',port);
});