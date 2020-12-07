import Vue from 'vue';
import { DataChartOptions } from './components/data-chart/data-chart-options';
import { CsMap } from './.';
import { GeojsonLayer } from './layers/geojson-layer';
import { LayerServer } from './services/layer-server';
import { GeojsonPlusLayer } from './layers/geojson-plus-layer';
import { TimeInterpolationExtension } from './extensions/time-interpolation-extension';
import { WmsTimeExtension } from './extensions/wms-time-extension';
import { LayerServerService } from './services/layer-server-service';
import { GridLayer } from './layers/grid-layer';
import { IWidget, guidGenerator } from '@csnext/cs-core';
import { MapOptions } from './classes/map-options';
import { MapboxOptions } from 'mapbox-gl';
import { DataChart } from './components/data-chart/data-chart';
import { VNode } from 'vue/types/umd';

// classes
export * from './classes/map-options';
export * from './classes/layer-sources';
export * from './classes/layer-source';
export * from './classes/layer-service';
export * from './datasources/map-datasource';
export * from './datasources/map-layers';
export * from './datasources/stats-datasource';
export * from './classes/imap-layer';
export * from './classes/ilayer-extension';
export * from './classes/layer-service-options';
export * from './classes/ilayer-action';
export * from './classes/layer-style';
export * from './classes/layer-filter';
export * from './interfaces/source';
export * from './classes/map-style-definition';
export * from './services/layer-server-options';

// components
export * from './components/layer-selection/layer-selection';
export * from './components/layer-selection/layer-selection-options';
export * from './components/cs-map/cs-map';
export * from './components/data-chart/data-chart';
export * from './components/data-chart/data-chart-options';
export * from './components/cs-map/feature-event-details';
export * from './components/feature-details/feature-details';
export * from './components/feature-details/property-details';
export * from './components/feature-details/property-section';
export * from './components/feature-details/feature-component';
export * from './components/layer-editor/layer-editor';
export * from './components/data-dashboard/data-dashboard';
export * from './components/data-panel/data-panel';
export * from './components/data-list/data-list';
export * from './components/data-sources/data-sources';
export * from './components/data-properties/data-properties';
export * from './components/data-big-text/data-big-text';
export * from './components/feature-preview/feature-preview';
export * from './components/data/data-details/data-details';

// layers
export * from './layers/base-layer';
export * from './layers/geojson-layer';
export * from './layers/geojson-plus-layer';
export * from './layers/grid-layer';

// charts
export * from './components/data-chart/data-chart';
export * from './components/data-chart/data-chart-options';

// services
export * from './services/layer-server';
export * from './services/layer-server-service';
export * from './services/layer-server-service-options';
export * from './services/feature-action';

// extensions
export * from './extensions/time-interpolation-extension';
export * from './extensions/wms-time-extension';

// utils
export * from './utils/conversion';

CsMap.AddLayerType(new GeojsonLayer());
CsMap.AddLayerType(new GeojsonPlusLayer());
CsMap.AddLayerType(new GridLayer());
CsMap.AddLayerExtension(new TimeInterpolationExtension());
CsMap.AddLayerExtension(new WmsTimeExtension());
CsMap.AddLayerServiceType(new LayerServer());
CsMap.AddLayerServiceType(new LayerServerService());

Vue.component('prop-value', {
    props: ['value', 'proptype', 'showUnit'],
    render(createElement): VNode {
        switch (this.proptype.type) {
            case 'number':
                if (this.value) {
                    let value = this.value.toFixed(this.proptype.decimals || 0);
                    if (this.showUnit && this.proptype.unit) { value+=' ' + this.proptype.unit; }
                    return createElement('span', value);
                } else {
                    return createElement('span','');
                }
            case 'boolean':
                return createElement('span', this.value ? $cs.Translate('YES') : $cs.Translate('NO'))
            case 'url':                
                return createElement('a', { attrs: { href: (!this.value.startsWith('http')) ? 'https://' + this.value : this.value } }, this.value)
            default:
                return createElement('span', this.value);
        }
    }
});

Vue.component('date-time-value', {
    props: ['value'],
    render(createElement): VNode {        
        if (this.value && $cs.i18n) {
            return createElement('span', $cs.i18n.d(this.value));
        } else {            
            return createElement('span','');
        }
    } //{ attrs: { 'class', '' }}, [value]);  }    
});

// '<span> {{ value}}  {{ proptype.unit }}</span>';

Vue.component('feature-title', {
    props: ['feature', 'layer'],
    template: '<span>{{feature.properties.Naam}}</span>'
});

export function DataChartWidget(definition: IWidget = {}, options?: DataChartOptions): IWidget {
    const widget = {
        ...{
            id: guidGenerator(),
            component: DataChart,
            options: {} as DataChartOptions
        }, ...definition
    };
    if (options) {
        widget.options = { ...widget.options, ...options };
    }
    return widget;
}

export function MapWidget(definition: IWidget = {}, token: string, options?: MapOptions): IWidget {
    const widget = {
        ...{
            id: guidGenerator(),
            component: CsMap,
            options: {
                token,
                mbOptions: {
                    style: 'mapbox://styles/mapbox/light-v10',
                    center: [4.799119, 52.478137],
                    zoom: 13,
                    logoPosition: 'bottom-right'
                } as MapboxOptions,
                showDraw: false,
                showRuler: false,
                showBuildings: false,
                showGrid: false,
                showStyles: true,
                showGeocoder: false,
                showTraffic: false,
                showLegend: true,
                showLayers: true,
                showLayersWidget: true
            } as MapOptions, ...definition
        }
    };
    if (options) {
        widget.options = { ...widget.options, ...options };
    }
    return widget;
}

