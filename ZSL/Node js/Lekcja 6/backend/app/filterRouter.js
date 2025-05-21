const getRequestData = require("./getRequestData")
const filterController = require("./filterController")
let result
const filterRouter = async(req, res) => {
    if(req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && req.method == "GET"){
        let id = req.url.split("/")
        id = id[id.length-1]
        result = await filterController.getmetadata(id)
    } else if(req.url.match(/\/api\/filters\/([0-9]+)/) && req.method == "PATCH"){
        let id = req.url.split("/")
        id = id[id.length-1]
        let filters = JSON.parse(await getRequestData(req))
        result = await filterController.usefilters(id, filters)
    }

    if(result){
        res.writeHead(result.status, { 'Content-Type': 'application/json' });
        // delete result.status
        res.write(JSON.stringify(result));
        res.end();
    }
}

module.exports = filterRouter