import { Watch } from 'vue-property-decorator';
import { IWidget, IWidgetSize } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './billboard.css';
import { WidgetBase } from '@csnext/cs-client';
import { bb } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import Vue from 'vue';

@Component({
    name: 'billboard',
    template: require('./billboard.html'),
    props: {
        widget: null
    }
} as any)
export class Billboard extends WidgetBase {
    /** access the original widget from configuration */
    public widget!: IWidget;
    public chart?: any;

    @Watch('widget.data', { deep: true })
    dataUpdated() {
        if (this.chart) {
            this.chart.load(this.widget.data);
        }
    }

    @Watch('widget.content', { deep: true })
    contentUpdated() {
        if (this.chart) {
            this.chart.load(this.widget.content);
        }
    }

    private getData(): any {
        if (this.widget.data) return this.widget.data;
        if (this.widget.content) return this.widget.content;
        return undefined;
    }

    public mounted() {
        Vue.nextTick(() => {
            let w = this.widget._size!.componentWidth | 0;
            let h = this.widget._size!.componentHeight | 0;
            let config =
            {
                bindto: '#' + this.widget.id,
                size: {
                    width: w,
                    height: h
                }
            };
            this.chart = bb.generate({ ...config, ...this.getData() });

            if (this.widget.events) {
                this.widget.events.subscribe(
                    'resize',
                    (a: string, size: IWidgetSize) => {
                        this.chart.resize({
                            width: size.componentWidth - 10,
                            height: size.componentHeight - 10
                        });
                    }
                );
            }
        });
    }
}
