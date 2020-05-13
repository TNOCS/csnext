import { WidgetOptions, Form, FormField, IDatasource } from '@csnext/cs-core';
import { MapboxOptions } from 'mapbox-gl'
import { MapboxStyleDefinition } from '..';

export class PeliasOptions {
    public accessToken?: string;
    public url?: string;
}

@Form({ title: 'Map Options' })
export class MapOptions extends WidgetOptions {
    // #region Properties (23)

    /** list of layer ids that will be active on start */
    public activeLayers?: string[] = [];
    /** enable double click to zoom  */
    public doubleClickZoom?: boolean = true;
    public boxZoom?: boolean = true;
    public scrollZoom?: boolean = true;
    public dragPan?: boolean = true;
    public dragRotate?: boolean = true;
    public mbOptions?: MapboxOptions;
    public showBuildings?: boolean = false;
    public showClickLayer?: boolean = true;
    public showCompass?: boolean = true;
    public showDraw?: boolean = false;
    public showEditor?: boolean = false;
    public showGeocoder?: boolean = true;
    public showPelias?: boolean = true;
    public showGeolocater?: boolean = false;
    public showGrid?: boolean = false;
    public showLayers?: boolean = true;
    public showFeatureDetails?: boolean = false;
    public showFeatureList?: boolean = false;
    public showLayersWidget?: boolean = false;
    public showLegend?: boolean = false;
    public showRuler?: boolean = true;
    public showScale?: boolean = false;
    public showStyles?: boolean = true;
    public showPackageExporer?: boolean = false;
    /** Show the current location in a specific format */
    public showCursorLocationInfo?: 'NONE' | 'LATLON' | 'DMS' = 'NONE';
    public mouseEventsOnIcon: boolean = false;
    /** show toolbar on top of map */
    public showToolbar?: boolean = true;
    public showTraffic?: boolean = false;
    public showZoom?: boolean = true;
    public showDetailsOnLoad?: boolean = true;
    public storePositionInUrl?: boolean = true;
    public f?: boolean = true;
    public style?: string = 'streets';
    public styleList?: MapboxStyleDefinition[] = [];
    // @FormField({title: 'MapGL token'})
    public token?: string;
    public peliasOptions?: PeliasOptions;

    // #endregion Properties (23)

    // #region Constructors (1)

    constructor(options?: MapOptions) {
        super();
        if (options) {
            Object.assign(this, options);
        }
    }

    // #endregion Constructors (1)
}
