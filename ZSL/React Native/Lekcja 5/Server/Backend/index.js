const express = require('express')
const app = express();
const port = 5000
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const cors = require('cors');
app.use(cors())
app.use(express.json())
const fsPromises = require("fs").promises

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, 'uploads');
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(500).json({error: "Błąd"})
        }
        Object.keys(files).forEach((key, index) => {
            const file = files[key][0]
            console.log(files[key][0])
            const filePath = file.filepath
            const newFilePath = path.join(__dirname, "uploads", file.newFilename + ".jpg")
            fs.rename(filePath, newFilePath, (err) => {
            if(err){return console.log(err)}
            console.log("Pomyślnie zapisano plik")

            })
        })
        res.send("Pomyślnie przesłano plik")

    })
})

app.get("/getdata", async (req,res) => {
    let data = await list()
    res.json(data)
})

app.get("/image/:filename", (req,res) => {
    let filepath = path.join(__dirname, "uploads", req.params.filename)
    res.sendFile(filepath)
})

app.patch("/postdata", (req, res) => {
    console.log(req.body)
    let oldname = path.join(__dirname, "uploads", req.body.oldname)
    let newname = path.join(__dirname, "uploads", req.body.newname)
    fs.rename(oldname, newname, (err) => {
        if(err){return console.log(err)}
        console.log("Pomyślna zmiana nazwy pliku")
        res.json({message: "Pomyślna zmiana nazwy pliku"})
    })
})

app.delete("/deletefile/:filename", (req, res) => {
    let filepath = path.join(__dirname, "uploads", req.params.filename)
    fs.unlink(filepath, (err) => {
        if(err){return console.log(err)}
        console.log("Pomyślnie usunięto plik: " + req.params.filename)
        res.json({message: "Pomyślnie usunięto plik: " + req.params.filename})
    })
})

app.delete("/deleteSelected", (req, res) => {
    let selectedFiles = req.body.selectedFiles
    selectedFiles.forEach((e) => {
        let filepath = path.join(__dirname, "uploads", e)
        fs.unlink(filepath, (err) => {
            if(err){return console.log(err)}
            console.log("Pomyślnie usunięto plik: " + e)
        })
    })
    res.json({message: "Pmyślnie usunięto " + selectedFiles.length + " plików"})
})

const list = async () => {
    try {
     const newpath = path.join(__dirname, "uploads")
     console.log(newpath)
     const data = await fsPromises.readdir(newpath)
     return data
    } catch (error) {
     console.log(error);
     return []
    }
   }


app.listen(port, () => {
    console.log('Server listening on port: ' + port)
})