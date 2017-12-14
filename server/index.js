// warning: ES6 syntax is used
const http = require('http'),
    fs = require('fs'),
    port = 8888;

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': "application/json"
    });
    
    let rsp = {
            "method": request.method.toLowerCase(), "url": request.url
        },
        completed = false;

    switch (request.method.toLowerCase()) {
        case 'get':
            rsp.query = request.url.split('?').pop();
            completed = true;
            break;
        case 'post':
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                // at this point, `body` has the entire request body stored in it as a string
                body = Buffer.concat(body).toString();
                rsp.body = body;
                completed = true;
                // response.write(JSON.stringify(rsp));
                // response.end();
            });
            break;
        case 'put': break;
        case 'delete': break;
        default: break;
    }
    let cnt = 0;
    const intv = setInterval(() => {
        if (completed) {
            clearInterval(intv);
            response.write(JSON.stringify(rsp));
            response.end();
        }
        if (cnt > 50) {
            clearInterval(intv);
            console.warn('Cannot finish');
            response.write('Cannot finish');
            response.end();
        }
        ++cnt;
    }, 100);

    
    /*var exts, ext, type = 'text';

    function setParams(content) {
        response.writeHead(200, { 'Content-Type': type + "/" + ext });
        response.write(content);
        response.end();
    }

    fs.readFile(__dirname + '/index.html', function (err, html) {
        if (err) {
            throw err;
        }
        if (request.url == '/') {
            ext = 'html';
        } else {
            exts = request.url.split('.');
            ext = exts.pop();
        }
        switch (ext) {
            case 'js': case 'json':
                type = 'application';
                if (ext == 'js') ext = 'javascript';
                break;
            case 'ico':
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                type = 'image';
                break;
            case 'wav':
                type = 'audio';
                break;
            default:
                type = 'text';
                break;
        }   //console.log({__dirname:__dirname, 'request.url': request.url, "Content-Type": type + "/" + ext});
        if (ext == 'html') {
            setParams(html);
        } else {
            fs.readFile(__dirname + request.url, function (err, content) {
                if (err) {
                    throw err;
                }
                setParams(content);
            });
        }
    })*/
}).listen(port, function () { console.log('Server is run!') });