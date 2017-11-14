import { Widget } from '@csnext/cs-core';
import { AppState, Logger, guidGenerator } from './../index';
import Vue from 'vue';
import Component from 'vue-class-component';

export class WidgetBase extends Vue {

    protected widget: Widget | undefined;
    protected L = Logger.Instance;

    public static checkWidgetId(widget) {
        if (!widget.id) { widget.id = 'widget-' + guidGenerator() }
    }

    findParentWidget(element: Vue) : Widget | undefined {
        if (element.hasOwnProperty('widget')) {
            return element['widget'];
        } else if (element.$parent) {
            return this.findParentWidget(element.$parent);
        } else { return undefined; }
    }

    public beforeMount() {
        // get widget
        

        this.widget = this.findParentWidget(this.$parent); // <Widget>this.$parent['widget'];

        if (this.widget === undefined) {
            this.L.error('widget', 'widget not correctly defined');
            return;
        } else {
            // make sure every widget has an id            
            WidgetBase.checkWidgetId(this.widget);
            
        }

        this.L.info('widget', 'init widget - ' + this.widget.id);
    }

}