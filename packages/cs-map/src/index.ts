import { CsMap } from './.';
import { GeojsonLayer } from './layers/geojson-layer';

// classes
export * from './classes/map-options';
export * from './classes/layer-sources';
export * from './classes/layer-source';
export * from './classes/layer-service';
export * from './classes/map-layers';
export * from './classes/imap-layer';

// components
export * from './components/layer-selection/layer-selection';
export * from './components/layer-selection/layer-selection-options';
export * from './components/cs-map/cs-map';

// layers
export * from './layers/geojson-layer';
export * from './layers/mask-layer';

CsMap.AddLayerType(new GeojsonLayer());