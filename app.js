'use strict'

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3000;
const workDir = process.env.DIR || './static'

const server = http.createServer((req, res)=>{
    console.log(`Require url: ${req.url}`);

    let endpoint = url.parse(req.url).pathname;
    if(endpoint === '/'){
        fs.readFile(path.resolve(workDir,'greeter.html'), (err, data)=>{
            if(err){
                res.writeHead(404)
                throw err;
            }
            else {
                res.setHeader("Content-Type", "text/html; charset=utf-8")
                res.writeHead(200)
                res.end(data)
            }
        })
    }
    else if (endpoint === '/test'){
        fs.readFile(path.resolve(workDir,'test.txt'), (err, data)=>{
            if(err){
                res.writeHead(404)
                throw err;
            }
            else {
                res.setHeader("Content-Type", "text/html; charset=utf-8")
                res.writeHead(200)
                res.end(data)
            }
        })
    }
    else {
        res.writeHead(404).end('<h1>Page not found</h1>')
    }
})

server.listen(PORT, ()=>{
    console.log(`Server is working on port ${PORT}`)
})

const options = {
    hostname: 'localhost',
    port:3000,
    path:'/test',
    method: 'GET',
}


let body = ''

const req = http.request(options, (res)=>{
    res.on('data', chunk=>{
        // body.push(chunk);
        body += chunk
    })
    res.on('end', ()=>{
        // body = Buffer.concat(body).toString();
        console.log(JSON.stringify({data: body}))
    })
})

req.on('error',(err) =>{
    throw err;
})

req.end();




