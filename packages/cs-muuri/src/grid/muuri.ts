import { Watch } from 'vue-property-decorator';
import {
    IWidget,
    IDashboard,
    IDashboardOptions
} from '@csnext/cs-core';
import Vue from 'vue';
// import {
//     guidGenerator
// } from '@csnext/cs-client';
import Component from 'vue-class-component';
const Muuri = require('muuri');
import './muuri.css';
import { MuuriWidget } from '../widget/muuri-widget';

export interface IMuuriOptions extends IDashboardOptions {
    itemWidth?: number;
    itemHeight?: number;
    dragEnabled?: boolean;
    title?: string;
    description?: string;
}

@Component({
    template: require('./muuri.html'),
    components: {
        'muuri-widget': MuuriWidget
    },
    props: {
        dashboard: null
    }
} as any)
export class MuuriLayout extends Vue {
    public mode: any;
    public dashboard!: IDashboard;
    public options!: IMuuriOptions;
    public grid: any;
    private docElem;
    public items: string[] = [];
    private dragCounter = 0;
    private editSubscription: any;
    private muuriOptions: any;

    get widgets() {
        if (!this.dashboard || !this.dashboard.widgets) { return [];}
        return this.dashboard.widgets.filter(
            w => !w.options || !w.options.background
        );
    }

    get backgroundWidgets() {
        if (!this.dashboard.widgets) { return []; }
        return this.dashboard.widgets.filter(
            w => w.options && w.options.background
        );
    }

    @Watch('dashboard.widgets')
    public widgetsChanged(n: IWidget[], old: IWidget[]) {
        console.log('Widgets changed');

        if (!this.grid) {
            this.initGrid();
        }

        if (!this.grid) {
            return;
        }
        // remove old widgets
        if (old.length > n.length) {
            old.forEach((w : IWidget) => {
                if (n.indexOf(w) === -1 && w.id) {
                    // this.grid.remove([welement]);
                    this.items = this.items.filter(wi => w.id !== wi);
                    this.grid.refreshItems().layout();
                }
            });
        }
        // add new widgets
        n.forEach(w => {
            if (w.id && this.items.indexOf(w.id) === -1) {
                // this.initWidget(w);
                // let c = new CsWidget();
                // c.widget = w;
                // let element = c.$mount();
                // this.grid.add([element]);
                let welement = document.getElementById(w.id);
                if (welement) {
                    this.grid.add([welement]);
                    this.items.push(w.id);
                }
                // this.grid.refreshItems().layout();
            }
        });
    }

    public beforeMount() {
        this.options = {};
        Object.assign(
            this.options,
            { itemHeight: 50, itemWidth: 50, dragEnabled: true },
            this.dashboard.options
        );

        if (!this.editSubscription && this.dashboard && this.dashboard.events) {
            this.dashboard.events.subscribe('settings', () => {
                this.options.dragEnabled = this.dashboard.options.dragEnabled;
            });
        }

        // this.dashboard.widgets.forEach(widget => {
        //   this.initWidget(widget);
        // });
    }

    public initGrid() {
        if (this.grid) return;
        Vue.nextTick(() => {
            this.docElem = document.documentElement;
            const elem = '#muuri-' + this.dashboard.id;
            this.muuriOptions = {
                items: 'muuri-item',
                layoutDuration: 200,
                layoutEasing: 'ease',
                dragEnabled: true,
                dragSortInterval: 10,
                dragContainer: document.body,
                dragStartPredicate: (item, event) => {
                    // var isRemoveAction = elementMatches(event.target, '.card-remove, .card-remove i');
                    return this.options.dragEnabled
                        ? Muuri.ItemDrag.defaultStartPredicate(item, event)
                        : false;
                },
                dragReleaseDuration: 20,
                dragReleseEasing: 'ease'
            };
            this.grid = new Muuri(elem, this.muuriOptions)
                .on('dragStart', () => {
                    ++this.dragCounter;
                    this.docElem.classList.add('dragging');
                })
                .on('dragEnd', () => {
                    if (--this.dragCounter < 1) {
                        this.docElem.classList.remove('dragging');
                    }
                })
                .on('move', this.updateIndices)
                .on('sort', this.updateIndices);
        });
    }

    public created() {
        // if (this.dashboard && !this.dashboard.id) {
        //     this.dashboard.id = guidGenerator();
        // }
        this.initGrid();
    }

    private updateIndices() {
        if (!this.grid) {
            return;
        }
        this.grid.getItems().forEach((item, i) => {
            item.getElement().setAttribute('data-id', i + 1);
            // item.getElement().querySelector('.card-id').innerHTML = i + 1;
        });
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
