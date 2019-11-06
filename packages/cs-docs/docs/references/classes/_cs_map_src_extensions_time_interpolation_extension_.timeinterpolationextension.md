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

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:27](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L27)*
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

## Properties

### `Private` `Optional` _currentTime

• **_currentTime**? : *number*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:20](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L20)*

___

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:20](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L20)*

___

### `Private` `Optional` _layer

• **_layer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:22](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L22)*

• **_originalFeatures**? : *Feature‹Point›[]* =  []

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:21](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L21)*

___

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:18](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L18)*

___

###  id

• **id**: *string* = "time-interpolation"

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:21](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L21)*

### `Optional` showFeatureAfterEnd

• **showFeatureAfterEnd**? : *boolean*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[showFeatureAfterEnd](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-showfeatureafterend)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:19](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L19)*

• **showFeatureBeforeStart**? : *boolean*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[showFeatureBeforeStart](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-showfeaturebeforestart)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:16](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L16)*

___

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:13](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L13)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:15](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L15)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:17](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L17)*

▸ **findInterpolatedFeatureForCurrentTime**(): *boolean*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:102](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L102)*

**Returns:** *boolean*

___

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:16](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:15](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L15)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:128](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:14](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L14)*
___

### `Private` restoreOriginalFeatures

▸ **restoreOriginalFeatures**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:57](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L57)*
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:102](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L102)*
###  start

▸ **start**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:33](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L33)*

**Parameters:**
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:24](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L24)*
**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:41](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L41)*

**Returns:** *void*

___
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:128](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L128)*
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:63](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L63)*

**Returns:** *void*

___

### `Private` subscribeToTimeEvents

▸ **subscribeToTimeEvents**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:46](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L46)*

**Returns:** *void*

___

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:57](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L57)*

**Returns:** *void*
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:33](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L33)*
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:41](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L41)*
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:63](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L63)*
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:46](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L46)*
*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/time-interpolation-extension.ts#L78)*
