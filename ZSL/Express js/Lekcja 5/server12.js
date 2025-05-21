const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')
const hbs =require('express-handlebars')
const context = require("./data/data12.json")






app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs' ,
    extname: '.hbs',
    partialsDir: "views/partials",
}));
app.set('view engine', 'hbs');




app.use(express.static('static'))

app.get("/", function(req, res){
    res.render('index12.hbs', context)
})



app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})