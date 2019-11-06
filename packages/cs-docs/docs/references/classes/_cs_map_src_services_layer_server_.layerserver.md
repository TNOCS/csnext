# Class: LayerServer

## Hierarchy

* **LayerServer**

## Implements

* any
* any

## Constructors

###  constructor

\+ **new LayerServer**(`init?`: Partial‹[LayerServer](_cs_map_src_services_layer_server_.layerserver.md)›): *[LayerServer](_cs_map_src_services_layer_server_.layerserver.md)*

*Defined in [cs-map/src/services/layer-server.ts:30](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[LayerServer](_cs_map_src_services_layer_server_.layerserver.md)› |

**Returns:** *[LayerServer](_cs_map_src_services_layer_server_.layerserver.md)*

## Properties

###  id

• **id**: *string*

*Defined in [cs-map/src/services/layer-server.ts:20](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L20)*

___

###  layers

• **layers**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]* =  []

*Defined in [cs-map/src/services/layer-server.ts:25](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L25)*

___

### `Optional` options

• **options**? : *[LayerServerOptions](_cs_map_src_services_layer_server_.layerserveroptions.md)*

*Defined in [cs-map/src/services/layer-server.ts:23](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L23)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/services/layer-server.ts:21](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L21)*

___

###  type

• **type**: *string* = "layer-server"

*Defined in [cs-map/src/services/layer-server.ts:24](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L24)*

## Methods

###  Start

▸ **Start**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹void›*

*Defined in [cs-map/src/services/layer-server.ts:36](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹void›*

___

###  Stop

▸ **Stop**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/services/layer-server.ts:98](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)›): *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

*Defined in [cs-map/src/services/layer-server.ts:27](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)› |

**Returns:** *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)*

___

### `Private` removeExistingLayers

▸ **removeExistingLayers**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/services/layer-server.ts:83](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-map/src/services/layer-server.ts#L83)*

remove previously added layers

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*
