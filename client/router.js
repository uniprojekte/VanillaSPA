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
