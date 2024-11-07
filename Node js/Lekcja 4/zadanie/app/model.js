class Animal {
    static animalsArray = []
    constructor(name, color) {
        this.id = Animal.animalsArray.length+1
        this.name = (name != "") ? name : "default animal";
        this.color = (color != "") ? color : "default color";
        Animal.animalsArray.push(this)
    }
}

module.exports = Animal;