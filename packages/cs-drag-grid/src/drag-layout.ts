import { GridLayout, GridItem } from 'vue-grid-layout';
import { Watch } from 'vue-property-decorator';
import {
    IWidget,
    IDashboard,
    IDashboardOptions,
    guidGenerator,
    IWidgetOptions
} from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import './drag-layout.css';

export interface IDragLayoutOptions extends IDashboardOptions {
    itemWidth?: number;
    itemHeight?: number;
    dragEnabled?: boolean;
}

Vue.component('grid-layout', GridLayout);
Vue.component('grid-item', GridItem);

@Component({
    template: require('./drag-layout.html'),
    props: {
        dashboard: null
    } as any
})
export class DragLayout extends Vue {
    public mode: any;
    public dashboard!: IDashboard;
    public options?: IDragLayoutOptions;
    public grid: any;
    public items: string[] = [];
    private editSubscription: any;
    public dragEnabled = false;
    public isMoving = false;

    public layout: any[] = [];

    private initLayout() {
        console.log('init layout');
        let res: any[] = [];
        Vue.nextTick(() => {
            if (this.dashboard.widgets) {
                this.dashboard.widgets
                    .filter(w => !w.options || !w.options.background)
                    .forEach(w => {
                        if (w.options) {
                            this.checkPosition(w.options);
                            res.push({
                                x: w.options.x,
                                y: w.options.y,
                                w: w.options.width,
                                h: w.options.height,
                                i: w.id,
                                widget: w
                            });
                        }
                    });
                this.layout = res;
                console.log(this.layout);
            }
        });
    }

    get widgets() {
        if (this.dashboard.widgets)
            return this.dashboard.widgets.filter(
                w => !w.options || !w.options.background
            );
    }

    get backgroundWidgets() {
        if (this.dashboard.widgets)
            return this.dashboard.widgets.filter(
                w => w.options && w.options.background
            );
    }

    @Watch('dashboard.widgets')
    public widgetsChanged() {
        this.initLayout();
    }

    public beforeMount() {
        this.options = {};
        Object.assign(
            this.options,
            { itemHeight: 5, itemWidth: 5, dragEnabled: true },
            this.dashboard.options
        );

        this.initLayout();

        if (!this.editSubscription && this.dashboard && this.dashboard.events) {
            this.dashboard.events.subscribe('settings', () => {
                if (this.options) {
                    this.options.dragEnabled = this.dashboard.options.dragEnabled;
                }
            });
        }

        // this.dashboard.widgets.forEach(widget => {
        //   this.initWidget(widget);
        // });
    }

    public checkPosition(options: IWidgetOptions) {
        if (!this.dashboard || !this.dashboard.widgets) return;
        if (options.x === undefined || options.y === undefined) {
            let lastY = 0;
            let lastYHeight = 4;
            this.dashboard.widgets.forEach(w => {
                if (
                    w.options &&
                    w.options.y !== undefined &&
                    w.options.height !== undefined &&
                    w.options.y > lastY
                ) {
                    lastY = w.options.y;
                    lastYHeight = w.options.height;
                }
            });
            let lastX = 0;
            this.dashboard.widgets.forEach(w => {
                if (
                    w.options &&
                    w.options.y !== undefined &&
                    w.options.y === lastY
                ) {
                    if (
                        w.options.x !== undefined &&
                        w.options.width !== undefined &&
                        w.options.x + w.options.width > lastX
                    ) {
                        lastX = w.options.x + w.options.width;
                    }
                }
            });

            options.x = lastX;
            options.y = lastY;
            if (options.width !== undefined && options.x + options.width > 12) {
                options.x = 0;
                options.y = lastY + lastYHeight;
            }
        }
    }

    public layoutUpdatedEvent(l: any[]) {
        console.log('check layout');
        if (!this.dashboard.widgets) {
            return;
        }
        let result: IWidget[] = [];
        for (var i = 0; i < l.length; i++) {
            // console.log('moved');
            let widget = l[i].widget as IWidget;
            let moved = false;
            let resized = false;

            if (widget) {
                if (!widget.options) {
                    widget.options = {};
                }
                if (l[i].x !== widget.options.x) {
                    widget.options.x = l[i].x;
                    moved = true;
                }
                if (l[i].y !== widget.options.y) {
                    widget.options.y = l[i].y;
                    moved = true;
                }
                if (l[i].w !== widget.options.width) {
                    widget.options.width = l[i].w;
                    resized = true;
                }
                if (l[i].h !== widget.options.height) {
                    widget.options.height = l[i].h;
                    resized = true;
                }
                if (resized || moved) {
                    result.push(widget);
                    if (widget.events) {
                        widget.events.publish('layout', 'changed', {
                            moved: moved,
                            resized: resized,
                            widget: widget
                        });
                    }
                }
            }
        }
        if (result.length > 0 && this.dashboard.events) {
            this.dashboard.events.publish('widgets', 'layout-changed', result);
        }
    }

    private getWidget(id: string): IWidget | undefined {
        if (this.dashboard.widgets) {
            let widget = this.dashboard.widgets.find(w => w.id === id);
            if (widget) {
                return widget;
            }
        }
        return undefined;
    }

    public movedEvent(id: string) {
        this.isMoving = false;
    }

    public moveEvent() {
        this.isMoving = true;
    }

    public resizeEvent() {
        console.log('resize');
    }

    public initGrid() {}

    public created() {
        if (this.dashboard && !this.dashboard.id) {
            this.dashboard.id = guidGenerator();
        }
        this.initGrid();
    }

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
}
