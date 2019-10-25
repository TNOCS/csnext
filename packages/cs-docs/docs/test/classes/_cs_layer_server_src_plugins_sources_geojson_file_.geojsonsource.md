# Class: GeojsonSource

## Hierarchy

* **GeojsonSource**

## Implements

* any
* any

## Properties

###  fileExtensions

• **fileExtensions**: *string[]* =  ['.json', '.geojson']

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:30](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L30)*

___

###  id

• **id**: *string* = "json"

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:29](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L29)*

___

###  source

• **source**: *string* = "geojson"

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:31](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L31)*

## Methods

###  createEmpty

▸ **createEmpty**(`folder`: string, `def`: [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *Promise‹object›*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:108](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`folder` | string |
`def` | [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *Promise‹object›*

___

###  createMeta

▸ **createMeta**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *Promise‹[LayerMeta](_cs_layer_server_src_classes_layer_meta_.layermeta.md)›*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:139](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *Promise‹[LayerMeta](_cs_layer_server_src_classes_layer_meta_.layermeta.md)›*

___

###  determinePropertyType

▸ **determinePropertyType**(`val`: any): *string*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:80](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | any |

**Returns:** *string*

___

###  getInstance

▸ **getInstance**(): *[GeojsonSource](_cs_layer_server_src_plugins_sources_geojson_file_.geojsonsource.md)*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:33](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L33)*

**Returns:** *[GeojsonSource](_cs_layer_server_src_plugins_sources_geojson_file_.geojsonsource.md)*

___

###  import

▸ **import**(`file`: string): *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:296](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L296)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |

**Returns:** *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

___

###  initFeature

▸ **initFeature**(`feature`: Feature): *boolean*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:279](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L279)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature |

**Returns:** *boolean*

___

###  initSource

▸ **initSource**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *boolean*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:266](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L266)*

make sure geojson has been prepared, e.g. add ids to all features

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *boolean*

___

###  load

▸ **load**(`file`: string, `meta?`: string): *Promise‹[ILoadResult](../interfaces/_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:37](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |
`meta?` | string |

**Returns:** *Promise‹[ILoadResult](../interfaces/_cs_layer_server_src_classes_source_plugin_.iloadresult.md)›*

___

###  saveMeta

▸ **saveMeta**(`def`: [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *void*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:246](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *void*

___

###  saveSource

▸ **saveSource**(`file`: string, `source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-layer-server/src/plugins/sources/geojson-file.ts:309](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/geojson-file.ts#L309)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *void*
