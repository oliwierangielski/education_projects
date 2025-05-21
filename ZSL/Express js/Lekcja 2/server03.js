const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const bodyParser = require("body-parser")

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname + "/static/formularz2.html"))
})

app.post("/handleForm", function (req, res) {
    // res.send(req.body)
    let site = `<body style="background-color: ${req.body.color}"><h1 style="color:white; text-align:center; font-size: 200px;">${req.body.color}</h1></body>`
    res.send(site)
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})