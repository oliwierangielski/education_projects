// Imports
import  {playfield}  from "/modules/playfield.js"
import  {Player}  from "/modules/player.js"
import { settings } from "/modules/settings.js"


playfield.init()
playfield.drawPlayfield()
Player.playfield = playfield

let players = [
    new Player({left: "ArrowLeft", right: "ArrowRight"})
]
let settingsBtn = document.getElementById("settings")
settingsBtn.onclick = function(){ settings(players, this)}



let startBtn = document.createElement("button")
startBtn.classList.add("start-btn")
startBtn.innerText = 'START'
document.body.appendChild(startBtn)

console.log(players)

startBtn.onclick = function(){
    
    this.style.opacity = 0
    settingsBtn.style.opacity = 0 
    document.body.style.cursor = 'none'


    Player.interval = setInterval(function(){
        playfield.drawPlayfield()

        players.forEach(item => {
        item.start()
        })
        
    },37)

}
    
    



