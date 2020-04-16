import { Prop, Watch } from 'vue-property-decorator';
import { IWidget, MessageBusHandle} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-log-list.css';
import { WidgetBase, LogManager, ILogItem } from '@csnext/cs-client';
import { LogListOptions } from '../../classes/log-list-options';
import simplebar from 'simplebar-vue';
import Handlebars from 'handlebars';
import Vue from 'vue';

@Component({
    template: require('./cs-log-list.html'),
    components: { simplebar }
})
export class CsLogList extends WidgetBase {

    // #endregion Properties (6)

    // #region Public Accessors (1)

    public get WidgetOptions(): LogListOptions {
        if (this.widget.options) {
            return this.widget.options as LogListOptions;
        } else {
            return {};
        }
    }

    public log: LogManager = new LogManager();
    public reverseOrder: boolean = false;
    public subTitleTemplate!: Handlebars.TemplateDelegate<any>;
    public titleTemplate!: Handlebars.TemplateDelegate<any>;
    // #region Properties (6)

    private resizeHandle?: MessageBusHandle;
    private visibleItems: ILogItem[] = [];

    // #endregion Public Accessors (1)

    // #region Public Methods (5)

    /** load all log sources as specified in widget options */
    public InitLog() {
        // build handlebar templates
        this.titleTemplate = Handlebars.compile(this.WidgetOptions.titleTemplate || '{{id}}');
        if (this.WidgetOptions.subTitleTemplate) {
            this.subTitleTemplate = Handlebars.compile(this.WidgetOptions.subTitleTemplate);
        }

        // set reversed option
        this.reverseOrder = this.WidgetOptions.reverseOrder || false;
        this.setVisibleItems();

        // init log sources
        if (this.WidgetOptions.logSource) {
            this.log.init(this.WidgetOptions.logSource, this.$cs);
        }
    }

    public beforeDestroy() {
        if (this.widget && this.resizeHandle) {
            this.widget.events!.unsubscribe(this.resizeHandle);
        }
    }

    // @Prop()
    // public widget!: IWidget;
    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public mounted() {
        this.InitLog();
        if (this.widget) {
            this.resizeHandle = this.widget.events!.subscribe('resize', () => {
                // this.timeline!.redraw();
            });
        }
    }

    public openDetails(item: ILogItem) {
        if (this.WidgetOptions.openDetailsOnClick) {
            const component = this.WidgetOptions.detailsComponent || 'cs-log-details';
            this.$cs.openRightSidebarWidget({ component, options: { showToolbar: false, title: this.title(item) }, data: { item } });
        }
    }

    // #endregion Public Methods (5)

    // #region Private Methods (4)

    @Watch('log.items')
    private LogItemsChanged() {
        this.setVisibleItems();
    }

    private setVisibleItems() {
        Vue.set(this, 'visibleItems', this.reverseOrder ? this.log.items.slice().reverse() : this.log.items.slice());
    }

    private subTitle(item: ILogItem) {
        if (this.subTitleTemplate) {
            return this.subTitleTemplate(item);
        }
    }

    private title(item: ILogItem) {
        return this.titleTemplate(item);
    }

    // #endregion Private Methods (4)
}
