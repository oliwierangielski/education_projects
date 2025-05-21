const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((req, res) => {
        console.log(`żądany przez przeglądarkę adres: ${req.url}` )

    if (req.url === "/third.html") {
        fs.readFile("static/third.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/css/style.css") {
        fs.readFile("static/css/style.css", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/js/script.js") {
        fs.readFile("static/js/script.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>404 - brak takiej strony</h1>");
        res.end();
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
