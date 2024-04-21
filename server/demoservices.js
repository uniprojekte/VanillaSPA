"use strict"

module.exports = class DemoServices {

    constructor() {
    }

    // Increment clicks
    clickService(requestData) {
        let clicks = requestData.clicks
        let responseData = { status: 'ok', clicks: clicks + 1 }
        return responseData
    }

}