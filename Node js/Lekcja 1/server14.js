const http = require("http");
const fs = require("fs");
const PORT = 3000;
const socket = require("socket.io");
const mime = require('mime-types')
let users = {}
const server = http.createServer((req, res) => {
    let url = decodeURI(req.url)
    if(url == "/") url = "/chat.html"
    let file = "static" + url
    if(fs.existsSync(file)) {
        fs.readFile(file, function(error, data){
            res.writeHead(200, { 'Content-Type': mime.lookup(file) });
            res.write(data)
            res.end()
        })
    } 
})

const io = socket(server);
io.on('connection', (socket) => {
    socket.on("onJoin", (data) => {
        let date = new Date()
        const timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        socket.emit("onMyJoin", {nickname: data.nickname, hour: timestamp})
        socket.broadcast.emit("onJoin", {nickname: data.nickname, hour: timestamp})
        users[socket.id] = data.nickname
    })

    socket.on("sendMsg", (data) => {
        let date = new Date()
        const timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        socket.emit("onMyMsg", {msg: data.msg, nickname: users[socket.id], hour: timestamp})
        socket.broadcast.emit("onMsg", {msg: data.msg, nickname: users[socket.id], hour: timestamp})
    })

    socket.on("disconnect", (reason) => {
           console.log("klient się rozłącza", reason)
        let date = new Date()
        const timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        socket.broadcast.emit("onDisconnect", {nickname: users[socket.id], hour: timestamp})
    })
});







server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});