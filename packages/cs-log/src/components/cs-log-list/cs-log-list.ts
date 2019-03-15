import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import {
    IWidget,
    LogDataSource} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-log-list.css';


@Component({
    template: require('./cs-log-list.html')
})
export class CsLogList extends Vue {
    /** access the original widget from configuration */

    
    public get LogSource(): LogDataSource {
        if (!this.widget.content) return new LogDataSource();
        return this.widget.content as LogDataSource;
    }

    @Prop()
    public widget!: IWidget;

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

  

    mounted() {
        if (this.widget) {
            this.widget.events!.subscribe('resize', () => {
                // this.timeline!.redraw();
            });

            
        }
    }
}
