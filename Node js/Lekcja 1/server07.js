const http = require("http");
const PORT = 3000;
require("colors");
const server = http.createServer((req, res) => {
        switch(req.url){
            case "/A":
                console.log("kolorowe".red)
            break;
            case "/B":
                console.log("kolorowe".green)
            break;
            case "/C":
                console.log("kolorowe".blue)
            break;
            default:
                console.log("kolorowe".rainbow)
                break;
        }
        res.end()
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
