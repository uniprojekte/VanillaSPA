
"use strict"

//-----------------------
// server.js - a tiny http-server implementing a simple service-protocol
//  
// service HTTP-request-URL: /servicename?data={...}
//      - pathname <servicename> identifies the invoked service
//      - query-parameter <data> holds a stringified, URL-encoded object containing service specific data
//
// service HTTP-response: a stringified object containing 
//      .status = "ok" | "error" | ...
//      ...     = service specific data
//
//-----------------------

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

module.exports = class Server {

    #serviceMap

    constructor() {
        this.server = http.createServer(this.processHttpRequest.bind(this))
        this.#serviceMap = new Map()
    }

    // add a service 
    addService(serviceName, handler) {
        this.#serviceMap.set(serviceName, handler)
    }

    start(port) {
        this.server.listen(port, () => {
            console.log(`VanillaSPA-server running at http://127.0.0.1:${port}/`)
        })
    }

    processHttpRequest(req, res) {
        let parts = url.parse(req.url, true)
        let query = parts.query
        // @ts-ignore
        let data = query.data ? JSON.parse(decodeURIComponent(query.data)) : null

        let filePath = parts.pathname ? parts.pathname.substring(1) : ""
        if (filePath === null || filePath === '') filePath = 'index.html'

        let now = new Date;
        console.log(now.toLocaleString('de-DE') + ': request for ' + req.url)

        if (data) {
            if (this.#serviceMap.has(filePath)) {
                this.#serviceResponse(res, this.#serviceMap.get(filePath)(data))
            } else {
                this.#serviceResponse(res, { status: "service unknown" })
            }
        } else {
            this.#staticResponse(res, filePath)
        }
    }

    //------------------------ 

    #serviceResponse(res, result) {
        res.statusCode = (result.status == 'ok') ? 200 : 400
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.end(JSON.stringify(result))
        console.log(JSON.stringify(result))
    }

    //-----------------------

    #staticResponse(res, filePath) {
        fs.readFile('./public/' + filePath, (err, data) => {
            res.statusCode = 200
            switch (path.extname(filePath)) {
                case ".html":
                case ".htm": res.setHeader('Content-Type', 'text/html'); break
                case ".css": res.setHeader('Content-Type', 'text/css'); break
                case ".png": res.setHeader('Content-Type', 'image/png'); break
                case ".gif": res.setHeader('Content-Type', 'image/gif'); break
            }
            res.end(data)
        })
    }
}
