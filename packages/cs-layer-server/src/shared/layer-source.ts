import { FeatureCollection } from 'geojson';
import axios from 'axios';
import { ISource } from './';

export class LayerSource implements ISource {
    /** id of this layer */
    public id?: string;
    public title?: string;
    public type?:
        | 'vector'
        | 'raster'
        | 'raster-dem'
        | 'geojson'
        | 'image'
        | 'video';
    public url?: string;
    public tileSize?: number;
    public _geojson?: FeatureCollection;
    public _loaded? = false;

    constructor(geojson?: FeatureCollection) {
        if (geojson) {
            (this.id = new Date().getTime().toString()), (this._geojson = geojson);
            this._geojson.type = 'FeatureCollection';
            this.type = 'geojson';
            this._loaded = true;
        }
    }

    public LoadSource(): Promise<FeatureCollection> {
        return new Promise((resolve, reject) => {
            if (this._loaded) {
                resolve(this._geojson);
                return;
            }
            if (!this.url) {
                reject('Url not defined');
                return;
            }
            if (!this.type || this.type === 'geojson') {
                axios
                    .get(this.url)
                    .then(response => {
                        if (response) {
                            this._geojson = this.InitGeoJsonFeatures(
                                response.data,
                                this.id
                            );
                            this._loaded = true;
                            resolve(this._geojson);
                        }
                    })
                    .catch(e => {
                        reject(e);
                    });
            } else {
                this._loaded = true;
                resolve(undefined);
            }
        });
    }

    /** make sure all features have an id and properties object */
    private InitGeoJsonFeatures(geojson: FeatureCollection, layerId?: string) {
        let count = 0;
        if (geojson && geojson.features) {
            for (const f of geojson.features) {
                if (f.id === undefined) {
                    f.id = count;
                    count += 1;
                }
                if (!f.properties) { f.properties = {}; }
                f.properties._fId = f.id; // Workaround because of mapbox bug in MapMouseEvent
                f.properties._lId = layerId;

                if (f.geometry && f.geometry.type === 'Polygon') {
                    let correct = true;
                    for (const line of f.geometry.coordinates) {
                        if (line.length === 1 && line[0] === null) {
                            correct = false;
                        }
                    }
                    if (!correct) { f.geometry.coordinates = [[]]; }
                }
            }
        }
        return geojson;
    }
}
