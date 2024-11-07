const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

app.use(express.static('static'))
app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})

app.get('/:site', function(req, res){
    let site = req.params.site
    if(site)
        res.sendFile(path.join(__dirname + "/static/pages/" + site + ".html"))
})