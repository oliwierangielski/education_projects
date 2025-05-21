const express = require("express")
const app = express()
const PORT = 3000;
const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
});

app.get('/', function(req, res){
    res
        .cookie("cookieA", "aaa", {express: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: true})
        .send('cookieA zostało ustawione')
        console.log("cookies : ", req.cookies);
});

