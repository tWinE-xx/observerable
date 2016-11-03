const LoginModule = function(module){
    
    module.get('/route3')
        .map(e=>{
            e.res.json(200, {data: e.req.params});
        })
        .subscribe();

    module.post('/route3')
        .map(e=>{
             e.res.json(200, {data: e.req.body, v:1});
        })
        .subscribe();
}

module.exports = LoginModule;
