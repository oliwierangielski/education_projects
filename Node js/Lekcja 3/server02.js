const http = require("http")
const PORT = 3000
const path = require("path")
const fs = require("fs")
const os = require("os")
const server = http.createServer((req, res) => {
    const readOne = async (file) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(file, (err, data) => {
                    if (err) throw err
                   resolve(JSON.parse(data.toString()))
                })
            } catch(error) {
                reject(error.message)
            }
        })
    }
    const readAll = async (savedFiles) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = []
                for (i in savedFiles) {
                    result.push(await readOne(savedFiles[i]))
                }
                resolve(result)
            } catch (error) {
                reject(error.message)
            }
        })
    }
    const save = async (max) => {
        return new Promise((resolve, reject) => {
            let interval
            let i = 0
            let savedFiles = []
            try {
                interval = setInterval(() => {
                    if (i < max) {
                        i++
                        const date = new Date()
                        const filename = `log_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.log`
                        const filepath = path.join(__dirname, "logs", filename)
                        const doc = JSON.stringify({ totalmem: os.totalmem(), freemem: os.freemem() })
                        fs.writeFile(filepath, doc, (err) => {
                            if (err) throw err
                            console.log(filename)
                            savedFiles.push(filepath)
                        })
                    } else {
                        clearInterval(interval)
                        resolve(savedFiles)
                    }
                }, 1000)
            } catch (error) {
                reject(error.message)
            }
        })
    }
    const go = async () => {
        const savedFiles = await save(5)
        const readFiles = await readAll(savedFiles)
        console.log(readFiles);
    }

    go()
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
