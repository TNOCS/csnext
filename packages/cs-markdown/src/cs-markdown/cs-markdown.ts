import { Watch, Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import './cs-markdown.css';
import { WidgetBase } from '@csnext/cs-client';
import Vue from 'vue';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import axios from 'axios';
import simplebar from 'simplebar-vue';
// import { MdWidgetOptions } from '..';

@Component({
    name: 'cs-markdown',
    template: require('./cs-markdown.html'),
    components: { MarkdownItVue, simplebar },
    props: {
        widget: null
    }
} as any)
export class CsMarkdown extends WidgetBase {

    public content: string = "";
    // public options: MdWidgetOptions = {};
    @Prop({ default: undefined }) private data?: string | {url: string};

    @Watch('widget.data', { deep: true })
    public widgetDataUpdated() {
        this.updateContent();
    }

    @Watch('data', { deep: true })
    public dataUpdated() {
        this.updateContent();
    }

    private updateContent() {
        if (!this.widget && !this.data) return;
        if (this.data) {
            this.setContent(this.data);
        } else if (this.widget) {
            this.setContent(this.widget.data);
        }
    }

    private setContent(data: string | {url: string}) {
        if (typeof (data) === 'string') {
            Vue.set(this, 'content', data);
        } else if (typeof (data) === 'string') {
            Vue.set(this, 'content', data);
        } else {
            if (data && data.hasOwnProperty('url') && data.url) {
                axios.get(data.url).then(u => {
                    if (u && u.data) {
                        Vue.set(this, 'content', u.data);
                    }
                })
            }
        }
    }

    // @Watch('widget.content', { deep: true })
    // public contentUpdated() {
    //     // if (this.chart) {
    //     //     this.chart.load(this.widget.content);
    //     // }
    // }

    public mounted() {
        this.updateContent();
    }

}
