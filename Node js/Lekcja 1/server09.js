const http = require("http");
const PORT = 3000;
require("colors");
const server = http.createServer((req, res) => {
        res.end()
        const logger = require('tracer').colorConsole();
        logger.log('hello');
        logger.trace('hello');
        logger.debug('hello');
        logger.info('hello');
        logger.warn('hello');
        logger.error('hello');
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
