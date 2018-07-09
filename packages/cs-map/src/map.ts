import { Watch } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './map.css';

@Component({
    template: require('./map.html'),
    props: {
        dashboard: null
    } as any
})
export class Map extends Vue {
    /** access the original widget from configuration */
    public widget!: IWidget;

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    
}
