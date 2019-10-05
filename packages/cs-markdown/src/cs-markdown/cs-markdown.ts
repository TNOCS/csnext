import { Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import './cs-markdown.css';
import { WidgetBase } from '@csnext/cs-client';
import Vue from 'vue';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';

@Component({
    name: 'cs-markdown',
    template: require('./cs-markdown.html'),
    components: { MarkdownItVue },
    props: {
        widget: null
    }
} as any)
export class CsMarkdown extends WidgetBase {

    @Watch('widget.data', { deep: true })
    public dataUpdated() {
        // if (this.chart) {
        //     this.chart.load(this.widget.data);
        // }
    }

    @Watch('widget.content', { deep: true })
    public contentUpdated() {
        // if (this.chart) {
        //     this.chart.load(this.widget.content);
        // }
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

    private getData(): any {
        if (this.widget.data) { return this.widget.data; }
        if (this.widget.content) { return this.widget.content; }
        return undefined;
    }
}
