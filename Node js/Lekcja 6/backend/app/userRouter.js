const userController = require("./userController")
const getRequestData = require("./getRequestData")
const getTokenAuthorization = require("./getTokenAuthorization")
const fileController = require("./fileController")
const fs = require('fs')
const path = require("path")

const userRouter = async (req, res) => {
    let result
    if(req.url == "/api/user/register" && req.method == "POST"){
        let userData = JSON.parse(await getRequestData(req))
        result = await userController.register(userData)
        fileController.createfolder(userData)
    } else if(req.url.match(/\/api\/user\/confirm\/([^/]+)/) && req.method == "GET"){
        let token = req.url.split("/")
        token = token[token.length-1]
        result = await userController.confirm(token)
    } else if(req.url == "/api/user/login" && req.method == "POST"){
        let data = JSON.parse(await getRequestData(req))
        result = await userController.login(data)
    } else if(req.url == "/api/user/logout" && req.method == "GET"){
        let token = await getTokenAuthorization(req)
        result = userController.logout(token)
    } else if(req.url == "/api/profile" && req.method == "GET"){
        let token = await getTokenAuthorization(req)
        result = await userController.getmyprofile(token)
    } else if(req.url == "/api/profile" && req.method == "PATCH"){
        let token = await getTokenAuthorization(req)
        let data = JSON.parse(await getRequestData(req))
        result = await userController.updateprofile(token, data)
    } else if(/\/api\/profile\/([\w]+)/ && req.method == "GET"){
        let nickname = req.url.split("/").pop()
        result = await userController.getuserprofile(nickname)
        // result.data.image = await fileController.getfile(result.data.image)
    } else if(req.url == "/api/profile" && req.method == "POST"){
        let token = await getTokenAuthorization(req)
        let userInfo = await userController.getmyprofile(token)
        let all = await fileController.post(req, "profile.jpg")
        console.log(all.files.file.path)
        let newUrl = all.files.file.path
        result = await userController.setprofilephoto(token, newUrl)
    } 
    // else if(req.url == "/api/profile/profileimage" && req.method == "GET"){
    //     console.log("hej")
    //     let data = JSON.parse(await getRequestData(req))
    //     result = {status: 200}
    //     result.data.image = await userController.getprofilephoto(token)
    // }

    if(result){
        res.writeHead(result.status, { 'Content-Type': 'application/json' });
        // delete result.status
        res.write(JSON.stringify(result));
        res.end();
    }
}

module.exports = userRouter