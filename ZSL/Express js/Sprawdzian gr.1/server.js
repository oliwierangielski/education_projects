const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const hbs = require('express-handlebars');
const context = require("./data/data.json")
console.log(context)


app.use(express.static('static'))

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs' ,
    extname: '.hbs',
    partialsDir: "views/partials",
    helpers: {         
        starsCreator: function (amount, url) {
            let string = ""
            for (let i = 0; i < parseInt(amount); i++){
                string += "<img src='"+url+"'>"
            }
            return string
        },
        priceToDouble: function (price) {
            return price.toFixed(2)+" $"
        },

    }
}));
app.set('view engine', 'hbs');    

app.get("/", function (req, res) {
    console.log(context["items"])
    let categoryArray = []
    let starsAmountArray = []
    for(let i = 0; i < context["items"].length; i++){
        if(!categoryArray.includes(context["items"][i].category))
            categoryArray.push(context["items"][i].category)
        if(!starsAmountArray.includes(context["items"][i].stars))
        starsAmountArray.push(context["items"][i].stars)
    }
    context.categories = categoryArray
    context.starsAmount = starsAmountArray
    res.render('index1.hbs', context)
})

app.get("/handleForm", function(req, res){
    let radio = req.query.radio
    let select = req.query.chosenCategory

    let products = []
    for(let i = 0; i < context["items"].length; i++){
        let item = context["items"][i]
        if(item.category == select & item.stars == radio){
            products.push({title: item.title, stars: item.stars})
        }
    }
    
    context.products = products
    res.render('index2.hbs', context)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})