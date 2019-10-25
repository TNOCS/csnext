# Class: LayerController

## Hierarchy

* **LayerController**

## Constructors

###  constructor

\+ **new LayerController**(`layerService`: [LayerService](_cs_layer_server_src_layers_layers_service_.layerservice.md)): *[LayerController](_cs_layer_server_src_layers_layers_controller_.layercontroller.md)*

*Defined in [cs-layer-server/src/layers/layers.controller.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.controller.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`layerService` | [LayerService](_cs_layer_server_src_layers_layers_service_.layerservice.md) |

**Returns:** *[LayerController](_cs_layer_server_src_layers_layers_controller_.layercontroller.md)*

## Methods

###  getLayer

▸ **getLayer**(`id`: string, `source?`: boolean): *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) | undefined›*

*Defined in [cs-layer-server/src/layers/layers.controller.ts:50](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.controller.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`source?` | boolean |

**Returns:** *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) | undefined›*

___

###  layers

▸ **layers**(): *[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)[]*

*Defined in [cs-layer-server/src/layers/layers.controller.ts:28](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.controller.ts#L28)*

**Returns:** *[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)[]*

___

###  triggerLayer

▸ **triggerLayer**(`id`: string, `body`: [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) | undefined›*

*Defined in [cs-layer-server/src/layers/layers.controller.ts:78](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.controller.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`body` | [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) | undefined›*

___

###  triggerRefresh

▸ **triggerRefresh**(`id`: string): *Promise‹Boolean›*

*Defined in [cs-layer-server/src/layers/layers.controller.ts:97](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.controller.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹Boolean›*
