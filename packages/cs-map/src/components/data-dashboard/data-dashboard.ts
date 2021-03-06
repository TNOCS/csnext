import vue from 'vue';
import Component from 'vue-class-component';
import './data-dashboard.css';
import simplebar from 'simplebar-vue';
import { WidgetBase } from '@csnext/cs-client';
import { InsightDashboard, InsightDashboardPanel } from '@csnext/cs-data';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { DataPanel } from './../data-panel/data-panel';
import { Watch } from 'vue-property-decorator';
import { GeojsonPlusLayer } from '../../layers/geojson-plus-layer';

@Component({
    name: 'data-dashboard',
    props: ['data', 'dashboard', 'features', 'layer'],
    components: { simplebar, DataPanel },
    template: require('./data-dashboard.html')
} as any)
export class DataDashboard extends WidgetBase {
    public tab = null;
    public data!: StatsDatasource;
    public dashboard!: InsightDashboard;
    public features!: mapboxgl.MapboxGeoJSONFeature[];
    public layer!: GeojsonPlusLayer;

    @Watch('data')
    public dataLoaded() {
        if (this.dashboard) {
            console.log(this.dashboard);
        }
    }

    public mounted() {
        console.log(this.features);
        this.dataLoaded();
    }
}

vue.component('data-dashboard', DataDashboard);
