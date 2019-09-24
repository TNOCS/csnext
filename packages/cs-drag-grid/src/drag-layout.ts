import { GridLayout, GridItem } from 'vue-grid-layout';
import { Watch } from 'vue-property-decorator';
import {
    IWidget,
    IDashboard,
    guidGenerator,
    WidgetOptions} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './drag-layout.css';
import { WidgetBase } from '@csnext/cs-client';
import { DragLayoutOptions } from './drag-layout-options';
import Vue from 'vue';
import simplebar from 'simplebar-vue';

Vue.component('grid-layout', GridLayout);
Vue.component('grid-item', GridItem);

// @Form({ title: 'Drag Layout'})
@Component({
    template: require('./drag-layout.html'),
    components: { simplebar},
    props: {
        dashboard: null
    } as any
})
export class DragLayout extends WidgetBase {
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
    private editSubscription: any;
    public dragEnabled = false;
    public isMoving = false;
    public static id = 'drag-grid';

    public layout: any[] = [];

    private initLayout() {

        console.log('Init layout');

        // this.options = new DragLayoutOptions();
        let options = new DragLayoutOptions();
        Object.assign(options, this.dashboard.options);
        this.dashboard.options = options;

  
        // Object.assign(this.options, this.dashboard.options);

        let res: any[] = [];
        Vue.nextTick(() => {
            if (this.dashboard.widgets) {
                this.dashboard.widgets
                    .filter(w => !w.options || !w.options.background)
                    .forEach(w => {
                        if (w.id === undefined) { w.id = guidGenerator(); }
                        if (!w.options) w.options = {};
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
                            i: w.id,
                            widget: w
                        });
                    });
                this.layout = res;
            }
        });
    }

    get Margin() {
        if (this.options && this.options.Margin)
            return [this.options.Margin, this.options.Margin];
        return [10, 10];
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

    @Watch('dashboard.options', { deep: true })
    public optionsChanged() {
        console.log('options changed');
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
            Margin: 10,
            ...this.dashboard.options
        } as DragLayoutOptions;

       

        this.initLayout();

        // if (!this.editSubscription && this.dashboard && this.dashboard.events) {
        //     this.dashboard.events.subscribe('settings', () => {
        //         if (
        //             this.options &&
        //             this.dashboard.options &&
        //             this.options.DragEnabled
        //         ) {
        //             this.options.DragEnabled = this.options.DragEnabled;
        //         }
        //     });
        // }

        // this.dashboard.widgets.forEach(widget => {
        //   this.initWidget(widget);
        // });
    }

    public checkPosition(options: WidgetOptions) {
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
        if (!this.dashboard.widgets) {
            return;
        }
        let result: IWidget[] = [];
        for (var i = 0; i < l.length; i++) {
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


    public movedEvent() {
        this.isMoving = false;
    }

    public moveEvent() {
        this.isMoving = true;
    }

    public resizeEvent() {}

    public initGrid() {}

    public created() {        
        if (this.dashboard && !this.dashboard.id) {
            this.dashboard.id = guidGenerator();
        }
        this.initGrid();
    }
}