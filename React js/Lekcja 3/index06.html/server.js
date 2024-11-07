const http = require("http");
const PORT = 3000;
const fs = require("fs")
const path = require("path")
const comments = require("./data/data")
const server = http.createServer((req, res) => {

    function renderFile(file, contentType) {
        fs.readFile((file), function (error, data) {
            if (error) throw error
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
            res.end();
        })
    }

    switch (req.method) {
        case "GET":
            switch (req.url) {
                case "/":
                    renderFile(path.join("static", "index06.html"), 'text/html')
                    break;
                case "/css/style.css":
                    renderFile(path.join("..", req.url), 'text/css')
                    break;
            }
            break;
        case "POST":
            let body = "";
            
            req.on("data", function (data) {
                console.log("data: " + data)
                body += data.toString();
            })

            req.on("end", function (data) {
                if(body){
                    let newComment = JSON.parse(body)
                    let threadIndex = comments.findIndex(thread => thread.id == newComment.threadID)
                    comments[threadIndex].comments.push({
                        id: comments[threadIndex].comments[comments[threadIndex].comments.length-1].id+1,
                        text: newComment.text,
                        date: new Date().getFullYear()
                    })
                }
                res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(comments, null, 5));
            })
            break;
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
