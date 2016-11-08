# obSERVERable is a reactive alternative to Express (using rx.js)

I love node.js and Express but I also love reactive programming.
Express is a visionary in many ways but it is not a native fit to my reactive programming style..  
obSERVERable is a server which allows you to program reactive (native) api (and applications of course).

With Express we are used to define an api like this:
```js
var express = require('express')
var app = express()

app.get('/about', function (req, res) {
  res.send('about')
})
```

With obSERVERable you do stuff reactive:
```js

//TODO - show example geting data from db

```

# Installation
```js
npm install observerable
```

## Features

    * ..
    * ..
    * ..
    * ..

## Install & run the sample application (usage demo) 
    
    cd examples
    npm install
    npm start

Then access [http://localhost:8080](http://localhost:8080)

## create server

```js
const Observerable = require('../src/Observerable')();

Observerable.start(8080, 'localhost')//configure and start your server
    .static('www')//serve static files from a directory of you choosing
    .filter(require('./filters/Csrf'))//register application level filters (like Express middleware) that you write
    .filter(require('./filters/RequestLog'))
    .module('/users', require('./modules/UsersModule'));//register api modules that you define
```

## program modules
### modules expose streams by http verb (get and post) and routes 
```js
const UsersModule = function(module){
    
    module.get('/details/info')//listens to get requests on http://<domain>/users/info?id=1
        .subscribe(e=>e.res.json(200, {id: e.req.params});//use response object to return response with quesry params 

    module.post('/new')//listens to post requests on http://<domain>/users/auth
        .map(e=>{
             e.res.json(200, {user: e.req.body});//use response object to return response which includes the request body data
        })
        .subscribe();
    
    //aggregation example using zip and rx-http-request module (npm)
    module
        .get('/orders')
        .zip(//aggragation of api resources 
            RxHttpRequest.get('http://localhost:8080/www/data/users.json').map(r=>JSON.parse(r.body)),
            RxHttpRequest.get('http://localhost:8080/www/data/orders.json').map(r=>JSON.parse(r.body))
        )
        .subscribe(e=>{
            var req = e[0].req, res = e[0].res, users = e[1], orders = e[2];
            res.json(200, {users: users, orders: orders})
        });
}

module.exports = UsersModule;
```