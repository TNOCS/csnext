import { Watch } from 'vue-property-decorator';
import { IWidget, Dashboard, ILayoutManagerConfig, IDashboardOptions } from '@csnext/cs-core';
import Vue from 'vue';
import { WidgetBase, Logger, CsWidget, AppState, LayoutManager } from '@csnext/cs-client';
import Component from 'vue-class-component';
const Muuri = require('muuri');
import "./muuri.css";

export interface IMuuriOptions extends IDashboardOptions {

}

@Component({
  template: require('./muuri.html'),
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

  public initWidget(widget: IWidget) {
    // check if widget options is set
    if (!widget.options) {
      widget.options = { x: 1, y: 1, width: 1, height: 1 };
    }
  }

  @Watch('dashboard.widgets')
  public widgetsChanged(n: IWidget[], old: IWidget[]) {
    if (!this.grid) return;
    Vue.nextTick(() => {


      n.forEach(w => {
        if (this.items.indexOf(w.id) === -1) {
          let welement = document.getElementById(w.id);
          this.grid.add([welement]);
          this.items.push(w.id);
        }
      });
    });

  }

  public beforeMount() {
    this.options = this.dashboard.options as IMuuriOptions;

    this.dashboard.widgets.forEach(widget => {
      this.initWidget(widget);
    });
  }

  public created() {
    if (!this.dashboard) { return; }
    Vue.nextTick(() => {
      if (!this.dashboard.options) {
        this.options = {};
      }

      setTimeout(() => {
        this.docElem = document.documentElement;
        this.grid = new Muuri('#muuri-' + this.dashboard.id, {
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
      }, 1000);
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
