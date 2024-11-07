function generateRandomMinesPositions(width, height, bombAmount, addedBombsArray = []) {
    /*
        Argumenty:
            -> width: szerokość tabeli
            -> height: wysokość tabeli
            -> bombAmount: ilość bomb
        Ta funkcja generuje unikalne pozycje bomb w tablicy 2 wymiarowej.
        Zwraca tablicę dwuwymiarową w podanym juz rozmiarze
    */

    // Deklaracja zmiennych
    let addedBombsCords = addedBombsArray // tablica do której dodawać będziemy unikalne kordynaty bomb, to ją będziemy zwracać
    let randomX = Math.floor(Math.random() * width) // zwraca liczbę od 0 do width -1
    let randomY = Math.floor(Math.random() * height) // zwraca liczbę od 0 do height -1
    let isUnique = true
    if (addedBombsCords.length < bombAmount) {
        for (let i = 0; i < addedBombsCords.length; i++) {
            if (addedBombsCords[i][0] == randomX & addedBombsCords[i][1] == randomY) {
                isUnique = false
            }
        }
        if (isUnique)
            addedBombsCords.push([randomX, randomY])
        generateRandomMinesPositions(width, height, bombAmount, addedBombsCords)
    }
    return addedBombsCords
}

function generateSaperMapWithBombs(width, height, minesAmount) {
    /*
        Argumenty:
            -> width: szerokość tabeli
            -> height: wysokość tabeli
            -> bombAmount: ilość bomb
        Ta funkcja generuje tablicę 2 wymiarową z bombami oznaczonymi -1 oraz resztą pól oznaczonych liczbami graniczących bomb w promieniu 9 kratek tak jak w saperze.
        Rozmiar tablicy to width na height.
    */

    // Deklaracja zmiennych
    let returnedArray = []
    let minesPos = generateRandomMinesPositions(width, height, minesAmount) // tablica z bombami

    // #1 Pierwsza pętla tworzy tablicę tylko z samymi bombami
    for (let h = 0; h < height; h++) {
        let rowArray = []
        for (let w = 0; w < width; w++) {
            let bomb = false
            for (let bombI = 0; bombI < minesPos.length; bombI++) {
                if (minesPos[bombI][0] == w & minesPos[bombI][1] == h) { // tutaj znajduje sie bomba
                    bomb = true
                    rowArray.push(-1)
                }
            }
            if (!bomb)
                rowArray.push(0)
        }
        returnedArray.push(rowArray)
    }

    // #2 Druga pętla dodaje do tablicy pola graniczące z bombami - takie z numerami 1, 2, 3 itd.
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            if (returnedArray[h][w] == -1) {
                //console.log("X: " + w + " Y: " + h) // tutaj znajduje sie bomba

                // Dodawanie pola nad bombą
                if (h != 0) {
                    if (returnedArray[h - 1][w] != -1) {
                        returnedArray[h - 1][w] += 1
                    }
                }

                // Dodawanie pola pod bombą
                if (h != height - 1) {
                    if (returnedArray[h + 1][w] != -1) {
                        returnedArray[h + 1][w] += 1
                    }
                }


                // Dodawanie pola na lewo od bomoby
                if (w != 0) {
                    if (returnedArray[h][w - 1] != -1) {
                        returnedArray[h][w - 1] += 1
                    }
                }

                // Dodawanie pola na prawo od bomoby
                if (w != width - 1) {
                    if (returnedArray[h][w + 1] != -1) {
                        returnedArray[h][w + 1] += 1
                    }
                }

                // Dodawanie pola na lewo nad bombą
                if (w != 0 & h != 0) {
                    if (returnedArray[h - 1][w - 1] != -1) {
                        returnedArray[h - 1][w - 1] += 1
                    }
                }

                // Dodawanie pola na prawo nad bombą
                if (w != width - 1 & h != 0) {
                    if (returnedArray[h - 1][w + 1] != -1) {
                        returnedArray[h - 1][w + 1] += 1
                    }
                }

                // Dodawanie pola na lewo pod bombą
                if (w != 0 & h != height - 1) {
                    if (returnedArray[h + 1][w - 1] != -1) {
                        returnedArray[h + 1][w - 1] += 1
                    }
                }

                // Dodawanie pola na prawo pod bombą
                if (w != width - 1 & h != height - 1) {
                    if (returnedArray[h + 1][w + 1] != -1) {
                        returnedArray[h + 1][w + 1] += 1
                    }
                }
            }
        }
    }

    return returnedArray
}


