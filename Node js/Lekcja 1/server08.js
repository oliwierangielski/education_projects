const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
        let color
        switch(req.url.toLocaleUpperCase()){
            case "/A":
                color = "red"
            break;
            case "/B":
                color = "green"
            break;
            case "/C":
                color = "blue"
            break;
            default:
                color = "brown"
                break;
        }
        let data = "<h1 style=\"color: " + color + "\">kolorowy</h1>"
        res.end(data)
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
