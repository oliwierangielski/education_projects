const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/static/client01.html"))
})

app.use(express.urlencoded({
    extended: true
}))


app.post("/handlePost", function(req, res){
    console.log(req.body)
    res.setHeader("content-type", "application/json")
    res.send(req.body)
})




app.use(express.static('static'))

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})