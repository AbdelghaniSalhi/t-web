server.get('/', function (req,res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Wallah ça marches<h1>');
    });
    
    server.listen(port, function() {
    console.log(`Server en ecoute : ${port}`);
    });