const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
let filepath = path.join(__dirname, "PLIKI")
const hbs = require('express-handlebars');
const formidable = require('formidable');
const fs = require("fs")
const bodyParser = require("body-parser")
let root = "/"
let site = "filemanager"
let users = []
const cookieparser = require("cookie-parser");
const nocache = require("nocache");


app.use(express.static('static'))
app.use(express.static("PLIKI"));
app.use(express.json())
app.use(cookieparser())
app.use(nocache())
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    partialsDir: "views/partials",
    helpers: {
        shortTitle: function (title) {
            if (title.split(".")[0].length > 8) {
                let ending = ((title.split('.').length == 2) ? title.split('.').pop() : "")
                title = title.substring(0, 7) + "..." + ending;
            }
            return title
        },
        fitSubDirPath: function (subDirPath) {
            if (subDirPath != "/")
                return subDirPath + "/"
            return subDirPath
        },
        createClickablePath: function (currentPath) {
            let result = "<a href='/filemanager'>home</a>&emsp;>&emsp;"
            if (currentPath == "/")
                return result
            let pathsTable = currentPath.split('/')
            pathsTable.shift()
            let url = ""
            for (i in pathsTable) {
                url += ("/" + pathsTable[i])
                result += "<a href='/filemanager?name=" + url + "'>" + pathsTable[i] + "</a>&emsp;>&emsp;"
            }
            return result
        },
        isNotHomeDir: function (directory, options) {
            return (directory == "/") ? options.inverse(this) : options.fn(this)
        },
        loadAsside: function(){
            let partial = site + "Asside"
            let partialPath = path.join(__dirname, "views", "partials", partial + ".hbs")
            
            return (fs.existsSync(partialPath)) ? partial : "filemanagerAsside"
        }
    }
}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/filemanager', function (req, res) {
    site = "filemanager"
    if(req.cookies.login == undefined){
        res.redirect("/login")
    }
    if (req.query.name == undefined) {
        // Jest to katalog domowy (/)
        root = "/"
    } else {
        // Każdy inny katalog
        root = req.query.name
    }

    let context = { directories: [], files: [], root: root }
    filepath = path.join(__dirname, "PLIKI", root.substring(1))
    // Pobranie zawartości katalogu PLIKI
    fs.readdir(filepath, (err, files) => {
        if (err) throw err
        if (files.length > 0) {
            files.forEach((file) => {
                let tempPath = path.join(__dirname, "PLIKI", root.substring(1), file)
                fs.lstat(tempPath, (err, stats) => {
                    if (err) throw err
                    if (stats.isDirectory()) {
                        context.directories.push(file)
                    } else if (!stats.isDirectory()) {
                        context.files.push(file)
                    }
                    if (file == files[files.length - 1])
                        res.render('filemanager.hbs', context);
                })
            })
        } else {
            res.render('filemanager.hbs', context);
        }
    })
});

app.post('/handleUpload', function (req, res) {
    let form = formidable({})
    form.keepExtensions = true
    form.multiples = true
    form.uploadDir = filepath
    form.parse(req, function (err, fields, files) {
        if (err) throw err
        let uploadedFiles = (!Array.isArray(files.file) ? [files.file] : files.file)
        uploadedFiles.forEach(function (file) {
            let newFilePath = path.join(__dirname, "PLIKI", fields.root.substring(1), file.name)
            if (fs.existsSync(file.path)) {
                fs.rename(file.path, newFilePath, (err) => {
                    if (err) throw err
                    if (file == uploadedFiles[uploadedFiles.length - 1])
                        res.redirect('/filemanager?name=' + fields.root)
                })
            }
        })
    })
})

