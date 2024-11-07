const http = require("http")
const PORT = 3000
const path = require("path")
const fs = require("fs")
const nedb = require("nedb")
const Datastore = require('nedb')
let interval
const coll1 = new Datastore({
    filename: 'server03.db',
    autoload: true
});
const server = http.createServer((req, res) => {

    if (req.url == "/") {
        fs.readFile(path.join(__dirname, "static", "index.html"), function (error, data) {
            if (error) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    }

    console.log(req.method)
    switch (req.method) {
        case "GET":
            //wyświetlenie strony html
            break;
        case "POST":
            // odbiór posta
            serverResponse(req, res)

            break;
    }



    function serverResponse(req, res) {
        let body = "";

        //kiedy przychodzą dane postem, w postaci pakietów
        //łącza się do jednej zmiennej "body"

        req.on("data", function (data) {
            console.log("data: " + data)
            body += data.toString();
        })

        //kiedy przyjdą już WSZYSTKIE dane
        //parsujemy je do obiektu
        //i odsyłamy do przeglądarki

        req.on("end", async function (data) {
            let state = JSON.parse(body).operation
            let finishObj = {}
            switch (state) {
                case "startRecord":
                    save()
                    finishObj.info = "Rozpoczęto zapis na serwerze"
                    break
                case "stopRecord":
                    clearInterval(interval)
                    finishObj.info = "Wstrzymano zapis na serwerze"
                    break
                case "startRead":
                    finishObj.data = await read()
                    finishObj.info = "Rozpoczęto odczyt na serwerze"
                    break
            }
            res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
            res.end(JSON.stringify(finishObj, null, 5));
        })

    }

    const save = () => {
        interval = setInterval(() => {
            const date = new Date()
            const doc = { time: date.getTime(), total: process.memoryUsage().heapTotal, used: process.memoryUsage().heapUsed }
            coll1.insert(doc, function (err, newDoc) {
                // console.log(newDoc)
            })
        }, 1000)
    }

    const read = async () => {

        return new Promise((resolve, reject) => {
            try {
                coll1.find({}).sort({ time: -1 }).limit(20).exec(function (err, docs) {
                    resolve(docs)
                })
            } catch (error) {
                reject(error.message)
            }
        })
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});