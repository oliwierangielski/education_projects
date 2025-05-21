const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")


app.use(express.static('static'))

app.get('/product_id/:id', function(req, res){
    let id = req.params.id
        if(id>=1 & id <=3){
            res.sendFile(path.join(__dirname + "/static/products/product" + id + ".html"))
        } else {
            res.send("Brak produktu i jego strony")
        }
        
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})