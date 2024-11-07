const express = require("express")
const app = express()
const PORT = 3000;
const fs = require("fs")
let filesObj = {}


app.use(express.static('static')) // serwuje stronę index.html
app.use(express.static('static/cwiczenia')) // serwuje pozostałe pliki, czyli ćwiczenia
app.use(express.static(('static/cwiczenia/lekcja_1_start')))
//przykładowy get obsługujący request ze strony

app.get("/cwiczenia", function (req, res) { 

fs.readdir(__dirname + "/static/cwiczenia", function (err, dirs) {
   if (err) {
      return console.log(err);
   }
   for(let dir in dirs){
      fs.readdir(__dirname + "/static/cwiczenia/" + dirs[dir], function (err, files) {
            if (err) {
               return console.log(err);
            }
            filesObj[dirs[dir]] = files
         });
   }
});


res.setHeader("content-type", "application/json")
res.send(filesObj)

})


app.listen(PORT, function(){
    console.log("start serwera na porcie " + PORT)
})

