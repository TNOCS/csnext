# Class: PostGisSource

## Hierarchy

* **PostGisSource**

## Implements

* any
* any

## Properties

###  id

• **id**: *string* = "postgis"

*Defined in [cs-layer-server/src/plugins/sources/postgis.ts:14](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/postgis.ts#L14)*

___

###  source

• **source**: *string* = "postgis"

*Defined in [cs-layer-server/src/plugins/sources/postgis.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/postgis.ts#L15)*

## Methods

###  getInstance

▸ **getInstance**(): *[PostGisSource](_cs_layer_server_src_plugins_sources_postgis_.postgissource.md)*

*Defined in [cs-layer-server/src/plugins/sources/postgis.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/postgis.ts#L17)*

**Returns:** *[PostGisSource](_cs_layer_server_src_plugins_sources_postgis_.postgissource.md)*

___

###  initSource

▸ **initSource**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *boolean*

*Defined in [cs-layer-server/src/plugins/sources/postgis.ts:61](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/postgis.ts#L61)*

make sure geojson has been prepared, e.g. add ids to all features

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *boolean*

___

###  query

▸ **query**(`connection`: [Connection](_cs_layer_server_src_classes_source_plugin_.connection.md), `query`: string): *Promise‹[ILoadResult](../interfaces/_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

*Defined in [cs-layer-server/src/plugins/sources/postgis.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/postgis.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`connection` | [Connection](_cs_layer_server_src_classes_source_plugin_.connection.md) |
`query` | string |

**Returns:** *Promise‹[ILoadResult](../interfaces/_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

___

###  save

▸ **save**(`file`: string, `source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-layer-server/src/plugins/sources/postgis.ts:71](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/postgis.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *void*
