const tagsController = require("./tagsController")
let result
const tagsRouter = async(req, res) => {
    if(req.url == "/api/tags/raw" && req.method == "GET"){
        result = tagsController.getallraw()
    } else if(req.url == "/api/tags" && req.method == "GET"){
        result = tagsController.getall()
    } else if(req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET"){
        let id = req.url.split("/")
        id = id[id.length-1]
        result = tagsController.get(id)
    } else if(req.url == "/api/tags" && req.method == "POST"){
        let value = JSON.parse(await getRequestData(req))
        result = tagsController.post(value)
    }


    if(result){
        res.writeHead(result.status, { 'Content-Type': 'application/json' });
        // delete result.status
        res.write(JSON.stringify(result));
        res.end();
    }
}

module.exports = tagsRouter