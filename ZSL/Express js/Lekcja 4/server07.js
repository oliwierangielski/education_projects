const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const json = require("./data.json")
app.use(express.static('static'))

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/static/cars.html"))
})

app.use(express.json());

app.get('/all', function(req, res){
    res.setHeader('content-type', 'application/json'); // nagłówek
    res.end(JSON.stringify(json, null, 5));
})

app.get('/first', function(req, res){
    res.setHeader('content-type', 'application/json'); // nagłówek
    res.end(JSON.stringify(json[0], null, 5));
})

app.get('/honda', function(req, res){

    let returnArray = [];
    for(let i = 0; i < json.length; i++){
        if (json[i].car_name == 'Honda')
            returnArray.push(json[i])
    }   
    res.setHeader('content-type', 'application/json'); // nagłówek
    res.end(JSON.stringify(returnArray, null, 5));
})


app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})