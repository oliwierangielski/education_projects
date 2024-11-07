/**
 * @module Cell
 * @description This is a main module. It's a source for other modules. It holds  main game class.
 * @author Oliwier Angielski
 */


import { Cell, CellTypes } from "./Cell"
import { Graphic } from "./Graphic"
import { Table } from "./Table"
import { Virus } from "./Virus"
import { Colors } from "./Config"

enum GameStates {
    RUNNING,
    OVER,
    COMPLETED
}

type Pill = {
    x: number,
    y: number,
    color: Colors
}

interface Nic { // TODO: Usunąć po ocenie

}

interface Nic2 { // TODO: Usunąć 2 po ocenie

}
interface Nic3 {

}

class Game implements Nic, Nic2, Nic3 {
    private table = new Table(8,16)
    private cellsTable = this.table.cellsTable
    private graphic = new Graphic(this.table.htmlTable)
    private pill: Array<Pill>
    private round: number = 0
    private lastTime: number = 0;
    private pillFallSpeed = 1;
    private lastTurn: String = null
    private change: boolean = false
    private gameState: GameStates = GameStates.RUNNING
    private newRound: boolean = true

    constructor() {
        localStorage.setItem("score", "0")
        this.renderFrame()
    }
    renderFrame = (time = 0) => {
        if (time - this.lastTime >= 800 / this.pillFallSpeed) {
            this.lastTime = time

            if(this.newRound == true){
                switch(this.gameState){
                    case GameStates.RUNNING:
                        this.newRound = false
                        this.pillPiloting()
                        this.generateNewPill()
                        break;
                    case GameStates.COMPLETED:
                        console.log("completed")
                        break;
                    case GameStates.OVER:
                        console.log("over")
                        break;
                }
            } else {
                console.log(localStorage.getItem("score"), Virus.virusesArray.length)
                if(this.change == true){
                    this.startFalling()
                } else if((this.cellsTable[this.pill[0].y + 1]?.[this.pill[0].x]?.color != Colors.BLACK && !(this.pill[0].y + 1 == this.pill[1].y)) || (this.cellsTable[this.pill[1].y + 1]?.[this.pill[1].x]?.color != Colors.BLACK && !(this.pill[1].y + 1 == this.pill[0].y))) {
                    this.startSpanking()
                } else if(this.cellsTable[this.pill[0].y +1]?.[this.pill[0].x].color == Colors.BLACK || this.cellsTable[this.pill[1].y +1]?.[this.pill[1].x].color == Colors.BLACK){
                    this.movePill({ y: 1})
                } 
            }
        }
        requestAnimationFrame(this.renderFrame)
    }
    generateNewPill() {
        this.round++
        let genRandCol = () => {
            let random = Math.floor(Math.random() * 3)
            return [Colors.BROWN, Colors.YELLOW, Colors.BLUE][random] as Colors
        }
        this.pill = [
            { x: 3, y: 0, color: genRandCol() },
            { x: 4, y: 0, color: genRandCol() }
        ]
        this.pill.forEach((elem) => {
            if(this.cellsTable[elem.y][elem.x].color != Colors.BLACK){
                this.gameState = GameStates.OVER
                return
            }
            this.cellsTable[elem.y][elem.x].color = elem.color
        })
    }
    pillPiloting() {
        let isOnBorder = () => {
            for (let i in this.pill) {
                if (this.pill[i].x == 0) {
                    return "left"
                } else if (this.pill[i].x == 7) {
                    return "right"
                }
            }
            return false
        }
        window.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    if (isOnBorder() != "left") {
                        let leftBlock1 = this.cellsTable[this.pill[0].y][this.pill[0].x - 1]
                        let leftBlock2 = this.cellsTable[this.pill[1].y][this.pill[1].x - 1]
                        if ((leftBlock1.color == Colors.BLACK || (this.pill[0].x - 1 == this.pill[1].x)) && (leftBlock2.color == Colors.BLACK || (this.pill[1].x - 1 == this.pill[0].x)))
                            this.movePill({ x: -1 })
                    }
                    break;
                case "ArrowRight":
                    if (isOnBorder() != "right") {
                        let rightBlock1 = this.cellsTable[this.pill[0].y][this.pill[0].x + 1]
                        let rightBlock2 = this.cellsTable[this.pill[1].y][this.pill[1].x + 1]
                        if ((rightBlock1.color == Colors.BLACK || (this.pill[0].x + 1 == this.pill[1].x)) && (rightBlock2.color == Colors.BLACK || (this.pill[1].x + 1 == this.pill[0].x)))
                            this.movePill({ x: 1 })
                    }
                    break;
                case "ArrowUp":
                    this.rotatePill("right")
                    break;
                case "ArrowDown":
                    this.rotatePill("left")
                    break;
                case "Shift":
                    this.pillFallSpeed = 11
                    break;
            }
        }
        window.onkeyup = (event) => {
            switch (event.key) {
                case "Shift":
                    this.pillFallSpeed = 1
                    break;
            }
        }
    }
    stopPillPiloting(){
        window.onkeydown = (event) => {
            if(event.key == "Shift"){
                this.pillFallSpeed = 11
            }
        }
        window.onkeyup = (event) => {
            if(event.key == "Shift"){
                this.pillFallSpeed = 1
            }
        }
    }
    movePill({ x = 0, y = 0 }) {
        for (let i = 0; i < 3; i++) {
            let action = (elem: Pill) => { }
            switch (i) {
                case 0:
                    action = (elem) => {
                        this.cellsTable[elem.y][elem.x].color = Colors.BLACK
                    }
                    break;
                case 1:
                    action = (elem) => {
                        elem.x += x;
                        elem.y += y;
                    }
                    break;
                case 2:
                    action = (elem) => {
                        this.cellsTable[elem.y][elem.x].color = elem.color
                    }
                    break;
            }
            this.pill.forEach((elem) => {
                action(elem)
            })
        }
    }

    rotatePill(direction: String) {
        if (this.pill[0].y != 0 && this.pill[1].y != 0) {
            let position = (this.pill[0].y == this.pill[1].y) ? "horizontal" : "vertical"
            switch (direction) {
                case "left":
                    switch (position) {
                        case "horizontal":
                            if (this.cellsTable[this.pill[1].y - 1][this.pill[0].x].color != Colors.BLACK)
                                break
                            // Clear old cell
                            this.cellsTable[this.pill[1].y][this.pill[1].x].color = Colors.BLACK
                            this.pill[0].y = this.pill[1].y--;
                            this.pill[1].x = this.pill[0].x;
                            // Pain new cell
                            this.cellsTable[this.pill[0].y][this.pill[0].x].color = this.pill[0].color;
                            this.cellsTable[this.pill[1].y][this.pill[1].x].color = this.pill[1].color;
                            break;
                        case "vertical":
                            let rightBlock = this.cellsTable[Math.max(this.pill[0].y, this.pill[1].y)][Math.max(this.pill[0].x + 1, this.pill[1].x + 1)]
                            let leftBlock = this.cellsTable[Math.max(this.pill[0].y, this.pill[1].y)][Math.min(this.pill[0].x - 1, this.pill[1].x - 1)]
                            if ((rightBlock?.color != Colors.BLACK) && ((this.pill[0].x == 0 || this.pill[1].x == 0) || leftBlock?.color != Colors.BLACK))
                                break
                            // Clear old cell
                            this.cellsTable[this.pill[0].y][this.pill[0].x].color = Colors.BLACK;
                            this.cellsTable[this.pill[1].y][this.pill[1].x].color = Colors.BLACK;
                            if (this.pill[0].x == 7 || this.pill[1].x == 7 || rightBlock?.color != Colors.BLACK) {
                                this.pill[0].x = --this.pill[1].x
                            }
                            if (this.lastTurn == direction)
                                this.swapPillBlock()
                            this.pill[0].y = this.pill[1].y
                            this.pill[1].x = this.pill[0].x + 1;
                            // Pain new cell
                            this.cellsTable[this.pill[0].y][this.pill[0].x].color = this.pill[0].color;
                            this.cellsTable[this.pill[1].y][this.pill[1].x].color = this.pill[1].color;
                            break;
                    }
                    break;

                case "right":
                    switch (position) {
                        case "horizontal":
                            if (this.cellsTable[this.pill[0].y - 1][this.pill[0].x]?.color != Colors.BLACK)
                                break
                            // Clear old cell
                            this.cellsTable[this.pill[1].y][this.pill[1].x].color = Colors.BLACK;
                            this.pill[1].y = this.pill[0].y--;
                            this.pill[1].x = this.pill[0].x;
                            // Pain new cell
                            this.cellsTable[this.pill[0].y][this.pill[0].x].color = this.pill[0].color;
                            this.cellsTable[this.pill[1].y][this.pill[1].x].color = this.pill[1].color;
                            break;
                        case "vertical":
                            let rightBlock = this.cellsTable[Math.max(this.pill[0].y, this.pill[1].y)][Math.max(this.pill[0].x + 1, this.pill[1].x + 1)]
                            let leftBlock = this.cellsTable[Math.max(this.pill[0].y, this.pill[1].y)][Math.min(this.pill[0].x - 1, this.pill[1].x - 1)]
                            if ((rightBlock?.color != Colors.BLACK) && ((this.pill[0].x == 0 || this.pill[1].x == 0) || leftBlock?.color != Colors.BLACK))
                                break
                            // Clear old cell
                            this.cellsTable[this.pill[0].y][this.pill[0].x].color = Colors.BLACK;
                            this.cellsTable[this.pill[1].y][this.pill[1].x].color = Colors.BLACK;
                            if (this.pill[0].x == 7 || this.pill[1].x == 7 || rightBlock?.color != Colors.BLACK) {
                                this.pill[0].x = --this.pill[1].x
                            }
                            if (this.lastTurn == direction)
                                this.swapPillBlock();
                            this.pill[1].x = this.pill[0].x + 1
                            this.pill[1].y = this.pill[0].y;
                            // Pain new cell
                            this.cellsTable[this.pill[0].y][this.pill[0].x].color = this.pill[0].color;
                            this.cellsTable[this.pill[1].y][this.pill[1].x].color = this.pill[1].color;
                            break;
                    }
                    break;
            }
            this.lastTurn = direction
        }
    }
    swapPillBlock() {
        let helpPillCell = this.pill[0]
        this.pill[0] = this.pill[1]
        this.pill[1] = helpPillCell
    }
    // getCell(x: number, y: number) {
    //     let cell = (document.getElementById(`td${x}${y}`) as HTMLTableCellElement)
    //     return (cell != null) ? cell : false
    // }
    // getCellColor(x: number, y: number) {
    //     let cell = (document.getElementById(`td${x}${y}`) as HTMLTableCellElement)
    //     return (cell != null) ? cell.style.backgroundColor : false
    // }
    startSpanking() {
        this.stopPillPiloting()
        this.cellsTable[this.pill[0].y][this.pill[0].x].id = this.cellsTable[this.pill[1].y][this.pill[1].x]
        this.cellsTable[this.pill[1].y][this.pill[1].x].id = this.cellsTable[this.pill[0].y][this.pill[0].x]

        let position = (this.pill[0].y == this.pill[1].y) ? "horizontal" : "vertical"
        let allSpanks: Array<Cell> = []
        switch (position) {
            case "vertical":
                let column = this.pill[0].x
                let row1 = this.pill[0].y
                let row2 = this.pill[1].y
                allSpanks.push(...this.checkForSpankCol(column))
                allSpanks.push(...this.checkForSpankRow(row1))
                allSpanks.push(...this.checkForSpankRow(row2))
                break;
            case "horizontal":
                let column1 = this.pill[0].x
                let column2 = this.pill[1].x
                let row = this.pill[0].y
                allSpanks.push(...this.checkForSpankCol(column1))
                allSpanks.push(...this.checkForSpankCol(column2))
                allSpanks.push(...this.checkForSpankRow(row))
                break;
        }

        allSpanks.forEach((cell, index) => {
            if (this.cellsTable[cell.y][cell.x].color != Colors.BLACK) {
                cell.color = Colors.BLACK
                if(cell.type == CellTypes.Normal){
                    if (cell.id) {
                        this.cellsTable[cell.id.y][cell.id.x].id = null
                    }
                    cell.id = null   
                } else if(cell.type == CellTypes.Virus){ // Zbicie Wirusa
                    Virus.removeVirus(cell.x, cell.y, cell.color)
                    localStorage.setItem("score", (parseInt(localStorage.getItem("score"))+100).toString())
                    if(Virus.virusesArray.length == 0)
                        this.gameState = GameStates.COMPLETED
                }
            } else {
                allSpanks.splice(index, 1)
            }
        })
        if(allSpanks.length > 0){
            // this.stopPillPiloting()
            this.startFalling()
        } else {
            this.newRound = true
        }
    }
    spankAll(){
        let allSpanks: Array<Cell> = []
        
        for(let i = 0; i < this.cellsTable.length; i++){
            allSpanks.push(...this.checkForSpankRow(i))
        }
        for(let i = 0; i < this.cellsTable[0].length; i++){
            allSpanks.push(...this.checkForSpankCol(i))
        }

        allSpanks.forEach((cell, index) => {
            if (this.cellsTable[cell.y][cell.x].color != Colors.BLACK) {
                cell.color = Colors.BLACK
                if (cell.id) {
                    this.cellsTable[cell.id.y][cell.id.x].id = null
                }
                cell.id = null
            } else {
                allSpanks.splice(index, 1)
            }
        })

        if(allSpanks.length > 0){
            this.startFalling()
        } else {
            this.newRound = true
        }
    }
    startFalling() {
        let alreadyFallen: Array<Pill> = []
        let change = false
        for (let y = this.cellsTable.length - 2; y >= 0; y--) {
            for (let i = this.cellsTable[y].length - 1; i >= 0; i--) {
                // sprawdź czy blok pod spodem jest biały czy kolorowy
                let cell = this.cellsTable[y][i] // komórka obecnie sprawdzana (komórka obecna)
                let underCell = this.cellsTable[y + 1][i] // komórka pod obecną komórką
                if (cell.color != Colors.BLACK && cell.type == CellTypes.Normal) {
                    if (cell.id != null) { // Komórka ma siostrzaną komórkę
                        let siblingsCell = cell.id // komórka należąca do tej samej tabletki co komórka obecna (komórka siostrana)
                        let underSiblingsCell = this.cellsTable[siblingsCell.y + 1]?.[siblingsCell.x]// komórka pod komórką siostrzaną
                        if (underSiblingsCell != undefined) { // czy komórka siostrana nie leży na samym dole
                            if ( (underCell.color == Colors.BLACK  || (underCell.x == siblingsCell.x && underCell.y == siblingsCell.y)) && (underSiblingsCell.color == Colors.BLACK || (underSiblingsCell.x == cell.x && underSiblingsCell.y == cell.y)) && !alreadyFallen.includes(cell) ) {
                                underCell.color = cell.color
                                cell.color = Colors.BLACK
                                cell.id = null
                                underSiblingsCell.color = siblingsCell.color
                                siblingsCell.color = Colors.BLACK
                                siblingsCell.id = null

                                underCell.id = underSiblingsCell
                                underSiblingsCell.id = underCell


                                alreadyFallen.push(underSiblingsCell)
                                change = true
                            }
                        }
                    } else { // Komórka jest pojedyncza
                        if (underCell.color == Colors.BLACK) {
                            this.cellsTable[y + 1][i].color = cell.color
                            this.cellsTable[y][i].color = Colors.BLACK
                            change = true
                        }
                    }
                }

            }
        }
        this.change = change
        if(change == false){
            this.spankAll()
        }
    //    return change
    }
    checkForSpankCol(column: number) {
        let spankArray: Array<Cell> = []
        let savedSpanks: Array<Cell> = []
        for (let i = 15; i >= 0; i--) {
            let cell = this.cellsTable[i][column]
            if (spankArray.length == 0 && cell)
                spankArray.push(cell)
            if (this.cellsTable[i]?.[column]?.color == this.cellsTable[i - 1]?.[column]?.color && this.cellsTable[i]?.[column]?.color != Colors.BLACK) {
                spankArray.push(this.cellsTable[i - 1][column])
            } else {
                if (spankArray.length >= 4)
                    savedSpanks.push(...spankArray)
                spankArray = []
            }
        }
        return savedSpanks
    }
    checkForSpankRow(row: number) {
        let spankArray: Array<Cell> = []
        let savedSpanks: Array<Cell> = []
        for (let i = 7; i >= 0; i--) {
            let cell = this.cellsTable[row][i]
            if (spankArray.length == 0 && cell)
                spankArray.push(cell)
            if (this.cellsTable[row]?.[i]?.color == this.cellsTable[row]?.[i - 1]?.color && this.cellsTable[row]?.[i]?.color != Colors.BLACK) {
                spankArray.push(this.cellsTable[row][i - 1])
            } else {
                if (spankArray.length >= 4)
                    savedSpanks.push(...spankArray)
                spankArray = []
            }
        }
        return savedSpanks
    }
}

window.onload = () => {
    new Game()
}