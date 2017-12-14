// warning: ES6 syntax is used
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
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
            let body = [], action;
            request.on('error', (err) => {
                rsp.err = 'Error happened'
                // This prints the error message and stack trace to `stderr`.
                completed = true;
                console.error(err.stack);
            }).on('data', chunk => {
                const actStr = '%26action%3D',
                    chunkStr = String(chunk);
                if (chunkStr.indexOf(actStr)!==-1){
                    action = chunkStr.split(actStr).pop();
                }
                /* if (chunk.action){
                    chunk.toDo = chunk.action;
                    delete chunk.action;
                } */
                body.push(chunk);
                
            }).on('end', () => {
                // at this point, `body` has the entire request body stored in it as a string
                body = Buffer.concat(body).toString('utf8');
                rsp.body = body;
                rsp.action = action;
                completed = true;
                // response.write(JSON.stringify(rsp));
                // response.end();
            });
            break;
        /* case 'put': 
            rsp.body = 'Method put was used';
            break; */
        /* case 'delete': 
            rsp.body = 'Method delete was used';
            break; */
        default: break;
    }
    let cnt = 0, stuff = '';
    const intv = setInterval(() => {
        if (completed || cnt > 50) {
            clearInterval(intv);
            if (completed) {
                stuff = JSON.stringify(rsp);
            }
            if (cnt > 50) {
                stuff = 'Cannot finish';
                console.warn(stuff);
            }
            response.write(stuff);
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