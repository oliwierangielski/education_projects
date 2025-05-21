class Ui {
    loginInput = document.getElementById("loginInput")
    loginBtn = document.getElementById("loginBtn")
    resetBtn = document.getElementById("resetBtn")
    loginDialog = document.getElementById("loginDialog")
    awaitDialog = document.getElementById("awaitDialog")
    spinner = document.getElementById("spinner")
    head = document.getElementById("head")
    turnDialog = document.getElementById("turnDialog")
    turnTimer = document.getElementById("turnTimer")
    scoreDialog = document.getElementById("scoreDialog")
    scoreInfo = document.getElementById("scoreInfo")
    alertDialogsStack = []
    constructor(main){
        this.loginBtn.onclick = ()=> {
            if(this.loginInput.value == ""){
                this.createAlertDialog("Nie podano loginu", false)
            } else {
                main.net.fetchPost("/ADD_USER", this.loginInput.value, (data) => {       
                    if(data.isPlayerAdded){
                        main.ui.clearUi()
                        this.createAlertDialog("Zalogowano się pomyślnie")
                        this.head.innerText = data.status
                        main.game.setChessBoard(data.id)
                        main.net.connectUser()
                        main.net.awaitOpponent(data.id)
                    } else{
                        this.createAlertDialog(data.reason, false)
                    }
                })
            }
        }
        this.resetBtn.onclick = () => {
            main.net.fetchPost("/RESET")
        }
        window.onresize = () => {
            main.game.camera.aspect = window.innerWidth / window.innerHeight;
            main.game.camera.updateProjectionMatrix();
            main.game.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
    clearUi(){
        this.loginDialog.open = false
    }
    createAlertDialog(text, isSuccess = true){
        let alertDialog = document.createElement("div")
        alertDialog.classList.add("alertDialog")
        document.body.appendChild(alertDialog)
        // alertDialog.classList?.remove("dialogFailure", "dialogSuccess")
        if(!isSuccess){
            alertDialog.classList.add("dialogFailure")
        } else {
            alertDialog.classList.add("dialogSuccess")
        }
        alertDialog.innerText = text
        alertDialog.style.top = (100 * this.alertDialogsStack.length + "px")
        setTimeout(()=>{
            alertDialog.style.transform = "translateX(-300px)"
        }, 10)
        
        this.alertDialogsStack.push(alertDialog)
        setTimeout(()=>{
            alertDialog.style.transform = "translateX(300px)"
            setTimeout(() => {
                this.alertDialogsStack.shift().remove()
                this.alertDialogsStack.forEach((alertElement, index)=>{
                if(alertElement.style.transform != "translateX(300px)")
                    alertElement.style.top = index * 100 + "px"
            })
            }, 500)
        }, 5000 + this.alertDialogsStack.length*500)
    }
    toggleAwaitingDialog(){
        this.awaitDialog.open = ! this.awaitDialog.open
    }
    openTurnDialog(){
        this.turnDialog.open = true
        let remainingTime = 30
        this.turnTimerInterval = setInterval(() => {
            this.turnTimer.innerText = --remainingTime
        }, 1000);
    }
    closeTurnDialog(){
        clearInterval(this.turnTimerInterval)
        this.turnDialog.open = false
    }
    toggleScoreDialog(winStatus){
        if(winStatus){
            this.scoreInfo.innerText = "Wygrałeś"
            this.scoreInfo.style.color = "lightgreen"
        } else {
            this.scoreInfo.innerText = "Przegrałeś"
            this.scoreInfo.style.color = "red"
        }
        this.scoreDialog.open = ! this.scoreDialog.open
    }
}