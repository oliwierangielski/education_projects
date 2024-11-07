const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
let browsersName = req.headers["user-agent"].split(" ")
browsersName = browsersName[browsersName.length-1]
browsersName = browsersName.split("/")
browsersName = browsersName[browsersName.length-2]
let data = "<h1>Twoja przeglądarka to: " + browsersName + "</h1>"
    res.end(data)
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});