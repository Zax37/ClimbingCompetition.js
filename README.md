# ClimbingCompetition.js
Climbing competition web application created with node.js

It allows multiple organizations to host a competition,
in which registered participants can take part in.

## How to use

Install it and run with NPM:

`npm install`

`npm start`

You can also run it with development configuration:

`NODE_ENV=dev npm start`

To run tests(with code coverage report) run command:

`npm test`

To run just the unit tests, or just functional tests run:

`npm run unit-tests`

or

`npm run func-tests`

## Application endpoints

The application listens for both http and https requests(on
the ports assigned to the selected profile) and responses
with different type of content, depending on requested resource
path.

### REST API

All requests relative to `/api/v1/` are handled by the api/v1
module. The project is structured in such way, so the next API
versions can be developed and published without interfering
with older versions.

### Web Application

All other requests are handled by the webpage module. For
security reasons SSL is forced, so all http requests
are redirected.