app.post('/createDirectory', function (req, res) {
    let dirName = req.body.input
    let tempPath = path.join(__dirname, "PLIKI", req.body.root.substring(1), dirName)
    while (fs.existsSync(tempPath)){
        dirName += "-kopia"
        tempPath = path.join(__dirname, "PLIKI", req.body.root.substring(1), dirName)
    }
    fs.mkdir(tempPath, (err) => {
        if (err) throw err
        console.log("Został stworzony folder o nazwie: " + dirName);
        res.redirect('/filemanager?name=' + req.body.root)
    })
})

app.post('/createFile', function (req, res) {
    let fileName = req.body.input
    let tempPath = path.join(__dirname, "PLIKI", req.body.root.substring(1), fileName)
    let content
    let fileSplitted = fileName.split(".")
    let extension = fileSplitted[fileSplitted.length-1]
    while (fs.existsSync(tempPath)){
        fileName = ((fileSplitted.length > 1) ? fileName.substring(0, fileName.length - extension.length -1) + "-kopia." + extension : fileName + "-kopia")
        tempPath = path.join(__dirname, "PLIKI", req.body.root.substring(1), fileName)
    }
    switch(extension){
        case "css":
            content = "body {\n\tbackground-color:red\n}"
            break
        case "html":
            content = "<!DOCTYPE html>\n<hml lang=\"en\"\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta http-equiv=\"X-UA-Compatibile\" content=\"IE=edge\">\n\t<meta name=\"viewport\" content=\"width=device-width\", initial-scale=\"1\">\n\t<title>Document</title>\n</head>\n<body>\n<h1>html file</h1>\n</body>\n</html>"
            break
        case "js":
            content = "<script>\n\tconsole.log(\"js\")\n</script>"
            break
        case "json":
            content = "{\n\t\"a\": 1,\n\t\"b\": 2,\n\t\"c\": 3\n}"
            break
        case "txt":
            content = "txt file\na\nb\nc\nd"
            break
        case "xml":
            content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<note>\n\t<to>Anna</to>\n\t<from>Jan</from>\n\t<body>mail body</body>\n</note>"
            break
        default:
            content = ""
            break
    }
    fs.writeFile(tempPath, content, (err) => {
        if (err) throw err
        console.log("Został stworzony plik o nazwie: " + fileName);
        res.redirect('/filemanager?name=' + req.body.root)
    })
})

app.post('/delete', function (req, res) {
    const tempPath = path.join(__dirname, "PLIKI", req.body.root.substring(1), req.body.name)
    if (fs.existsSync(tempPath)) {
        fs.rm(tempPath, { recursive: true, force: true }, (err) => {
            if (err) throw err
            console.log("Został usunięty plik/folder o nazwie: " + req.body.name)
            res.redirect('/filemanager?name=' + req.body.root)
        })
    }
})

app.post('/rename', function (req, res) {
    let name = req.body.input
    const oldPath = path.join(__dirname, "PLIKI", req.body.root.substring(1))
    let lastFolderNameLength = req.body.root.split("/")
    lastFolderNameLength = lastFolderNameLength[lastFolderNameLength.length - 1].length // (/bbb) = 3
    let newPath = path.join(__dirname, "PLIKI", req.body.root.substring(1, req.body.root.length - lastFolderNameLength), name)

    if(oldPath != newPath){
        let fileSplitted = name.split(".")
        let extension = fileSplitted[fileSplitted.length-1]
        while (fs.existsSync(newPath)){
            name = ((fileSplitted.length > 1) ? name.substring(0, name.length - extension.length -1) + "-kopia." + extension : name + "-kopia")
            newPath = path.join(__dirname, "PLIKI", req.body.root.substring(1, req.body.root.length - lastFolderNameLength), name)
        }
    }

    if (fs.existsSync(oldPath)) {
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err
            console.log("Została zmieniona nazwa pliku/folderu: " + req.body.root + " na: " + name)
            res.redirect(req.body.direction + '?name=' + req.body.root.substring(0, req.body.root.length - lastFolderNameLength) + name)
        })
    }
})

