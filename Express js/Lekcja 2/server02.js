const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

app.use(express.static('static'))

app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname + "/static/formularz.html"))
})

app.get("/handleForm", function (req, res) {
    let site = `<body style="background-color: ${req.query.color}"><h1 style="color:white; text-align:center; font-size: 200px;">${req.query.color}</h1></body>`
    res.send(site)
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})