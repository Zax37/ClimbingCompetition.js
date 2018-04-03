/**
 * Server description - requirements, middleware, request listeners, etc.
 */
// LOAD APPLICATION PROPERTIES
const properties = require('./properties');

// EXPRESS FRAMEWORK
const express = require('express');
const application = express();

// PRETTY-PRINT JSON OUTPUT
application.set('json spaces', 2);

// MAPPINGS - API - BEFORE SSL FORCING
application.use('/api/v1/', require('./api/v1'));

// SECURITY - FORCE SSL FOR WEB MAPPINGS
const forceSSL = require('express-force-ssl');
application.use(forceSSL);
application.set('forceSSLOptions', {
    httpsPort: properties.httpsPort
});

// MAPPINGS - STATIC RESOURCES
application.use(express.static('public'));
// MAPPINGS - WEB APP
application.use(require('./webpage'));

module.exports = application;
