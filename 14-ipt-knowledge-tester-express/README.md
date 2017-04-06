# IPT Knowledge Tester v0.2.0

IPT Knowledge Tester provides ability for instructors to define tests, and for students to test their knowledge and abilities. 
In addition to that it allows users to register, and administrators to manage them.The system willbe developed as a Single Page Application (SPA) 
using *React.js* and *react-router* as front-end, and *Node.js* + *hapi* + *MongoDB* as backend technologies.

## Project Configuration
Please choose the MongoDB data folder and specify it in *package.json* in scripts section, *'mongo'* script. 
By default it uses `c:/mongo-data` folder.

## Runnung The Demo
In order to start the project instal latest *Node.js* and from console run:
```
npm install
npm start
``` 

Alternatively you can selectively start the individual application components:
* MongoDB - `npm run mongo`
* node.js + hapi.js serrvices - `npm run services` (if you don't need automatic server restarting on change - use `node` instead of `nodemon` in the script)
* webpack-dev-server with HMR (Hot Module Replacement) - `npm run webpack`


## Project Decription and Main Components
Application provides following functionality:

* *Anonymous users* can view the information pages and try few sample tests without saving test results.
* *Students* can choose tests to complete – test results are saved automatically on test completion.
* *Instructors* can create tests and see the students' test results.
* *Administrators* can manage (create, edit user data and delete) all registered users, as well as tests and test results.

JavaScript (ECMAScript 6) client part is available in `/app` folder. It uses *Webpack* and *webpack-dev-server* with HMR (Hot Module Replacement).
Configuration is specified in webpack.config.js. 

Client side application is developed as *Singe Page App (SPA)*. The app entry point is `index.js`, which imports *react-router* configuration
specified in `main-router.jsx`. The top-level application component is `ipt-knowledge-tester.jsx` (React JSX + ES6).

Server side is implemented using *hapi.js (http://hapijs.com/)* *Node* framework and resides in `/test-api` forlder. 
The Test API is proxied by webpack-dev-server configuration to port 9000 (configurable). Main server class is `server.js`.

Two main features are implemented both on client and server side in this version of the project:
* User management
* Test /Question /Answer management

The server side implementation for two features are in `user.routes.js` and `user.handlers.js` (for User management), 
and `test.routes.js` and `test.handlers.js` (for Test management).

Client side implementation uses React ES6 components and resides id `/app/componets/views/users`, and `/app/componets/views/tests` accordingly.