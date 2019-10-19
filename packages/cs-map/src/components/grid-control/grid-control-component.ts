import { FeatureCollection } from 'geojson';
import Component from 'vue-class-component';
import { IWidget, MessageBusHandle } from '@csnext/cs-core';
import { guidGenerator } from '@csnext/cs-core';
import './grid-control-component.css';
import { Vue } from 'vue-property-decorator';
import { MapDatasource, IMapLayer, FeatureType, GridLayer, LayerSource } from '../../.';

@Component({
    name: 'grid-control-component',
    props: { widget: null, manager: null },
    template: require('./grid-control-component.html')
} as any)
export class GridControlComponent extends Vue {
    public widget!: IWidget;
    public manager!: MapDatasource;
    public layer!: GridLayer;
    public busHandle?: MessageBusHandle;
    public map?: mapboxgl.Map;
    public gridEnabled: boolean = true;
    public gridStyle: string = 'Lat/Lon';
    public gridStyles = ['Lat/Lon', 'MGRS'];

    public mounted() {
        this.updateGrid();
    }

    public toggleGrid() {
        if (!this.layer || !this.manager) { return; }
        if (this.layer.Visible) {
            this.manager.hideLayer(this.layer);
        } else {
            this.manager.showLayer(this.layer);
        }
    }

    public init() {
        if (!this.manager) { return; }
        // add layer
        this.layer = new GridLayer();
        this.layer.title = 'grid';
        this.layer.style = { line: true, mapbox: { linePaint: { 'line-width': 2, 'line-color': '#cc000000', 'line-dasharray': [2, 1] } } };
        this.layer.filter = ['>=', ['zoom'], ['number', ['get', 'level']]];
        this.layer.id = 'map-grid';
        this.layer.tags = ['map'];
        this.layer.type = 'line';
        this.layer.source = new LayerSource({ type: 'FeatureCollection', features: [] });
        this.layer.source._loaded = true;
        this.layer.source.id = guidGenerator();

        this.manager.events.subscribe('layer', (a: string, e: any) => {
            if (a === 'removed' && this.gridEnabled && e.id === this.layer.id) {
                    this.gridEnabled = false;
            }
            if (a === 'enabled' && !this.gridEnabled && e.id === this.layer.id) {
                this.gridEnabled = true;
        }
        });

        // if (this.manager.MapWidget) {
        //     this.layer.addLayer(this.manager.MapWidget);
        // }
        this.manager.addLayer(this.layer).then(l => {
            let gs: FeatureCollection = { type: 'FeatureCollection', features: [] };
            for (let x = -180; x<=180;x++) {
              gs.features.push({
                type: 'Feature',
                properties: {
                  name: x,
                  level: 5,
                },
                geometry: {
                  type: 'LineString',
                  coordinates: [
                      [
                        x,
                        -90
                      ],
                      [
                        x,
                        90
                      ]
                    ]
                }
              });

              for (let sx = 1; sx < 10; sx++) {
                gs.features.push({
                  type: 'Feature',
                  properties: {
                    name: x,
                    level: 8
                  },
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                        [
                          x + (sx / 10.0),
                          -90
                        ],
                        [
                          x + (sx / 10.0),
                          90
                        ]
                      ]
                  }
                });
              }
            }

            for (let y = -90; y<=90;y++) {
              gs.features.push({
                type: 'Feature',
                properties: {name: y, level: 5},
                geometry: {
                  type: 'LineString',
                  coordinates: [
                      [
                        -180,
                        y
                      ],
                      [
                        180, y
                      ]
                    ]
                }
              });

              for (let sy = 1; sy < 10; sy++) {
                gs.features.push({
                  type: 'Feature',
                  properties: {
                    name: y,
                    level: 8
                  },
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      [
                        -180,
                        y + (sy / 10.0)
                      ],
                      [
                        180, y + (sy / 10.0)
                      ]
                      ]
                  }
                });
              }
            }

            this.manager.updateLayerSource(l, gs);
        }).catch(e => {
            console.log(e);

        });

    }

    public selectGridStyle(style: string) {
        this.gridStyle = style;
    }

    private updateGrid() {
        console.log('Update grid');
    }
}
