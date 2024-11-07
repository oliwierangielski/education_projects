let planetCounter = 1
let tab = []
let direction = false
$(".gamePanel").on("click", function (event) {
    tab.push({ x: event.pageX, y: event.pageY })
    let planetContainer = $("<div>")
        .addClass("planet")
        .css("left", event.pageX - 100 + "px")
        .css("top", event.pageY + - 100 + "px")
    planetContainer.append($("<p>").text(planetCounter))
    $(".gamePanel").append(planetContainer)
    planetCounter++
})

let stepsCounter = 0

function moveRocket() {
    if (stepsCounter == tab.length)
        stepsCounter = 0
    if (tab.length != 0) {
        $(".rocket").remove()
        let rocket = $("<img>")
            .prop("src", "rocket.png")
            .addClass("rocket")
        $(".gamePanel").append(rocket)

        let currentStepsCounter = stepsCounter
        if (direction)
            currentStepsCounter = (tab.length - stepsCounter - 1)
        rocket
            .css("left", tab[currentStepsCounter].x - 77 + "px")
            .css("top", tab[currentStepsCounter].y - 60 + "px")


    }
    stepsCounter++



}

$("#steps").on("click", function () {
    moveRocket()
})

isJumpingSet = false
let interval
$("#jumping").on("click", function () {
    isJumpingSet = !isJumpingSet


    if (isJumpingSet) {
        interval = setInterval(function () {
            moveRocket()

        }, 1000)
    } else {
        clearInterval(interval)
    }

})

let start
function animateRocket() {
        
    if (start) {
        console.log("przemieszczanie rakiety")
    }

    requestAnimationFrame(animateRocket)
}


$("#fly").on("click", function () {
    //console.log("TODO")
})

$("#flyDirection").on("click", function () {
    direction = $("#flyDirection").prop("checked")
    //console.log(direction)
})
