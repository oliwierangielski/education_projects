const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const bodyParser = require("body-parser")
let users = [
    {nick:"111", email:"111@w.pl"},
    {nick:"222", email:"222@w.pl"},
    {nick:"333", email:"333@w.pl"}
 ]

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname + "/static/addUser.html"))
})

app.post("/handleForm", function (req, res) {
    let emailExists = false
    users.forEach(function (user) {
        if(req.body.email == user.email){
            emailExists = true
        }
    })
    if(!emailExists){
        console.log("hej")
        users.push({nick: req.body.nick, email: req.body.email})
        console.table(users)
    }  else {
       res.send("taki mail już jest w bazie")
    }
    res.sendFile(path.join(__dirname + "/static/addUser.html"), emailExists)
})

app.get("/removeUserBySelect", function(req, res){
    if(req.query.email){
        users.forEach(function (user, id) {
            if(user.email == req.query.email){
                users.splice(id, 1)
            }
        })
    }
    

    let form = "<form action=\"/removeUserBySelect\" method=\"GET\"><div><input type=\"submit\" value=\"usuń\"></div><div><select name=\"email\">"
    users.forEach(function(user){ 
        form += `<option value="${user.email}">${user.email}</option>`
    })
    form += "</select></div></form>"
    res.send(form)
})

app.get("/removeUserByRadio", function(req, res){
    if(req.query.email){
        users.forEach(function (user, id) {
            if(user.email == req.query.email){
                users.splice(id, 1)
            }
        })
    }
    

    let form = "<form action=\"/removeUserByRadio\" method=\"GET\">"
    users.forEach(function(user, id){ 
        form += `<div><input type="radio" name="email" value="${user.email}" id="radio${id}"><label for="radio${id}">${user.email}</label></div>`
    })
    form += "<div><input type=\"submit\" value=\"usuń\"></div></form>"
    res.send(form)
})

app.get("/removeUserByCheckbox", function(req, res){
    if(req.query.email){ 
        req.query.email = (!Array.isArray(req.query.email)) ? [req.query.email] : req.query.email;
        for(let i = 0; i < users.length; i++){
            req.query.email.forEach(function (email, id){
                if(users[i].email == email){
                    users.splice(i, 1)
                    i = 0
                }
            })
        }
    }
    let form = "<form action=\"/removeUserByCheckbox\" method=\"GET\">"
    users.forEach(function(user, id){ 
        form += `<div><input type="checkbox" name="email" value="${user.email}" id="radio${id}"><label for="radio${id}">${user.email}</label></div>`
    })
    form += "<div><input type=\"submit\" value=\"usuń\"></div></form>"
    res.send(form)
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})