function isIn2dArray(h, w, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].h == h && array[i].w == w)
            return true
        return false
    }
}

function discoverNextZeros(map, w, h) {
    /* 
    
        Argumenty:
            -> map: tablica z ustawionymi polami sapera (bombami, liczbami, etc.)
            -> w: koordynat x od którego zaczynamy szukać
            -> h: koordynat y od którego zaczynamy szukać
            -> visitedPositions: tablica z odkrytymi juz polami z zerem
        Jest to specjalna funckja odkrywająca zera i liczby dookoła
        Algorytm działa tak, ze sprawdza do okoła czy są zera, jezeli tak to dodaje do tablicy, natomiast zawsze (nawet jak nie są to zera) to i tak wypisuje na polach liczby. 
        Nastepnie jak skoncza sie pola dookola to przechodzi przez kazdy element  tablicy i ponownie sprawdza pola dokola niego. 
        Jezeli sa one puste I NIE NALEZA JUZ DO TABLICY to je dodaje.
    */
    let array = [ //tablica z polami dookoła badanego pola
        { h: -1, w: -1 }, //góra lewo
        { h: -1, w: 0 }, //góra
        { h: -1, w: +1 }, //góra prawo
        { h: 0, w: -1 }, //lewo
        { h: 0, w: 1 }, //prawo
        { h: +1, w: -1 }, //dół lewo
        { h: +1, w: 0 },  //dół
        { h: +1, w: 1 } //dół prawo
    ]

    let visitedPositions = [{ h: h, w: w }]






    let c = 0
    while (c < visitedPositions.length) {
        for (let i = 0; i < array.length; i++) {
            let width = visitedPositions[c].w + array[i].w
            let height = visitedPositions[c].h + array[i].h
            let td = document.getElementById("w" + width + "h" + height)
            let value = map[height]?.[width]
            if (td != null) {
                if (value == 0 && isIn2dArray(height, width, visitedPositions) == false && td.innerText == "") {
                    visitedPositions.push({ h: height, w: width })
                }
                td.innerText = value
                td.style.background = "white"
            }
        }
        c++
    }


}

function checkForWin(map) {
    let points = 0
    for (let h = 0; h < map.length; h++) {
        for (let w = 0; w < map[0].length; w++) {
            let elementBackground = document.getElementById("w" + w + "h" + h).style.background
            if (elementBackground == "white") {
                points++
            }
        }
    }

    return points
}

function game(map, interval) {
    /*
        Argumenty:
            -> map: Tablica z wygenerowaną planszą
        Funkcja ta tworzy kompletną tabelę do gry w sapera.
        Jako argument przyjmuje mapę (tablicę do gry w sapera, moze byc podana lub wygenerowana).
        Funkcja zwraca true, jezeli gracz wygra lub false jezeli przegra.
    */

    let height = map.length //tymczasowo lub na stałe
    let width = map[0].length //tymczasowo lub na stałe 
    let mapContainer = document.getElementById("mapContainer")
    let table = document.createElement("table")
    let bombsPos = []
    let flagAmount = 0
    let endGame = false
    let points = 0
    for (let h = 0; h < height; h++) {
        let tr = document.createElement("tr")
        for (let w = 0; w < width; w++) {
            let td = document.createElement("td")
            td.id = "w" + w + "h" + h
            tr.appendChild(td)
            if (map[h][w] == -1)
                bombsPos.push({ h: h, w: w })
            // Kiedy nacisniemy pole
            let clickCounter = 0
            td.addEventListener("mousedown", function (event) {
                let clickState = event.button
                if (!endGame) {
                    if (clickState == 0) { // kliknięcie LPM
                        if (map[h][w] == -1) {


                            for (let i = 0; i < bombsPos.length; i++) {
                                let bombCord = document.getElementById("w" + bombsPos[i].w + "h" + bombsPos[i].h)
                                bombCord.classList.remove("flag")
                                bombCord.classList.add("bomb")
                            }

                            endGame = true
                            alert("Przegrałeś")
                            window.clearInterval(interval)
                        } else {
                            points++
                            td.innerText = map[h][w]
                            td.style.background = "white"
                            if (map[h][w] == 0) {
                                points += discoverNextZeros(map, w, h)
                            }

                            if ((map.length * map[0].length) - bombsPos.length == checkForWin(map)) {
                                endGame = true
                                alert("Wygrałeś")
                                window.clearInterval(interval)
                                let userName = window.prompt("Podaj swoj nick")
                                let time = document.getElementById("time").innerText || 0
                                addCookie(userName, time*1000, width, height, bombsPos.length)
                            }
                        }
                        td.removeEventListener("mousedown", this)
                    } else if (clickState == 2) { // kliknięcie PPM
                        clickCounter++


                        if (clickCounter == 1) {
                            td.innerText = ""
                            td.classList.add("flag")
                            flagAmount++
                        } else if (clickCounter == 2) {
                            td.classList.remove("flag")
                            td.innerText = "?"
                            flagAmount--
                        } else {
                            td.innerText = ""
                            clickCounter = 0
                        }


                        document.getElementById("gameMines").textContent = "Pozostało bomb: " + (bombsPos.length - flagAmount)
                    }
                }

            })
        }
        table.appendChild(tr)
    }
    mapContainer.appendChild(table)
}

