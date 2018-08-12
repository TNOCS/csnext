import { Watch } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget, IWidgetSize } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './billboard.css';
import { bb } from 'billboard.js';

@Component({
    name: 'billboard',
    template: require('./billboard.html'),
    props: {
        widget: null
    }
} as any)
export class Billboard extends Vue {
    /** access the original widget from configuration */
    public widget!: IWidget;
    public chart?: any;

    @Watch('widget.data', { deep: true})
    dataUpdated() {
        if (this.chart) {
            this.chart.load(this.widget.data);
        }
    }

    public mounted() {
        Vue.nextTick(() => {
            this.chart = bb.generate({
                bindto: '#' + this.widget.id,
                data: this.widget.data
            });

            if (this.widget.events) {
                this.widget.events.subscribe(
                    'resize',
                    (a: string, size: IWidgetSize) => {
                        this.chart.resize({
                            width: size.width-20,
                            height: size.height-20
                        });
                    }
                );
            }            
        });
    }
}
