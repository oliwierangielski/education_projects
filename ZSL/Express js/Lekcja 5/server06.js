const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')
const hbs =require('express-handlebars')
const context = {
        subject: "ćwiczenie 6 - dane z tablicy, checkboxes", 
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
    res.render('index06.hbs', context)
})

app.get("/handle06", function(req, res){

    let selected = req.query.chekbox
    let selectedInfo = []
    if (selected!= undefined){
        context.books.forEach(function(oldBook){
            let book = {}
            if(!Array.isArray(selected)){
                selected = [selected]
            }
            selected.forEach(function(selection){
                let semicolon = ""
                if(selection == "title"){
                    book.title = oldBook.title
                }
                if(selection == "author"){
                    if(book.title)
                        semicolon = ", "
                    book.author = semicolon + oldBook.author
                    semicolon = ""
                }
                if(selection == "lang"){
                    if(book.author)
                        semicolon = ", "
                    book.lang = semicolon + oldBook.lang
                    semicolon = ""
                }
            })
            selectedInfo.push(book)
        })
        
        


        
        
        res.render('index06.hbs',   {subject: "ćwiczenie 6 - dane z tablicy, checkboxes", selectedInfo: selectedInfo})
    } else {
        res.render('index06.hbs',   {subject: "ćwiczenie 6 - dane z tablicy, checkboxes", noOptionTitle: true})
    }
    
})



app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})