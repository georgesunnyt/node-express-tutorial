//this file is not used. This is just used to demonstrate how it would be to use node without express.
const http = require('http')
const lodash = require('lodash')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to ooty, nice to meet you')
    } else if (req.url === '/about') {
        res.end('sorry aliya')
    } else {
        res.writeHead(404, {'content-type': 'text/html'})
        res.end(
            `<h1>Oops cant find your page</h1>
            <a href='/'> go back </a>`
        )
    }
})

const items = [10, [1, [3, 4]]]
console.log(lodash.flattenDeep(items))
server.listen(3001)