const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const hbs = require('express-handlebars')
const Datastore = require('nedb')
const db = new Datastore({
    filename: 'samochody.db',
    autoload: true
});
let lastId



app.use(express.static('static'))

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ 
    defaultLayout: 'main.hbs' ,
    extname: '.hbs',
    partialsDir: "views/partials",
}));
app.set('view engine', 'hbs');  


app.get("/", function (req, res) {
    // Pobranie wszystkich rekordów z bazy danych
    let promise = new Promise(function (resolve, reject) {
        db.find({}, function(err, docs){
            if(err) reject(err);
            docs.sort((a,b)=>(a.number > b.number) ? 1 : -1)
            resolve(docs)
        })
    })
    
    promise.then(
        function(docs){lastId = ((docs.length != 0) ? docs[docs.length-1].number : 0); res.render('view3.hbs', docs)},
        function(err){console.log(err)}
    )
        
})

app.get("/handle02", function(req, res){

    // Wykonanie sprawdzenia czy opcja została zaznaczona
    let record = req.query
    for (let property in record){
        if(Array.isArray(record[property]))
            record[property] = record[property][1]
    }
    // console.log(record)

    // Funkcja dodająca pole number
    record.number = ++lastId
    // Funkcja dodająca rekord do bazy danych
    db.insert(record, function(err, newDoc){
        if(!err){                  
            console.log("Pomyślnie dodano nowy rekord")
            res.redirect("/")
        }
    });
})

app.get("/delete", function(req, res){
    console.log(req.query.id)
    db.remove({_id: req.query.id}, function(err){
        if(!err){
            console.log("Usunięto rekord o id: " + req.query.id)
            res.redirect("/")
        }
    })
})

app.get("/update", function(req, res){
    console.table(req.query)
    let obj = {
        insurance: req.query.insurance,
        gasoline: req.query.gasoline,
        damaged: req.query.damaged,
        drive: req.query.drive
    }
    db.update({_id: req.query.id},{$set: obj},{}, function(err){
        if(!err){
            console.log("Zaktualizowano reokord o id: " + req.query.id)
            res.redirect("/")
        }
    })
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})