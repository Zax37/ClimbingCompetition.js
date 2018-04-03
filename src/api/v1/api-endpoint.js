const expect = require('expect.js');

function RelativeEndpoint(rel, params) {
    if (rel !== undefined) {
        expect(rel).to.be.a('string');
        if (rel.charAt(0) !== '/') {
            rel = '/' + rel;
        }
        if (rel.charAt(rel.length-1) !== '/') {
            rel = rel + '/';
        }
    } else {
        rel = '/';
    }

    return function Endpoint(fn, url, method, args) {
        url = rel + url;
        let argStrings = {}, implementation;

        let mandatory = [];

        // process arguments
        if (args !== undefined) {
            for (let i in args) {
                if (args[i].optional === true) {
                    argStrings[i] = "(optional) " + args[i].text;
                } else {
                    mandatory.push(i);
                    argStrings[i] = args[i].text
                }
            }
        }

        implementation = function (req, res) {
            try {
                if (mandatory.length > 0) {
                    expect(req.query).to.have.keys(...mandatory);
                }
                if (params) {
                    expect(req.params).to.have.keys(...params);
                    let intermediate = fn(...params.map(key => req.params[key]));
                    expect(intermediate).to.be.a('function');
                    res.json(intermediate(req.query));
                } else {
                    res.json(fn(req.query));
                }
            } catch (e) {
                res.status(400).send(e.message);
            }
        };

        this.getMethod = function () {
            return method;
        };

        this.getURL = function () {
            return url;
        };

        this.getArgs = function () {
            return argStrings;
        };

        this.getImplementation = function () {
            return implementation;
        };

        this.applyTo = function (router) {
            switch (method) {
                case "GET":
                    router.get(url, implementation);
                    break;
                case "PUT":
                    router.put(url, implementation);
                    break;
                case "POST":
                    router.post(url, implementation);
                    break;
                default:
                    throw new Error("Unexpected method: "+method);
            }
        };
    }
}

module.exports = RelativeEndpoint;