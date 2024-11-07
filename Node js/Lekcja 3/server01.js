const http = require("http")
const PORT = 3000
const Datastore = require('nedb')
const coll1 = new Datastore({
    filename: 'server01.db',
    autoload: true
});
const server = http.createServer((req, res) => {

    const save = async (max) => {
        return new Promise((resolve, reject) => {
            let interval
            let i = 0
            let milis = []
            try {
                interval = setInterval(() => {
                    if (i < max){
                        i++
                        const date = new Date()
                        const doc = { m: date.getMinutes(), s: date.getSeconds(), mil: date.getMilliseconds() }
                        coll1.insert(doc, function (err, newDoc) {
                            milis.push(newDoc.mil)
                        })
                    } else {
                        clearInterval(interval)
                        resolve(milis)
                    }
                }, 1000)
            } catch (error) {
                reject(error.message)
            }
        })
    }
    const go = async () => {
        const all = await save(10)
        console.log(all);
    }

    go()
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
