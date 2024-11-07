const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const cookieParser = require("cookie-parser")
app.use(cookieParser())
let firstDate = Date.now()



app.get('/', function (req, res) {
    app.use(express.static('static'))


        res        
            .cookie("date", Date.now(), { expires: new Date(Date.now() + 1000 * 60 * 60 * 4) , httpOnly:false })
            .cookie("firstDate", firstDate, { expires: new Date(Date.now() + 1000 * 60 * 60 * 4) , httpOnly:false })
    
        res.sendFile(path.join(__dirname + "/static/cookie.html"))     
       
});

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
});

