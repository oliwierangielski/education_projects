const fs = require("fs")
const path = require("path")

//a) funkcja tworzy i nie zdąży usunąć katalogu newdir - niepoprawna kolejność działań
// if (!fs.existsSync("./newdir")) {
//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("jest");
//     })
// }

// if (fs.existsSync("./newdir")) {
//     fs.rmdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("nie ma ");
//     })
// }


//b) funkcja tworzy i usuwa katalog - poprawna kolejność callbacków
// if (!fs.existsSync("./newdir")) {
//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("jest");
//         if (fs.existsSync("./newdir")) {
//             fs.rmdir("./newdir", (err) => {
//                 if (err) throw err
//                 console.log("nie ma ");
//             })
//         }
//     })
// }

//c) pobranie listy plików/katalogów
// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err
//     console.log("lista", files);
// })

// d) listowanie i dodanie nowego katalogu - niepoprawna kolejność callbacków
// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err
//     console.log("lista 1  - ", files);
// })

// fs.mkdir("./newdir", (err) => {
//     if (err) throw err
//     console.log("jest");
// })

// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err
//     console.log("lista 2  - ", files);
// })

//e) listowanie i dodanie nowego katalogu - poprawnie
// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err
//     console.log("lista 1  - ", files);

//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("dodany");

//         fs.readdir(__dirname, (err, files) => {
//             if (err) throw err
//             console.log("lista 2  - ", files);
//         })
//     })
// })

//f) sprawdzenie czy to plik czy katalog
// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err

//     // foreach
//     files.forEach((file) => {
//         fs.lstat(path.join(__dirname, file), (err, stats) => {
//             if(err){
//                 console.log(err)
//                 return
//             }
//             console.log(file, stats.isDirectory());
//         })
//     })

//     // lub for of
//     // for (const f of files) {
//     //     fs.lstat(path.join(__dirname, f), (err, stats) => {
//     //         console.log(f, stats.isDirectory());
//     //     })
//     // }


// })
