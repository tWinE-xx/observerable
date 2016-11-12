const LoginModule = function(module){
    
    module.get('/verify')
        .map(request=>{
            request.json(200, {data: request.params});
        })
        .subscribe();

    module.post('/auth')
        .map(request=>{
             request.json(200, {data: request.body, v:1});
        })
        .subscribe();
}

module.exports = LoginModule;
