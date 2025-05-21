const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")



app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/static/client03.html"))
})


app.use(express.json());


app.post("/post", function(req, res){
    res.send(req.body)
})

app.use(express.static('static'))

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})