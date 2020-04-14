import { ILayerExtension, ILayerExtensionType } from '../classes/ilayer-extension';
import { IMapLayer } from '../classes/imap-layer';
import { MessageBusHandle } from '@csnext/cs-core';
import { Feature, Point, FeatureCollection, GeometryObject } from 'geojson';
import { CsMap } from '..';
import Axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import { LngLatBounds } from 'mapbox-gl';
import _ from 'lodash';
import { AppState } from '@csnext/cs-client';

export interface IOverpassExtensionOptions {
    // #region Properties (3)
    amenity?: string;
    url?: string;
    iconUrl?: string;
    // #endregion Properties (3)
}

export const DEFAULT_OVERPASS_URL = 'http://overpass.openstreetmap.fr/api/interpreter';
export const DEFAULT_ICON_URL = 'https://raw.githubusercontent.com/rinzeb/osm-icons/master/png/osm{{AMENITY}}.png';

export class OverpassExtension implements ILayerExtension, ILayerExtensionType, IOverpassExtensionOptions {
    // #region Properties (10)

    public id: string = 'overpass';
    public amenity?: string;
    public url?: string;
    public iconUrl?: string;
    public title?: string | undefined;
    private _query?: string;
    private _handle?: MessageBusHandle;
    private _layer?: IMapLayer;
    private _originalFeatures?: Array<Feature<Point>> = [];
    private mapMoved = this.onMove.bind(this);

    // #endregion Properties (10)

    // #region Constructors (1)

    public constructor(init?: Partial<ILayerExtension>) {
        Object.assign(this, init);
    }

    // #endregion Constructors (1)

    // #region Public Methods (3)

    public getInstance(init?: Partial<ILayerExtension>) {
        const result = new OverpassExtension(init);
        return result;
    }

    public start(layer: IMapLayer) {
        // console.log('Start time interpolation extension');
        this._layer = layer;
        this.subscribeToMapEvents();
        this.addIcon();
    }

    public stop() {
        this.restoreOriginalFeatures();
    }

    // #endregion Public Methods (3)

    // #region Private Methods (6)

    private restoreOriginalFeatures() {
        if (!this._layer || !this._originalFeatures) { return; }
        this._layer._source!._data!.features = this._originalFeatures;
        this._layer._manager!.updateLayerSource(this._layer);
        if (this._layer && this._layer._manager) {
            this._layer._manager!.MapControl!.off('moveend', this.mapMoved);
        }
    }

    private onMove(e: mapboxgl.MapboxEvent) {
        this.getQuery();
    }

    private addIcon() {
        if (!this.amenity || !this._layer) return;
        this._layer._manager!.MapWidget!.addImage(this.amenity, DEFAULT_ICON_URL.replace('{{AMENITY}}', this.amenity));
    }

    private subscribeToMapEvents() {
        if (this._layer && this._layer._manager) {
            this._layer._manager!.MapControl!.on('moveend', this.mapMoved);
        }
    }

    private getQuery = _.throttle(() => this.getQueryThrottled(), 1500);

    private async getQueryThrottled() {
        if (!this.amenity || !this._layer || !this._layer._source || !this._originalFeatures) { return; }
        const source = this._layer._source;
        const manager = this._layer._manager!;
        const viewBox = manager.MapControl!.getBounds();
        const zoom = manager.MapControl!.getZoom();
        if (zoom <= 11) {
            AppState.Instance.triggerNotification({ title: 'Zoomlevel not supported, zoom in to view features', timeout: 2500 });
            return;
        }
        if (this.amenity && source && source._data && source._data.features) {
            const osmData = await this.query(viewBox);
            if (source && source._data && source._data.features && osmData && osmData.features) {
                source!._data!.features = osmData.features;
                manager!.updateLayerSource(this._layer);
                console.log(`Updated OSM features: #${osmData.features.length} for view ${viewBox.toString()}`);
            }
        }
    }

    private async query(viewBox: LngLatBounds): Promise<FeatureCollection> {
        return new Promise((response, reject) => {
            const url = this.url || DEFAULT_OVERPASS_URL;
            const query = `[out:json];node[amenity=${this.amenity}](${viewBox.getSouth()},${viewBox.getWest()},${viewBox.getNorth()},${viewBox.getEast()});out;`;
            Axios.post(url, query).then(async r => {
                if (r.data) {
                    if (r.data) {
                        const geojson = osmtogeojson(r.data, { flatProperties: true } as osmtogeojson.OsmToGeoJSONOptions) as FeatureCollection;
                        response(geojson);
                        return;
                    }
                } else {
                    reject('Error loading overpass data');
                }
            }).catch((e) => {
                reject(e);
            });
        });
    }

    // #endregion Private Methods (6)
}
