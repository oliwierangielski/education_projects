// const utilsFunctions = require("./utilsFunctions")
// console.log(utilsFunctions.rand(1000));
// console.log(utilsFunctions.randfix(2));


// const userData = require('./userData');
// userData.setName("Anna")
// console.log(`User: ${userData.getName()}`);

// const arrayData = require("./arrayData")
// console.log(arrayData.length);

// const objectData = require("./objectData")
// objectData.makeThings()

// doit = async () => {
//     await objectData.makeThingsAsync()
// }
// doit()

// console.log(objectData.makeOtherThingsAndReturnWithPromise())

// doit2 = async () => {
//     let result = await objectData.makeOtherThingsAndReturnWithPromise()
//     console.log(result);
// }
// doit2()

const Fruit = require('./Fruit');
const plant1 = new Fruit("banan", "żółty")
const plant2 = new Fruit("jabłko", "czerwone")
console.log(plant1, plant2);

