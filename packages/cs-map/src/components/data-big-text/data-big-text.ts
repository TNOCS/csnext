import vue from 'vue';
import Component from 'vue-class-component';
import './data-big-text.css';
import { InsightDashboard, InsightDashboardPanel, InsightSection, DataSourceEvents, DataSources, DataSource } from '@csnext/cs-data';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { Watch } from 'vue-property-decorator';
import { GeojsonPlusLayer } from '../..';
import { DataBigTextOptions } from './data-big-text-options';
import { WidgetBase } from '@csnext/cs-client';

@Component({
    name: 'data-big-text',
    props: ['data', 'dashboard', 'panel', 'section', 'layer', 'features'],
    template: require('./data-big-text.html')
} as any)
export class DataBigText extends WidgetBase {
    public tab = null;
    public data!: StatsDatasource;
    public dashboard!: InsightDashboard;
    public panel!: InsightDashboardPanel;
    public section!: InsightSection;
    public search = '';
    public layer!: GeojsonPlusLayer;
    public features!: mapboxgl.MapboxGeoJSONFeature[];
    public valueText: string = '';

    public get options(): DataBigTextOptions {
        if (this.section) {
            return this.section;
        }
        if (!this.widget || !this.widget.options) { return {}; }
        return this.widget.options as DataBigTextOptions;
    }

    @Watch('data')
    @Watch('features')
    public dataLoaded() {
        if (!this.options.key || !this.features || !this.layer._source) { return ''; }
        const ft = this.layer._source.getFeatureType();
        if (ft && ft.properties) {
            const f = this.features[0];
            if (f.properties && f.properties.hasOwnProperty(this.options.key)) {
                this.valueText = f.properties[this.options.key];
                console.log('ValueText:' + this.valueText);
            }
        }
    }

    public mounted() {        
        this.dataLoaded();
        this.busManager.subscribe(this.data.events, DataSourceEvents.UPDATED, (id: string, source: DataSource) => {
            this.dataLoaded();
        });
        this.busManager.subscribe(this.data.events, StatsDatasource.TIME_TOPIC, (action: string, date: number) => {
            if (action === StatsDatasource.FOCUS_TIME_CHANGED) {
                this.dataLoaded();
            }
        });
    }
}

vue.component('data-big-text', DataBigText);
