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
    .module('/users', require('./modules/usersModule'))//register api modules that you define
    .module('/login', require('./modules/loginModule'));
```

## program module
```js

```