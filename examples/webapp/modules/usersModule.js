const Rx = require('rxjs');
const RxHttpRequest = require('rx-http-request').RxHttpRequest;

var MongoClient = require('mongodb').MongoClient;

const UsersModule = function(module){
    module
        .get('/')//returns observable for '/' path
        .zip(//aggragation of api resources 
            RxHttpRequest.get('http://localhost:8080/www/data/users.json').map(r=>JSON.parse(r.body)),
            RxHttpRequest.get('http://localhost:8080/www/data/orders.json').map(r=>JSON.parse(r.body))
        )
        .subscribe(e=>{
            var req = e[0].req, res = e[0].res, users = e[1], orders = e[2];
            res.json(200, {users: users, orders: orders})
        }); 

    module.post('/new')
        .subscribe(e=>{
            e.res.json(200, e.req.body);
        }); 
}

module.exports = UsersModule;
