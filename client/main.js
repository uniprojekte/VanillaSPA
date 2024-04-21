"use strict"

const Router = require('./router')

const DemoModel = require('./model/demomodel')
const DemoView = require('./view/demoview')

let router = new Router()
let model = new DemoModel()
router.addView('demo', new DemoView(model))

// bootstrap the app via <body onload="window.vanillaSPA.router.gotoView('demo')">
// alternatively: window.addEventListener('load', () => router.gotoView('demo'))

console.log("VanillaSPA started")
