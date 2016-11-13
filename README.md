# obSERVERable is a reactive alternative to Express (using rx.js)

## Bringing the power of streams to the server

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
const Observerable = require('../../lib/Observerable')();
const visualV8 = require('visualv8')();

//define application
Observerable.start(8080, 'localhost')
    .static('www')//static content folder
    .filter(require('./filters/Csrf'))//your own middlewares
    .filter(require('./filters/RequestLog'))//your own middlewares
    .module('/users', require('./modules/usersModule'))//module developed
    .module('/login', require('./modules/loginModule'));//module developed

//a module you develop
const UsersModule = function(module){
    
    //cool reactive rest resources composition
    module
        .get('/')//returns observable for '/' path
        .subscribe(request=>{
            Rx.Observable.zip(//aggragation of api resources 
                RxHttpRequest.get('http://localhost:8080/www/data/users.json').map(r=>JSON.parse(r.body)),
                RxHttpRequest.get('http://localhost:8080/www/data/orders.json').map(r=>JSON.parse(r.body))
            ).subscribe(zipResult=>{
                var users = zipResult[0],
                    orders = zipResult[1];
                request
                    .json(200, {users: users, orders: orders})
                    .subscribe();
            });
        }); 

    //simple loop iof data
    module.post('/new')
        .flatMap(request=>request.json(200, request.body))
        .subscribe(request=>{
            lastReturn=>{},
            err=>request
                    .json(500, err)
                    .subscribe()
        });  

    //database integration
    //using rx-mongodb a reactive mongodb libarary based on rxjs
     module.post('/save')//returns observable for '/save' path gor POST
        .subscribe(request=>{
            rxMongodb
                .connect(connectionString) 
                .flatMap(db=>rxMongodb.insert(collectionName, request.body))
                .flatMap(insertResult=>request.json(200, insertResult))
                .flatMap(response=>rxMongodb.close())
                .subscribe(
                    lastReturn=>{},
                    err=>request
                            .json(500, err)
                            .subscribe()
                );
        });
    
}

module.exports = UsersModule;

```

# Installation

```js
npm install observerable
```

## Features

    * Reactive stream based, you get a stream not request response
    * Module based development
    * Application level filters (like express middleware)
    * Session Management
    * Cookie Management
    * More to come..

## Install & run the sample application (usage demo) 
    
    cd examples
    npm install
    npm start

Then access [http://localhost:8080](http://localhost:8080)

## create server

```js
const Observerable = require('observerable')();

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
    
    module.get('/details/info')//listens to get requests on http://<domain>:<port>/users/info?id=1
        .flatMap(request=>request.json(200, request.params))//return querystring params sent (loop)
        .subscribe(request=>{
            lastReturn=>{},
            err=>request
                    .json(500, err)
                    .subscribe()
        });

    module.post('/auth')//listens to post requests on http://<domain>:<port>/users/auth
        .flatMap(request=>request.json(200, request.body))//return body data sent (loop)
        .subscribe(request=>{
            lastReturn=>{},
            err=>request
                    .json(500, err)
                    .subscribe()
        });
}

module.exports = UsersModule;
```