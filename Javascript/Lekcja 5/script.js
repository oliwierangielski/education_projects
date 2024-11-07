const width = 16
const height = 16
let x = Math.ceil(width / 2) - 1
let y = Math.ceil(height / 2) - 1
let appleAmount = width * height - 2
let snake = [
    { x: x, y: y, direction: "right", image: "head_right" },
    { x: x - 1, y: y, direction: "right", image: "tail_left" }
]
let turns = []

function generateNewApple() {
    let finished = false
    let randomX
    let randomY
    while (!finished) {
        randomX = Math.floor(Math.random() * width)
        randomY = Math.floor(Math.random() * height)

        if(document.getElementById("row"+randomY+"col"+randomX).style.backgroundImage == "")
            finished = true
            
    }
    document.getElementById("row" + randomY + "col" + randomX).style.backgroundImage = "url(\"images/apple.png\")"
    
    return { x: randomX, y: randomY }
}


function prepareMap() {
    let content = document.getElementById("content")
    let table = document.createElement("table")
    for (let y = 0; y < height; y++) {
        let tr = document.createElement("tr")
        for (let i = 0; i < width; i++) {
            let td = document.createElement("td")
            td.id = "row" + y + "col" + i
            if ((i + y) % 2 == 0)
                td.style.background = "lightgreen"
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    content.appendChild(table)
}



function main() {
    // Przygotowanie mapy
    prepareMap()

    // Przygotowanie przycisku zaczynającego grę
    let button = document.createElement("button")
    button.innerText = "Zagraj"
    content.appendChild(button)


    // Przygotowanie węza i jego tekstury
    for (i in snake) {
        document.getElementById("row" + snake[i].y + "col" + snake[i].x).style.backgroundImage = "url(\"images/" + snake[i].image + ".png\")"
    }

    // Generowanie pierwszego jabłka
    let apple = generateNewApple()



    button.onclick = function () {
        button.style.opacity = 0



        let direction = "right"
        let oldDirection
        document.body.onkeydown = function (e) {
            oldDirection = direction
            if(turns[turns.length-1]?.x != snake[0].x | turns[turns.length-1]?.y != snake[0].y){
                switch (e.key) {
                    case "ArrowUp":
                        if (direction != "down")
                            direction = "up"
                        if (oldDirection == "right") {
                            turns.push({ x: snake[0].x, y: snake[0].y, direction: "up", image: "body_topleft" })
                        } else if (oldDirection == "left") {
                            turns.push({ x: snake[0].x, y: snake[0].y, direction: "up", image: "body_topright" })
                        }
    
                        break
                    case "ArrowDown":
                        if (direction != "up")
                            direction = "down"
                        if (oldDirection == "right") {
                            turns.push({ x: snake[0].x, y: snake[0].y, direction: "down", image: "body_bottomleft" })
                        } else if (oldDirection == "left") {
                            turns.push({ x: snake[0].x, y: snake[0].y, direction: "down", image: "body_bottomright" })
                        }
                        break
                    case "ArrowLeft":
                        if (direction != "right")
                            direction = "left"
                        if (oldDirection == "up") {
                            turns.push({ x: snake[0].x, y: snake[0].y, direction: "left", image: "body_bottomleft" })
                        } else if (oldDirection == "down") {
                            turns.push({ x: snake[0].x, y: snake[0].y, direction: "left", image: "body_topleft" })
                        }
                        break
    
                    case "ArrowRight":
                        if (direction != "left")
                            direction = "right"
                        if (oldDirection == "up") {
                            turns.push({ x: snake[0].x, y: snake[0].y, direction: "right", image: "body_bottomright" })
                        } else if (oldDirection == "down") {
                            turns.push({ x: snake[0].x, y: snake[0].y, direction: "right", image: "body_topright" })
                        }
    
                        break
                }
                snake[0].direction = direction
            }
        }



        let gameLoop = setInterval(function () {

            if(apple == null)
                apple = generateNewApple()

            

            if(snake.length == width*height){
                clearInterval(gameLoop)
                alert("Wygrałeś!")
                return
            }

            for (i in snake) {
                document.getElementById("row" + snake[i].y + "col" + snake[i].x).style.backgroundImage = ""
            }

            let yPos = 0
            let xPos = 0



            mainLoop:
            for (i in snake) {

                if (i != 0) {
                    for (let z = 0; z < turns.length; z++) {
                        if (snake[i].x == turns[z].x & snake[i].y == turns[z].y) {
                            snake[i].direction = turns[z].direction
                            if (i == snake.length - 1) { 
                                turns.splice(z, 1)
                            }
                        }

                    }
                }

                switch (snake[i].direction) {
                    case "up":
                        yPos = -1
                        xPos = 0
                        if (i == 0) {
                            snake[i].image = "head_up"
                        } else if (i == snake.length - 1) {
                            snake[i].image = "tail_down"
                        } else {
                            snake[i].image = "body_vertical"
                        }
                        break

                    case "down":
                        yPos = 1
                        xPos = 0
                        if (i == 0) {
                            snake[i].image = "head_down"
                        } else if (i == snake.length - 1) {
                            snake[i].image = "tail_up"
                        } else {
                            snake[i].image = "body_vertical"
                        }
                        break

                    case "left":
                        xPos = -1
                        yPos = 0
                        if (i == 0) {
                            snake[i].image = "head_left"
                        } else if (i == snake.length - 1) {
                            snake[i].image = "tail_right"
                        } else {
                            snake[i].image = "body_horizontal"
                        }
                        break

                    case "right":
                        xPos = 1
                        yPos = 0
                        if (i == 0) {
                            snake[i].image = "head_right"
                        } else if (i == snake.length - 1) {
                            snake[i].image = "tail_left"
                        } else {
                            snake[i].image = "body_horizontal"
                        }
                        break
                }

                snake[i].y += yPos
                snake[i].x += xPos


                /*
                    W tym miejscu dzieje się cała logika węza
                */
                for (let b in snake) {

                    if (b != 0 & snake[0].x == snake[b].x & snake[0].y == snake[b].y) {
                        alert("Przegrałeś!")
                        location.reload()
                    }
                }
                if (i == 0 & snake[i].x < 0 | snake[i].x > (width - 1) | snake[i].y < 0 | snake[i].y > (height - 1)) {
                    alert("Przegrałeś")
                    location.reload()
                } else {
                    


                    // Dodawanie tekstór węzowi
                    let isTurn = false
                    for (t in turns) {
                        if (snake[i].x == turns[t].x & snake[i].y == turns[t].y) {
                            document.getElementById("row" + snake[i].y + "col" + snake[i].x).style.backgroundImage = "url(\"images/" + turns[t].image + ".png\")"
                            isTurn = true
                            break
                        }
                    }
                    if (!isTurn)
                        document.getElementById("row" + snake[i].y + "col" + snake[i].x).style.backgroundImage = "url(\"images/" + snake[i].image + ".png\")"



                    if (i == 0 & snake[i].x == apple?.x & snake[i].y == apple?.y) {
                        let lastSnakePart = snake[snake.length - 1]

                        switch (lastSnakePart.direction) {
                            case "up":
                                lastSnakePart.image = "body_vertical"
                                snake.push({ x: lastSnakePart.x, y: lastSnakePart.y, direction: lastSnakePart.direction, image: "tail_down" })
                                break
                            case "down":
                                lastSnakePart.image = "body_vertical"
                                snake.push({ x: lastSnakePart.x, y: lastSnakePart.y, direction: lastSnakePart.direction, image: "tail_up" })
                                break
                            case "left":
                                lastSnakePart.image = "body_horizontal"
                                snake.push({ x: lastSnakePart.x, y: lastSnakePart.y, direction: lastSnakePart.direction, image: "tail_right" })
                                break
                            case "right":
                                lastSnakePart.image = "body_horizontal"
                                snake.push({ x: lastSnakePart.x, y: lastSnakePart.y, direction: lastSnakePart.direction, image: "tail_left" })
                                break
                        }
                        document.getElementById("row" + apple.y + "col" + apple.x).style.backgroundImage = "url(\"images/" + snake[0].image + ".png\")"
                        apple = null

                    }
                }
            }
        }, 150)
    }
}

main()


