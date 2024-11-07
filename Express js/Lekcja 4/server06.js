const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const json = require("./data.json")
app.use(express.static('static'))

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/static/client06.html"))
})

app.use(express.json());

app.get('/api', function(req, res){
    res.setHeader('content-type', 'application/json'); // nagłówek
    res.end(JSON.stringify(json));
    //lub res.json(json)
})


app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})