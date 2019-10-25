# Interface: ISourcePluginType

## Hierarchy

* **ISourcePluginType**

## Properties

### `Optional` fileExtensions

• **fileExtensions**? : *string[]*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:44](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L44)*

list of supported file extensions

___

### `Optional` getInstance

• **getInstance**? : *function*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:50](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L50)*

method to invoke actual plugin instance

#### Type declaration:

▸ (`init?`: Partial‹any›): *[ISourcePlugin](_cs_layer_server_src_classes_source_plugin_.isourceplugin.md)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹any› |

___

###  id

• **id**: *string*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:40](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L40)*

extension id

___

### `Optional` options

• **options**? : *[ISourcePluginOptions](_cs_layer_server_src_classes_source_plugin_.isourcepluginoptions.md)*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:42](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L42)*

extension options

___

### `Optional` source

• **source**? : *string*

*Defined in [cs-layer-server/src/classes/source-plugin.ts:47](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/source-plugin.ts#L47)*

supported loading source type (e.g. geojson)
