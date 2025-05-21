const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const hbs = require('express-handlebars');
const context = require("./data/data.json")
//console.log(context)

app.use(express.static('static'))

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: "views/partials",
    helpers: {         
        priceConvert: function (price) {


            return price.toFixed(2)
        }

    }
}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.get("/", function (req, res) { 
    let categories = []
    let firstChars = []

    for (let i in context.root){
        if(!categories.includes(context.root[i].category))
            categories.push(context.root[i].category)

        if(!firstChars.includes(context.root[i].title[0]))
            firstChars.push(context.root[i].title[0])
    }
    
    
    context.categories = categories
    context.firstChars = firstChars
    //console.table(categories)
    res.render('index.hbs', context); 
})

app.get("/handleForm", function(req, res){
    console.log(req.query.checkbox)
    let checkboxs = req.query.checkbox
        if(!Array.isArray(checkboxs))
            checkboxs = [checkboxs]
    let products = []
    for(i in context.root){
        if(context.root[i].category == req.query.category & checkboxs.includes(context.root[i].title[0])){
            products.push({name: context.root[i].title, category: context.root[i].category, price: context.root[i].price})
        }
    }
    context.products = products
    context.letters = req.query.checkbox
    if(!Array.isArray(context.letters))
        context.letters = [context.letters]
    
    //console.table(products)
    res.render("index2.hbs", context)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})