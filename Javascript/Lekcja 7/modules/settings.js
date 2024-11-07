import  {Player}  from "/modules/player.js"

let counter = 0

export function settings(players, button){
    if(counter%2==0 | counter == undefined){
        let dialog = document.createElement("div");
        dialog.classList.add("dialog")
        dialog.id = "dialog"

        let settingsContainer = document.createElement("div")
        settingsContainer.classList.add("settings-container")

        let header = document.createElement("h2")
        header.innerText = "USTAWIENIA"
        let settingDescriptions = document.createElement("h3")
        settingDescriptions.innerText = "Gracze"

        let tableContainer = document.createElement("div")

        // Tabela
            function createTable(){
                let playerTable = document.createElement("table")

                //1 wiersz
                let headerTr = document.createElement("tr")
                let playerIdTd = document.createElement("td")
                playerIdTd.innerText = "ID"
                let nicknameTd = document.createElement("td")
                nicknameTd.innerText = "Nickname"
                let leftBtnTd = document.createElement("td")
                leftBtnTd.innerText = "Klawisz skrętu w lewo"
                let rightBtnTd = document.createElement("td")
                rightBtnTd.innerText = "Klawisz skrętu w prawo"
                headerTr.append(playerIdTd, nicknameTd, leftBtnTd, rightBtnTd)
                playerTable.appendChild(headerTr)
                //2 wiersz

                players.forEach(function(item, id){
                    let playerTr = document.createElement("tr")
                    let idTd = document.createElement("td")
                    idTd.innerText = item.id
                    let nicknameTd = document.createElement("td")
                    let nicknameInput = document.createElement("input")
                    nicknameInput.value = item.nickName
                    nicknameInput.onchange = function(){
                        players[id].nickName = this.value
                        console.log(players[id])
                    }
                    nicknameTd.appendChild(nicknameInput)
                    let leftBtnTd = document.createElement("td")
                    let leftBtnInput = document.createElement("button")
                    leftBtnInput.innerText = item.controlKeys.left
                    leftBtnInput.onclick = function() {
                        this.innerText = "Naciśnij przycisk"
                        this.classList.add("active-btn")

                        window.onkeydown = (e)=> {
                            this.innerText = e.key
                            this.classList.remove("active-btn")
                            players[id].controlKeys.left = e.key
                            window.onkeydown = null
                        }
                    }

                    leftBtnTd.appendChild(leftBtnInput)
                    let rightBtnTd = document.createElement("td")
                    let rightBtnInput = document.createElement("button")
                    rightBtnInput.innerText = item.controlKeys.right
                    rightBtnInput.onclick = function() {
                        this.innerText = "Naciśnij przycisk"
                        this.classList.add("active-btn")

                        window.onkeydown = (e)=> {
                            this.innerText = e.key
                            this.classList.remove("active-btn")
                            players[id].controlKeys.right = e.key
                            window.onkeydown = null
                        }
                    }
                    rightBtnTd.appendChild(rightBtnInput)

                    playerTr.append(idTd, nicknameTd, leftBtnTd, rightBtnTd)

                    


                    playerTable.appendChild(playerTr)
                })
                return playerTable
            }

            let playerTable = createTable()

            function refreshTable(){
                let playerTableHelper = createTable()
                playerTable.replaceWith(playerTableHelper)
                playerTable = playerTableHelper
            }

        

        let spinner = document.createElement("div")

        let upSpinner = document.createElement("button")
        upSpinner.innerText = "+"
        upSpinner.classList.add("spinner")
        upSpinner.style.backgroundColor = "#68f760"
        upSpinner.onclick = function(){
            players.push(new Player({left: "", right: ""}))
            refreshTable()
        }

        let downSpinner = document.createElement("button")
        downSpinner.innerText = "-"
        downSpinner.classList.add("spinner")
        downSpinner.style.backgroundColor = "#e64f35"
        downSpinner.onclick = function(){
            if(players.length > 1){
                console.log(players.length)
                players.pop()
                Player.playerAmount--
                refreshTable()
            } 
        }

        spinner.append(upSpinner, downSpinner)


        tableContainer.append(playerTable, spinner)

            

        


        settingsContainer.append(header,settingDescriptions, playerTable, tableContainer)
        dialog.appendChild(settingsContainer)

        document.body.appendChild(dialog)
        button.style.backgroundImage = "url(\"images/close.png\")"
    } else {
        window.onkeydown = null
        document.getElementById("dialog").remove()
        button.style.backgroundImage = "url(\"images/settings.png\")"
    }
    counter++
}