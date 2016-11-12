const Rx = require('rxjs');
const RxHttpRequest = require('rx-http-request').RxHttpRequest;

var MongoClient = require('mongodb').MongoClient;

const UsersModule = function(module){

    var usersAndOrders = Rx.Observable.zip(//aggragation of api resources 
        RxHttpRequest.get('http://localhost:8080/www/data/users.json').map(r=>JSON.parse(r.body)),
        RxHttpRequest.get('http://localhost:8080/www/data/orders.json').map(r=>JSON.parse(r.body))
    );

    module
        .get('/')//returns observable for '/' path
        .subscribe(request=>{
            usersAndOrders.subscribe(zipResult=>{
                var users = zipResult[0],
                    orders = zipResult[1];
                request.json(200, {users: users, orders: orders});
            });
        }); 

    module.post('/new')
        .subscribe(request=>{
            request.json(200, request.body);
        }); 
}

module.exports = UsersModule;
