# Interface: ISourcePlugin

plugin for starting/using different sources

## Hierarchy

* **ISourcePlugin**

## Properties

###  id

• **id**: *string*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:23](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L23)*

## Methods

### `Optional` createEmpty

▸ **createEmpty**(`folder`: string, `def`: [LayerDefinition](../classes/_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *Promise‹object›*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:29](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`folder` | string |
`def` | [LayerDefinition](../classes/_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *Promise‹object›*

___

### `Optional` import

▸ **import**(`file`: string): *Promise‹[LayerSource](../classes/_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:26](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L26)*

import function for converting different formats to geojson

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |

**Returns:** *Promise‹[LayerSource](../classes/_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

___

### `Optional` init

▸ **init**(): *Promise‹boolean›*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:24](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L24)*

**Returns:** *Promise‹boolean›*

___

### `Optional` load

▸ **load**(`file`: string, `meta?`: string): *Promise‹[ILoadResult](_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:27](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |
`meta?` | string |

**Returns:** *Promise‹[ILoadResult](_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

___

### `Optional` query

▸ **query**(`connection`: [Connection](../classes/_cs_layer_server_src_classes_source_plugin_.connection.md), `query`: string): *Promise‹[ILoadResult](_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:28](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`connection` | [Connection](../classes/_cs_layer_server_src_classes_source_plugin_.connection.md) |
`query` | string |

**Returns:** *Promise‹[ILoadResult](_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

___

### `Optional` saveMeta

▸ **saveMeta**(`def`: [LayerDefinition](../classes/_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *any*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:30](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [LayerDefinition](../classes/_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *any*
