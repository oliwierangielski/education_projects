const fileController = require("./fileController")
const jsonController = require("./jsonController")
const getRequestData = require("./getRequestData")
const userController = require("./userController")
const fs = require('fs') //TODO: do wywalenia
const path = require("path")
let result
const imageRouter = async(req, res) => {

    if(req.url == "/api/photos" && req.method == "POST"){
        let filedata = await fileController.post(req)
        if(filedata != undefined)
            result = jsonController.post(filedata)
    } else if(req.url == "/api/photos" && req.method == "GET"){
        result = jsonController.getall()
    } else if(req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET"){
        let id = req.url.split("/")
        id = id[id.length-1]
        result = jsonController.get(id)
    } else if(req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE"){
        let id = req.url.split("/")
        id = id[id.length-1]
        let fileInfo = jsonController.get(id)
        let fileDelStatus = await fileController.delete(fileInfo)
        result = jsonController.delete(id, fileDelStatus)
    } else if(req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "PATCH"){
        let id = req.url.split("/")
        id = id[id.length-1]
        let value = JSON.parse(await getRequestData(req))
        result = jsonController.update(id, value)
    } else if(req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == "PATCH"){
        let id = req.url.split("/")
        id = id[id.length-1]
        let value = JSON.parse(await getRequestData(req))
        result = jsonController.updatetags(id, value)
    } else if(req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == "GET"){
        let id = req.url.split("/")
        id = id[id.length-1]
        result = jsonController.gettags(id)
    } else if(req.url.match(/\/api\/getfile\/([0-9]+)/) && req.method == "GET"){
        let id = req.url.split("/")
        id = id[id.length-1]
        let fileInfo = jsonController.get(id)
        let fileData = await fileController.getfile(fileInfo?.url)
        result = jsonController.getfile(fileData, fileInfo)
    } else if(req.url.match(/\/api\/photos\/photofromurl\/(\w+)/) && req.method == "GET"){
        let id = req.url.split("/")
        id = id[id.length-1]
        let imageUrl = userController.getuserprofile(id).data.image
        // console.log(imageUrl)
        if(imageUrl.includes("images"))
            imageUrl = imageUrl.replace("/app", "")
        let file = await fileController.getfile(imageUrl)
        result = {status: 200, end: file, extension: imageUrl.split(".").pop()}
    }
    if(result){
        let contentType
        switch(result?.extension){
            case "jpeg":
            case "jpg":
                contentType = 'image/jpeg'
                break
            case "png":
                contentType = 'image/png'
                break
            case "gif":
                contentType = 'image/gif'
                break
            default:
                contentType = 'application/json'
                break;
        }
        res.writeHead(result.status, { 'Content-Type': contentType });
        // delete result.status
        result = (result?.end) ? result.end : JSON.stringify(result)
        res.write(result);
        res.end();
    }
}
module.exports = imageRouter