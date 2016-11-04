var Observerable = require('../Observerable')();
var path = require('path')
var fs = require('fs');
const contentNotFound = '<html><head></head><body><h1>404</h1><h3>page not found</h3></body></html>';

var ServeStaticFiles = function(req, res, next){
    if (req.url.indexOf(Observerable.staticPath)>-1){
        var filePath = '.' + req.url;
        if (filePath == './')
            filePath = './index.html';

        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;      
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(contentNotFound, 'utf-8');
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    res.end(); 
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    } else {
        next();
    }
}

module.exports = ServeStaticFiles;
