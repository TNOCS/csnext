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

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:27](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

## Properties

### `Private` `Optional` _currentTime

• **_currentTime**? : *number*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:20](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L20)*

___

### `Private` `Optional` _interpolatedFeature

• **_interpolatedFeature**? : *Feature‹Point›*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:22](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L22)*

___

### `Private` `Optional` _layer

• **_layer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:18](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L18)*

___

### `Private` `Optional` _originalFeatures

• **_originalFeatures**? : *Feature‹Point›[]* =  []

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:21](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L21)*

___

### `Private` `Optional` _timeHandle

• **_timeHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:19](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L19)*

___

###  id

• **id**: *string* = "time-interpolation"

*Implementation of [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md).[id](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md#id)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:13](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L13)*

___

### `Optional` showFeatureAfterEnd

• **showFeatureAfterEnd**? : *boolean*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[showFeatureAfterEnd](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-showfeatureafterend)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:17](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L17)*

___

### `Optional` showFeatureBeforeStart

• **showFeatureBeforeStart**? : *boolean*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[showFeatureBeforeStart](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-showfeaturebeforestart)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:16](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L16)*

___

### `Optional` timeProperty

• **timeProperty**? : *string*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[timeProperty](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-timeproperty)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:15](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L15)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:14](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L14)*

## Methods

### `Private` findInterpolatedFeatureForCurrentTime

▸ **findInterpolatedFeatureForCurrentTime**(): *boolean*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:102](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L102)*

**Returns:** *boolean*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)›): *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:24](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

___

### `Private` getInterpolatedFeature

▸ **getInterpolatedFeature**(`featureBeforeNow`: Feature‹Point›, `featureAfterNow`: Feature‹Point›): *Feature‹Point›*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:128](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`featureBeforeNow` | Feature‹Point› |
`featureAfterNow` | Feature‹Point› |

**Returns:** *Feature‹Point›*

___

### `Private` restoreOriginalFeatures

▸ **restoreOriginalFeatures**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:57](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L57)*

**Returns:** *void*

___

###  start

▸ **start**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:33](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:41](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L41)*

**Returns:** *void*

___

### `Private` storeOriginalFeatures

▸ **storeOriginalFeatures**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:63](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L63)*

**Returns:** *void*

___

### `Private` subscribeToTimeEvents

▸ **subscribeToTimeEvents**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:46](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L46)*

**Returns:** *void*

___

### `Private` updateInterpolation

▸ **updateInterpolation**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:78](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-map/src/extensions/time-interpolation-extension.ts#L78)*

**Returns:** *void*
