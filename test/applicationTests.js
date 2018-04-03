const request = require('supertest');
const expect = require('expect.js');
const app = require('../src/application');
const properties = require('../src/properties');
const API_URL = '/api/v1';

describe('Application', function() {
    describe('API', function () {
        it('should respond with JSON', function (done) {
            request(app)
                .get(API_URL)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.version).to.be('1.0');
                    done();
                });
        });
    });

    describe('Webpage', function () {
        it('should force ssl', function (done) {
            request(app)
                .get('/')
                .expect(301)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.headers.location).to.be('https://127.0.0.1:'+properties.httpsPort+'/');
                    done();
                });
        })
    });
});