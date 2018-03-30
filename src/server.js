/**
 * Server description - requirements, middleware, request listeners, etc.
 */
// LOAD APPLICATION PROPERTIES
const properties = require('./properties');

// EXPRESS FRAMEWORK
const express = require('express');
const app = express();

// MAPPINGS - API - BEFORE SSL FORCING
app.use('/api/v1/', require('./api/v1'));

// SECURITY - FORCE SSL FOR WEB MAPPINGS
const forceSSL = require('express-force-ssl');
app.use(forceSSL);
app.set('forceSSLOptions', {
    httpsPort: properties.httpsPort
});

// MAPPINGS - STATIC RESOURCES
app.use(express.static('public'));
// MAPPINGS - WEB APP
app.use(require('./webpage'));

module.exports = function(opts) {
    // OPTION TO START WITHOUT SERVERS (MAINLY FOR TEST PURPOSES)
    /* istanbul ignore else */
    if (opts.serverless) {
        return app;
    } else {
        // FILESYSTEM - GET CERTIFICATE AND PRIVATE KEY FOR SSL
        const fs = require('fs');
        const privateKey = fs.readFileSync('./key.pem', 'utf-8');
        const certificate = fs.readFileSync('./cert.pem', 'utf-8');

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

        return api;
    }
};
