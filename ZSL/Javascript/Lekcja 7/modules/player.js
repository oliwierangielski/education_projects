class Player {
    static playerAmount = 0
    static lap = 0
    static maxLap = 3
    vectorsArray = []
    inGame = true
    img = new Image()
    turnRadius = 0
    trackWidth = 12
    traceWidth = 200
    pressedKeys = {
        left: false,
        right: false
    }
    playerLap = 0
    isFirstLapCheck = true
    lapInfo = document.getElementById("lapInfo")




    constructor(controlKeys) {
        this.position = {
            x: Player.playfield.radius,
            // y: Player.playfield.canvasInfo.height - Player.playfield.radius / 4 - Player.playfield.lineWidth
            y: Player.playfield.canvasInfo.height - Player.playfield.radius / 2 + Player.playerAmount * 30 + 25
        }
        this.id = Player.playerAmount + 1
        Player.playerAmount++
        this.ctx = Player.playfield.ctx
        this.img.src = 'images/bike.png'

        // Events
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case controlKeys.left:
                    this.pressedKeys.left = true
                    break;
                case controlKeys.right:
                    this.pressedKeys.right = true
                    break;
            }
        })
        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case controlKeys.left:
                    this.pressedKeys.left = false
                    break;
                case controlKeys.right:
                    this.pressedKeys.right = false
                    break;
            }
        })

        this.trackColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
        this.nickName = "Gracz" + this.id
        this.controlKeys = controlKeys
    }

    start() {
        if (this.inGame) {
            // Turn bike after clicking the key

            if (this.pressedKeys.left) {
                this.turnRadius -= 0.1
            } else if (this.pressedKeys.right) {
                this.turnRadius += 0.1
            }



            this.ctx.lineWidth = 2
            this.ctx.beginPath()

            if (this.vectorsArray.length >= this.traceWidth) {
                this.vectorsArray.shift()
                this.ctx.moveTo(this.vectorsArray[this.vectorsArray.length - (this.traceWidth - 1)].x1, this.vectorsArray[this.vectorsArray.length - (this.traceWidth - 1)].y1)
            } else if (this.vectorsArray.length == 0) {
                this.ctx.moveTo(this.position.x, this.position.y)
            } else if (this.vectorsArray.length < this.traceWidth) {
                this.ctx.moveTo(this.vectorsArray[0].x1, this.vectorsArray[0].y1)
            }

            this.vectorsArray.forEach((vector) => {
                this.ctx.lineTo(vector.x2, vector.y2)
            })

            // Count new vector
            this.oldPosition = this.position
            this.position.x = this.position.x + this.trackWidth * Math.cos(this.turnRadius)
            this.position.y = this.position.y + this.trackWidth * Math.sin(this.turnRadius)
            this.vectorsArray.push({ x1: this.oldPosition.x, y1: this.oldPosition.y, x2: this.position.x, y2: this.position.y })

            // Start drawing
            this.ctx.lineTo(this.position.x, this.position.y)
            this.ctx.strokeStyle = this.trackColor
            this.ctx.stroke()
            this.ctx.closePath()
            console.log()

            // Check if outside trail
            if (Player.playfield.isPlayerOutsideTrail(this.position.x, this.position.y)) {
                this.inGame = false
                Player.playerAmount--
                if (Player.playerAmount == 0) {
                    clearInterval(Player.interval)
                    alert(this.nickName + " wygrał")
                }
            }

            // Check if lap
            if (this.position.x > Player.playfield.radius == true & this.isFirstLapCheck) {
                this.playerLap += 1
                this.lapInfo.innerText = (this.playerLap + " / " + Player.maxLap)
                if (this.playerLap > Player.lap) {
                    Player.lap = this.playerLap
                }

                if (Player.lap > Player.maxLap) {
                    clearInterval(Player.interval)
                    alert(this.nickName + " wygrał")
                }
                this.isFirstLapCheck = false
            } else if (this.position.x > Player.playfield.radius == false) {
                this.isFirstLapCheck = true
            }



            // Draw image
            this.ctx.save();
            let angle = -this.turnRadius / Math.PI * 180
            if (angle >= 360) {
                console.log("prosto")
                this.turnRadius = 0
            }

            let imgW = 2 * 15
            let imgH = 2 * 45
            let bikeOffset = 25
            this.ctx.translate(this.position.x + Math.sin(this.turnRadius) * imgW / 2 + Math.cos(this.turnRadius) * bikeOffset, this.position.y - Math.cos(this.turnRadius) * imgW / 2 + Math.sin(this.turnRadius) * bikeOffset);
            this.ctx.rotate(this.turnRadius + 90 * Math.PI / 180)

            if(this.id%6==0){
                this.ctx.drawImage(this.img, 425,418, 200, 387, 0, 0, imgW, imgH)
            } else if(this.id%5==0){
                this.ctx.drawImage(this.img, 250,451, 150, 387, 0, 0, imgW, imgH)
            } else if(this.id%4==0){
                this.ctx.drawImage(this.img, 75,451, 150, 387, 0, 0, imgW, imgH)
            } else if(this.id%3==0){
                this.ctx.drawImage(this.img, 410,76, 200, 387, 0, 0, imgW, imgH)
            } else if(this.id%2==0){
                this.ctx.drawImage(this.img, 250,76, 150, 387, 0, 0, imgW, imgH)
            } else{
                this.ctx.drawImage(this.img, 75,76, 150, 387, 0, 0, imgW, imgH)
            }

            this.ctx.restore();
        }
    }


}

export { Player };