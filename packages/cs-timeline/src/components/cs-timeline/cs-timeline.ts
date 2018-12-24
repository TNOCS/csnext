import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget, guidGenerator } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-timeline.css';


@Component({
    template: require('./cs-timeline.html')
})
export class CsMap extends Vue {
    /** access the original widget from configuration */


    @Prop()
    public widget!: IWidget;


    @Watch('widget.content')
    dataLoaded() {
        
    }

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }


    mounted() {    
        Vue.nextTick(() => {
        });
    }


    public destroyed() {
    //    this.map.remove();
    }

}
