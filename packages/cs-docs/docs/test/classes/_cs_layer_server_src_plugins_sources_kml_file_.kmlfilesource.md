# Class: KmlFileSource

## Hierarchy

* **KmlFileSource**

## Implements

* any
* any

## Properties

###  fileExtensions

• **fileExtensions**: *string[]* =  [".kml"]

*Defined in [cs-layer-server/src/plugins/sources/kml-file.ts:16](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/kml-file.ts#L16)*

___

###  id

• **id**: *string* = "kml"

*Defined in [cs-layer-server/src/plugins/sources/kml-file.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/kml-file.ts#L15)*

## Methods

###  getInstance

▸ **getInstance**(): *[KmlFileSource](_cs_layer_server_src_plugins_sources_kml_file_.kmlfilesource.md)*

*Defined in [cs-layer-server/src/plugins/sources/kml-file.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/kml-file.ts#L21)*

**Returns:** *[KmlFileSource](_cs_layer_server_src_plugins_sources_kml_file_.kmlfilesource.md)*

___

###  import

▸ **import**(`file`: string): *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

*Defined in [cs-layer-server/src/plugins/sources/kml-file.ts:25](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/kml-file.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |

**Returns:** *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

___

###  init

▸ **init**(): *Promise‹boolean›*

*Defined in [cs-layer-server/src/plugins/sources/kml-file.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/plugins/sources/kml-file.ts#L17)*

**Returns:** *Promise‹boolean›*
