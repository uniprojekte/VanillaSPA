(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./model/demomodel":2,"./router":4,"./view/demoview":5}],2:[function(require,module,exports){
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
},{"./model":3}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
"use strict"

// The router keeps track of all views and provides minimalistic routing

module.exports = class Router {
    #viewMap;
    #viewName;

    constructor() {
        this.#viewMap = new Map()
        this.#viewName = ""
        // put vanillaSPA into global namespace
        window.vanillaSPA = {router: this}
        window.addEventListener('hashchange', () => this.gotoView(document.location.hash.slice(1)))
    }

    // add a view 
    addView(viewName, view) {
        this.#viewMap.set(viewName, view)
    }

    getView(viewName) {
        if (this.#viewMap.has(viewName)) {
            return this.#viewMap.get(viewName)
        } else {
            return null
        }
    }

    // switch to view
    gotoView(viewName) {
        if (this.#viewMap.has(viewName)) {
            if (this.#viewName != "") {
                this.getView(this.#viewName).stopView()
            }
            this.#viewMap.get(viewName).startView()
            this.#viewName = viewName
            document.location.hash = '#' + viewName
            this.refreshView()
        }
    }

    // refresh the current view
    refreshView() {
        const contententrypoint = document.getElementById('appcontent')

        if (contententrypoint && this.#viewMap.has(this.#viewName)) {
            let domSnippet = this.#viewMap.get(this.#viewName).renderDOM()
            if (domSnippet) {

                while (contententrypoint.hasChildNodes()) {
                    contententrypoint.removeChild(contententrypoint.firstChild)
                }
                contententrypoint.appendChild(domSnippet)

            } else {
                contententrypoint.innerHTML = this.#viewMap.get(this.#viewName).renderHTML()
            }

        }
    }
}

},{}],5:[function(require,module,exports){

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

},{"./view":6}],6:[function(require,module,exports){

"use strict"

//-------------------------------------------------------------------
//--- Baseclass of all views
//
// A view provides HTML-rendering and may comprise HTML-event handlers 
// and propriatary data. It displays the application data of the model
// and uses its application logic to modify it.

module.exports = class View {

    constructor(model = null) {
        this.model = model
    }

    // Render view as DOM-snippet
    renderDOM() {
        return null
    }

    // Render view as HTML-snippet
    // Used iff renderDOM returned null
    renderHTML() {
        return '<div>to-be-implemented</div>'
    }

    // Invoked by router on gotoView()
    startView() {
    }

    stopView() {
    }

}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL2FkbWluL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9tYWluLmpzIiwiY2xpZW50L21vZGVsL2RlbW9tb2RlbC5qcyIsImNsaWVudC9tb2RlbC9tb2RlbC5qcyIsImNsaWVudC9yb3V0ZXIuanMiLCJjbGllbnQvdmlldy9kZW1vdmlldy5qcyIsImNsaWVudC92aWV3L3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiXHJcblxyXG5jb25zdCBSb3V0ZXIgPSByZXF1aXJlKCcuL3JvdXRlcicpXHJcblxyXG5jb25zdCBEZW1vTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsL2RlbW9tb2RlbCcpXHJcbmNvbnN0IERlbW9WaWV3ID0gcmVxdWlyZSgnLi92aWV3L2RlbW92aWV3JylcclxuXHJcbmxldCByb3V0ZXIgPSBuZXcgUm91dGVyKClcclxubGV0IG1vZGVsID0gbmV3IERlbW9Nb2RlbCgpXHJcbnJvdXRlci5hZGRWaWV3KCdkZW1vJywgbmV3IERlbW9WaWV3KG1vZGVsKSlcclxuXHJcbi8vIGJvb3RzdHJhcCB0aGUgYXBwIHZpYSA8Ym9keSBvbmxvYWQ9XCJ3aW5kb3cudmFuaWxsYVNQQS5yb3V0ZXIuZ290b1ZpZXcoJ2RlbW8nKVwiPlxyXG4vLyBhbHRlcm5hdGl2ZWx5OiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHJvdXRlci5nb3RvVmlldygnZGVtbycpKVxyXG5cclxuY29uc29sZS5sb2coXCJWYW5pbGxhU1BBIHN0YXJ0ZWRcIilcclxuIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbmNvbnN0IE1vZGVsID0gcmVxdWlyZShcIi4vbW9kZWxcIilcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRGVtb01vZGVsIGV4dGVuZHMgTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuY2xpY2tzID0gMFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNsaWNrU2VydmljZSgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHsgY2xpY2tzOiB0aGlzLmNsaWNrcyB9XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2VydmljZVJlcXVlc3QoXCJjbGlja1NlcnZpY2VcIiwgZGF0YSlcclxuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PSAnb2snKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tzID0gcmVzdWx0LmNsaWNrc1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHJlc3VsdClcclxuICAgIH1cclxufSIsIlwidXNlIHN0cmljdFwiXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNlcnZpY2VSZXF1ZXN0KG5hbWUsIGRhdGEpIHtcclxuICAgICAgICBsZXQganNvbnJlcSA9IG5hbWUgKyBcIj9kYXRhPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLmZldGNoSlNPTihqc29ucmVxKVxyXG4gICAgICAgIHJldHVybiAocmVzdWx0KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZldGNoSlNPTih1cmwpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IChhd2FpdCAoZmV0Y2godXJsKSkpLmpzb24oKVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxufSIsIlwidXNlIHN0cmljdFwiXHJcblxyXG4vLyBUaGUgcm91dGVyIGtlZXBzIHRyYWNrIG9mIGFsbCB2aWV3cyBhbmQgcHJvdmlkZXMgbWluaW1hbGlzdGljIHJvdXRpbmdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUm91dGVyIHtcclxuICAgICN2aWV3TWFwO1xyXG4gICAgI3ZpZXdOYW1lO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuI3ZpZXdNYXAgPSBuZXcgTWFwKClcclxuICAgICAgICB0aGlzLiN2aWV3TmFtZSA9IFwiXCJcclxuICAgICAgICAvLyBwdXQgdmFuaWxsYVNQQSBpbnRvIGdsb2JhbCBuYW1lc3BhY2VcclxuICAgICAgICB3aW5kb3cudmFuaWxsYVNQQSA9IHtyb3V0ZXI6IHRoaXN9XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoKSA9PiB0aGlzLmdvdG9WaWV3KGRvY3VtZW50LmxvY2F0aW9uLmhhc2guc2xpY2UoMSkpKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBhIHZpZXcgXHJcbiAgICBhZGRWaWV3KHZpZXdOYW1lLCB2aWV3KSB7XHJcbiAgICAgICAgdGhpcy4jdmlld01hcC5zZXQodmlld05hbWUsIHZpZXcpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Vmlldyh2aWV3TmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLiN2aWV3TWFwLmhhcyh2aWV3TmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuI3ZpZXdNYXAuZ2V0KHZpZXdOYW1lKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHN3aXRjaCB0byB2aWV3XHJcbiAgICBnb3RvVmlldyh2aWV3TmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLiN2aWV3TWFwLmhhcyh2aWV3TmFtZSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuI3ZpZXdOYW1lICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Vmlldyh0aGlzLiN2aWV3TmFtZSkuc3RvcFZpZXcoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuI3ZpZXdNYXAuZ2V0KHZpZXdOYW1lKS5zdGFydFZpZXcoKVxyXG4gICAgICAgICAgICB0aGlzLiN2aWV3TmFtZSA9IHZpZXdOYW1lXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhhc2ggPSAnIycgKyB2aWV3TmFtZVxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVmcmVzaCB0aGUgY3VycmVudCB2aWV3XHJcbiAgICByZWZyZXNoVmlldygpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50ZW50cnlwb2ludCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBjb250ZW50JylcclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnRlbnRyeXBvaW50ICYmIHRoaXMuI3ZpZXdNYXAuaGFzKHRoaXMuI3ZpZXdOYW1lKSkge1xyXG4gICAgICAgICAgICBsZXQgZG9tU25pcHBldCA9IHRoaXMuI3ZpZXdNYXAuZ2V0KHRoaXMuI3ZpZXdOYW1lKS5yZW5kZXJET00oKVxyXG4gICAgICAgICAgICBpZiAoZG9tU25pcHBldCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChjb250ZW50ZW50cnlwb2ludC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ZW50cnlwb2ludC5yZW1vdmVDaGlsZChjb250ZW50ZW50cnlwb2ludC5maXJzdENoaWxkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGVudGVudHJ5cG9pbnQuYXBwZW5kQ2hpbGQoZG9tU25pcHBldClcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ZW50cnlwb2ludC5pbm5lckhUTUwgPSB0aGlzLiN2aWV3TWFwLmdldCh0aGlzLiN2aWV3TmFtZSkucmVuZGVySFRNTCgpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIlxuXCJ1c2Ugc3RyaWN0XCJcblxuY29uc3QgVmlldyA9IHJlcXVpcmUoXCIuL3ZpZXdcIilcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBEZW1vVmlldyBleHRlbmRzIFZpZXcge1xuXG4gICAgY29uc3RydWN0b3IobW9kZWwpIHtcbiAgICAgICAgc3VwZXIobW9kZWwpXG4gICAgfVxuXG4gICAgLy8gcmVuZGVyIGRlbW92aWV3IGFzIERPTSBzbmlwcGV0XG4gICAgcmVuZGVyRE9NKCkge1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJkZW1vdmlld1wiXG5cbiAgICAgICAgbGV0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpXG4gICAgICAgIGgxLmlubmVyVGV4dCA9IFwiSGVsbG8gV29ybGRcIlxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaDEpXG5cbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwiQ2xpY2sgTWUgKFwiICsgdGhpcy5tb2RlbC5jbGlja3MgKyBcIilcIlxuICAgICAgICBidXR0b24ub25jbGljayA9ICgpID0+IHRoaXMudGVzdEJ1dHRvbigpXG4gICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImRlbW9idXR0b25cIlxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuICAgICAgICByZXR1cm4gZGl2XG4gICAgfVxuXG4gICAgLy8gcmVuZGVyIGRlbW92aWV3IGFzIEhUTUwgc25pcHBldFxuICAgIHJlbmRlckhUTUwoKSB7XG4gICAgICAgIGxldCBzID0gJyc7XG4gICAgICAgIHMgKz0gJzxkaXYgY2xhc3M9XCJkZW1vdmlld1wiPidcbiAgICAgICAgcyArPSAnPGgxPkhlbGxvIFdvcmxkPC9oMT4nXG4gICAgICAgIHMgKz0gYDxidXR0b24gY2xhc3M9XCJkZW1vYnV0dG9uXCIgXG4gICAgICAgICAgICAgICAgICAgICAgb25jbGljaz1cInZhbmlsbGFTUEEucm91dGVyLmdldFZpZXcoJ2RlbW8nKS50ZXN0QnV0dG9uKClcIj5gXG4gICAgICAgICAgICArICdDbGljayBNZSAoJ1xuICAgICAgICAgICAgKyB0aGlzLm1vZGVsLmNsaWNrc1xuICAgICAgICAgICAgKyAnKTwvYnV0dG9uPidcbiAgICAgICAgcyArPSAnPC9kaXY+J1xuICAgICAgICByZXR1cm4gc1xuICAgIH1cblxuICAgIC8vIEJ1dHRvbi1ldmVudC1oYW5kbGVyIGZvciB0ZXN0QnV0dG9uIGNhbGxpbmcgY2xpY2tTZXJ2aWNlKCkgcHJvdmlkZWQgYnkgdGhlIG1vZGVsLlxuICAgIC8vIElzIGludm9rZWQgYnkgdGhlIG9uY2xpY2stZXZlbnQgZGlyZWN0bHkgZnJvbSB0aGUgSFRNTC1jb2RlIGFib3ZlLlxuICAgIGFzeW5jIHRlc3RCdXR0b24oKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubW9kZWwuY2xpY2tTZXJ2aWNlKClcbiAgICAgICAgdmFuaWxsYVNQQS5yb3V0ZXIucmVmcmVzaFZpZXcoKVxuICAgIH1cbn1cbiIsIlxuXCJ1c2Ugc3RyaWN0XCJcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLy0tLSBCYXNlY2xhc3Mgb2YgYWxsIHZpZXdzXG4vL1xuLy8gQSB2aWV3IHByb3ZpZGVzIEhUTUwtcmVuZGVyaW5nIGFuZCBtYXkgY29tcHJpc2UgSFRNTC1ldmVudCBoYW5kbGVycyBcbi8vIGFuZCBwcm9wcmlhdGFyeSBkYXRhLiBJdCBkaXNwbGF5cyB0aGUgYXBwbGljYXRpb24gZGF0YSBvZiB0aGUgbW9kZWxcbi8vIGFuZCB1c2VzIGl0cyBhcHBsaWNhdGlvbiBsb2dpYyB0byBtb2RpZnkgaXQuXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgVmlldyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsXG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIHZpZXcgYXMgRE9NLXNuaXBwZXRcbiAgICByZW5kZXJET00oKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIHZpZXcgYXMgSFRNTC1zbmlwcGV0XG4gICAgLy8gVXNlZCBpZmYgcmVuZGVyRE9NIHJldHVybmVkIG51bGxcbiAgICByZW5kZXJIVE1MKCkge1xuICAgICAgICByZXR1cm4gJzxkaXY+dG8tYmUtaW1wbGVtZW50ZWQ8L2Rpdj4nXG4gICAgfVxuXG4gICAgLy8gSW52b2tlZCBieSByb3V0ZXIgb24gZ290b1ZpZXcoKVxuICAgIHN0YXJ0VmlldygpIHtcbiAgICB9XG5cbiAgICBzdG9wVmlldygpIHtcbiAgICB9XG5cbn0iXX0=
