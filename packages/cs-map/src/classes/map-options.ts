import { WidgetOptions, Form, FormField, IDatasource } from '@csnext/cs-core';
import { MapboxOptions } from 'mapbox-gl'

@Form({ title: 'Map Options' })
export class MapOptions extends WidgetOptions {

    constructor(options?: MapOptions) {
        super();
        if (options) {
            Object.assign(this, options);
        }
    }

    // @FormField({title: 'MapGL token'})
    public token?: string;
    public mbOptions?: MapboxOptions;
    public activeLayers?: string[] = [];
    public style?: string = 'streets';

    /** show toolbar on top of map */
    public showToolbar?: boolean = true;
    public showZoom?: boolean = true;
    public showCompass?: boolean = true;
    public showRuler?: boolean = true;
    public showLayers?: boolean = true;
    private _showStyles?: boolean = true;
    public get showStyles(): boolean {
        return this._showStyles || true;
    }
    public set showStyles(value: boolean) {
        this._showStyles = value;
    }

    public showScale?: boolean = false;
    public showGeocoder?: boolean = true;
    public showClickLayer?: boolean = true;
    public showDraw?: boolean = false;
    public showTraffic?: boolean = false;
    public showEditor?: boolean = false;
    public showLegend?: boolean = true;
    public showGeolocater?: boolean = false;    
    public showGrid?: boolean = false;
    public storePositionInUrl?: boolean = true;
    public doubleClickZoom?: boolean = true;
}
