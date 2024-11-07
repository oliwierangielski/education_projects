const express = require("express")
const app = express()
const PORT = 3000;

function generateString(count, background){
    let htmlString = ""
    for(let i = 0; i < count; i++){
        htmlString += "<div style=\"width: 80px; text-align: center; display: inline-block; padding: 15px; margin: 10px;background-color: " + background + "\">" + (i+1) + "</div>"
    }
    return htmlString
}

app.get('/', function(req, res){
    
    res.send(generateString(req.query["count"], req.query["bg"]))
})

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})

