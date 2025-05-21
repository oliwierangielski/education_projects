const http = require("http");
const PORT = 3000;
require("colors");
const server = http.createServer((req, res) => {
        res.end()
        console.log("tekst na czerwono".red)
        console.log("tekst na zielono".green)
        console.log("tekst na tęczowo".rainbow)
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
