"use strict"

const express = require('express')
const app = express()

const DemoServices = require("./demoservices")
let services = new DemoServices()

app.get('/clickService', function (req, res, next) {
    if (req.query.data) {
        let data = JSON.parse(req.query.data)
        res.send(JSON.stringify(services.clickService(data)))
    } else {
        res.send(JSON.stringify({ status: 'error' }))
    }
})
app.use(express.static('./public/'))

app.listen(8123)