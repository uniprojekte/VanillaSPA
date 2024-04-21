
"use strict"

const Server = require('./server')
const DemoServices = require("./demoservices")

let services = new DemoServices()
let server = new Server(8123)
server.addService('clickService', services.clickService.bind(this))
server.start(8123)

// catch all unhandled exceptions
process.on('uncaughtException', (err) => {
    console.log(err)
})
