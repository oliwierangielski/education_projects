/**
 * @module Cell
 * @description This is a module, that hold the Table  class,  main object of the game
 * @author Oliwier Angielski
 */

import { Cell, CellTypes } from "./Cell"
import { Virus } from "./Virus"

interface TableInterface {
    htmlTable: HTMLTableElement
    cellsTable: Array<Array<Cell>>
}

class Table implements TableInterface {
    htmlTable = document.createElement("table")
    cellsTable: Array<Array<Cell>> = []
    constructor(width: number, height: number) {
        this.htmlTable.classList.add("gameTable")
        for (let i = 0; i < height; i++) {
            let tr: HTMLTableRowElement = document.createElement("tr")
            let row = []
            for (let y = 0; y < width; y++) {
                let cell = new Cell(y, i)
                cell.td.classList.add("gameTableCell")
                tr.appendChild(cell.td)
                row.push(cell)
            }
            this.htmlTable.appendChild(tr)
            this.cellsTable.push(row)
        }
        document.getElementById("app-game").appendChild(this.htmlTable)
        this.generateViruses()
        return this
    }

    generateViruses(){
        let amount = Math.floor(Math.random() * 7) + 1
        while(amount--){
            let virus = new Virus()
            // console.log(virus)
            this.cellsTable[virus.y][virus.x].type = CellTypes.Virus
            this.cellsTable[virus.y][virus.x].color = virus.color
        }
    }
}

export { Table }