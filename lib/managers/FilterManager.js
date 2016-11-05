const util = require('util');
const Queue = require('../helpers/Queue');

var filters; 

function FilterManager(){
    filters = [];
}

FilterManager.prototype.all = function(){
    return filters;
}

FilterManager.prototype.register = function(filter){
    //validations
    if (!util.isFunction(filter)) return new Error("filter is not a function");
    filters.push(filter);
    return true;
    
}

FilterManager.prototype.clear = function(){
    filters = {};
}

FilterManager.prototype.execute = function(req, res, cb){
    execute(new Queue(this.all()), req, res, cb);
}

function execute(queue, req, res, cb){
    if (queue.empty())
        return cb();
    queue
        .get()
        .call(null, req, res, ()=>{
            execute(queue, req, res, cb);
        });
}

module.exports = new FilterManager();