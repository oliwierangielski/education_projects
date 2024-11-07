let button = document.createElement("button")

button.addEventListener("click", function(){
    document.body.style.background = "red"
})
document.body.style.background = "green"
document.body.appendChild(button)