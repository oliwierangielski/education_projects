const http = require("http");
const PORT = 3000;
const fs = require("fs");
const mime = require('mime-types')
const server = http.createServer((req, res) => {
    let url = decodeURI(req.url)
    console.log(`żądany przez przeglądarkę adres: ${url}` )
    let file = "static" + url
    if(fs.existsSync(file) && url != "/"){
        fs.readFile(file, function(error, data){
            res.writeHead(200, { 'Content-Type': mime.lookup(file) });
            res.write(data)
            res.end()
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
