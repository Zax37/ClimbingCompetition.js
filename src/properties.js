module.exports = (function(){
    switch(process.env.NODE_ENV){
        case 'test':
        case 'dev':
            return {
                httpPort: 8080,
                httpsPort: 8443,
                cname: 'localhost'
            };
        /* istanbul ignore next */
        case 'prod':
        /* istanbul ignore next */
        default:
            /* istanbul ignore next */
            return {
                httpPort: 80,
                httpsPort: 443,
                cname: 'climbingcompetition.com'
            };
    }
})();