// let resultsArray = []
module.exports = {
    resultsArray: [],
    post: function (filedata) {
        let result = {
            id: Date.now(),
            album: filedata.fields.album,
            originalName: filedata.files.file.name,
            url: filedata.files.file.path,
            lastChange: "original",
            history: [
                {
                    status: "original",
                    timestamp: filedata.files.file.lastModifiedDate
                }
            ],
            tags: []
        }
        this.resultsArray.push(result)
        result.status = 201
        return result
    },
    getall: function () {
        let result = this.resultsArray
        result.status = 200
        return result
    },
    get: function (id) {
        let resultID = this.resultsArray.findIndex(x => x.id == id)
        if (resultID == -1) {
            result = {
                status: 404,
                message: "No photo with that id"
            }
        } else {
            result = this.resultsArray[resultID]
            result.status = 200
        }
        return result

    },
    delete: function (id, delStatus) {
        let resultID = this.resultsArray.findIndex(x => x.id == id)
        if (resultID == -1 || delStatus == false) {
            result = {
                status: 404,
                message: "No photo with that id"
            }
        } else {
            this.resultsArray.splice(resultID, 1)
            result = {
                status: 200,
                message: "Successfully deleted photo with id: " + id
            }
        }
        return result
    },
    update: function (id, value) {
        let resultID = this.resultsArray.findIndex(x => x.id == id)
        if (resultID == -1) {
            result = {
                status: 404,
                message: "No photo with that id"
            }
        } else {
            this.updatehistory(resultID, value)
            result = this.resultsArray[resultID]
            result.status = 200
        }
        return result
    },
    updatehistory(resultID, values = {}){ // TODO: sprawdzić czy jednak mogę wywalić to do funkcji wyzej
        for (key in values) {
            // let oldValue = this.resultsArray[resultID][key] // TODO: kiedyś zmienić na old value i new value
            if(this.resultsArray[resultID]?.[key]) // zapobiega dodawaniu filtrów do jsona obrazka jako parametry
                this.resultsArray[resultID][key] = values[key]
            // value[key] = {old: oldValue, new: value[key]}
        }
        let history = this.resultsArray[resultID].history
        let lastStatus = history[history.length - 1].status
        let newStatus = ((lastStatus == "original") ? "change 1" : "change " + (parseInt(lastStatus.split(" ")[1]) + 1))
        let change = {
            status: newStatus,
            timestamp: Date.now(),
            changes: values
        }
        // Object.keys(values).forEach((changeKey) => {
        //     change[changeKey] = values[changeKey]
        // })
        this.resultsArray[resultID].history.push(change)
        this.resultsArray[resultID].lastChange = newStatus
    },
    updatetags(id, tags){
        let resultID = this.resultsArray.findIndex(x => x.id == id)
        if (resultID == -1) {
            result = {
                status: 404,
                message: "No photo with that id"
            }
        } else {
            (Array.isArray(tags) ? tags : [tags]).forEach(element => {
                this.resultsArray[resultID].tags.push(element)
            });
            
            result = {
                status: 200,
                message: "Successfully updated tags of photo with id: " + id
            }
        }
        return result
    },
    gettags(id){
        let resultID = this.resultsArray.findIndex(x => x.id == id)
        if (resultID == -1) {
            result = {
                status: 404,
                message: "No photo with that id"
            }
        } else {
            result = {
                status: 200,
                id: id,
                tags: this.resultsArray[resultID].tags
            }
        }
        return result
    },
    getfile(fileData, fileInfo){
        let result
        if(fileData){
            result = {
                status: 200,
                extension: fileInfo.url.split(".").pop(),
                end: fileData
            }
        } else {
            result = fileInfo
        }
        return result
    }
}