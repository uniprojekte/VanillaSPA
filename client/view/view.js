
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