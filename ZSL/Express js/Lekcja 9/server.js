const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const hbs = require('express-handlebars');
const formidable = require('formidable');
let imageTable = []
let pageName = ""
const fs = require('fs')


app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ 
    extname: '.hbs',
    partialsDir: "views/partials",
    defaultLayout: 'main.hbs',
    helpers: {
        getImagePath: function(path){
            return path.split("static").pop()
        },
        getPage: function(){
            if(pageName == "filemanager")
                return "<b>filemanager</b><a href=\"/reset\"><div>USUN DANE O PLIKACH Z TABLICY</div></a>"
            return "<b>"+pageName+"</b>"
        },
        getFileExtension: function(filename){
            let extension = filename.split('.').pop()       
            let file =  path.join(__dirname, "static/images/File Types (" + extension + ").png")
            // return extension
            
            

            if(fs.existsSync(file)){
                return extension
            } else {
                return "all"
            }

            
            

            
        }      
    }
 }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');    




app.get("/", function (req, res) { 
    pageName = "multiupload"
    let context = {}
    context.title = "multiupload"
        res.render('upload.hbs', context);   // nie podajemy ścieżki tylko nazwę pliku
})


app.get("/filemanager", function (req, res) {
  pageName = "filemanager"
  res.render('filemanager.hbs', imageTable)  
})

app.get("/show", function (req, res) {
    
    let id = req.query.id
    if(doesElementExist(id)){
        let image =  imageTable[id]
        if(image.type.split("/")[0] == "image"){
            res.render('show.hbs', {layout: null, image: image})
        } else {       
            res.redirect(image.path.split("static").pop())
        }
        
    } else {
        res.render('show.hbs', {layout: null})
    }
    
})

app.get("/download", function (req, res) {
    
    let id = req.query.id
    if(doesElementExist(id)){
        let image =  imageTable[id]
        res.download(image.path)
        if(pageName == "")
            res.redirect("/filemanager")
             
    } else {
        if(pageName == "")
            res.redirect("/filemanager")
    }
    
})

function doesElementExist(id){
    if(id == undefined)
        return false
    if (id > imageTable.length-1)
        return false
    return (imageTable?.[id] == undefined | imageTable?.[id].name == undefined) ? false : true
}

app.get("/delete", function (req, res) {
    
    let id = req.query.id
        if(doesElementExist(id)){
            let image =  imageTable[id]
            imageTable[id] = {}
        } 
    res.redirect("/filemanager")
    
})

app.get("/reset", function(req, res){
    imageTable = []
    res.redirect("/filemanager")
})

app.get("/info", function (req, res) {
    
    let id = req.query.id
    if(doesElementExist(id)){
        let image =  imageTable[id]
        image.id = id
        res.render('info.hbs',  {image: image})
    }
    res.render('info.hbs', imageTable)
    
})






app.post('/handleForm', function(req, res){
    let form = formidable({})
    form.uploadDir = __dirname + '/static/upload/' // => lokalizacja folderu
    form.multiples = true
    form.keepExtensions = true
    form.parse(req, function(err, fields, files){
        
        if(Array.isArray(files.file)){
            for(let i in files.file){
                imageTable.push(files.file[i])
            }
        } else {
            imageTable.push(files.file)
        }
        
        let operation = {}
        
        operation.result = !err ? true : false
        res.render('upload.hbs', operation)
    })
})

app.use(express.static('static'))

app.listen(PORT, function () {
        console.log("start serwera na porcie " + PORT )
})