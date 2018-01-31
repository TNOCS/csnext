import { Watch } from 'vue-property-decorator';
import { IWidget, Dashboard, ILayoutManagerConfig, IDashboardOptions } from '@csnext/cs-core';
import Vue from 'vue';
import { WidgetBase, Logger, CsWidget, AppState, LayoutManager, guidGenerator } from '@csnext/cs-client';
import Component from 'vue-class-component';
const Muuri = require('muuri');
import "./muuri.css";
import { MuuriWidget } from '../widget/muuri-widget';

export interface IMuuriOptions extends IDashboardOptions {
  itemWidth: number;
  itemHeight: number;
}

@Component({
  template: require('./muuri.html'),
  components: {
    'muuri-widget': MuuriWidget
  },
  props: {
    dashboard: null
  }
})

export class MuuriLayout extends Vue {
  public mode: any;
  public dashboard: Dashboard;
  public options: IMuuriOptions;
  public grid: any;
  private docElem;
  public items: string[] = [];
  private uuid = 0;
  private dragCounter = 0;

  get widgets() {
    return this.dashboard.widgets.filter(w => !w.options || !w.options.background);
  }

  get backgroundWidgets() {
    return this.dashboard.widgets.filter(w => w.options && w.options.background);
  }

  

  @Watch('dashboard.widgets')
  public widgetsChanged(n: IWidget[], old: IWidget[]) {
    if (!this.grid) { this.initGrid(); }
    Vue.nextTick(() => {
      n.forEach(w => {
        if (this.items.indexOf(w.id) === -1) {
          // this.initWidget(w);
          // let c = new CsWidget();
          // c.widget = w;          
          // let element = c.$mount();
          // this.grid.add([element]);          
          let welement = document.getElementById(w.id);
          this.grid.add([welement]);
          this.items.push(w.id);
        }
      });
    });
  }

  public beforeMount() {
    this.options = this.dashboard.options as IMuuriOptions;
    if (!this.options) { this.options = { itemHeight: 100, itemWidth: 100 } };
    if (!this.options.itemHeight) { this.options.itemHeight = 100; }
    if (!this.options.itemWidth) { this.options.itemWidth = 100; }

    this.dashboard.widgets.forEach(widget => {
      // this.initWidget(widget);
    });
  }

  public initGrid() {
    if (this.grid) return;
    this.docElem = document.documentElement;
    const elem = '#muuri-' + this.dashboard.id;
    this.grid = new Muuri(elem, {
      items: '*',
      layoutDuration: 200,
      layoutEasing: 'ease',
      dragEnabled: true,
      dragSortInterval: 50,
      dragContainer: document.body,
      dragStartPredicate: function (item, event) {
        var isDraggable = true;
        // var isRemoveAction = elementMatches(event.target, '.card-remove, .card-remove i');
        return isDraggable ? Muuri.ItemDrag.defaultStartPredicate(item, event) : false;
      },
      dragReleaseDuration: 200,
      dragReleseEasing: 'ease'
    })
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
  }

  public created() {
    if (this.dashboard && !this.dashboard.id) {
      this.dashboard.id = guidGenerator();
    }
    Vue.nextTick(() => {
      this.initGrid();
    });
  }

  private updateIndices() {
    this.grid.getItems().forEach(function (item, i) {
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
