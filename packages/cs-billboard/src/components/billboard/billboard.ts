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
    public dataUpdated() {
        if (this.chart) {
            this.chart.load(this.widget.data);
        }
    }

    @Watch('widget.content', { deep: true })
    public contentUpdated() {
        Vue.nextTick(() => {
            if (this.chart) {
                if (this.widget.options && this.widget.options.hasOwnProperty('property')) {
                    const prop = (this.widget.options as any).property;
                    if (this.widget.content.hasOwnProperty(prop)) {
                        this.chart.load(this.widget.content[prop]);
                    }
                } else {
                    this.chart.load(this.widget.content);
                }
            }
        });
    }

    public createChart() {

        if (!this.widget || !this.widget._size) { return; }
        const w = this.widget._size!.componentWidth || 0 ;
        const h = this.widget._size!.componentHeight || 0 ;
        const config = {
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
    }

    public contentLoaded() {
        this.createChart();
    }

    private getData(): any {
        if (this.widget.content) {
            if (this.widget.options && this.widget.options.hasOwnProperty('property')) {
                const prop = (this.widget.options as any).property;
                if (this.widget.content.hasOwnProperty(prop)) {
                    return this.widget.content[prop];
                }
            } else {
                return this.widget.content;
            }
        }

        if (this.widget.data) { return this.widget.data; }

        return undefined;
    }

}