function createAlert(description) {
    let alert = document.createElement("div")
    alert.innerHTML = description
    alert.classList.add("alertDiv")
    document.getElementById("alertContainer").appendChild(alert)
}

function clearAlerts() {
    document.getElementById("alertContainer").innerHTML = ""
}

function generateInfoBar() {
    let mineTitle = document.createElement("h3")
    mineTitle.textContent = "Pozostało bomb: " + mines.value
    mineTitle.id = "gameMines"
    let infoContainer = document.getElementById("infoContainer")
    infoContainer.appendChild(mineTitle)

    let seconds = 0;
    let gameTime = document.createElement("h3")
    gameTime.innerHTML = "GRASZ: <span id=\"time\">0</span>[S]"
    gameTime.id = "gameTime"
    infoContainer.appendChild(gameTime)

    let interval = window.setInterval(function () {
        seconds += 1;
        document.getElementById("gameTime").innerHTML = "GRASZ: <span id=\"time\">" + seconds + "</span>[S]"
    }, 1000)
    return interval
}

function sortByThirdColumn(a, b) {
    if (a[0] === b[0]) {
        return 0;
    } else {
        return (a[0] < b[0]) ? 1 : -1;
    }
}

function sortBySecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    } else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}


function generateScoresInfo(scores) {
    /*
        Funkcja ta ma generować diva z informacjami o punktach
    */
    let scoresContainer = document.getElementById("scoresContainer")

    let allGameTypeList = document.createElement("ul")
    for(const key in scores){
        let details = document.createElement("details")
        let particularGameTypeElement = document.createElement("li")
        particularGameTypeElement.classList.add("gameTypeElements")
        let summary = document.createElement("summary")
        summary.innerText = key
        details.appendChild(summary)
        let gameTypePlayers = document.createElement("ul")
        
        for(let i = 0; i < scores[key].length; i++){
            let playerElement = document.createElement("li")
            playerElement.classList.add("playerElements")
            let date = new Date(parseInt(scores[key][i].time))
            
            let seconds = String(date.getUTCSeconds())
            seconds = (seconds.length == 1  ?  "0" + seconds : seconds)
            playerElement.innerText = scores[key][i].nickname + " - " + date.getUTCMinutes() + ":" +  seconds
            gameTypePlayers.appendChild(playerElement)
        }
        details.appendChild(gameTypePlayers)
        particularGameTypeElement.appendChild(details)
        allGameTypeList.appendChild(particularGameTypeElement)

    }
    scoresContainer.appendChild(allGameTypeList)

    
}


