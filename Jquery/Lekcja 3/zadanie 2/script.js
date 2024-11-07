function setUpLabyrinth() {
    // Ustawienie wszystkich zmiennych
    let mapWidt = 5
    let mapHeight = 5
    let topic = $("<h2>").text("T: Labirynt - tablice obiektów")
    let buttonDiv = $("<div>")
    let startGameBtn = $("<button>").text("START GAME")
    let nextMoveBtn = $("<button>").text("NEXT MOVE")
    let resetGameBtn = $("<button>").text("RESET GAME")
    let labyrinthContainer = $("<div>").addClass("labyrinthContainer")
    let counter = 0;
    let onePlayerCounter = 0
    let twoPlayerCounter = 0
    let clickedSquares = []

    buttonDiv.append(startGameBtn).append(nextMoveBtn).append(resetGameBtn)

    function prepareMap() {
        let clickedSquares = []
        for (let i = 0; i < mapWidt; i++) {
            for (let y = 0; y < mapHeight; y++) {
                let square = $("<div>").addClass("square").css("left", i * (80 + 2)).css("top", y * (80 + 2))
                labyrinthContainer.append(square)

                square.on("click", function () {
                    square.css("background", "yellow")
                    clickedSquares.push({ left: square.css("left"), top: square.css("top") })
                })
            }
        }
        return clickedSquares
    }

    clickedSquares = prepareMap()


    let playerOneDiv = $("<div>").addClass("playerDiv").css("background", "blue")
    let playerTwoDiv = $("<div>").addClass("playerDiv").css("background", "green")
    $("body").append(topic).append(buttonDiv).append(labyrinthContainer).append(playerOneDiv).append(playerTwoDiv)






    startGameBtn.on("click", function () {

        if (clickedSquares.length < 3) {
            window.alert("Zbyt mała tablica")
        } else {
            $("body").remove(playerOneDiv).remove(playerTwoDiv)
            labyrinthContainer.append(playerOneDiv.css("position", "absolute").css("left", clickedSquares[0].left).css("top", clickedSquares[0].top))
            labyrinthContainer.append(playerTwoDiv.css("position", "absolute").css("left", clickedSquares[clickedSquares.length - 1].left).css("top", clickedSquares[clickedSquares.length - 1].top))
            startGameBtn.off("click")

            nextMoveBtn.on("click", function () {
                counter++
                if (counter % 2 != 0) {
                    onePlayerCounter++
                    playerOneDiv
                        .css("left", clickedSquares[onePlayerCounter].left)
                        .css("top", clickedSquares[onePlayerCounter].top)
                } else {
                    twoPlayerCounter++
                    playerTwoDiv
                        .css("left", clickedSquares[clickedSquares.length - twoPlayerCounter - 1].left)
                        .css("top", clickedSquares[clickedSquares.length - twoPlayerCounter - 1].top)
                }

                if (counter == 2 * (clickedSquares.length - 1)) {
                    nextMoveBtn.off("click")
                    setTimeout(function () { alert("Koniec!") }, 150);
                }

            })
        }
    })





    resetGameBtn.on("click", function () {
        $("body").empty()
        setUpLabyrinth()
    })
}

setUpLabyrinth()