const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')
const hbs =require('express-handlebars')





app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs'})); // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

/*
app.get("/", function(req, res){
    res.render('view1.hbs'); // nie podajemy ścieżki tylko nazwę pliku
    //res.render('view1.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})
*/

app.get("/login", function(req, res){
    res.render('login.hbs')
})

app.get("/index", function(req, res){
    res.render('index.hbs')
})


app.use(express.static('static'))

app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})