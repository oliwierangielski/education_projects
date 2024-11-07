const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
app.use(express.static('static'))

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/static/client05.html"))
})

app.use(express.json());

app.post('/handleUpload', function (req, res){
    res.setHeader('content-type', 'application/json'); // nagłówek
    res.end(JSON.stringify(req.body)); // odsyłamy dane do klienta w postaci stringa w formacie jsona

})

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})