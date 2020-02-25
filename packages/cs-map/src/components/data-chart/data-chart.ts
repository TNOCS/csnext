import Component from 'vue-class-component';
import vue from 'vue';
import './data-chart.css';
import simplebar from 'simplebar-vue';
import { WidgetBase, VegaWidget } from '@csnext/cs-client';
import { DataChartOptions } from '../..';
import { DataSourceEvents, DataSources, DataSource, InsightDashboardPanel, InsightSection } from '@csnext/cs-data';
import { IWidgetSize, guidGenerator } from '@csnext/cs-core';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { GeojsonPlusLayer } from '../../layers/geojson-plus-layer';
import { Watch } from 'vue-property-decorator';

declare var vegaEmbed: any;

@Component({
    name: 'data-chart',
    components: { simplebar, VegaWidget },
    props: ['data', 'section', 'panel', 'layer', 'features'],
    template: require('./data-chart.html')
} as any)
export class DataChart extends WidgetBase {

    public panel!: InsightDashboardPanel;
    public data!: StatsDatasource;
    public section!: InsightSection;
    public layer!: GeojsonPlusLayer;
    public features!: mapboxgl.MapboxGeoJSONFeature[];

    public vegadata: any = {};

    public get options(): DataChartOptions {
        if (this.section) {
            return this.section;
        }
        if (!this.widget || !this.widget.options) { return {}; }
        return this.widget.options as DataChartOptions;
    }

    public get dataSources(): DataSources | undefined {
        if (this.data) { return this.data; }
        if (!this.widget || !this.widget.content) { return; }
        return this.widget.content as DataSources;
    }

    public get vegaid() {
        if (!this.panel.id) {
            this.panel.id = guidGenerator();
        }
        return 'vega-chart-' + this.panel.id;
    }

    public mounted() {
        this.updateChart();
    }

    public contentLoaded(d: DataSources) {
        this.busManager.subscribe(d.events, DataSourceEvents.UPDATED, (id: string, source: DataSource) => {
            this.updateChart();
        });
        this.busManager.subscribe(this.widget.events, 'resize', (a: string, size: IWidgetSize) => {
            this.updateChart();
            // this.$set(this, 'chartStyle', { width: `${size.componentWidth}px`, height: `${size.componentHeight}px`});
            // console.log(this.chartStyle);
        });

        // if (this.options.dataId) {
        //     this.busManager.subscribe(d.events, 'updated-source', (title, data) => {
        //         if (title === this.options.dataId) { this.updateChart(); }
        //     });
        // }
        this.updateChart();
    }


