var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var path = require('path');

app.listen(9000);

console.log('app ' + app);

function handler (request, response) {


    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octect-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });



}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


// var http = require('http');
// var io = require('socket.io')(http, {log:true, origins: '*:*'});
// var fs = require('fs');
// var path = require('path');


// http.createServer(function (request, response) {
//     console.log('request ', request.url);

//     var filePath = '.' + request.url;
//     if (filePath == './')
//         filePath = './index.html';

//     var extname = String(path.extname(filePath)).toLowerCase();
//     var contentType = 'text/html';
//     var mimeTypes = {
//         '.html': 'text/html',
//         '.js': 'text/javascript',
//         '.css': 'text/css',
//         '.json': 'application/json',
//         '.png': 'image/png',
//         '.jpg': 'image/jpg',
//         '.gif': 'image/gif',
//         '.wav': 'audio/wav',
//         '.mp4': 'video/mp4',
//         '.woff': 'application/font-woff',
//         '.ttf': 'application/font-ttf',
//         '.eot': 'application/vnd.ms-fontobject',
//         '.otf': 'application/font-otf',
//         '.svg': 'application/image/svg+xml'
//     };

//     contentType = mimeTypes[extname] || 'application/octect-stream';

//     fs.readFile(filePath, function(error, content) {
//         if (error) {
//             if(error.code == 'ENOENT'){
//                 fs.readFile('./404.html', function(error, content) {
//                     response.writeHead(200, { 'Content-Type': contentType });
//                     response.end(content, 'utf-8');
//                 });
//             }
//             else {
//                 response.writeHead(500);
//                 response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
//                 response.end();
//             }
//         }
//         else {
//             response.writeHead(200, { 'Content-Type': contentType });
//             response.end(content, 'utf-8');
//         }
//     });


// }).listen(process.env.PORT || 9000);

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

// console.log('Server running at http://127.0.0.1:9000/');

