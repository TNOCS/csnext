import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-log-list.css';
import { WidgetBase, AppState, LogDataSource } from '@csnext/cs-client';
import { LogListOptions } from '../../classes/log-list-options';

@Component({
    template: require('./cs-log-list.html')
})
export class CsLogList extends Vue {
    /** access the original widget from configuration */
    public logSources: { [id: string]: LogDataSource } = {};

    public get WidgetOptions(): LogListOptions | undefined {
        if (this.widget.options) {
            return this.widget.options as LogListOptions;
        }
    }

    /** load all log sources as specified in widget options */
    public InitLogSources() {        
        if (this.WidgetOptions && this.WidgetOptions.logSources) {
            for (const logsource of this.WidgetOptions.logSources) {
                if (!this.logSources.hasOwnProperty(logsource)) {
                    (this.widget._project!._appState! as AppState).loadDatasource<LogDataSource>(logsource)
                        .then(r => {                            
                            this.logSources[logsource] = r;
                        })
                        .catch(e => {
                            console.log(
                                `Error loading logsource ${logsource} `
                            );
                        });
                }
            }
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
        this.InitLogSources();
        if (this.widget) {
            this.widget.events!.subscribe('resize', () => {
                // this.timeline!.redraw();
            });
        }
    }
}
