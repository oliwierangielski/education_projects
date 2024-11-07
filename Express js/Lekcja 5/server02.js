const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')
const hbs =require('express-handlebars')
const context = {
    subject: "ćwiczenie 2 - podstawowy context",
    content: "to jest TREŚĆ mojej strony",
    footer: "to jest stopka na mojej stronie"
}





app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs'})); // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');




app.use(express.static('static'))

app.get("/", function(req, res){
    res.render('index02.hbs', context)
})

app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})