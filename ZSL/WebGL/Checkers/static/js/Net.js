class Net{
    constructor(main){
        this.main = main
    }
    fetchPost(direction, bodyData = null, callback = null) {
        
            const body = bodyData // body czyli przesyłane na serwer dane
            
            const headers = { "Content-Type": "text/plain" } // nagłowek czyli typ danych
            
        if(callback){
            fetch(direction, { method: "post", body, headers }) // fetch
                .then(response => response.json())
                .then(data => callback(data))
        } else {
            fetch(direction, { method: "post", body, headers }) // fetch
        }
    }
    connectUser(){
        this.client = io()
        this.client.on("onconnect", (data) => {
            //TODO: można tu dodać dialog o zalogowaniu
        })
    }
    registerMove(oldPosition, newPosition, capturingInfo, becomeQueen){
        this.client.emit("registermove", {
            oldPosition: oldPosition,
            newPosition: newPosition,
            capturingInfo: capturingInfo,
            becomeQueen: becomeQueen
        })
    }
    awaitMove(){
        this.client.on("awaitmove", (data) => {
            // console.log(data)
            this.main.game.playOpponentMove(data.oldPosition, data.newPosition, data.capturingInfo, data.becomeQueen)
            clearTimeout(this.main.game.roundTimeout)
            this.main.game.endTurn()
        })
    }
    awaitOpponent(id){
        this.main.ui.toggleAwaitingDialog()
        let rotation = 0
        let waitingInterval = setInterval(() => {
            rotation++
            this.fetchPost("/ISCOMPLET", id, (data) => {
                this.main.ui.spinner.style.transform = "rotate(" + 60 * rotation + "deg)"
                if(data.isComplet == true){ // 2 Graczy
                    clearInterval(waitingInterval)
                    this.main.ui.toggleAwaitingDialog()
                    this.main.ui.createAlertDialog("Znaleziono przeciwnika")
                    this.main.ui.head.innerText += data.status
                    this.main.game.startGame(id)
                }
            })
        }, 1000)
    }
    awaitGameFinish(){
        this.client.on("finishgame", (data) => {
            this.main.game.finishGame(data)
        })
    }
}