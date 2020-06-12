import { IControl, Map as MapboxMap } from 'mapbox-gl';
import './grid-control.css';
import { CsMap, MapDatasource, GridLayer, LayerSource } from '../..';
import { guidGenerator } from '@csnext/cs-core';
import { FeatureCollection } from 'geojson';
import { GeojsonPlusLayer } from '../../layers/geojson-plus-layer';
import { GeojsonLayer } from '../../layers/geojson-layer';

export class GridControl implements IControl {

    public static readonly DEFAULT_STYLES = [
        { id: 'LatLon', title: 'Lat / Lon' }
    ];
    // #region Properties (6)

    private static readonly DEFAULT_STYLE = 'LatLon';

    public layer!: GeojsonLayer;
    public manager!: MapDatasource;

    private controlContainer: HTMLElement | undefined;
    private gridEnabled = true;

    // #endregion Properties (6)

    // #region Constructors (1)

    constructor(public mapControl: CsMap) {
        if (mapControl.manager) {
            this.manager = mapControl.manager;
        }
    }

    // #endregion Constructors (1)

    // #region Public Methods (4)

    public getDefaultPosition(): string {
        const defaultPosition = 'bottom-right';
        return defaultPosition;
    }

    public onAdd(map: MapboxMap): HTMLElement {
        this.controlContainer = document.createElement('div');
        this.controlContainer.classList.add('mapboxgl-ctrl');
        this.controlContainer.classList.add('mapboxgl-ctrl-group');
        const mapStyleContainer = document.createElement('div');
        const styleButton = document.createElement('button');
        mapStyleContainer.classList.add('mapboxgl-style-list');
        for (const style of GridControl.DEFAULT_STYLES) {
            const styleElement = document.createElement('button');
            styleElement.innerText = style.title;
            styleElement.classList.add(style.title.replace(/[^a-z0-9-]/gi, '_'));
            styleElement.dataset.uri = JSON.stringify(style);
            // styleElement.addEventListener("click", event => {
            //     const srcElement = event.srcElement as HTMLButtonElement;

            //     // update style

            //     mapStyleContainer.style.display = "none";
            //     styleButton.style.display = "block";
            //     const elms = mapStyleContainer.getElementsByClassName("active");
            //     while (elms[0]) {
            //         elms[0].classList.remove("active");
            //     }
            //     srcElement.classList.add("active");
            // });
            // if (style.title === MapboxStyleSwitcherControl.DEFAULT_STYLE)
            // {
            //     styleElement.classList.add("active");
            // }
            mapStyleContainer.appendChild(styleElement);
        }
        styleButton.classList.add('mapboxgl-ctrl-icon');
        styleButton.classList.add('mapboxgl-grid-switcher');
        styleButton.addEventListener('click', () => {
            // styleButton.style.display = "none";
            // mapStyleContainer.style.display = "block";
            this.toggleGrid();
        });

        document.addEventListener('click', event => {
            if (!this.controlContainer!.contains(event.target as Element)) {
                mapStyleContainer.style.display = 'none';
                styleButton.style.display = 'block';
            }
        });

        this.controlContainer.appendChild(styleButton);
        this.controlContainer.appendChild(mapStyleContainer);
        return this.controlContainer;
    }

    public onRemove(): void {
        if (this.controlContainer && this.controlContainer.parentNode) {
            this.controlContainer.parentNode.removeChild(this.controlContainer);
        }
    }

    public toggleGrid() {
        if (!this.manager) { return; }
        if (this.layer) {
            if (!this.layer.enabled) {
                this.manager.showLayer(this.layer);
            } else {
                this.manager.hideLayer(this.layer);
            }

        } else {
            // add layer
            this.layer = new GeojsonLayer();
            this.layer.title = 'grid';
            this.layer.style = { type: 'line', mapbox: { linePaint: { 'line-width': 2, 'line-color': 'grey', 'line-dasharray': [2, 1] } } };
            this.layer.filter = ['>=', ['zoom'], ['number', ['get', 'level']]];
            this.layer.id = 'map-grid';       
            this.layer.typeId = 'geojson'                 
            this.layer.hideInLayerList = true;
            this.layer.tags = ['map'];
            // this.layer.type = 'line';

            const gs: FeatureCollection = { type: 'FeatureCollection', features: [] };
            for (let x = -180; x <= 180; x++) {

                if ((x % 10) === 0) {
                    gs.features.push({
                        type: 'Feature',
                        properties: {
                            name: x,
                            level: 1,
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
                } else {
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
            }

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

            for (let y = -90; y <= 90; y++) {
                if ((y % 10) === 0) {
                gs.features.push({
                    type: 'Feature',
                    properties: { name: y, level: 1 },
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
            } else {
                gs.features.push({
                    type: 'Feature',
                    properties: { name: y, level: 5 },
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
            }

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

            this.layer._source = new LayerSource(gs);
            this.layer._source._loaded = true;

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
                this.manager.showLayer(this.layer);
            }).catch(e => {
                console.log(e);

            });
        }
    }

    // #endregion Public Methods (4)
}
