const taskmodel = require("./taskmodel")
module.exports = {
    getall: () => {
        return taskmodel
    },
    get: (id) => {
        let index = taskmodel.findIndex( e => e.id == id)
        let returnValue
        if(index == -1){
            returnValue = {
                status: 404,
                message: "task with " + id + " not found"
            }
        } else {
            returnValue = {
                status: 200,
                task: taskmodel[index]
            }
        }
        return returnValue
    },
    add:(data) => {
        let resultValue = JSON.parse(data)
        taskmodel.push(resultValue)
        return{
            status: 201,
            task: resultValue
        }
    },
    delete: (id) => {
        let index = taskmodel.findIndex( e => e.id == id)
        let returnValue
        if(index == -1){
            returnValue = {
                status: 404,
                message: "task with id " + id + " not found"
            }
        } else {
            taskmodel.splice(index, 1)
            returnValue = {
                status: 202,
                message: "Task with id " + id + " deleted successfully" 
            }
        }
        return returnValue
    },
    update: (id, data) => {
        let index = taskmodel.findIndex( e => e.id == id)
        let resultValue = JSON.parse(data)
        let returnValue
        if(index == -1){
            returnValue = {
                status: 404,
                message: "No task with id " + id + " found"
            }
        } else {
            taskmodel[index] = resultValue
            returnValue = {
                status: 200,
                task: resultValue
            }
        }
        return returnValue
    }
}