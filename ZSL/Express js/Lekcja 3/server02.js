const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")



app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/static/client02.html"))
})


app.use(express.urlencoded({
    extended: true
}))


app.post("/handlePost", function(req, res){
    res.setHeader("Content-Type", "application/json")
    let value1 = parseFloat(req.body.text1)
    let value2 = parseFloat(req.body.text2)
    let button1 = req.body.bt1
    res.send("odsyłam do przeglądarki dane:" + JSON.stringify({txt1: value1, txt2: value2, bt1: button1, suma: (value1+value2), iloczyn: (value1*value2)}, null, 5))
})

app.use(express.static('static'))

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})