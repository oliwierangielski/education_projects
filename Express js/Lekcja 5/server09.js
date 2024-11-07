const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')
const hbs =require('express-handlebars')
const context = require("./data/data09.json")






app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs' ,
    helpers: {         
        shortTitle: function (title) {
            return title.substring(0,10) +"...";
        },
        upperCase: function (title) {
            return title.toUpperCase()
        },
        dashes: function (title) {
            let newTitle = ""
            for(let i=0; i< title.length; i++){
                newTitle += title[i]
                if(title[i] != " " & title[i+1] != " " & i != title.length-1){
                    newTitle+="-"
                }
            }
            return newTitle
        },
        ifEq: function(val1, val2, options){
            return (val1 == val2) ? options.fn(this) : options.inverse(this);
        }

    }
}));
app.set('view engine', 'hbs');




app.use(express.static('static'))

app.get("/", function(req, res){
    res.render('index09.hbs', context)
})

app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})