"use strict"

module.exports = class Model {
    constructor() {
    }

    async serviceRequest(name, data) {
        let jsonreq = name + "?data=" + encodeURIComponent(JSON.stringify(data))
        let result = await this.fetchJSON(jsonreq)
        return (result)
    }

    async fetchJSON(url) {
        let result = null
        try {
            result = await (await (fetch(url))).json()
        } catch (err) {
            console.log(err)
        }
        return result
    }
}