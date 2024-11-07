const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")




app.get('/', function(req, res){
    app.use(express.static('static'))
    res.sendFile(path.join(__dirname + "/static/strona_produktów.html"))     
})

app.get('/product/:id', function(req, res){
    let id = req.params.id
    res.send("podstrona z danymi produktu o id = " + id)
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})