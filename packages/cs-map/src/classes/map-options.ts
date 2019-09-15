import { WidgetOptions, Form, FormField, IDatasource } from '@csnext/cs-core';
import { MapboxOptions } from 'mapbox-gl'

@Form({ title: 'Map Options'})
export class MapOptions extends WidgetOptions
{
    // @FormField({title: 'MapGL token'})
    public token?: string;
    public mbOptions?: MapboxOptions;
    public activeLayers?: string[] = [];
    public style?: string = 'basic';

    /** show toolbar on top of map */
    public showToolbar?: boolean = true;
    public showZoom?: boolean = true;
    public showCompass?: boolean = true;
    public showRuler?: boolean = true;
    public showStyles?: boolean = true;
    public showGeocoder?: boolean = true;
    public showClickLayer?: boolean = true;
    public showDraw?: boolean = false;
    public showTraffic?: boolean = false;
    public showEditor?: boolean = false;
    public showLegend?: boolean = true;
    public showGrid?: boolean = true;
    public storePositionInUrl?: boolean = true;
    public doubleClickZoom?: boolean = true;
}
