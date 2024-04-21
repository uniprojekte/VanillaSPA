"use strict"

const Model = require("./model")

module.exports = class DemoModel extends Model {
    constructor() {
        super()
        this.clicks = 0
    }

    async clickService() {
        let data = { clicks: this.clicks }
        let result = await this.serviceRequest("clickService", data)
        if (result.status == 'ok') {
            this.clicks = result.clicks
        }
        return (result)
    }
}