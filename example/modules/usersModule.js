const UsersModule = function(module){
    
    module.get('/route3')
        .map(e=>{
            e.res.json(200, {params: e.req.params, param_a: e.req.param('a')});
        })
        .subscribe();

    module.post('/route3')
        .map(e=>{
            e.res.json(200, {data: e.req.body, v:1});
        })
        .subscribe();
}

module.exports = UsersModule;
