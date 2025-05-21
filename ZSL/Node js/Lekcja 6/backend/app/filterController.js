const sharp = require("sharp");
let jsonController = require("./jsonController")

module.exports = {
     async getmetadata(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let resultID = jsonController.resultsArray.findIndex(x => x.id == id)
                if (resultID == -1) {
                    resolve({
                        status: 404,
                        message: "No photo with that id"
                    })
                }
                else {
                    let meta = await sharp(jsonController.resultsArray[resultID].url).metadata()
                    meta.status = 200
                    resolve(meta)
                }
            } catch (err) {
                reject(err.mesage)
            }
        })
    },
    usefilters(id, filters) {
        let resultID = jsonController.resultsArray.findIndex(x => x.id == id);
      
        if (resultID == -1) {
          return {
            status: 404,
            message: "No photo with that id"
          };
        } else {
          let splittedFileName = jsonController.resultsArray[resultID].url.split(".");
          let lastStatus = splittedFileName[0].substring(splittedFileName[0].length - 3);
        //   let newStatus = lastStatus.match(/^\(\d+\)$/) ? "(" + (parseInt(lastStatus.slice(1, -1)) + 1) + ")" : "(1)";
          let newName = lastStatus.match(/^\(\d+\)$/) 
            ? splittedFileName[0].substring(0, splittedFileName[0].length-3) + "(" + (parseInt(lastStatus.slice(1, -1)) + 1) + ")"  + "." + splittedFileName.slice(1).join(".") 
            : splittedFileName[0] + "(1)." + splittedFileName.slice(1).join(".");

        //   let newName = splittedFileName[0].substring(1, splittedFileName.length-3) + newStatus + "." + splittedFileName.join(".");
          let changes = {url: newName}
      
          return new Promise(async (resolve, reject) => {
            try {
              let resultImage = await sharp(jsonController.resultsArray[resultID].url);
      
              Object.keys(filters).forEach(async (filter) => {
                let value = filters[filter];
      
                switch (filter) {
                  case "rotate":
                    await resultImage.rotate(value);
                    break;
                  case "resize":
                    await resultImage.resize(value)
                    break;
                  case "format":
                    await resultImage.toFormat(value)
                    break;
                  case "crop":
                    let meta =  await resultImage.metadata()
                    if(meta.width >= value.width + value.left && meta.height >= value.height + value.top)
                      await resultImage.extract(value)
                    break;
                  case "grayscale":
                    await resultImage.grayscale()
                    break;
                  case "flip":
                    await resultImage.flip()
                    break;
                  case "flop":
                    await resultImage.flop()
                    break;
                  case "negate":
                    await resultImage.negate()
                    break;
                  case "tint":
                    await resultImage.tint(value)
                    break;
                  // Dodaj pozostałe przypadki dla innych filtrów
                }
                changes[filter] = value
              });
      
              await resultImage.toFile(newName);
              jsonController.updatehistory(resultID, changes)
              resolve({
                status: 201,
                message: "Successfully used filters."
              });
            } catch (err) {
              reject(err.mesage);
            }
          });
        }
      }
      
}