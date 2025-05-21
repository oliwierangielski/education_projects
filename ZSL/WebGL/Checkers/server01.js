const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app); // tu zmiana
const { Server } = require("socket.io");
const socketio = new Server(server);
let users = []

socketio.on('connection', (client) => {
    console.log("klient się podłączył z id = ", client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io
    users.push(client.id)
    client.emit("onconnect", {
        clientId:client.id
    })
    socketio.emit("onclientjoin", {
        ids: users
    })
    // client.on("mouseposition", (data) => {
    //     console.log(data)
    //     socketio.emit("mouseposition", { posX: data.posX, posY:data.posY });
    // })
    client.on("mouseposition", (data) => {
        console.log(data)
        client.broadcast.emit("mouseposition", { posX: data.posX, posY: data.posY });
    })
    client.on("disconnect", (reason) => {
        console.log("klient się rozłącza", reason)
        users.splice(users.indexOf(client.id), 1)
        socketio.emit("onclientjoin", {
            ids: users
        })
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/index01.html");
});

server.listen(3000, () => {
    console.log('server listening on 3000');
});