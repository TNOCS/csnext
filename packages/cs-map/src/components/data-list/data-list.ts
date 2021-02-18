import vue from 'vue';
import Component from 'vue-class-component';
import './data-list.css';
import simplebar from 'simplebar-vue';
import { InsightDashboard, InsightDashboardPanel, InsightSection } from '@csnext/cs-data';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { Watch } from 'vue-property-decorator';
import { GeojsonPlusLayer } from '../..';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';

@Component({
    name: 'data-panel-list',
    props: ['data', 'dashboard', 'panel', 'section', 'layer'],
    components: { simplebar },
    template: require('./data-list.html')
} as any)
export class DataPanelList extends vue {
    public tab?: string = undefined;
    public data!: StatsDatasource;
    public dashboard!: InsightDashboard;
    public panel!: InsightDashboardPanel;
    public section!: InsightSection;
    public search: string = '';
    public layer!: GeojsonPlusLayer;

    @Watch('data')
    public dataLoaded() {
        if (this.dashboard) {
            console.log(this.dashboard);
        }
    }

    public listSort(): string {
        return 'properties.' + this.data.activeInsightView?.style?.defaultLegendProperty;
    }

    public listHeaders(): any[] {
        const pt = this.layer._source?.getPropertType(this.data.activeInsightView?.style?.defaultLegendProperty);
        if (pt) {
            return [{
                text: 'Titel',
                align: 'left',
                sortable: false,
                value: 'properties.statnaam'
            }, {
                text: pt.title + '(' + pt.unit + ')',
                align: 'right',
                sortable: true,
                value: 'properties.' + pt.key
            }];
        } else
        {
            return [];
        }
    }

    public listItems(): Array<Feature<Geometry, GeoJsonProperties>> | undefined {
        return this.layer._source?._data?.features;
    }

    public selectListRow(listItem: any) {
        this.data.selectFeature(listItem.id, this.layer, true);
    }


    public mounted() {
        this.dataLoaded();
    }
}

vue.component('data-panel-list', DataPanelList);