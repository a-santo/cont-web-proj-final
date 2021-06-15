require('dotenv').config()
let express = require('express');
let app = express();
let port = 3000;

app.set('view engine', 'pug');
app.use(express.static("public"));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/autocarro/:id', function(req, res){
    res.render('autocarro', { id: req.params.id, token: process.env.MAPBOX_TOKEN });
});

app.listen(port, () => console.log(`App listening on port ${port}`))
