# Class: ArangoDBSource

## Hierarchy

* **ArangoDBSource**

## Implements

* any
* any

## Properties

###  id

• **id**: *string* = "arangodb"

*Defined in [cs-layer-server/src/plugins/sources/arangodb.ts:14](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/arangodb.ts#L14)*

___

###  source

• **source**: *string* = "arangodb"

*Defined in [cs-layer-server/src/plugins/sources/arangodb.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/arangodb.ts#L15)*

## Methods

###  getInstance

▸ **getInstance**(): *[ArangoDBSource](_cs_layer_server_src_plugins_sources_arangodb_.arangodbsource.md)*

*Defined in [cs-layer-server/src/plugins/sources/arangodb.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/arangodb.ts#L17)*

**Returns:** *[ArangoDBSource](_cs_layer_server_src_plugins_sources_arangodb_.arangodbsource.md)*

___

###  initSource

▸ **initSource**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *boolean*

*Defined in [cs-layer-server/src/plugins/sources/arangodb.ts:82](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/arangodb.ts#L82)*

make sure geojson has been prepared, e.g. add ids to all features

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *boolean*

___

###  query

▸ **query**(`connection`: [Connection](_cs_layer_server_src_classes_source_plugin_.connection.md), `query`: string | any): *Promise‹[ILoadResult](../interfaces/_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

*Defined in [cs-layer-server/src/plugins/sources/arangodb.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/arangodb.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`connection` | [Connection](_cs_layer_server_src_classes_source_plugin_.connection.md) |
`query` | string &#124; any |

**Returns:** *Promise‹[ILoadResult](../interfaces/_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

___

###  save

▸ **save**(`file`: string, `source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-layer-server/src/plugins/sources/arangodb.ts:92](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/arangodb.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *void*
