import { GridLayout, GridItem } from 'vue-grid-layout';
import { Watch } from 'vue-property-decorator';
import {
    IWidget,
    IDashboard,
    guidGenerator,
    WidgetOptions
} from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import './drag-layout.css';
import { DragLayoutOptions } from './drag-layout-options';

Vue.component('grid-layout', GridLayout);
Vue.component('grid-item', GridItem);

@Component({
    template: require('./drag-layout.html'),
    props: {
        dashboard: null
    }
} as any)
export class DragLayout extends Vue {
    public static id = 'drag-grid';
    public mode: any;
    public dashboard!: IDashboard;

    public get options(): DragLayoutOptions | undefined {
        return this.dashboard.options as DragLayoutOptions;
    }

    public set options(value: DragLayoutOptions | undefined) {
        this.dashboard.options = value;
    }

    // public options?: DragLayoutOptions;
    public grid: any;
    public items: string[] = [];

    public dragEnabled = false;
    public isMoving = false;

    public layout: any[] = [];

    public editSubscription: any;

    public constructor() {
        super();
    }

    public findWidget(i: string) {
        if (this.dashboard.widgets) {
            return this.dashboard.widgets.find(w => w.id === i);
        }
    }

    public initLayout() {
        // this.options = new DragLayoutOptions();
        const options = new DragLayoutOptions();
        Object.assign(options, this.dashboard.options);
        this.dashboard.options = options;
        // Object.assign(this.options, this.dashboard.options);

        const res: any[] = [];
        Vue.nextTick(() => {
            if (this.dashboard.widgets) {
                this.dashboard.widgets
                    .filter(w => !w.options || !w.options.background)
                    .forEach(w => {
                        if (!w.options) {
                            w.options = {};
                        }
                        w.options = {
                            width: 2,
                            height: 4,
                            ...w.options
                        };

                        this.checkPosition(w.options);
                        res.push({
                            x: w.options.x,
                            y: w.options.y,
                            w: w.options.width,
                            h: w.options.height,
                            i: w.id
                            //   widget: w
                        });
                    });
                this.layout = res;
            }
        });
    }

    public get Margin() {
        if (this.options && this.options.Margin) {
            return [this.options.Margin, this.options.Margin];
        }
        return [10, 10];
    }

    public get widgets() {
        if (this.dashboard.widgets) {
            return this.dashboard.widgets.filter(
                w => !w.options || !w.options.background
            );
        }
    }

    public get backgroundWidgets() {
        if (this.dashboard.widgets) {
            return this.dashboard.widgets.filter(
                w => w.options && w.options.background
            );
        }
    }

    @Watch('dashboard.options', { deep: true })
    public optionsChanged() {
        // tslint:disable-next-line:no-console        
    }

    @Watch('dashboard.widgets', { immediate: false })
    public widgetsChanged() {
        this.initLayout();
    }

    public beforeMount() {
        this.options = {
            itemHeight: 5,
            itemWidth: 5,
            DragEnabled: true,
            ResizeEnabled: true,
            IsMirrored: false,
            RowHeight: 50,
            ColNum: 12,
            Responsive: false,
            Animations: false,
            Margin: 10,
            ...this.dashboard.options
        } as DragLayoutOptions;

        this.initLayout();

        if (!this.editSubscription && this.dashboard && this.dashboard.events) {
            this.dashboard.events.subscribe('settings', () => {
                if (
                    this.options &&
                    this.dashboard.options &&
                    this.options.DragEnabled
                ) {
                    this.options.DragEnabled = this.options.DragEnabled;
                }
            });
        }

        // this.dashboard.widgets.forEach(widget => {
        //   this.initWidget(widget);
        // });
    }

    public checkPosition(options: WidgetOptions) {
        if (!this.dashboard || !this.dashboard.widgets) {
            return;
        }
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
        if (!this.dashboard.widgets) {
            return;
        }
        const result: IWidget[] = [];
        for (const widget of l) {
            //   let widget = l[i].widget as IWidget;
            let moved = false;
            let resized = false;

            if (widget) {
                if (!widget.options) {
                    widget.options = {};
                }

                if (widget.x !== widget.options.x) {
                    widget.options.x = widget.x;
                    moved = true;
                }
                if (widget.y !== widget.options.y) {
                    widget.options.y = widget.y;
                    moved = true;
                }
                if (widget.w !== widget.options.width) {
                    widget.options.width = widget.w;
                    resized = true;
                }
                if (widget.h !== widget.options.height) {
                    widget.options.height = widget.h;
                    resized = true;
                }
                if (resized || moved) {
                    result.push(widget);
                    if (widget.events) {
                        widget.events.publish('layout', 'changed', {
                            moved,
                            resized,
                            widget
                        });
                    }
                }
            }
        }
        if (result.length > 0 && this.dashboard.events) {
            this.dashboard.events.publish('widgets', 'layout-changed', result);
        }
    }

    public movedEvent() {
        this.isMoving = false;
    }

    public moveEvent() {
        this.isMoving = true;
    }

    // tslint:disable-next-line:no-empty
    public resizeEvent() {}

    // tslint:disable-next-line:no-empty
    public initGrid() {}

    public created() {
        if (this.dashboard && !this.dashboard.id) {
            this.dashboard.id = guidGenerator();
        }
        this.initGrid();
    }
}
