"use strict"

module.exports = class DemoServices {

    constructor() {
    }

    // Render the views HTML-snippet
    clickService(requestData) {
        let clicks = requestData.clicks
        let responseData = { status: 'ok', clicks: clicks + 1 }
        return responseData
    }

}