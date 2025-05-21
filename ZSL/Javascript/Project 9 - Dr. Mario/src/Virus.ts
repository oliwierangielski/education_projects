/**
 * @module Virus
 * @description This is a module, that holds a class for Virus
 * @author Oliwier Angielski
 */

import { Colors, Settings } from "./Config"

class Virus {
    static virusesArray: Array<Virus> = []
    static removeVirus(x: number, y: number, color: Colors) {
        Virus.virusesArray.splice(Virus.virusesArray.findIndex(e => e.x == x && e.y == y && e.color == color), 1)

    }
    x: number
    y: number
    color: Colors
    constructor() {
        this.color = [Colors.BROWN, Colors.BLUE, Colors.YELLOW][Math.floor(Math.random() * 3)]
        this.x = Math.floor(Math.random() * Settings.COLUMNS)
        this.y = Math.floor(Math.random() * (Settings.ROWS - 5)) + 5
        while (Virus.virusesArray.findIndex(e => e.x == this.x && e.y == this.y) != -1) {
            this.x = Math.floor(Math.random() * Settings.COLUMNS)
            this.y = Math.floor(Math.random() * Settings.ROWS) + 5
        }
        Virus.virusesArray.push(this)
        return this
    }
}

export { Virus }