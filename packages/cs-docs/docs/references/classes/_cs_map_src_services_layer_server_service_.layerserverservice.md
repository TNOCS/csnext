# Class: LayerServerService

## Hierarchy

* **LayerServerService**

## Implements

* any
* any

## Constructors

###  constructor

\+ **new LayerServerService**(`init?`: Partial‹[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)›): *[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)*

*Defined in [cs-map/src/services/layer-server-service.ts:44](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)› |

**Returns:** *[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)*

## Properties

###  id

• **id**: *string*

*Defined in [cs-map/src/services/layer-server-service.ts:37](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L37)*

___

###  layers

• **layers**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]* =  []

*Defined in [cs-map/src/services/layer-server-service.ts:43](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L43)*

___

### `Optional` manager

• **manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/services/layer-server-service.ts:44](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L44)*

___

### `Optional` options

• **options**? : *[LayerServerServiceOptions](_cs_map_src_services_layer_server_service_options_.layerserverserviceoptions.md)*

*Defined in [cs-map/src/services/layer-server-service.ts:41](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L41)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/services/layer-server-service.ts:38](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L38)*

___

###  type

• **type**: *string* = "layer-server-service"

*Defined in [cs-map/src/services/layer-server-service.ts:42](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L42)*

## Accessors

###  mapDraw

• **get mapDraw**(): *any*

*Defined in [cs-map/src/services/layer-server-service.ts:27](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L27)*

**Returns:** *any*

___

###  socket

• **get socket**(): *Socket | undefined*

*Defined in [cs-map/src/services/layer-server-service.ts:21](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L21)*

**Returns:** *Socket | undefined*

## Methods

###  Start

▸ **Start**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹void›*

*Defined in [cs-map/src/services/layer-server-service.ts:55](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹void›*

___

###  Stop

▸ **Stop**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:253](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L253)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  disableLayerSocket

▸ **disableLayerSocket**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:176](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |

**Returns:** *void*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)›): *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

*Defined in [cs-map/src/services/layer-server-service.ts:50](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)› |

**Returns:** *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

___

###  getLayerActions

▸ **getLayerActions**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [cs-map/src/services/layer-server-service.ts:234](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L234)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

### `Private` initEditableLayer

▸ **initEditableLayer**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md), `layer`: any): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:320](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L320)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |
`layer` | any |

**Returns:** *void*

___

###  initLayerSocket

▸ **initLayerSocket**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:183](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L183)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |

**Returns:** *void*

___

### `Private` initLiveLayer

▸ **initLiveLayer**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md), `layer`: any): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:258](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L258)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |
`layer` | any |

**Returns:** *void*

___

### `Private` removeExistingLayers

▸ **removeExistingLayers**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:381](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L381)*

remove previously added layers

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:204](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` updateLiveLayer

▸ **updateLiveLayer**(`data`: any, `gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:274](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L274)*

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

*Defined in [cs-map/src/services/layer-server-service.ts:290](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L290)*

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

*Defined in [cs-map/src/services/layer-server-service.ts:306](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server-service.ts#L306)*

update live layer, after feature update

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | object | - |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) | - |
`forceUpdate` | boolean | true |

**Returns:** *void*
