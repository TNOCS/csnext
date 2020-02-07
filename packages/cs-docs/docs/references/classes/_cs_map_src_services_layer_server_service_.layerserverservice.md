# Class: LayerServerService

## Hierarchy

* **LayerServerService**

## Implements

* any
* any

## Constructors

###  constructor

\+ **new LayerServerService**(`init?`: Partial‹[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)›): *[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)*

*Defined in [cs-map/src/services/layer-server-service.ts:43](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)› |

**Returns:** *[LayerServerService](_cs_map_src_services_layer_server_service_.layerserverservice.md)*

## Properties

###  id

• **id**: *string*

*Defined in [cs-map/src/services/layer-server-service.ts:36](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L36)*

___

###  layers

• **layers**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]* =  []

*Defined in [cs-map/src/services/layer-server-service.ts:42](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L42)*

___

### `Optional` manager

• **manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/services/layer-server-service.ts:43](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L43)*

___

### `Optional` options

• **options**? : *[LayerServerServiceOptions](_cs_map_src_services_layer_server_service_options_.layerserverserviceoptions.md)*

*Defined in [cs-map/src/services/layer-server-service.ts:40](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L40)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/services/layer-server-service.ts:37](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L37)*

___

###  type

• **type**: *string* = "layer-server-service"

*Defined in [cs-map/src/services/layer-server-service.ts:41](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L41)*

## Accessors

###  mapDraw

• **get mapDraw**(): *any*

*Defined in [cs-map/src/services/layer-server-service.ts:26](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L26)*

**Returns:** *any*

___

###  socket

• **get socket**(): *Socket | undefined*

*Defined in [cs-map/src/services/layer-server-service.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L20)*

**Returns:** *Socket | undefined*

## Methods

###  Start

▸ **Start**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹void›*

*Defined in [cs-map/src/services/layer-server-service.ts:54](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹void›*

___

###  Stop

▸ **Stop**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:250](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L250)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  disableLayerSocket

▸ **disableLayerSocket**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:176](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |

**Returns:** *void*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)›): *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

*Defined in [cs-map/src/services/layer-server-service.ts:49](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)› |

**Returns:** *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

___

###  getLayerActions

▸ **getLayerActions**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [cs-map/src/services/layer-server-service.ts:231](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L231)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

### `Private` initEditableLayer

▸ **initEditableLayer**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md), `layer`: any): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:316](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L316)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |
`layer` | any |

**Returns:** *void*

___

###  initLayerSocket

▸ **initLayerSocket**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:183](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L183)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |

**Returns:** *void*

___

### `Private` initLiveLayer

▸ **initLiveLayer**(`gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md), `layer`: any): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:254](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L254)*

**Parameters:**

Name | Type |
------ | ------ |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |
`layer` | any |

**Returns:** *void*

___

### `Private` removeExistingLayers

▸ **removeExistingLayers**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:374](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L374)*

remove previously added layers

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:204](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` updateLiveLayer

▸ **updateLiveLayer**(`data`: any, `gl`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

*Defined in [cs-map/src/services/layer-server-service.ts:270](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L270)*

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

*Defined in [cs-map/src/services/layer-server-service.ts:286](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L286)*

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

*Defined in [cs-map/src/services/layer-server-service.ts:302](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server-service.ts#L302)*

update live layer, after feature update

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | object | - |
`gl` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) | - |
`forceUpdate` | boolean | true |

**Returns:** *void*
