const Rx = require('rxjs');
const RxHttpRequest = require('rx-http-request').RxHttpRequest;
const mongodb = require('mongodb');
const RxMongodb = require('rx-mongodb');
const rxMongodb = new RxMongodb(mongodb);
const dbName = 'example';
const collectionName = 'users';
const connectionString = 'mongodb://localhost:27017/'+dbName;

var MongoClient = require('mongodb').MongoClient;

const UsersModule = function(module){
    
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

    module.post('/new')
        .flatMap(request=>request.json(200, request.body))
        .subscribe(request=>{
            lastReturn=>{},
            err=>request
                    .json(500, err)
                    .subscribe()
        }); 
    
    module.post('/save')
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
