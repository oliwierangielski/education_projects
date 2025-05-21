function Zadanie1() {
    let canvas1 = document.getElementById("zadanie1")
    let ctx1 = canvas1.getContext("2d")
    let width = canvas1.width
    let height = canvas1.height
    
    setInterval(function () {
        let randomX = Math.floor(Math.random() * width)
        let randomY = Math.floor(Math.random() * height)
        let randomColor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.random() + ")"

        ctx1.beginPath()
        ctx1.moveTo(width / 2, height / 2)
        ctx1.lineTo(randomX, randomY)
        ctx1.stroke()
        ctx1.lineWidth = 1.5
        ctx1.strokeStyle = randomColor

    }, 100)
}

function Zadanie2(){
    let canvas2 = document.getElementById("zadanie2")
    let ctx2 = canvas2.getContext("2d")
    let interval
    let coords = {}

    canvas2.onmouseover = () => {
        this.interval = setInterval(function(){
            let randomAngle = Math.random() * 2
            ctx2.beginPath()
            ctx2.arc(coords.x, coords.y, 50, randomAngle*Math.PI, (randomAngle+0.25)*Math.PI)
            ctx2.lineWidth = 5
            ctx2.strokeStyle = "rgba(106,63,255,0.1)"
            ctx2.stroke()
            ctx2.closePath()
            canvas2.onmousemove = (event) => {
                let rect = canvas2.getBoundingClientRect()
                coords = {x: event.clientX - rect.left, y: event.clientY - rect.top}
            }
        }, 10)
    }

    canvas2.onmouseout = () => {
        clearInterval(this.interval)
    }
    
    
}


function Zadanie3(){
    let canvas3 = document.getElementById("zadanie3")
    let ctx3 = canvas3.getContext("2d")

    class Dollar{
        img = new Image();
        constructor(){
            this.pickDollarStyle()   
        }
        pickDollarStyle(){
            let randomStyle = Math.floor(Math.random() * 3)
            switch(randomStyle){
                case 0:
                    this.vector = {x: 5, y: 3}
                    this.imageSize = {width: 66.6, height: 103.5}
                    break
                case 1:
                    this.vector = {x:2, y: 7}
                    this.imageSize = {width: 72, height: 102.75}
                    break
                case 2:
                    this.vector = {x: 7, y: 7}
                    this.imageSize = {width: 62.4, height: 98.7}
                    break;
            }
            this.img.src = "./images/dollar" + (randomStyle+1) + ".png"
            this.position = {
                x: Math.random() * (canvas3.width-this.imageSize.width),
                y: Math.random() * (canvas3.height-this.imageSize.height)
            }
        }
        run(otherDollars, thisDollarId){
            this.position.x += this.vector.x
            this.position.y += this.vector.y
            ctx3.drawImage(this.img, this.position.x, this.position.y, this.imageSize.width, this.imageSize.height )
            if(this.position.x <= 0 || (this.position.x + this.imageSize.width) >= canvas3.width){
                this.vector.x = -this.vector.x
            }
            if(this.position.y <= 0 || (this.position.y + this.imageSize.height) >= canvas3.height){
                this.vector.y = -this.vector.y
            }
            for(let i in otherDollars){
                if(i != thisDollarId){
                    if( (this.position.y <= otherDollars[i].position.y + otherDollars[i].imageSize.height && this.position.y > otherDollars[i].position.y + otherDollars[i].imageSize.height-20) && ( (this.position.x + this.imageSize.width >= otherDollars[i].position.x && this.position.x + this.imageSize.width <= otherDollars[i].position.x + otherDollars[i].imageSize.width) || (this.position.x >= otherDollars[i].position.x && this.position.x <= otherDollars[i].position.x + otherDollars[i].imageSize.width))){
                        this.vector.y = -this.vector.y
                        otherDollars[i].vector.y = -otherDollars[i].vector.y
                    }
                    if( (this.position.x + this.imageSize.width >= otherDollars[i].position.x && this.position.x + this.imageSize.width < otherDollars[i].position.x + otherDollars[i].imageSize.width) && ( (this.position.y >= otherDollars[i].position.y && this.position.y <= otherDollars[i].position.y + otherDollars[i].imageSize.height) || (this.position.y + this.imageSize.height >= otherDollars[i].position.y && this.position.y + this.imageSize.height <= otherDollars[i].position.y + otherDollars[i].imageSize.height) ) ){
                        this.vector.x = -this.vector.x
                        otherDollars[i].vector.x = -otherDollars[i].vector.x
                    }
                }
            }
        }
        static startBouncing(){
            // for(let i in arguments){
            //     arguments[i].img.onload = () => {
            //         if(i == arguments.length-1){ // on last loaded img
                        
            //         }
            //     }
            // }

            setInterval(() => {
                ctx3.clearRect(0,0,canvas3.width, canvas3.height)
                for(let i in arguments){
                    arguments[i].run(arguments, i)
                }
            }, 10)
        }
    }
    

    let dollar1 = new Dollar()
    let dollar2 = new Dollar()
    Dollar.startBouncing(dollar1, dollar2)
    
}

window.onload = function() {
    Zadanie1()
    Zadanie2()
    Zadanie3()
}