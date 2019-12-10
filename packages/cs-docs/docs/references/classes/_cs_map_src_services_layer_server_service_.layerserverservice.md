# Class: LayerServerService

## Hierarchy

* **LayerServerService**

## Implements

* any
* any

## Constructors

###  constructor

\+ **new LayerServerService**(`init?`: Partial‹[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)›): *[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:42](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)› |

**Returns:** *[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)*

## Properties

###  id

• **id**: *string*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:35](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L35)*

___

###  layers

• **layers**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]* =  []

*Defined in [packages/cs-map/src/services/layer-server-service.ts:41](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L41)*

___

### `Optional` manager

• **manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:42](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L42)*

___

### `Optional` options

• **options**? : *[LayerServerServiceOptions](_cs_map_src_services_layer_server_service_options_.layerserverserviceoptions.md)*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:39](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L39)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:36](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L36)*

___

###  type

• **type**: *string* = "layer-server-service"

*Defined in [packages/cs-map/src/services/layer-server-service.ts:40](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L40)*

## Accessors

###  mapDraw

• **get mapDraw**(): *any*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:25](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L25)*

**Returns:** *any*

___

###  socket

• **get socket**(): *Socket | undefined*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:19](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L19)*

**Returns:** *Socket | undefined*

## Methods

###  Start

▸ **Start**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹void›*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:53](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹void›*

___

###  Stop

▸ **Stop**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:251](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  disableLayerSocket

▸ **disableLayerSocket**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:174](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |

**Returns:** *void*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)›): *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:48](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)› |

**Returns:** *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

___

###  getLayerActions

▸ **getLayerActions**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:232](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L232)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

### `Private` initEditableLayer

▸ **initEditableLayer**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md), `layer`: any): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:318](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L318)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |
`layer` | any |

**Returns:** *void*

___

###  initLayerSocket

▸ **initLayerSocket**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:181](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |

**Returns:** *void*

___

### `Private` initLiveLayer

▸ **initLiveLayer**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md), `layer`: any): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:256](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L256)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |
`layer` | any |

**Returns:** *void*

___

### `Private` removeExistingLayers

▸ **removeExistingLayers**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:379](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L379)*

remove previously added layers

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:202](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` updateLiveLayer

▸ **updateLiveLayer**(`data`: any, `gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:272](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L272)*

update live layer, after complete update

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |

**Returns:** *void*

___

### `Private` updateLiveLayerFeature

▸ **updateLiveLayerFeature**(`data`: [IFeatureAction](../interfaces/_cs_map_src_services_feature_action_.ifeatureaction.md), `gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md), `forceUpdate`: boolean): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:288](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L288)*

update live layer, after feature update

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [IFeatureAction](../interfaces/_cs_map_src_services_feature_action_.ifeatureaction.md) | - |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) | - |
`forceUpdate` | boolean | true |

**Returns:** *void*

___

### `Private` updateLiveLayerFeatures

▸ **updateLiveLayerFeatures**(`data`: object, `gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md), `forceUpdate`: boolean): *void*

*Defined in [packages/cs-map/src/services/layer-server-service.ts:304](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/services/layer-server-service.ts#L304)*

update live layer, after feature update

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | object | - |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) | - |
`forceUpdate` | boolean | true |

**Returns:** *void*
