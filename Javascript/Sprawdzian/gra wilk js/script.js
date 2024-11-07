let container = document.getElementById("container")
let mainArray = []
let wolfPos = 1;
// 0    1
// 2    3
let wolf = document.createElement("div")
wolf.classList.add("wolf")


let square0 = document.getElementById("square0")
let square1 = document.getElementById("square1")
let square2 = document.getElementById("square2")
let square3 = document.getElementById("square3")

//let squareArray = [square0, square1, square2, square3]

square1.appendChild(wolf)

console.log("hej")
let slopeWidth = 5
for(let i = 0; i < 4; i++){
    let currentSlope = []
    for(let y = 0; y < slopeWidth; y++){
        currentSlope.push(0)
    }
    mainArray.push(currentSlope)
}


function generateRandomEgg(){
    let random = Math.floor(Math.random() * 4)
   
    let interval 
    function going(){
        
        if(timer!=0){
            document.getElementById(String(random)+String(timer-1)).style.background = "orange"
        }
        document.getElementById(String(random)+String(timer)).style.background = "yellow"
        if(timer == 4){
            document.getElementById(String(random)+String(5)).style.background = "orange"
            clearInterval(interval)
        }
        timer++
    }



        let timer = 0
        interval = setInterval(going, 1000)
        

        

}

generateRandomEgg()

// console.table(mainArray)


//slope up left
for(let i = 0; i < slopeWidth; i++){
    let miniSquare = document.createElement("div")
    miniSquare.classList.add("square")
    miniSquare.style.left = i*30 + "px"
    miniSquare.style.top = i*30 + "px"
    miniSquare.id = "0"+i
    square0.appendChild(miniSquare)
}

for(let i = 0; i < slopeWidth; i++){
    let miniSquare = document.createElement("div")
    miniSquare.classList.add("square")
    miniSquare.style.left = i*30 + "px"
    miniSquare.style.top = i*30 + "px"
    miniSquare.id = "2"+i
    square2.appendChild(miniSquare)
}

for(let i = 0; i < slopeWidth; i++){
    let miniSquare = document.createElement("div")
    miniSquare.classList.add("square")
    miniSquare.style.right = i*30 + "px"
    miniSquare.style.top = i*30 + "px"
    miniSquare.id = "1"+i
    square1.appendChild(miniSquare)
}

for(let i = 0; i < slopeWidth; i++){
    let miniSquare = document.createElement("div")
    miniSquare.classList.add("square")
    miniSquare.style.right = i*30 + "px"
    miniSquare.style.top = i*30 + "px"
    miniSquare.id = "3"+i
    square3.appendChild(miniSquare)
}

window.addEventListener("keydown", (e)=>{
    console.log(e.key)
    switch(e.key){
        case "ArrowLeft":
            console.log(wolfPos)
            if(wolfPos==1){
                square1.removeChild(wolf)
                wolfPos=0
                wolf.classList.replace("wolfR", "wolfL")
                square0.appendChild(wolf)
            } else if (wolfPos==3){
                square3.removeChild(wolf)
                wolfPos=2
                square2.appendChild(wolf)
                wolf.classList.replace("wolfR", "wolfL")

            }
            break

        case "ArrowRight":
            if(wolfPos==0){
                square0.removeChild(wolf)
                wolfPos=0
                square1.appendChild(wolf)
                wolf.classList.replace("wolfL", "wolfR")
            } else if (wolfPos==2){
                square2.removeChild(wolf)
                wolfPos=3
                square3.appendChild(wolf)
                wolf.classList.replace("wolfL", "wolfR")

            }
            break

        case "ArrowDown":
        if(wolfPos==0){
            square0.removeChild(wolf)
            wolfPos=2
            square2.appendChild(wolf)
        } else if (wolfPos==1){
            square1.removeChild(wolf)
            wolfPos=3
            square3.appendChild(wolf)

        }
        break

        case "ArrowUp":
        if(wolfPos==2){
            square2.removeChild(wolf)
            wolfPos=0
            square0.appendChild(wolf)
        } else if (wolfPos==3){
            square3.removeChild(wolf)
            wolfPos=1
            square1.appendChild(wolf)

        }
        break

    }
})









