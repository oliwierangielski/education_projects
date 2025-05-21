const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')

let data = require('./data/data.json')

app.use(express.static(path.join(__dirname, "..")))
app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "..", "index10.html"))
})

app.get("/api", function(req, res) {
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(data))
})

app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})