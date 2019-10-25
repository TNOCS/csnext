# Class: SourceController

## Hierarchy

* **SourceController**

## Constructors

###  constructor

\+ **new SourceController**(`layerService`: [LayerService](_cs_layer_server_src_layers_layers_service_.layerservice.md)): *[SourceController](_cs_layer_server_src_sources_sources_controller_.sourcecontroller.md)*

*Defined in [cs-layer-server/src/sources/sources.controller.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/sources/sources.controller.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`layerService` | [LayerService](_cs_layer_server_src_layers_layers_service_.layerservice.md) |

**Returns:** *[SourceController](_cs_layer_server_src_sources_sources_controller_.sourcecontroller.md)*

## Methods

###  getLayerSource

▸ **getLayerSource**(`id`: string): *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

*Defined in [cs-layer-server/src/sources/sources.controller.ts:32](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/sources/sources.controller.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

___

###  putLayerSource

▸ **putLayerSource**(`id`: string, `body`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *Promise‹boolean›*

*Defined in [cs-layer-server/src/sources/sources.controller.ts:39](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/sources/sources.controller.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`body` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *Promise‹boolean›*
