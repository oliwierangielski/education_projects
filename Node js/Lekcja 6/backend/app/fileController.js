const formidable = require('formidable');
const fs = require('fs')
const path = require("path")
module.exports = {
    post: async (image, name=null) => {
        return new Promise((resolve, reject) => {
            try {
                let form = formidable({});
                form.uploadDir = path.join(__dirname, "..", "uploads")       // folder do zapisu zdjęcia
                form.keepExtensions = true
                form.parse(image, function (err, fields, files) {
                    // if (name && files && files.file) {
                        // console.log(files)
                        const filePath = files.file.path;
                        let newName = Date.now() + files.file.name
                        const newFilePath = path.join(form.uploadDir,fields.album, newName);
                        fs.rename(filePath, newFilePath, function (err) {
                          if (err) { reject(err); }
                        });
                        files.file.path = newFilePath
                    //   }
                    resolve({ fields: fields, files: files });
                });
            } catch (error) {
                reject(error)
            }
        })
    },
    delete: async (file) => {
        return new Promise((resolve, reject) => {
            try {
                if(fs.existsSync(file?.url)){
                    fs.unlink(file.url, function(err){
                        if(err) throw err
                        resolve(true)
                    })
                } else {
                    resolve(false)
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    getfile: async (file) => {
        return new Promise((resolve, reject) => {
            try {
                if(fs.existsSync(file)){
                    fs.readFile(file, function(err, data){
                        if(err) throw err
                        resolve(data)
                    })
                } else {
                    resolve(false)
                }
            } catch(error){
                reject(error)
            }
        })
    },
    getfilefromurl: async (url) => {
        return new Promise((resolve, reject) => {
            try {
                if(fs.existsSync(url)){
                    fs.readFile(url, function(err, data){
                        if(err) throw err
                        resolve(data)
                    })
                } else {
                    resolve(false)
                }
            } catch(error){
                reject(error)
            }
        })
    },
    async createfolder(data) {
        return new Promise((resolve, reject) => {
            try {
                let dir = path.join(__dirname, "..", "uploads", data.login)
                if (!fs.existsSync(dir)){
                    fs.mkdir(dir, (err) => {
                        if(err) throw err
                        resolve(true)
                    })
                }
            } catch (error){
                reject(error)
            }
        })
    }
}