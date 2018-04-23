const http = require('http'),
    fs = require('fs'),
    port = 8888;

const path = './db/russian/english.json';
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
if (!fs.existsSync(path)) {
    console.log(`No path: ${path}`);
} else {
    fs.readFile(path, (err, contents) => {
        if (err) {
            throw err;
        }
        console.log(decoder.write(Buffer.from(contents)));
    });
}