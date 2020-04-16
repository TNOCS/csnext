import Component from 'vue-class-component';
import './data-panel.css';
import { InsightDashboard, InsightDashboardPanel, DataSourceEvents } from '@csnext/cs-data';
import { StatsDatasource, GeojsonPlusLayer } from '../..';
import { WidgetBase } from '@csnext/cs-client';

@Component({
    name: 'data-panel',
    props: ['data', 'dashboard', 'panel', 'features', 'layer'],
    template: require('./data-panel.html')
} as any)
export class DataPanel extends WidgetBase {
    public data!: StatsDatasource;
    public dashboard!: InsightDashboard;
    public features!: mapboxgl.MapboxGeoJSONFeature[];
    public panel!: InsightDashboardPanel;
    public layer!: GeojsonPlusLayer;
    public search = '';

    public mounted() {
        this.busManager.subscribe(this.data.events, DataSourceEvents.INSIGHT_VIEW, () => {
            this.$forceUpdate();
        });
    }
}
