const controller = require("./controller")
const utils = require("./utils")
const taskmodel = require("./taskmodel")

let result
const router = async(req, res) => {
    if(req.url == "/api/tasks" && req.method == "GET"){
        // Zwróć wszystko
        result = controller.getall()
    } else if(req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "GET"){
        // Zwróć 1
        let id = req.url.split("/")
        id = id[id.length-1]
        result = controller.get(id)
    } else if(req.url == "/api/tasks" && req.method == "POST"){
        // Dodaj 1
        let data = await utils.getRequestData(req);
        result = controller.add(data)
    } else if(req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "DELETE"){
        // USUŃ 1
        let id = req.url.split("/")
        id = id[id.length-1]
        result = controller.delete(id)
    } else if(req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "PATCH"){
        // AKTUALIZUJ 1
        let id = req.url.split("/")
        id = id[id.length-1]
        let data = await utils.getRequestData(req);
        result = controller.update(id, data)
    }

    if(result){
        // TODO 404
        res.writeHead((result.status) ? result.status : 200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(result));
        res.end();
    }
}
module.exports = router