const http = require("http");
const PORT = 3000;
const fs = require("fs")
const mime = require('mime-types')
const server = http.createServer((req, res) => {
    console.log(req.method)
    switch (req.method) {
        case "GET":
            //wyświetlenie strony html
            let url = decodeURI(req.url)
            if (url == "/") {
                fs.readFile("static/index04.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data)
                    res.end()
                })
            } else {
                let file = "static" + url
                if (fs.existsSync(file)) {
                    fs.readFile(file, function (error, data) {
                        res.writeHead(200, { 'Content-Type': mime.lookup(file) });
                        res.write(data)
                        res.end()
                    })
                }
            }
            break;
        case "POST":
            // odbiór posta
            serverResponse(req, res)

            break;
    }
})

function serverResponse(req, res) {
    let body = "";
    req.on("data", function (data) {
        console.log("data: " + data)
        body += data.toString();
    })
    req.on("end", function (data) {
        console.log(body)
        const params = new URLSearchParams(body);
        const paramObj = Object.fromEntries(params);
        let finishObj = []
        finishObj.push({
            message:"suma dwu elementów",
            wynik: parseFloat(paramObj.txt1) + parseFloat(paramObj.txt2)
        }, {
            message:"rónica dwu elementów",
            wynik: parseFloat(paramObj.txt1) - parseFloat(paramObj.txt2)
        }, {
            message:"iloczyn dwu elementów",
            wynik: parseFloat(paramObj.txt1) * parseFloat(paramObj.txt2)
        }, {
            message:"iloraz dwu elementów",
            wynik: parseFloat(paramObj.txt1) / parseFloat(paramObj.txt2)
        })
        switch (paramObj.operation) {
            case "sum":
                finishObj = finishObj[0]
                break;
            case "diff":
                finishObj = finishObj[1]
                break;
            case "pro":
                finishObj = finishObj[2]
                break;
            case "quo":
                finishObj = finishObj[3]
                break;
        }
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(finishObj, null, 5));
    })
}

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});