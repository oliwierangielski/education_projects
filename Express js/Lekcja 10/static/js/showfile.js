let lineNumerationBar = document.getElementById("lineNumerationBar")
let textEditor = document.getElementById("textEditor")

function redrawTextEditor() {
    lineNumerationBar.innerText = ""
    let lineAmount = textEditor.value.split("\n").length
    textEditor.rows = lineAmount

    for (let i = 1; i < lineAmount+1; i++) {
        lineNumerationBar.innerHTML += "<div>"+ i +"</div>"
    }
}



let settings = {fontSize: 33, lineHeight: 40, theme: 0}

function changeTheme(){
    switch(settings.theme){
        case 0:
            textEditor.parentElement.style.backgroundColor = "white"
            textEditor.style.color = "black"
            break;
        case 1:
            textEditor.parentElement.style.backgroundColor = "#1e1e1e"
            textEditor.style.color = "white"
            break;
        case 2:
            textEditor.parentElement.style.backgroundColor = "#230b47"
            textEditor.style.color = "#ae3ede"
            break;
    }
}

function setFontSize(fontSize, lineHeight){
    textEditor.style.fontSize = (fontSize + "px")
    textEditor.style.lineHeight = (lineHeight + "px")
    lineNumerationBar.style.fontSize = (fontSize + "px")
    lineNumerationBar.style.lineHeight = (lineHeight + "px")
}

document.body.onload = function(){
    const headers = {"Content-Type": "application/json"}
    fetch("/getEditorSettings", { method: "post", headers })
        .then(response => response.json())
        .then(data => {
            if(data != null) {
                settings = JSON.parse(data)
            }
            changeTheme()
            setFontSize(settings.fontSize, settings.lineHeight)
        })
    redrawTextEditor()
}

textEditor.onkeyup = function(e){
    redrawTextEditor()
}


function invertColors() {
    ++settings.theme
    settings.theme = ((settings.theme >= 3) ? 0 : settings.theme)
    changeTheme()
}

let fontSizeTimeout

function changeFontSize(value) {
    fontSizeTimeout = setInterval(function(){
        setFontSize((settings.fontSize+=value), (settings.lineHeight+=value))
    }, 50)
}

function finishChangingFontSize(){
    clearInterval(fontSizeTimeout)
}

function saveSettings(){
    const body = JSON.stringify(settings)
    const headers = {"Content-Type": "application/json"}
    fetch("/saveEditorSettings", {method: "post", body, headers})
        .then(response => response.json())
        .then(
            data => console.log(data)
        )
}