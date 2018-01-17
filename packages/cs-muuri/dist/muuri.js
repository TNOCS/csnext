"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_property_decorator_1 = require("vue-property-decorator");
const vue_1 = require("vue");
const vue_class_component_1 = require("vue-class-component");
const Muuri = require('muuri');
let MuuriLayout = class MuuriLayout extends vue_1.default {
    get widgets() {
        return this.dashboard.widgets.filter(w => !w.options || !w.options.background);
    }
    get backgroundWidgets() {
        return this.dashboard.widgets.filter(w => w.options && w.options.background);
    }
    initWidget(widget) {
        // check if widget options is set
        if (!widget.options) {
            widget.options = { x: 1, y: 1, width: 1, height: 1 };
        }
    }
    widgetsChanged(n, old) {
        vue_1.default.nextTick(() => {
            n.forEach(w => {
                //  this.grid.data('gridstack').makeWidget('#' + w.id);
                // this.grid.addWidget()
            });
        });
    }
    beforeMount() {
        this.options = this.dashboard.options;
        this.dashboard.widgets.forEach(widget => {
            this.initWidget(widget);
        });
    }
    created() {
        if (!this.dashboard) {
            return;
        }
        vue_1.default.nextTick(() => {
            if (!this.dashboard.options) {
                this.options = {};
            }
            var muuri = new Muuri('#muurigrid');
            // const options = {
            //   // tslint:disable-next-line:no-bitwise
            // };
            // this.grid = $('#gridstack');
            // this.grid.gridstack(options);
            // // store resize result
            // this.grid.on('change', (event, items) => {
            //   items.forEach(i => {
            //     if (i.id) {
            //       this.options.autoposition = false;
            //       const widget = this.dashboard.widgets.find(k => k.id === i.id);
            //       if (widget) {
            //         widget.options.width = i.width;
            //         widget.options.height = i.height;
            //         widget.options.x = i.x;
            //         widget.options.y = i.y;
            //       }
            //     }
            //   });
            // });
        });
    }
};
__decorate([
    vue_property_decorator_1.Watch('dashboard.widgets')
], MuuriLayout.prototype, "widgetsChanged", null);
MuuriLayout = __decorate([
    vue_class_component_1.default({
        template: require('./muuri.html'),
        props: {
            dashboard: null
        }
    })
], MuuriLayout);
exports.MuuriLayout = MuuriLayout;
