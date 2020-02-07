# Class: LayerServer

## Hierarchy

* **LayerServer**

## Implements

* any
* any

## Constructors

###  constructor

\+ **new LayerServer**(`init?`: Partial‹[LayerServer](_cs_map_src_services_layer_server_.layerserver.md)›): *[LayerServer](_cs_map_src_services_layer_server_.layerserver.md)*

*Defined in [cs-map/src/services/layer-server.ts:25](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[LayerServer](_cs_map_src_services_layer_server_.layerserver.md)› |

**Returns:** *[LayerServer](_cs_map_src_services_layer_server_.layerserver.md)*

## Properties

###  id

• **id**: *string*

*Defined in [cs-map/src/services/layer-server.ts:15](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L15)*

___

###  layers

• **layers**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]* =  []

*Defined in [cs-map/src/services/layer-server.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L20)*

___

### `Optional` options

• **options**? : *[LayerServerOptions](_cs_map_src_services_layer_server_options_.layerserveroptions.md)*

*Defined in [cs-map/src/services/layer-server.ts:18](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L18)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/services/layer-server.ts:16](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L16)*

___

###  type

• **type**: *string* = "layer-server"

*Defined in [cs-map/src/services/layer-server.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L19)*

## Methods

###  Start

▸ **Start**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹void›*

*Defined in [cs-map/src/services/layer-server.ts:31](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹void›*

___

###  Stop

▸ **Stop**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/services/layer-server.ts:93](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)›): *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

*Defined in [cs-map/src/services/layer-server.ts:22](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)› |

**Returns:** *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

___

### `Private` removeExistingLayers

▸ **removeExistingLayers**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/services/layer-server.ts:78](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/services/layer-server.ts#L78)*

remove previously added layers

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*
