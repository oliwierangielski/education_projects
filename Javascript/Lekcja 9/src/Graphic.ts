import { Cell } from "./Cell"
import { Colors, Settings } from "./Config" 

class Graphic {
    private gameDiv = document.getElementById("app-game")
    constructor(table: HTMLTableElement) {
        /**
         * @param table is a html table element, that holds all the cells.
         */
        this.gameDiv.style.backgroundImage = "url('/images/pf.png')"
        this.gameDiv.style.width = Settings.WIDTH + "px"
        this.gameDiv.style.height = Settings.HEIGHT + "px"
        table.style.width = Settings.COLUMNS * Settings.CELLSIZE + "px"
        table.style.height = Settings.ROWS * Settings.CELLSIZE + "px"
        table.style.bottom = 2 * Settings.CELLSIZE + "px"
        table.style.left = 17 * Settings.CELLSIZE + "px"
    }
    static setCellGraphic(cell: Cell) {
        let color: String = cell.color.substring(0, 2)
        if(cell.id != null){
            /**
             * @todo only the dot graphic working. Check if cell.id really exist. Needs to improve
             */
            if(cell.y < cell.id.y){
                return color + "_up.png"
            } else if(cell.y > cell.id.y){
                return color + "_down.png"
            } else if(cell.x < cell.id.x){
                return color + "_left.png"
            } else if(cell.x > cell.id.x){
                return color + "_right.png"
            }
        } else {
            return "/images/" + color + "_dot.png"
        }
        /**
         * @returns this method returns an url for graphic of the Cell
         */
    }
}

export { Graphic }