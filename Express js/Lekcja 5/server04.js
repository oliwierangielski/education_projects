const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')
const hbs =require('express-handlebars')
const context = {
        subject: "ćwiczenie 4 - dane z tablicy, select", 
        fields:[
            {name:"title"},
            {name:"author"},
            {name:"lang"}
        ], 
        count: 3,
        books: [
            { title: "Lalka", author: "B Prus", lang: "PL" },
            { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
            { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
            { title: "Zamek", author: "F Kafka", lang: "CZ" }
       ]  
     }





app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs'})); // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');




app.use(express.static('static'))

app.get("/", function(req, res){
    res.render('index04.hbs', context)
})

app.get("/handle04", function(req, res){
    let selected = req.query.select
    if (selected!= undefined){
        let selectedInfo =[]
        context.books.forEach(function(item){  
        selectedInfo.push({"value": item[selected]})
        })
        res.render('index04.hbs',   {subject: "ćwiczenie 4 - dane z tablicy, select", selectedInfo: selectedInfo})
    } else {
        res.render('index04.hbs',   {subject: "ćwiczenie 4 - dane z tablicy, select", noOptionTitle: true})
    }
    
})



app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})