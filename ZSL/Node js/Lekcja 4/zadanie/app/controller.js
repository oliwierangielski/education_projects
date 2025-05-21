const Animal = require('./model')

module.exports = {
    add: (data) => {
        let animal = new Animal(data.animal, data.color)
        return {
            status: "animal added",
            arr: Animal.animalsArray
        }
    },
    delete: (id) => {
        // usuwanie po id z animalsArray
        Animal.animalsArray.splice(--id, 1)
        return {
            status: "animal deleted",
            arr: Animal.animalsArray
        }
    },
    update: (id) => {
        // update po id elementu animalsArray
        let animal = Animal.animalsArray[--id]
        animal.name = "ZYRAFA"
        animal.color = "POMARANCZOWO-CZARNA"
        return {
            status: "animal updated",
            arr: Animal.animalsArray
        }
    },
    getall: () => {
        return { arr: Animal.animalsArray }
    }

}