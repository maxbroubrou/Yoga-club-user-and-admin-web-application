const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
app.set('port', port);


server.on('listening', () => {
    const adress = server.address();
    const bind = typeof adress === 'string' ? 'pipe ' + adress : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port)