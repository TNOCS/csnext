import { IDatasource } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { MapLayers } from '.';

export class MapLayer {
    public id?: string;
    public title?: string;
    public source?: string | LayerSource;
    public visible?: boolean;
    public _manager?: MapLayers;

    public get Visible(): boolean | undefined {
        return this.visible;
    }

    public set Visible(value: boolean | undefined) {
        this.visible = value;
        if (!this._manager) { return; }
        if (value === true) {
            this._manager.enableLayer(this);
        } else {
            this._manager.disableLayer(this);
        }
    }

    public _source?: LayerSource;
    public _initialized? = false;
}