function decryptCookie(defaultBoardSize) {
    // Przykładowe ciasteczko cookie:
      document.cookie = "dimensions=20x20x20&nickname=Oliwier$time=60000&nickname=Mateusz$time=120000&nickname=Sebastian$time=240000%dimensions=20x10x2&nickname=Kuba$time=120000&nickname=Marcin$time=240000%dimensions=20x10x15&nickname=Kuba$time=120000&nickname=Marcin$time=240000"
    let existingCookie = document.cookie
    let gameTypesArray = existingCookie.split("%") // dzielimy cookie na poszczególne rodzaje plansz. Kazy element nowo powstałej tablicy będzie informacją o graczach w danym trybie rozgrywki (widthxheightxbombAmount)
    let gameTypeArray = {}
    for (let i = 0; i < gameTypesArray.length; i++) {
        let particularTypePlayerInfo = gameTypesArray[i].split("&") // dzielimy tą tablice na mniejsze informacje. Pierwszsy element tej tablicy będzie informacją o rozmiarach planszy, a następne elementy będą informacjami o graczach i ich czasach.
        let playerArray = []
        let boardSize
        for (let y = 0; y < particularTypePlayerInfo.length; y++) {
            if (y == 0) { // w tym przypadku mamy do czynienia z informacją o rozmiarze planszy.
                boardSize = particularTypePlayerInfo[y].split("=")[1]
                boardSize = (boardSize == "undefined" ? defaultBoardSize : boardSize)
                console.log(boardSize)
            } else {
                let playerInfo = particularTypePlayerInfo[y].split("$")
                let nickname = playerInfo[0].split("=")[1]
                let time = playerInfo[1].split("=")[1]
                let Player = { nickname: nickname, time: time }
                playerArray.push(Player)
            }
        }
        gameTypeArray[boardSize] = playerArray
    }
    return gameTypeArray
}

function cryptCookie(cookieArray){
    let cookie = ""
    let counter = 0
    for(const key in cookieArray){
        cookie += (counter==0 ? "dimensions="+key : "%dimensions"+key)    
        for(let i = 0; i < cookieArray[key].length; i++){
            cookie+="&nickname=" + cookieArray[key][i].nickname + "$time=" + cookieArray[key][i].time
        }
        counter++;
         
    }
    document.cookie = cookie
}



function addCookie(nickname, gameTime, width, height, bombAmount) {

    /*
        Argumenty:
            -> nickname: Nazwa gracza
            -> time: Czas w jakim skończył sapera
            -> width: Szerokość planszy
            -> height: Wysokość planszy
            -> bombAmount: Ilość bomb
        Funkcja ta pobiera dotychczasowe ciasteczko cookie, następnie zamienia je na mapę z tablicami w środku.
        Mapa trzyma tablice, w których posortowane są 10 najlepszych czasów, od najmniejszego do najwyszego. Mapa jako klucze ma stringa "szerokośćPlanszy/wysokośćPlanszy/ilośćBomb".
    */
    
    // console.table(coo)
    let gameDimension = width + "x" + height + "x" + bombAmount
    let cookie = decryptCookie(gameDimension)
    let categoryExist = false
    let newPlayer = {nickname: nickname, time: gameTime}

    for (const key in cookie){
        console.log(key)
        if(key == gameDimension){
            categoryExist = true
            let playerArray = cookie[key]
            let isAdded = false

            for(let i = 0; i < playerArray.length; i++){
                

                if(gameTime < playerArray[i].time){
                    playerArray.splice(i, 0, newPlayer)
                    isAdded = true
                    break
                }
                
            }
            if(!isAdded)
                playerArray.push(newPlayer)

            if(playerArray.length > 10)
                playerArray.length = 10
        } 
    }
    if(!categoryExist)
        cookie[gameDimension] = [newPlayer]
    
        

    console.table(cookie)
    cryptCookie(cookie)
}

function main() {
    // Deklarowanie elementów z htmla
    let button = document.getElementById("button");
    let height = document.getElementById("height");
    let width = document.getElementById("width");
    let mines = document.getElementById("mines");

    // Deklaracja zmiennych
    let wrongInput


    // Generowanie pola z wynikami
    generateScoresInfo(decryptCookie())

    button.addEventListener("click", function () {

        // Czyszczenie dodanych alertów
        clearAlerts()

        // Walidacja pól
        if (!height.value | !width.value | !mines.value) {
            createAlert("Pola nie zostały wypełnione")
        } else {  // Jezeli nie ma pustego pola           
            if (isNaN(height.value)) {
                wrongInput = height
            } else if (isNaN(width.value)) {
                wrongInput = width
            } else if (isNaN(mines.value)) {
                wrongInput = mines
            } else if (mines.value > width.value * height.value) {
                createAlert("Podano więcej min niz rozmiar planszy.")
            } else { // Kiedy wszystkie pola są podane w porządku mozemy zacząc tworzyc mape
                button.disabled = true // blokujemy przycisk
                let interval = generateInfoBar() // generujemy panel z informacjami o bombach
                let map = generateSaperMapWithBombs(width.value, height.value, mines.value)

                game(map, interval)
            }

            if (wrongInput) {
                window.setTimeout(function () {
                    wrongInput.value = ""
                }, 1000)
            }
        }

    })

}

