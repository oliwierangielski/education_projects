class Game {
    constructor(main) {
        this.main = main
        this.scene = new THREE.Scene();
        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)
        this.camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 500, 800)
        this.camera.lookAt(this.scene.position)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x222222);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.raycaster = new THREE.Raycaster()
        this.mouseVector = new THREE.Vector2()
        document.getElementById("root").append(this.renderer.domElement);
        this.render() // wywołanie metody render
        this.chessboard = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]
        ]
        this.pawns = [
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]
        ]
        this.obj = new THREE.Object3D()
        this.pawnObj = new THREE.Object3D()
        this.pawnObj.visible = false
        this.obj.add(this.pawnObj)
        for (let i in this.chessboard) {
            for (let y in this.chessboard[i]) {
                this.chessboard[i][y] = new Field(this.chessboard[i][y], { x: i, y: y })
                this.obj.add(this.chessboard[i][y])
                if (this.pawns[i][y] != 0) {
                    this.chessboard[i][y].setPawn(new Pawn(this.pawns[i][y]))
                    this.pawnObj.add(this.chessboard[i][y].pawn)
                }
            }
        }
        this.obj.position.x += 350
        this.obj.position.z -= 350
        this.obj.rotation.y = -Math.PI / 2
        this.scene.add(this.obj)
    }

    render = () => {
        requestAnimationFrame(this.render);
        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }

    setChessBoard = (id) => {
        this.pawnObj.visible = true
        if (id == 2) {
            this.camera.position.z *= -1;
            this.camera.lookAt(this.scene.position)
        }
    }
    playOpponentMove(oldPos, newPos, capInfo, becQueen) {
        // Bicie (jeżeli jest)
        if (capInfo != null) {
            let capPos = capInfo.position
            this.chessboard[newPos.row][newPos.column].captureField = this.chessboard[capPos.row][capPos.column]
            this.chessboard[newPos.row][newPos.column].capturing = this.pawnCapture
        }
        let pawn = this.chessboard[oldPos.row][oldPos.column].pawn
        this.chessboard[oldPos.row][oldPos.column].pawn = undefined
        this.chessboard[newPos.row][newPos.column].setPawn(pawn)
        // Jeżeli została damką
        if (becQueen && !pawn.isQueen)
            pawn.setQueen()
    }
    setPlayingPlayer() {
        let clickE
        let lastClickedPawn = {}
        let selectedFields = []
        // Funkcja przypisująca możliwe pola do kliknięcia
        let proposeField = (row, col) => {
            let moveDirect = (this.id == 1) ? -1 : 1
            for (let i = -1; i <= 1; i += 2) {
                for (let y = -1; y <= 1; y += 2) {
                    let fieldProposed = this.chessboard[row + i * moveDirect]?.[col + y * moveDirect]
                    let fieldProposedwithCapture = this.chessboard[row + 2 * i * moveDirect]?.[col + 2 * y * moveDirect]
                    if (fieldProposed != undefined) { // Jeżeli w ogóle istnieje pole
                        if (fieldProposed.pawn == undefined && i != -1) { // Ruch do przodu
                            fieldProposed.setDotMaterial()
                            selectedFields.push(fieldProposed)
                        } else if (fieldProposed.pawn != undefined & fieldProposedwithCapture != undefined) {
                            if (fieldProposedwithCapture.pawn == undefined & fieldProposed.pawn.sideId != this.id) {
                                fieldProposedwithCapture.setDotMaterial()
                                selectedFields.push(fieldProposedwithCapture)
                                fieldProposedwithCapture.captureField = fieldProposed
                            }
                        }
                    }
                }
            }
        }
        let proposeQueenField = (row, col) => {
            let n = 1
            let pawnsOnWay = []
            let stop = false
            for (let i = -1; i <= 1; i += 2) {
                for (let y = -1; y <= 1; y += 2) {
                    n = 1
                    stop = false
                    pawnsOnWay = []
                    while (this.chessboard[row + i * n]?.[col + y * n] != undefined && !stop) {
                        let currentField = this.chessboard[row + i * n][col + y * n]
                        if (currentField.pawn != undefined) {
                            if (currentField.pawn.sideId != this.id) {
                                // Jeżeli 1 to zbicie, jeżeli więcej to stop
                                pawnsOnWay.push(currentField)
                            }
                            if (currentField.pawn.sideId == this.id || pawnsOnWay.length >= 2) {
                                stop = true
                            }
                        } if (currentField.pawn == undefined) {
                            currentField.setDotMaterial()
                            selectedFields.push(currentField)
                            if (pawnsOnWay[0] != undefined)
                                currentField.captureField = pawnsOnWay[0]
                        }
                        n++
                    }
                }
            }
        }
        // Funkcja czyszcząca pola możliwe do kliknięcia
        let clearFields = () => {
            selectedFields.forEach((element) => {
                element.material = Field.material[1]
                element.isProposed = false
                element.captureField = undefined
            })
        }

        window.onmousedown = (e) => {
            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                clickE = intersects[0].object
                if (clickE.name == "Pawn" && clickE.sideId == this.id) {
                    lastClickedPawn.mesh?.material.color.setHex(lastClickedPawn.color)
                    // Czyszczenie tekstury z kropką
                    clearFields()
                    lastClickedPawn = { mesh: clickE, color: '0x' + clickE.material.color.getHex().toString(16) }
                    clickE.material.color.setHex(0xffff00)
                    let row = clickE.tablePos.row
                    let col = clickE.tablePos.column
                    let mat = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/mats/darkDotted.png'), transparent: false })
                    if (clickE.isQueen == false) {
                        // Tworzenie tekstury z kropką
                        proposeField(row, col)
                    } else if (clickE.isQueen == true) {
                        proposeQueenField(row, col)
                    }
                } else if (clickE.name == "Field" && clickE.isProposed == true) {
                    let becomeQueen = false
                    // Bicie
                    let capturingInfo = null
                    if (clickE.captureField != undefined && clickE.captureField.pawn != undefined) {
                        capturingInfo = { position: clickE.captureField.tablePos, id: clickE.captureField.pawn.sideId }
                        clickE.capturing = this.pawnCapture
                    }
                    // Damka
                    if ((this.id == 1 && clickE.tablePos.row == 0 || this.id == 2 && clickE.tablePos.row == 7) && !lastClickedPawn.mesh.isQueen) {
                        becomeQueen = true
                        lastClickedPawn.mesh.setQueen()
                    }
                    this.main.net.registerMove(lastClickedPawn.mesh.field.tablePos, clickE.tablePos, capturingInfo, becomeQueen)
                    clickE.setPawn(lastClickedPawn.mesh)
                    lastClickedPawn.mesh?.material.color.setHex(lastClickedPawn.color)
                    clearFields()
                    clearTimeout(this.roundTimeout)
                    this.endTurn()
                }
            }
        }
    }
    pawnCapture = (captureField) => {
        this.pawnObj.remove(captureField.pawn)
        captureField.pawn = undefined
        captureField = undefined
    }
    startTurn() {
        this.roundTimeout = setTimeout(() => { this.endTurn() }, 30000)
        if (this.id == this.playingPlayer) {
            this.setPlayingPlayer(this.id)
        } else {
            this.main.ui.openTurnDialog()
        }
    }
    endTurn() {
        window.onmousedown = null
        if (this.id != this.playingPlayer)
            this.main.ui.closeTurnDialog()
        this.playingPlayer = (this.playingPlayer == 1) ? 2 : 1
        this.startTurn()
    }
    startGame(id) {
        this.main.net.awaitMove()
        this.main.net.awaitGameFinish()
        this.id = id
        this.playingPlayer = 1
        this.startTurn()
    }
    finishGame(winner) {
        window.onmousedown = null
        clearTimeout(this.roundTimeout)
        if (this.id != this.playingPlayer)
            this.main.ui.closeTurnDialog()
        console.log(winner, this.id)
        this.main.ui.toggleScoreDialog(winner == this.id)
    }
}