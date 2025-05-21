const express = require('express')
const { MongoClient, ObjectId, Collection } = require('mongodb');
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors())


const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const connectToMongoDB = async () => {
    try {
        const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
        await mongoClient.connect();
        const db = mongoClient.db("notes");
        return db
    } catch (error) {
        return error.message
    }
}

app.get("/getBackupsInfo", async(req, res) => {
    let db = await connectToMongoDB()
    const coll = await db.collection("backups");
    result = await coll.find({}, {projection: {name: 1, date: 1}}).toArray()
    res.json(result)
})

app.post('/makeBackup', async (req, res) => {
    let data = req.body
    let db = await connectToMongoDB()
    const coll = await db.collection("backups");
    let documentsAmount = await coll.countDocuments()
    let timestamp = Date.now()
    let record = {name: `backup nr. ${documentsAmount+1}`, date: timestamp, notes: data}
    const result = await coll.insertOne(record)
    console.log("resultat", result)
})

app.get('/restoreBackup/:id', async (req, res) => {
    let id = req.params.id
    let db = await connectToMongoDB()
    const coll = await db.collection("backups");
    const items = await coll.find({_id: (new ObjectId(id))}).toArray()
    let result = items[0].notes
    // console.log(items[0].notes)
    res.json(result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})