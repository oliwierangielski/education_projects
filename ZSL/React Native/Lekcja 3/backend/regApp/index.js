const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());


let users = []

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/addUser', (req, res) => {
    const user = req.body;
    console.log(user)
    let datetime = new Date()
    user["registered"] = datetime.toISOString()
    if(users.find(obj => obj.login == user.login) != undefined){
        res.send({response: false, msg: "USEREXISTS"})
    } else {
        users.push(user)
        console.table(users)
        res.send({response: true, msg: "USERCREATED"})
    }
})

app.post('/showUsers', (req,res) => {
    res.send({response: true, msg: "USERSSHOW", data: users})
})

app.post('/deleteUser', (req, res) => {
    const index = req.body
    users.splice(index, 1)
    res.send({response: true, msg: "USERDELETED"})
})

app.listen(port, () => {
    console.log('Express listening on port ' + port)
})