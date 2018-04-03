const expect = require('expect.js');
const request = require('supertest');
const express = require('express');

const RelativeEndpoint = require('./api-endpoint');
const Endpoint = RelativeEndpoint();

let anything = 'anything';
function getAnything() {
    return anything;
}

let something = 'something';
let someArr = [];
function storeSomething(params) {
    someArr.push(params.something);
}
function getSomething() {
    return [...someArr];
}

let someText = "Some parameter.";
let anotherText = "Another parameter.";

describe('API Endpoint', function () {
   it('should list params properly', function () {
       let unit = new Endpoint(storeSomething, something, "PUT", {
          something: { text: someText },
          another: { optional: true, text: anotherText }
       });

       let args = unit.getArgs();
       expect(args).to.only.have.keys(
           "something", "another"
       );
       expect(args.something).to.be(someText);
       expect(args.another).to.be("(optional) "+anotherText);
   });

   describe('used in application', function () {
        it('should respond with JSON', function (done) {
            let app = express();
            let unit = new Endpoint(getAnything, anything, "GET");
            app.get(unit.getURL(), unit.getImplementation());

            request(app)
                .get(unit.getURL())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be(anything);
                    done();
                });
        });

       it('should respond to PUT with args', function (done) {
           let app = express();
           let unit1 = new Endpoint(storeSomething, something, "PUT", {
               something: { text: someText }
           });
           let unit2 = new Endpoint(getSomething, something, "GET");
           app.put(unit1.getURL(), unit1.getImplementation());
           app.get(unit2.getURL(), unit2.getImplementation());

           let testString = "TEST";

           request(app)
               .put(unit1.getURL()+"?something="+testString)
               .expect(200)
               .then(() => {
                   request(app)
                       .get(unit2.getURL())
                       .set('Accept', 'application/json')
                       .expect('Content-Type', /json/)
                       .expect(200)
                       .then(res => {
                           expect(res.body).to.contain(testString);
                           done();
                       });
               });
       });

        it('should respond to PUT without args', function (done) {
            let app = express();
            let unit = new Endpoint(storeSomething, something, "PUT");
            app.put(unit.getURL(), unit.getImplementation());

            request(app)
                .put(unit.getURL())
                .expect(200, done);
        });

        it('should fail when mandatory argument is missing', function (done) {
            let app = express();
            let unit = new Endpoint(storeSomething, something, "PUT", {
                something: { text: someText }
            });
            app.put(unit.getURL(), unit.getImplementation());

            request(app)
                .put(unit.getURL())
                .expect(400, done);
        });

        it('should work with relative paths', function (done) {
            let app = express();
            let unit = new (RelativeEndpoint("path/:id/", ["id"]))(function (id) {
                return function (params) {
                    return {
                        id: id,
                        thing: params.thing
                    };
                };
            }, "thing", "GET", {
                thing: { text: someText }
            });
            unit.applyTo(app);

            let expectedId = '1', expectedThing = 'asd';
            request(app)
                .get("/path/"+expectedId+"/thing?thing="+expectedThing)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    let { id, thing } = res.body;
                    expect(id).to.be(expectedId);
                    expect(thing).to.be(expectedThing);
                    done();
                });
        });

        it('should fail to apply if method unknown', function () {
            let app = express();
            let unit = new Endpoint(function(){}, "link", "METHOD");
            expect(unit.applyTo).withArgs(app).to.throwError();
        });
   });
});