function Queue(arr){
    this.q = arr.slice();
}

Queue.prototype.empty = function(item){
    if (this.q.length == 0) 
        return true;
    else
        return false;
}

Queue.prototype.add = function(item){
    this.q.push(item);
}

Queue.prototype.get = function(){
    var result = this.q[0];
    this.q.splice(0,1);
    return result;
}

module.exports = Queue;