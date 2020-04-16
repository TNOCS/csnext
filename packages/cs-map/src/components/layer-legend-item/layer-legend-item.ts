import Component from 'vue-class-component';

import './layer-legend-item.css';
import { Vue, Watch } from 'vue-property-decorator';
import { MapDatasource, LayerLegend, IMapLayer, LayerFilter } from '../..';
import { GeojsonPlusLayer } from '../../layers/geojson-plus-layer';
import { PropertyType } from '@csnext/cs-data';

@Component({
    name: 'layer-legend-item',
    props: { legend: null, source: null, layer: null, direction: null },
    template: require('./layer-legend-item.html')
} as any)
export class LayerLegendItem extends Vue {
    public legend?: LayerLegend;
    public source?: MapDatasource;
    public layer?: GeojsonPlusLayer;
    public direction?: string;

    public get filter(): LayerFilter | undefined {
        if (this.legend && this.layer && this.layer._filters && this.layer._filters.hasOwnProperty(this.legend.property)) {
            const l = this.layer._filters[this.legend.property];
            return l;
        }
    }

    public get rules() {
        return [(value: number) => !!value || 'Required.',
        (value: number) => (this.legend &&  this.legend.propertyInfo && this.legend.propertyInfo.max && value <= this.legend.propertyInfo.max) || 'Max',
        (value: number) => (this.legend &&  this.legend.propertyInfo && this.legend.propertyInfo.min && value >= this.legend.propertyInfo.min) || 'Min'];
    }

    public get step(): string {
        if (!this.legend || !this.legend.propertyInfo || !this.legend.propertyInfo.decimals) { return ''; }
        const decimal = this.legend.propertyInfo?.decimals;
        switch (decimal) {
            case 1:
                return '.1';
            case 2:
                return '.01';
            case 3:
                return '.001';
            default:
                return '1';
        }
    }


    public initFilter(layer: IMapLayer, legend: LayerLegend) {
        layer.initFilter(legend.property);
    }

    public resetFilter(layer: IMapLayer) {
        layer.setFilter([]);
    }

    private applyFilter(layer: IMapLayer, filter: LayerFilter) {
        // layer.updateFilters();
        layer.applyFilter(filter);
    }

    private removeFilter(layer: IMapLayer, filter: LayerFilter) {
        layer.removeFilter(filter);
    }

    private getStopColor(stop: any[], legend: any) {
        return { 'background': stop[1], 'width': '20px', 'height': '20px' };
    }

}

Vue.filter('valueUnit', (value: any, test: any) => {
    return value.split('').reverse().join('')
});
