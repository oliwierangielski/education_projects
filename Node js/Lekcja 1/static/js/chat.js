class Message{
    static messageContainer = document.getElementById("messageContainer")
    constructor(text, nickname, hour, color = "rgb(62, 60, 60)", align = "none", startMsg = false){
        this.message = document.createElement("div")
        this.message.classList.add("message")
        this.nickname = document.createElement("div")
        this.nickname.classList.add("nickname")
        this.nickname.innerText = nickname
        this.messageText = document.createElement("div")
        this.messageText.classList.add("messageText")
        this.messageText.innerText = text
        this.messageText.style.border = "4px solid " + color
        this.messageText.style.float = align
        if(startMsg) this.messageText.style.minWidth = "100%"
        this.hour = document.createElement("div")
        this.hour.classList.add("hour")
        this.hour.innerText = hour
        this.messageText.append(this.nickname, this.hour)
        this.message.appendChild(this.messageText)
        this.clearBothDiv = document.createElement("div")
        this.clearBothDiv.style.clear = "both"
        Message.messageContainer.append(this.message, this.clearBothDiv)
        Message.messageContainer.parentElement.scrollTop = Message.messageContainer.parentElement.scrollHeight
    }
}

window.onload = function () {
    const client = io();
    let nickname
    document.getElementById("button").onclick =() => {
        nickname = document.getElementById("loginInput").value
        if(nickname != ""){
            document.getElementById("dialog").close()
            client.emit("onJoin", {nickname: nickname})
        }
    }

    client.on("onMyJoin", (data) => {
        document.getElementById("nicknameTitle").innerText = "Zalogowany: " + data.nickname
        new Message("Wchodzę na czat", "Ja", data.hour, "green", "right", true)
    })

    client.on("onJoin", (data) => {
        console.log("ktos", data)
        new Message("Wchodzi na czat", data.nickname, data.hour)
    })

    client.on("onMyMsg", (data) => {
        new Message(data.msg, "Ja", data.hour, "yellow", "right")
    })

    client.on("onMsg", (data) => {
        new Message(data.msg, data.nickname, data.hour)
    })

    client.on("onDisconnect", (data) => {
        new Message("Opuszcza czat", data.nickname, data.hour, "red")
    })

    document.getElementById("sendBtn").onclick = () => {
        let msg = document.getElementById("msgText").value
        if(msg != ""){
            document.getElementById("msgText").value = ""
            client.emit("sendMsg", {msg: msg})
        }
    }
};

