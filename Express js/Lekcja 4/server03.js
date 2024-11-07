const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const formidable = require('formidable')
app.use(express.static('static'))

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/static/client03.html"))
})

app.post('/handleUpload', function (req, res){
    let form = formidable({})
    form.uploadDir = __dirname + '/static/upload/' //folder do zapisu zdjęcia
    form.multiples = true
    form.parse(req, function (err, fields, files){
        console.log("----- przesłanie pola z formularza -------")
        console.log(fields)
        console.log("----- przesłane formularzem pliki -----")
        console.log(files)
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify([fields, files], null, 3))
    })

})

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})