const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')
const hbs =require('express-handlebars')
const context = {
        subject: "ćwiczenie 5 - dane z tablicy, radios", 
        fields:[
            {name:"title"},
            {name:"author"},
            {name:"lang"}
        ], 
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
    res.render('index05.hbs', context)
})

app.get("/handle05", function(req, res){
    let selected = req.query.radio
    if (selected!= undefined){
        let selectedInfo =[]
        context.books.forEach(function(item){  
        selectedInfo.push({"value": item[selected]})
        })
        res.render('index05.hbs',   {subject: "ćwiczenie 5 - dane z tablicy, radios", selectedInfo: selectedInfo})
    } else {
        res.render('index05.hbs',   {subject: "ćwiczenie 5 - dane z tablicy, radios", noOptionTitle: true})
    }
    
})



app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})