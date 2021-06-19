require('dotenv').config()
let express = require('express');
let app = express();
let port = 8081;
const session = require('express-session')
const bodyParser = require('body-parser')

app.set('view engine', 'pug');
app.use(express.static("public"));
app.use(session({
    secret:'UmSegredoMalGuardado',
    name:'sessao',
    saveUninitialized: false
}))

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
    if(req.session.loggedIn) {
        res.render('favoritos');
    } else {
        req.session.redirect = '/favoritos'
        res.redirect('/login');
    }
});

app.get('/rota/:id', function(req, res){
    res.render('rota', { id: req.params.id, token: process.env.MAPQUEST_TOKEN });
});

app.get('/preferencias', function(req, res){
    if(req.session.loggedIn) {
        res.render('preferencias');
    } else {
        req.session.redirect = '/preferencias'
        res.redirect('/login');
    }
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', bodyParser.urlencoded(),
    function (req,res,next) {
        if (req.body.email === 'teste@teste.com' && req.body.password === 'teste') {
            if(req.body.lembrarSessao === 'on') req.session.lembrarSessao = true
            next()
        } else res.sendStatus(401)
    },
    function(req,res) {
        req.session.loggedIn = true
        if(req.session.lembrarSessao) {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 // 24 horas
            req.session.cookie.httpOnly = false
        } else {
            //req.session.cookie.maxAge = 1
            req.session.cookie.httpOnly = false
        }
        res.send(req.session.redirect == null ? '/' : req.session.redirect)
    })

app.get('/contacto', function(req, res){
    res.render('contacto');
});

app.get('/logout', function(req,res) {
    req.session.destroy((err)=>{
        res.clearCookie("sessao");
        res.redirect('/');
    })
})

app.get('/criarconta', function(req, res){
    res.render('registar');
});

app.get('/paragem/:id', function(req, res){
    res.render('paragem', { id: req.params.id, token: process.env.MAPQUEST_TOKEN });
});

app.listen(port, () => console.log(`App listening on port ${port}`))