app.get('/showfile', function(req, res){
    if(req.cookies.login == undefined){
        res.redirect("/login")
    }
    let splittedFileName = req.query.name.split('.')
    let extension = ((splittedFileName.length > 1) ? splittedFileName[splittedFileName.length-1] : null)
    const tempPath = path.join(__dirname, "PLIKI", req.query.name)
    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            site = 'showimage'
            let context = {
                name: req.query.name,
                effects: [
                    { filterName: "grayscale" },
                    { filterName: "invert" },
                    { filterName: "sepia" }
                ]
            }
            
            res.render("filters.hbs", context)
            break;

        default:
            site = "showfile"
            fs.readFile(tempPath, (err, data) => {
                if (err) throw err
                let context = {name: req.query.name, data: data.toString()}
                res.render("editor.hbs", context)
            })
            break;
    }
})

app.post('/updateFile', function(req, res){
    const tempPath = path.join(__dirname, "PLIKI", req.body.name)
     if(fs.existsSync(tempPath)){
        fs.writeFile(tempPath, req.body.data, (err) => {
            if (err) throw err
            console.log("Został zaktualizowany plik o nazwie: " + req.body.name)
            res.redirect("/showfile?name=" + req.body.name)
        })
     }
})

app.post('/saveEditorSettings', function(req, res){
    const tempPath = path.join(__dirname, "settings", "fileEditor.json")
    fs.writeFile(tempPath, JSON.stringify(req.body, null, "\t"), (err) => {
        if (err) throw err
        console.log("Zostały zaktualizowane ustawienia edytora plików")
    })
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(req.body))
})

app.post('/getEditorSettings', function(req, res){
    const tempPath = path.join(__dirname, "settings", "fileEditor.json")
    if(fs.existsSync(tempPath)){
        fs.readFile(tempPath, (err, data) => {
            if(err) throw err 
            res.json(data.toString())
        })
    } else {
        res.end("null")
    }
})

app.post('/saveImage', function(req, res){
    let form = formidable({})
    form.keepExtensions = true
    form.multiples = true
    form.uploadDir = filepath
    form.parse(req, function(err, fields, files){
        const buffer = Buffer.from(fields.file, 'base64')
        const tempPath = path.join(__dirname, "PLIKI", fields.name)
        fs.writeFileSync(tempPath, buffer)
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify("przesłano plik"))
    })
})

app.get('/previewFile', function(req, res){
    let tempPath = path.join(__dirname, "PLIKI", req.query.name)
    res.sendFile(tempPath)
})

app.get('/login', function(req, res){
    res.render("login.hbs", {layout: "start.hbs"})
})

app.post('/login', function(req, res){
    let name = req.body.name
    let password = req.body.password
    if(users.filter(user => user.name == name && user.password == password).length){
        res.cookie("login", name, { httpOnly: true, maxAge: 800 * 1000 });
        res.redirect("/filemanager")
    } else {
        res.render("error.hbs", {layout: "start.hbs", errorInfo: "login or pass not correct"})
    }

})

app.get('/register', function(req, res){
    res.render("register.hbs", {layout: "start.hbs"})
})

app.post('/register', function(req, res){
    let name = req.body.name
    let password = req.body.password
    let repassword = req.body.repassword
    if(name.length < 3){
        res.render("error.hbs", {layout: "start.hbs", errorInfo: "min username length = 3"})
    } else if(repassword != password){
        res.render("error.hbs", {layout: "start.hbs", errorInfo: "passwords are different"})
    } else if(users.filter(user => user.name == name).length){
        res.render("error.hbs", {layout: "start.hbs", errorInfo: "user exists"})
    } else {
        users.push({name: name, password:password, repassword:repassword})
        res.redirect("/login")
    }
})

app.get('/logout', function(req, res){
    res.render("logout.hbs", {layout: "start.hbs"})
})

app.post('/logout', function(req, res){
    res.clearCookie("login");
    res.redirect("/login");
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})