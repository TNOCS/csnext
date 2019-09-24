import { Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import './markdown.css';
import { WidgetBase } from '@csnext/cs-client';
import Vue from 'vue';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';

@Component({
    name: 'cs-markdown',
    template: require('./markdown.html'),
    components: { MarkdownItVue },
    props: {
        widget: null
    }
} as any)
export class CsMarkdown extends WidgetBase {
    /** access the original widget from configuration */
    // public chart?: any;

    @Watch('widget.data', { deep: true })
    dataUpdated() {
        // if (this.chart) {
        //     this.chart.load(this.widget.data);
        // }
    }

    @Watch('widget.content', { deep: true })
    contentUpdated() {
        // if (this.chart) {
        //     this.chart.load(this.widget.content);
        // }
    }

    private getData(): any {
        if (this.widget.data) return this.widget.data;
        if (this.widget.content) return this.widget.content;
        return undefined;
    }

    public mounted() {
        Vue.nextTick(() => {
            // this.chart = bb.generate({
            //     bindto: '#' + this.widget.id,
            //     data: this.getData()
            // });

            // if (this.widget.events) {
            //     this.widget.events.subscribe(
            //         'resize',
            //         (a: string, size: IWidgetSize) => {
            //             this.chart.resize({
            //                 width: size.width-20,
            //                 height: size.height-20
            //             });
            //         }
            //     );
            // }            
        });
    }
}
