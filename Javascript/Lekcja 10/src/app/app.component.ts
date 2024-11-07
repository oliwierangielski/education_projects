import { Component } from '@angular/core';

type coord = {
  row: number,
  col: number,
  char: String
}

type Cell = {
  char: String | null,
  color: String | null
}

type Play = {
  row: number,
  col: number,
  power: number
}

enum Mode {
  CHEKCING,
  MOVING
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lekcja10'
  cols = 15
  rows = 15
  points = 7
  disable = false
  isFirst = true
  score: { [key: string]: number } = { "X": 0, "O": 0 }
  gameArray: Array<Array<Cell>> = new Array(this.rows).fill({ char: null, color: null }).map(() => new Array(this.cols).fill({ char: null, color: null }));
  isFinished = false

  onInputChange() {
    this.gameArray = new Array(this.rows).fill("").map(() => new Array(this.cols).fill(""));
  }

  onCellClick(e: any, row: number, col: number) {
    if (this.gameArray[row][col].char == null && !this.isFinished) {
      if (this.isFirst) {
        this.disable = true
        this.isFirst = false
      }
      this.gameArray[row][col] = { char: "X", color: null }
      let lastCoords: coord = { row: row, col: col, char: "X" }
      this.checkBoard(lastCoords, Mode.CHEKCING)
      console.log(this.score)
      if (!this.isFinished) {
        let computerPlay: Play = this.moveComputer(lastCoords)
        this.gameArray[computerPlay.row][computerPlay.col] = { char: "O", color: null }
        this.checkBoard({ row: computerPlay.row, col: computerPlay.col, char: "O" }, Mode.CHEKCING)
      }
    }


  }

  checkBoard(lastCoords: coord, mode: Mode) {

    let playsArray: Array<Play> = []
    let allTohighlight: Array<coord> = []
    let highlightedArray: Array<coord> = [lastCoords]
    let randomColor = this.randomColor()
    let i, y
    let countPoints = () => {
      switch (mode) {
        case Mode.CHEKCING:
          if (highlightedArray.length < 5) {
            highlightedArray = []
          } else {
            this.score[lastCoords.char.toString()] += highlightedArray.length - 4
          }
          allTohighlight.push(...highlightedArray)
          break;
        case Mode.MOVING:
          playsArray.push({ row: lastCoords.row, col: lastCoords.col, power: highlightedArray.length - 1 })
          // if(highlightedArray.length-1 > 0)
          // this.gameArray[lastCoords.row][lastCoords.col] = { char: (highlightedArray.length-1).toString(), color: null }
          break;
      }

      highlightedArray = [lastCoords]
    }


    // sprawdzenie poziome

    // #1 prawo
    i = lastCoords.col + 1
    while (this.gameArray[lastCoords.row]?.[i]?.char == lastCoords.char && this.gameArray[lastCoords.row]?.[i]?.color == null) {
      highlightedArray.push({ row: lastCoords.row, col: i, char: lastCoords.char })
      i++;
    }

    // #2 prawo
    i = lastCoords.col - 1
    while (this.gameArray[lastCoords.row]?.[i]?.char == lastCoords.char && this.gameArray[lastCoords.row]?.[i]?.color == null) {
      highlightedArray.push({ row: lastCoords.row, col: i, char: lastCoords.char })
      i--;
    }

    countPoints()

    // sprawdzanie pionowe

    // #1 dół
    i = lastCoords.row + 1
    while (this.gameArray[i]?.[lastCoords.col]?.char == lastCoords.char && this.gameArray[i]?.[lastCoords.col]?.color == null) {
      highlightedArray.push({ row: i, col: lastCoords.col, char: lastCoords.char })
      i++;
    }

    // #2 góra
    i = lastCoords.row - 1
    while (this.gameArray[i]?.[lastCoords.col]?.char == lastCoords.char && this.gameArray[i]?.[lastCoords.col]?.color == null) {
      highlightedArray.push({ row: i, col: lastCoords.col, char: lastCoords.char })
      i--;
    }

    countPoints()

    // sprawdzanie skośne lewe

    // #1 dół
    i = lastCoords.row + 1
    y = lastCoords.col + 1
    while (this.gameArray[i]?.[y]?.char == lastCoords.char && this.gameArray[i]?.[y]?.color == null) {
      highlightedArray.push({ row: i, col: y, char: lastCoords.char })
      y++
      i++
    }

    // #2 góra
    i = lastCoords.row - 1
    y = lastCoords.col - 1
    while (this.gameArray[i]?.[y]?.char == lastCoords.char && this.gameArray[i]?.[y]?.color == null) {
      highlightedArray.push({ row: i, col: y, char: lastCoords.char })
      y--
      i--
    }

    countPoints()

    // sprawdzanie skośne prawe

    // #1 dół
    i = lastCoords.row - 1
    y = lastCoords.col + 1
    while (this.gameArray[i]?.[y]?.char == lastCoords.char && this.gameArray[i]?.[y]?.color == null) {
      highlightedArray.push({ row: i, col: y, char: lastCoords.char })
      y++
      i--
    }

    // #2 góra
    i = lastCoords.row + 1
    y = lastCoords.col - 1
    while (this.gameArray[i]?.[y]?.char == lastCoords.char && this.gameArray[i]?.[y]?.color == null) {
      highlightedArray.push({ row: i, col: y, char: lastCoords.char })
      y--
      i++
    }

    countPoints()

    if (allTohighlight.length < 5)
      allTohighlight = []


    if (mode == Mode.CHEKCING) {
      // zmiana koloru
      allTohighlight.forEach((elem) => {
        this.gameArray[elem.row][elem.col].color = randomColor
      })
      if (this.score[lastCoords.char.toString()] >= this.points) {
        setTimeout( () => {alert("Wygrał: " + lastCoords.char)}, 500)
        this.isFinished = true
      }
    }

    return playsArray

  }

  randomColor() {
    let red = Math.floor(Math.random() * 255)
    let green = Math.floor(Math.random() * 255)
    let blue = Math.floor(Math.random() * 255)
    let alpha = Math.random().toFixed(1)
    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")"
  }
  moveComputer(lastCoords: coord) {
    let defensivePlaysArray: Array<Array<Play>> = []
    let offensivePlaysArray: Array<Array<Play>> = []
    this.gameArray.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        if (col.color == null && col.char != "X" && col.char != "O") { //TODO: change to null
          offensivePlaysArray.push(this.checkBoard({ row: rowI, col: colI, char: "O" }, Mode.MOVING))
          defensivePlaysArray.push(this.checkBoard({ row: rowI, col: colI, char: "X" }, Mode.MOVING))
        }
      })
    })
    function reducePlays(total: Play, num: Play) {
      return { row: total.row, col: total.col, power: total.power + num.power }
    }
    // function sortPlaysByPower(a: Play, b: Play){
    //   return (a.power > b.power) ? 1 : -1
    // }
    let newDefensiveArray = defensivePlaysArray.map((elem, index) => {
      return elem.reduce(reducePlays)
    }).sort((a: Play, b: Play) => b.power - a.power)

    let newOffensiveArray = offensivePlaysArray.map((elem, index) => {
      return elem.reduce(reducePlays)
    }).sort((a: Play, b: Play) => b.power - a.power)
    // console.table(newDefensiveArray)
    console.table(newOffensiveArray)
    return (newDefensiveArray[0].power >= newOffensiveArray[0].power) ? newDefensiveArray[0] : newOffensiveArray[0]
  }
}
