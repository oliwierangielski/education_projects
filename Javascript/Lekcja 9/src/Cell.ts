/**
 * @module Cell
 * @description This is a module, that hold the Cell class, used in creating Table
 * @author Oliwier Angielski
 */


import { Colors } from "./Config"
import { Graphic } from "./Graphic"

enum CellTypes {
    Normal,
    Virus
}

interface CellInterface {
    _id: Cell
    x: number,
    y: number,
    _color: Colors
    td: HTMLTableCellElement
    type: CellTypes
}

class Cell implements CellInterface {
    _id: Cell = null
    x: number
    y: number
    td: HTMLTableCellElement
    _color: Colors
    type: CellTypes
    constructor(x: number, y: number, color: Colors = Colors.BLACK) {
        this.x = x
        this.y = y
        this.td = (document.createElement("td")) as HTMLTableCellElement
        this.type = CellTypes.Normal
        // this.td.id = `td${x}${y}` //TODO: do usunięcia
        this.color = Colors.BLACK
    }

    set id(value: Cell | null){
        this._id = value
        // this.td.innerText = value?.toString() ?? "" // TODO: do wywalenia
    }
    get id(){
        return this._id
    }
    set color(value: Colors) {
        this._color = value
        // this.td.style.backgroundColor = value
        if(value != Colors.BLACK){
            this.td.style.backgroundImage = "url('" + Graphic.setCellGraphic(this) + "')"
        } else {
            this.td.style.backgroundImage = ""
        }
    }
    get color(){
        return this._color
    }
}

export { Cell, CellTypes }