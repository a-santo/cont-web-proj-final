require('dotenv').config()
let express = require('express');
let app = express();
let port = 8081;

app.set('view engine', 'pug');
app.use(express.static("public"));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/pesquisa/:tipo', function(req, res){
    res.render('index', { tipo: req.params.tipo });
});

app.get('/autocarro/:id', function(req, res){
    res.render('autocarro', { id: req.params.id, token: process.env.MAPQUEST_TOKEN });
});

app.get('/registo', function(req, res){
    res.render('registo');
});

app.get('/favoritos', function(req, res){
    res.render('favoritos');
});

app.get('/rota/:id', function(req, res){
    res.render('rota', { id: req.params.id, token: process.env.MAPQUEST_TOKEN });
});

app.get('/preferencias', function(req, res){
    res.render('preferencias');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/contacto', function(req, res){
    res.render('contacto');
});


app.listen(port, () => console.log(`App listening on port ${port}`))
