# Class: TimeInterpolationExtension

## Hierarchy

* **TimeInterpolationExtension**

## Implements

* [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)
* [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)
* [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md)

## Constructors

###  constructor

\+ **new TimeInterpolationExtension**(`init?`: Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)›): *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:27](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

## Properties

###  id

• **id**: *string* = "time-interpolation"

*Implementation of [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md).[id](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md#id)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:13](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L13)*

___

### `Optional` showFeatureAfterEnd

• **showFeatureAfterEnd**? : *boolean*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[showFeatureAfterEnd](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-showfeatureafterend)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:17](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L17)*

___

### `Optional` showFeatureBeforeStart

• **showFeatureBeforeStart**? : *boolean*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[showFeatureBeforeStart](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-showfeaturebeforestart)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:16](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L16)*

___

### `Optional` timeProperty

• **timeProperty**? : *string*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[timeProperty](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-timeproperty)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:15](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L15)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:14](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L14)*

## Methods

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)›): *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:24](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

___

###  start

▸ **start**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:33](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:41](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/time-interpolation-extension.ts#L41)*

**Returns:** *void*
