const Animal = require('./model')
const utils = require('./utils')
const controller = require('./controller')
const fs = require('fs')
const mime = require('mime-types')
let path = require('path')

const router = async (req, res) => {

    switch (req.method) {
        case "GET":
            let url = decodeURI(req.url)
            if(url == "/") url = "/index.html"
            let file = path.join("app", "views", url)
            console.log(file)
            if(fs.existsSync(file)) {
                fs.readFile(file, function(error, data){
                    res.writeHead(200, { 'Content-Type': mime.lookup(file) });
                    res.write(data)
                    res.end()
                })
            } 
        break
        case "POST":
            let body
            if (req.url == "/add") {
                // odczytaj dane z body
                // użyj funkcji z controllera
                // odpowiedz do klienta
                let data = JSON.parse(await getRequestData(req));
                body = controller.add(data)
            }
            else if (req.url == "/getall") {
                //  pobierz dane z tablicy zwierząt i odpowiedz do klienta
                body = controller.getall()
            }
            else if (req.url == "/delete") {
                //  usuń dane z tablicy zwierząt i odpowiedz do klienta
                let data = await getRequestData(req)
                body = controller.delete(data)
            }
            else if (req.url == "/update") {
                //  updatuj danye z tablicy zwierząt i odpowiedz do klienta
                let data = await getRequestData(req)
                body = controller.update(data)
            }
            res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
            res.end(JSON.stringify(JSON.stringify(body, null, 3), null, 5));
            break;

    }
}

module.exports = router    