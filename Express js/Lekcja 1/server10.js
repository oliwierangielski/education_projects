

const express = require("express")
const app = express()
const PORT = 3000;

function countRadiansDeegres(value, toRad){   
    if(toRad == "true")
        return "<p> " + value +  " stopni to " + (value * Math.PI / 180) + " radianów</p>"
    return "<p> " + value + " radian to " + (value * 180 / Math.PI) + " stopni</p>"
}

app.get('/', function(req, res){
    res.send(countRadiansDeegres(req.query["value"], req.query["toRad"]))
})

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})

