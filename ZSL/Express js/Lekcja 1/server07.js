const express = require("express")
const app = express()
const PORT = 3000;

app.get('/', function(req, res){
    res.status(404).send("brak strony takiego produktu")
})

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})