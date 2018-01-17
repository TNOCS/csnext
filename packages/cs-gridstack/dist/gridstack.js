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
const $ = require("jquery");
require("../../../node_modules/gridstack/dist/gridstack.css");
require("jquery");
require("lodash");
require("gridstack/dist/gridstack.all");
require("./gridstack.css");
let GridStack = class GridStack extends vue_1.default {
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
                this.grid.data('gridstack').makeWidget('#' + w.id);
                // this.grid.addWidget()
            });
        });
    }
    beforeMount() {
        this.gridoptions = this.dashboard.options;
        if (this.gridoptions.autoposition === undefined) {
            this.gridoptions.autoposition = false;
        }
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
                this.gridoptions = {};
            }
            const options = {
                // tslint:disable-next-line:no-bitwise
                cellHeight: this.gridoptions.cellHeight | 20,
                // tslint:disable-next-line:no-bitwise
                verticalMargin: this.gridoptions.verticalMargin | 10,
                // tslint:disable-next-line:no-bitwise
                width: this.gridoptions.width | 12,
                disableDrag: this.gridoptions.disableDrag || false,
                disableResize: this.gridoptions.disableResize || false,
                // tslint:disable-next-line:no-bitwise
                height: this.gridoptions.height | 0,
                float: this.gridoptions.float || true,
                staticGrid: this.gridoptions.staticGrid || false,
                resizable: this.gridoptions.resizable || { handles: 'e, se, s, sw, w' }
            };
            this.grid = $('#gridstack');
            this.grid.gridstack(options);
            // store resize result
            this.grid.on('change', (event, items) => {
                items.forEach(i => {
                    if (i.id) {
                        this.gridoptions.autoposition = false;
                        const widget = this.dashboard.widgets.find(k => k.id === i.id);
                        if (widget) {
                            widget.options.width = i.width;
                            widget.options.height = i.height;
                            widget.options.x = i.x;
                            widget.options.y = i.y;
                        }
                    }
                });
            });
        });
    }
};
__decorate([
    vue_property_decorator_1.Watch('dashboard.widgets')
], GridStack.prototype, "widgetsChanged", null);
GridStack = __decorate([
    vue_class_component_1.default({
        template: require('./gridstack.html'),
        props: {
            dashboard: null
        }
    })
], GridStack);
exports.GridStack = GridStack;
