var assert = require('assert');
var RouteManager = require('../src/routeManager');
var HttpVerb = require('../src/enums').HttpVerb;
var Rx = require('rxjs');

describe("RouteManager unit tests", function() {
    
    beforeEach(function() {
        
    });

    afterEach(function() {
        RouteManager.clear();
    });

    it("should be singleton", function() {
        RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());     
        RouteManager.register('/route2', HttpVerb.GET, new Rx.Subject());
        RouteManager = require('../src/routeManager');
        assert.equal(Object.keys(RouteManager.all()).length, 2);    
    });

    it("should clear routes", function() {
        RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());     
        RouteManager.register('/route2', HttpVerb.GET, new Rx.Subject());
        assert.equal(Object.keys(RouteManager.all()).length, 2);
        RouteManager.clear();
        assert.equal(Object.keys(RouteManager.all()).length, 0);    
    });

    it("should get route", function() {
        RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());     
        RouteManager.register('/route2', HttpVerb.GET, new Rx.Subject());
        assert.equal(Object.keys(RouteManager.all()).length, 2);
        var result = RouteManager.get('/route1', HttpVerb.GET);
        assert.equal(true, result instanceof Rx.Subject);    
    });

    it("should not get route that is not registered", function() {
        RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());     
        RouteManager.register('/route2', HttpVerb.GET, new Rx.Subject());
        assert.equal(Object.keys(RouteManager.all()).length, 2);
        var result = RouteManager.get('/route3', HttpVerb.GET);
        console.log(result);
        assert.equal(true, result instanceof Error);    
    });

    it("should not get route - missing route name", function() {
        RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());     
        RouteManager.register('/route2', HttpVerb.GET, new Rx.Subject());
        assert.equal(Object.keys(RouteManager.all()).length, 2);
        var result = RouteManager.get();
        console.log(result);
        assert.equal(true, result instanceof Error);    
    });

    it("should not get route - missing verb name", function() {
        RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());     
        RouteManager.register('/route2', HttpVerb.GET, new Rx.Subject());
        assert.equal(Object.keys(RouteManager.all()).length, 2);
        var result = RouteManager.get('/route1');
        console.log(result);
        assert.equal(true, result instanceof Error);    
    });

    it("should not register route - missing route", function() {
        var result = RouteManager.register();
        console.log(result);
        assert.equal(true, result instanceof Error);       
    });

    it("should not register route - missing verb", function() {
        var result = RouteManager.register('/route1');
        console.log(result);
        assert.equal(true, result instanceof Error);       
    });

    it("should not register route - missing subject", function() {
        var result = RouteManager.register('/route1');
        console.log(result);
        assert.equal(true, result instanceof Error);    
    });

    it("should not register route - missing subject", function() {
        var result = RouteManager.register('/route1', '');
        console.log(result);
        assert.equal(true, result instanceof Error);    
    });

    it("should not register route with the same name", function() {
        var result = RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());
        result = RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());
        console.log(result);
        assert.equal(true, result instanceof Error);    
    });

     it("should register 1 route", function() {
        var result = RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());
        assert.equal(result, true);  
        assert.equal(Object.keys(RouteManager.all()).length, 1);              
    });

    it("should register 2 routes", function() {
        var result = RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());
        result = RouteManager.register('/route2', HttpVerb.GET, new Rx.Subject());
        assert.equal(result, true);
        assert.equal(Object.keys(RouteManager.all()).length, 2);    
    });

    it("should register 20 routes", function() {
        var result;
        for (var i=0;i<20;i++)
            result = RouteManager.register('test-route-'+i, HttpVerb.GET, new Rx.Subject());
        assert.equal(result, true);
        assert.equal(Object.keys(RouteManager.all()).length, 20);    
    });

    it("should unregister route", function() {
        var result = RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());
        assert.equal(Object.keys(RouteManager.all()).length, 1);            
        result = RouteManager.unregister('/route1', HttpVerb.GET);
        assert.equal(result, true);    
        assert.equal(Object.keys(RouteManager.all()).length, 0);    
    });

    it("should not unregister route - no resulver with that name found", function() {
        var result = RouteManager.register('/route1', HttpVerb.GET, new Rx.Subject());
        assert.equal(Object.keys(RouteManager.all()).length, 1);            
        result = RouteManager.unregister('/route2', HttpVerb.GET);
        console.log(result);
        assert.equal(true, result instanceof Error);    
        assert.equal(Object.keys(RouteManager.all()).length, 1);    
    });

});