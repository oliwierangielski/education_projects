const http = require("http");
const PORT = 3000;
const logger = require('tracer').colorConsole();
const imageRouter = require("./app/imageRouter")
const tagsRouter = require("./app/tagsRouter")
const filtersRouter = require("./app/filterRouter")
const usersRouter = require("./app/userRouter")
require('dotenv').config();
http
    .createServer((req, res) => {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', '*');
        
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
         }
         
        if(req.url.search("/api/photos") != -1 || req.url.search("/api/getfile") != -1){ // images
            imageRouter(req, res)
        } else if(req.url.search("/api/tags") != -1){ // tags
            tagsRouter(req, res)
        } else if (req.url.search("/api/filters") != -1) { //filters router
            filtersRouter(req, res)
        } else if (req.url.search("/api/user") != -1 || req.url.search("/api/profile") != -1) { // users
            usersRouter(req, res)
        } 
    })
    .listen(process.env.APP_PORT, () => logger.warn(`listen on ${process.env.APP_PORT}`))