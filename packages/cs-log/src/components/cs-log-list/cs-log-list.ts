import { Prop } from 'vue-property-decorator';
import { IWidget} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-log-list.css';
import { WidgetBase, LogManager, ILogItem } from '@csnext/cs-client';
import { LogListOptions } from '../../classes/log-list-options';
import simplebar from 'simplebar-vue';
import Handlebars from 'handlebars';

@Component({
    template: require('./cs-log-list.html'),
    components: { simplebar }
})
export class CsLogList extends WidgetBase {    
    public titleTemplate!: Handlebars.TemplateDelegate<any>;
    public subTitleTemplate!: Handlebars.TemplateDelegate<any>;
    public log: LogManager = new LogManager();


    public get WidgetOptions(): LogListOptions {
        if (this.widget.options) {
            return this.widget.options as LogListOptions;
        } else {
            return {};
        }
    }

    private title(item: ILogItem) {
        return this.titleTemplate(item);
    }

    private subTitle(item: ILogItem) {
        if (this.subTitleTemplate) {
            return this.subTitleTemplate(item);
        }
    }

    public openDetails(item: ILogItem) {
        if (this.WidgetOptions.openDetailsOnClick) {
            let component = this.WidgetOptions.detailsComponent || 'cs-log-details';
            this.$cs.OpenRightSidebarWidget({ component: component, options: { showToolbar: false, title: this.title(item) }, data: { item: item } });
        }
    }

    /** load all log sources as specified in widget options */
    public InitLog() {
        // build handlebar templates
        this.titleTemplate = Handlebars.compile(this.WidgetOptions.titleTemplate || '{{id}}');
        if (this.WidgetOptions.subTitleTemplate) {
            this.subTitleTemplate = Handlebars.compile(this.WidgetOptions.subTitleTemplate);
        }

        // init log sources
        if (this.WidgetOptions.logSource) {
            this.log.init(this.WidgetOptions.logSource, this.$cs);
        }
    }

    @Prop()
    public widget!: IWidget;

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    mounted() {
        this.InitLog();
        if (this.widget) {
            this.widget.events!.subscribe('resize', () => {
                // this.timeline!.redraw();
            });
        }
    }
}
