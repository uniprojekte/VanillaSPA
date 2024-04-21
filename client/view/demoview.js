
"use strict"

const View = require("./view")

module.exports = class DemoView extends View {

    constructor(model) {
        super(model)
    }

    // render demoview as DOM snippet
    renderDOM() {
        let div = document.createElement("div")
        div.className = "demoview"

        let h1 = document.createElement("h1")
        h1.innerText = "Hello World"
        div.appendChild(h1)

        let button = document.createElement("button")
        button.innerText = "Click Me (" + this.model.clicks + ")"
        button.onclick = () => this.testButton()
        button.className = "demobutton"
        div.appendChild(button)
        return div
    }

    // render demoview as HTML snippet
    renderHTML() {
        let s = '';
        s += '<div class="demoview">'
        s += '<h1>Hello World</h1>'
        s += `<button class="demobutton" 
                      onclick="vanillaSPA.router.getView('demo').testButton()">`
            + 'Click Me ('
            + this.model.clicks
            + ')</button>'
        s += '</div>'
        return s
    }

    // Button-event-handler for testButton calling clickService() provided by the model.
    // Is invoked by the onclick-event directly from the HTML-code above.
    async testButton() {
        await this.model.clickService()
        vanillaSPA.router.refreshView()
    }
}
