import { FeatureCollection } from 'geojson';
import axios from 'axios';
import { GeoJSONSourceRaw } from 'mapbox-gl';
import { guidGenerator } from '@csnext/cs-core';


export class LayerSource {
    /** id of this layer */
    public id?: string;
    public title?: string;
    public type?: string;
    public url?: string;
    public _geojson?: FeatureCollection;    
    public _loaded? = false;

    /** make sure all features have an id and properties object */
    private InitGeoJsonIDs(geojson: FeatureCollection) {
        let count = 0;
        if (geojson && geojson.features) {
            for(const f of geojson.features){
                if (f.id === undefined) { f.id = count; count+=1; }
                if (!f.properties) f.properties = {};
            }
        }
        return geojson;        
    }

    public LoadSource(): Promise<FeatureCollection> {          
        return new Promise((resolve, reject) => {            
            if (this._loaded) { resolve(this._geojson); return; }
            if (!this.url) { reject('Url not defined'); return; }            
            axios
                .get(this.url)
                .then(response => {
                    if (response) {                        
                        this._geojson = this.InitGeoJsonIDs(response.data);;                                                
                        this._loaded = true;
                        resolve(this._geojson);
                    }
                })
                .catch(e => {
                    reject(e);
                });
                
        });
    }
}