const express = require("express")
const app = express()
const PORT = 3000;
const cors = require("cors")

app.use(cors({origin: true}));
app.use(express.json());
let data = require('./data/data.json')

app.get("/", function(req, res) {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(data))
})

app.post("/api", function(req, res) {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*');
    let timer = data[req.body.index]
    timer.isSelected = !req.body.isSelected
    res.json(timer)
})

app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})