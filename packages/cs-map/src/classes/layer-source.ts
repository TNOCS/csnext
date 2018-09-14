import { FeatureCollection } from 'geojson';
import axios from 'axios';
import { GeoJSONSourceRaw } from 'mapbox-gl';


export class LayerSource {
    /** id of this layer */
    public id?: string;
    public title?: string;
    public type?: string;
    public url?: string;
    public _geojson?: FeatureCollection;    
    public _loaded? = false;

    public LoadSource(): Promise<FeatureCollection> {        
        return new Promise((resolve, reject) => {            
            if (this._loaded) { resolve(this._geojson); return; }
            if (!this.url) { reject('Url not defined'); return; }            
            axios
                .get(this.url)
                .catch(e => {
                    reject(e);
                })
                .then(response => {
                    if (response) {                        
                        this._geojson = response.data;
                        this._loaded = true;
                        resolve(this._geojson);
                    }
                });
        });
    }
}