const fs = require("fs")
const path = require("path")
const filepath = path.join(__dirname, "files", "file01.txt")
const filepath2 = path.join(__dirname, "files", "file02.txt")
const filepath3 = path.join(__dirname, "files", "file03.txt")
const filepath4 = path.join(__dirname, "files", "file04.txt")

//b) czytanie tekstu
// fs.readFile("./files/file01.txt",  (err, data) => {
//     if (err) throw err
//     console.log(data.toString());
// })


//c) czytanie z określeniem kodowania
// fs.readFile("./files/file01.txt", "utf-8",  (err, data)=> {
//     if (err) throw err
//     console.log(data.toString());
// })


//e) zapis plików, nadpisanie zawartości
// fs.writeFile(filepath2, "tekst do wpisania",  (err)=> {
//     if (err) throw err
//     console.log("plik nadpisany");
// })

//f) dopisanie danych do pliku
// fs.appendFile(filepath2, "\n\ntekst do dopisania",  (err) =>{
//     if (err) throw err
//     console.log("plik utworzony");
// })

//g) usunięcie pliku
// fs.unlink(filepath,  (err) =>{
//     if (err) throw err
//     console.log("czas 1: " + new Date().getMilliseconds());
// })

//h) sprawdzenie czy plik istnieje
// if (fs.existsSync(filepath)) {
//     console.log("plik istnieje");
//  } else {
//      console.log("plik nie istnieje");
//  }

// i) callbacki - kolejność działań
// fs.writeFile(filepath3, "tekst do zapisania", (err) => {
//     if (err) throw err
//     console.log("plik utworzony - czas 1: " + new Date().getMilliseconds());
   
//     fs.appendFile(filepath3, "\n\ntekst do dopisania", (err) => {
//         if (err) throw err
//         console.log("plik zmodyfikowany - czas 2: " + new Date().getMilliseconds());
//       
//     })
// })
