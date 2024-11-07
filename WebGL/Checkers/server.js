const express = require("express")
const app = express()
const PORT = 3000
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketio = new Server(server);
let config  = require('./config.js')
let players = []
let colors = [
    "biały",
    "czerwony"
]
let scores = config.countScores()

app.use(express.static('static'))
app.use(express.text())
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/ADD_USER", function(req, res){
    let jsonData
    if(players.length >= 2){
        jsonData = {
            isPlayerAdded: false,
            reason: "Nie mozna sie zalogować. W pokoju nie ma juz miejsc."
        }
    } else if(players[players.length-1] == req.body){
        jsonData = {
            isPlayerAdded: false,
            reason: "W pokoju istnieje użytkownik o takim nicku."
        }
    } else if(players.length < 2){
        players.push(req.body)
        jsonData = {
            isPlayerAdded: true,
            id: players.length,
            name: req.body,
            status: "Witaj " + req.body + ", grasz " + colors[players.length-1] + "mi\n"
        }
    }
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(jsonData))
})

app.post("/RESET", function(req, res){
    players = []
    let scores = config.countScores()
    res.end()
})

app.post("/ISCOMPLET", function(req, res){
    let data = {}
    if(players.length < 2){
        data.isComplet = false
    } else {
        data.isComplet = true
        if(req.body == 1){
            let opponentId = (req.body == 1) ? 1 : 0
            data.status = "Podłączył się gracz " + players[opponentId] + ", gra " + colors[opponentId] + "mi"
        } else {
            data.status = ""
        }
            
    }
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(data))
})

socketio.on('connection', (client) => {
    console.log("klient się podłączył z id = ", client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io
    client.emit("onconnect", {
        clientId:client.id
    })
    client.on("registermove", (data) => {
        client.broadcast.emit("awaitmove", data)
        if(data.capturingInfo != null){
            let amount = --scores[data.capturingInfo.id-1]
            if(amount == 0){
                let winner = (data.capturingInfo.id == 1) ? 2 : 1
                console.log(winner)
                socketio.emit("finishgame", winner)
            }
        }
        console.log(scores)
    })
    client.on("disconnect", (reason) => {
        console.log("klient się rozłącza", reason)
    })
});

server.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})