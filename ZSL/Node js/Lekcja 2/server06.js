const http = require("http");
const PORT = 3000;
const fs = require("fs")
const mime = require('mime-types')
const server = http.createServer((req, res) => {
    console.log(req.method)
    switch (req.method) {
        case "GET":
            //wyświetlenie strony html
            let url = decodeURI(req.url)
            if (url == "/") {
                fs.readFile("static/index06.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data)
                    res.end()
                })
            } else {
                let file = "static" + url
                if (fs.existsSync(file)) {
                    fs.readFile(file, function (error, data) {
                        res.writeHead(200, { 'Content-Type': mime.lookup(file) });
                        res.write(data)
                        res.end()
                    })
                }
            }
            break;
        case "POST":
            // odbiór posta
            serverResponse(req, res)

            break;
    }
})

function serverResponse(req, res) {
    let body = "";
    req.on("data", function (data) {
        console.log("data: " + data)
        body += data.toString();
    })
    req.on("end", function (data) {
        let finishObj = JSON.parse(body)
        finishObj = `rgba(${finishObj.r}, ${finishObj.g}, ${finishObj.b}, ${finishObj.a/100})`
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(finishObj, null, 5));
    })
}

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});