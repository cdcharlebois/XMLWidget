define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "XMLWidget/lib/jquery-1.11.2",
    "XMLWidget/lib/ace2",
    "dojo/text!XMLWidget/widget/template/XMLWidget.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, _jQuery, _ace, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    return declare("XMLWidget.widget.XMLWidget", [_WidgetBase, _TemplatedMixin], {

        templateString: widgetTemplate,

        widgetBase: null,
        //editor: null,
        field: null,
        node: null,
        onClickMicroflow: null,
        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");
            ace.config.set('basePath', '/widgets/XMLWidget/lib/');

        },

        update: function(obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering(callback);
        },

        resize: function(box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function(callback) {
            logger.debug(this.id + "._updateRendering");
            var value = "" + this._contextObj.get(this.field);
            var editor = ace.edit("editor");
            editor.getSession().setUseWorker(false);
            // add the listener to update the context object when the editor's value changes
            editor.on("change", function(data) {
                this._contextObj.set(this.field, editor.getValue());
            }.bind(this));

            editor.setTheme("ace/theme/monokai");
            editor.getSession().setMode("ace/mode/xml");
            editor.setValue(value);
            this._executeCallback(callback, "_updateRendering");
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function(cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["XMLWidget/widget/XMLWidget"]);