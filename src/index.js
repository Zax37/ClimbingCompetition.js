// LOAD APPLICATION PROPERTIES
const properties = require('./properties');

// FILESYSTEM - GET CERTIFICATE AND PRIVATE KEY FOR SSL
const fs = require('fs');
const privateKey = fs.readFileSync('./key.pem', 'utf-8');
const certificate = fs.readFileSync('./cert.pem', 'utf-8');

// GET EXPRESS APPLICATION WITH MAPPINGS
const app = require('./application');

// HTTP/HTTPS SERVERS SETUP
const httpServer = require('http').createServer(app);
const httpsServer = require('https').createServer({
        key: privateKey,
        cert: certificate
    }, app
);

// HANDLE HTTP/HTTPS SERVER ERRORS
httpServer.on('error', function (e) {
    throw new Error(`Could not initialize HTTP Server on port ${properties.httpPort}.\n${e}`);
});
httpsServer.on('error', function (e) {
    throw new Error(`Could not initialize HTTPS Server on port ${properties.httpsPort}.\n${e}`);
});

// START LISTENING FOR HTTP AND HTTPS REQUESTS
httpServer.listen(properties.httpPort, () => {
    console.log(`Listening for http connections on port ${properties.httpPort}.`);
});
httpsServer.listen(properties.httpsPort, () => {
    console.log(`Listening for https connections on port ${properties.httpsPort}.`);
});

// CLEANUP AFTER CLOSING APPLICATION
const exitHook = require('async-exit-hook');
exitHook(() => {
    console.log("Ending application.");
});