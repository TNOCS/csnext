# Interface: ILayerExtension

## Hierarchy

* [ILayerExtensionType](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)

  ↳ **ILayerExtension**

## Implemented by

* [TimeInterpolationExtension](../classes/_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)
* [WmsTimeExtension](../classes/_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)

## Properties

### `Optional` getInstance

• **getInstance**? : *function*

*Inherited from [ILayerExtensionType](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md).[getInstance](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md#optional-getinstance)*

*Defined in [cs-map/src/classes/ilayer-extension.ts:12](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/classes/ilayer-extension.ts#L12)*

#### Type declaration:

▸ (`init?`: Partial‹any›): *[ILayerExtension](_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹any› |

___

###  id

• **id**: *string*

*Inherited from [ILayerExtensionType](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md).[id](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md#id)*

*Defined in [cs-map/src/classes/ilayer-extension.ts:9](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/classes/ilayer-extension.ts#L9)*

extension id

___

### `Optional` options

• **options**? : *[ILayerExtensionOptions](_cs_map_src_classes_ilayer_extension_.ilayerextensionoptions.md)*

*Inherited from [ILayerExtensionType](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md).[options](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md#optional-options)*

*Defined in [cs-map/src/classes/ilayer-extension.ts:11](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/classes/ilayer-extension.ts#L11)*

extension options

## Methods

###  start

▸ **start**(`layer`: [IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md)): *any*

*Defined in [cs-map/src/classes/ilayer-extension.ts:16](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/classes/ilayer-extension.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *any*

___

###  stop

▸ **stop**(): *any*

*Defined in [cs-map/src/classes/ilayer-extension.ts:17](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/classes/ilayer-extension.ts#L17)*

**Returns:** *any*
