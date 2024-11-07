const tags = require("./model")

const tagsController = {
    getallraw(){
        let result = tags.map(elem => elem = elem.name)
        result.status = 200
        return result
    },
    getall(){
        let result = tags
        result.status = 200
        return result
    },
    get(id){
        let resultID = tags.findIndex(x => x.id == id)
        if (resultID == -1) {
            result = {
                status: 404,
                message: "No tag with that id"
            }
        } else {
            result = tags[resultID]
            result.status = 200
        }
        return result
    },
    post(data){
        tags.push(data)
        data.id = tags.length
        data.status = 201
        return data
    }
}

module.exports = tagsController