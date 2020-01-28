const server = require('./api/server');

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    return console.log(`\n *** Server listening on PORT ${PORT} ***\n`)
})