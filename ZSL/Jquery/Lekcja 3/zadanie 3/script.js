function setUpLabyrinth() {
    // Ustawienie wszystkich zmiennych
    let mapWidt = 5
    let mapHeight = 5
    let topic = $("<h2>").text("T: Labirynt - tablice obiektów")
    let labyrinthContainer = $("<div>").addClass("labyrinthContainer")
    let labyrinthContainerReflection  = $("<div>").addClass("labyrinthContainer")


    function prepareMap() {
        for (let i = 0; i < mapWidt; i++) {
            for (let y = 0; y < mapHeight; y++) {
                let square = $("<div>").addClass("square").css("left", i * (80 + 2)).css("top", y * (80 + 2))
                labyrinthContainer.append(square)

                let squreReflection = $("<div>").addClass("square").css("right", i * (80 + 2)).css("top", y * (80 + 2))
                labyrinthContainerReflection.append(squreReflection)

                square.on("click", function () {
                    square.css("background", "yellow")
                    squreReflection.css("background", "green")
                })

                squreReflection.on("click", function(){
                    squreReflection.css("background", "green")
                    square.css("background", "yellow")
                })
            }
        }
    }

    prepareMap()

    $("body").append(topic).append(labyrinthContainer).append(labyrinthContainerReflection).append($("div").css("clear: both;"))

}

setUpLabyrinth()