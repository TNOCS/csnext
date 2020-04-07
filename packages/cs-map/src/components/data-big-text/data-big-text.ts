import vue from 'vue';
import Component from 'vue-class-component';
import './data-big-text.css';
import simplebar from 'simplebar-vue';
import { InsightDashboard, InsightDashboardPanel, InsightSection } from '@csnext/cs-data';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { Watch } from 'vue-property-decorator';
import { GeojsonPlusLayer } from '../..';

@Component({
    name: 'data-big-text',
    props: ['data', 'dashboard', 'panel', 'section', 'layer'],
    components: { simplebar },
    template: require('./data-big-text.html')
} as any)
export class DataBigText extends vue {
    public tab = null;
    public data!: StatsDatasource;
    public dashboard!: InsightDashboard;
    public panel!: InsightDashboardPanel;
    public section!: InsightSection;
    public search = '';
    public layer!: GeojsonPlusLayer;

    @Watch('data')
    public dataLoaded() {
        if (this.dashboard) {
            console.log(this.dashboard);
        }
    }

    


    public mounted() {
        this.dataLoaded();
    }
}

vue.component('data-big-text', DataBigText);
