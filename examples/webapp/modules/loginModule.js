const LoginModule = function(module){
    
    module.get('/verify')
        .flatMap(request=>request.json(200, request.params))
        .subscribe(request=>{
            lastReturn=>{},
            err=>request
                    .json(500, err)
                    .subscribe()
        }); 

    module.post('/auth')
        .flatMap(request=>request.json(200, request.body))
        .subscribe(request=>{
            lastReturn=>{},
            err=>request
                    .json(500, err)
                    .subscribe()
        });
}

module.exports = LoginModule;
