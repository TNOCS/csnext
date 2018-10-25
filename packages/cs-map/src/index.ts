import { CsMap } from './.';
import { GeojsonLayer } from './layers/geojson-layer';
import { PoiLayer } from './layers/poi-layer';
import { LayerServer } from './services/layer-server';

// classes
export * from './classes/map-options';
export * from './classes/layer-sources';
export * from './classes/layer-source';
export * from './classes/layer-service';
export * from './classes/map-layers';
export * from './classes/imap-layer';
export * from './classes/layer-service-options';

// components
export * from './components/layer-selection/layer-selection';
export * from './components/layer-selection/layer-selection-options';
export * from './components/cs-map/cs-map';

// layers
export * from './layers/geojson-layer';
export * from './layers/mask-layer';
export * from './layers/poi-layer';

// services
export * from './services/layer-server';

CsMap.AddLayerType(new GeojsonLayer());
CsMap.AddLayerType(new PoiLayer());
CsMap.AddLayerServiceType(new LayerServer());