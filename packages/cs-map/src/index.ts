import { CsMap } from './.';
import { GeojsonLayer } from './layers/geojson-layer';
import { LayerServer } from './services/layer-server';
import { GeojsonPlusLayer } from './layers/geojson-plus-layer';
import { TimeInterpolationExtension } from './extensions/time-interpolation-extension';
import { WmsTimeExtension } from './extensions/wms-time-extension';
import { LayerServerService } from './services/layer-server-service';
import { GridLayer } from './layers/grid-layer';

// classes
export * from './classes/map-options';
export * from './classes/layer-sources';
export * from './classes/layer-source';
export * from './classes/layer-service';
export * from './datasources/map-datasource';
export * from './classes/imap-layer';
export * from './classes/ilayer-extension';
export * from './classes/layer-service-options';
export * from './classes/ilayer-action';
export * from './classes/layer-style';
export * from './classes/feature-type';
export * from './interfaces/source';
export * from './interfaces/layer';
export * from './classes/layer-legend';

// components
export * from './components/layer-selection/layer-selection';
export * from './components/layer-selection/layer-selection-options';
export * from './components/cs-map/cs-map';
export * from './components/cs-map/feature-event-details';
export * from './components/feature-details/feature-details';
export * from './components/layer-editor/layer-editor';

// layers
export * from './layers/base-layer';
export * from './layers/geojson-layer';
export * from './layers/geojson-plus-layer';
export * from './layers/grid-layer';

// services
export * from './services/layer-server';
export * from './services/layer-server-service';
export * from './services/layer-server-service-options';
export * from './services/feature-action';

// extensions
export * from './extensions/time-interpolation-extension';
export * from './extensions/wms-time-extension';

CsMap.AddLayerType(new GeojsonLayer());
CsMap.AddLayerType(new GeojsonPlusLayer());
CsMap.AddLayerType(new GridLayer());
CsMap.AddLayerExtension(new TimeInterpolationExtension());
CsMap.AddLayerExtension(new WmsTimeExtension());
CsMap.AddLayerServiceType(new LayerServer());
CsMap.AddLayerServiceType(new LayerServerService());