    @Watch('features')
    public updateChart() {
        // vegaEmbed('#' + this.vegaid, this.options.spec, { actions: false });
        if (this.options && this.data && this.layer) {
            const source = this.layer._source;
            if (source && source._loaded) {
                let spec: any = {};

                if (this.options.spec) {
                    if (!this.options.spec.hasOwnProperty('data')) {
                        if (this.options.hasOwnProperty('propertyGroup') && this.features && this.features.length === 1) {
                            spec = {  ...{ data: { values: this.getPropertyGroupValues() }}, ...this.options.spec };
                        } else if (source._data && source._data.features) {
                            spec = {  ...{ data: { values: source._data.features }}, ...this.options.spec };
                        }
                    } else {
                        spec = this.options.spec;
                    }
                } else if (this.options.charttype) {
                    switch (this.options.charttype) {
                        case 'rows':
                            spec = {
                                'mark': 'bar',
                                'width': 350,
                                'encoding': {
                                    'y': {
                                        'field': 'title',
                                        'type': 'ordinal',
                                        'title': ''
                                    },
                                    'x': {
                                        'field': 'value',
                                        'type': 'quantitative',
                                        'title': ''
                                    }
                                }
                            };
                            if (this.options.hasOwnProperty('propertyGroup') && this.features && this.features.length === 1) {
                                spec.data = { values: this.getPropertyGroupValues() };
                            } else if (source._data) {
                                spec.data = { values: source._data.features };
                            }
                            break;
                        case 'histogram':
                            spec = {
                                $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
                                mark: 'bar',
                                width: 400,
                                data: { values: source._data?.features},
                                encoding: {
                                  x: {
                                    bin: {
                                        maxbins: 50
                                    },
                                    field: this.options.key,
                                    title: this.getTitle(this.options.key),
                                    type: 'quantitative'
                                  },
                                  y: {
                                    aggregate: 'count',
                                    title: $cs.Translate('COUNT'),
                                    type: 'quantitative'
                                  }
                                }
                              };
                            break;
                        case 'scatterplot':
                            spec = {
                                $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
                                description: 'A scatterplot showing horsepower and miles per gallons for various cars.',
                                data: { values: source._data?.features},
                                width: 300,
                                mark: 'circle',
                                selection: {
                                    grid: {
                                      type: 'interval', 'bind': 'scales'
                                    }
                                  },
                                encoding: {
                                  x: {field: this.options.key, title: this.getTitle(this.options.key), type: 'quantitative'},
                                  y: {field: this.options.secondKey, title: this.getTitle(this.options.secondKey), type: 'quantitative'},
                                  color: {
                                    field: this.options.color,
                                    title: this.getTitle(this.options.color),
                                    type: 'quantitative'
                                  }
                                }
                              };
                            break;
                    }
                }
                // const csv = source.getFlatProperties();
                // const spec = { ...this.options.spec };
                // if (!spec.autosize && this.widget._size) {
                //     if (!spec.width) {
                //         spec.width = this.width = this.widget._size.width - 100;
                //     }
                //     // if (!spec.height) {
                //     //   spec.height = this.widget._size.componentHeight - 50;
                //     // }
                // }
                vegaEmbed('#' + this.vegaid, spec, { actions: false });
                // this.updateVega(spec);
                // this.updateVega(
                //     {
                //         '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
                //         'data': { 'url': 'test.json' },
                //         'repeat': {'column': ['Capaciteit', 'Huisnr']},
                //         'spec': {
                //           'layer': [{
                //             'selection': {
                //               'brush': {'type': 'interval', 'encodings': ['x']}
                //             },
                //             'mark': 'bar',
                //             'encoding': {
                //               'x': {
                //                 'field': {'repeat': 'column'},
                //                 'bin': {'maxbins': 20},
                //                 'type': 'quantitative'
                //               },
                //               'y': {'aggregate': 'count', 'type': 'quantitative'},
                //               'color': {'value': '#ddd'}
                //             }
                //           }, {
                //             'transform': [{'filter': {'selection': 'brush'}}],
                //             'mark': 'bar',
                //             'encoding': {
                //               'x': {
                //                 'field': {'repeat': 'column'},
                //                 'bin': {'maxbins': 20},
                //                 'type': 'quantitative'
                //               },
                //               'y': {'aggregate': 'count', 'type': 'quantitative'}
                //             }
                //           }]
                //         }
                //       }
                // );
            }
        }

    }

    private getTitle(key?: string): string {
        if (!key) { return ''; }
        const k = key.replace('properties.', '');
        const ft = this.layer?._source?.getFeatureType();
        if (ft && ft.propertyMap && ft.propertyMap.hasOwnProperty(k)) {
            const pt = ft.propertyMap[k];
            if (pt) {
                return pt.title + '(' + pt.unit + ')';
            }
        }
        return k;
    }

    private updateVega(spec: any) {
        this.$set(this, 'vegadata', spec);
    }

    private getPropertyGroupValues(): any {
        if (!this.layer._source) { return []; }
        const values: any[] = [];
        const ft = this.layer._source.getFeatureType();
        if (ft && ft.properties) {
            const f = this.features[0];
            if (f.properties) {
                for (const prop of ft.properties) {
                    if (prop.title && prop._key && prop.section === this.options.propertyGroup) {
                        values.push({ title: prop.title, value: f.properties[prop._key] });
                    }
                }
            }
        }
        return values;
    }

}

vue.component('data-chart', DataChart);
