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

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:28](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)*

## Properties

### `Private` `Optional` _currentTime

• **_currentTime**? : *number*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:24](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L24)*

___

### `Private` `Optional` _interpolatedFeature

• **_interpolatedFeature**? : *Feature‹Point›*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:25](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L25)*

___

### `Private` `Optional` _layer

• **_layer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:26](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L26)*

___

### `Private` `Optional` _originalFeatures

• **_originalFeatures**? : *Array‹Feature‹Point››* =  []

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:27](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L27)*

___

### `Private` `Optional` _timeHandle

• **_timeHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:28](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L28)*

___

###  id

• **id**: *string* = "time-interpolation"

*Implementation of [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md).[id](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md#id)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L19)*

___

### `Optional` showFeatureAfterEnd

• **showFeatureAfterEnd**? : *boolean*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[showFeatureAfterEnd](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-showfeatureafterend)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L20)*

___

### `Optional` showFeatureBeforeStart

• **showFeatureBeforeStart**? : *boolean*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[showFeatureBeforeStart](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-showfeaturebeforestart)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:21](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L21)*

___

### `Optional` timeProperty

• **timeProperty**? : *string*

*Implementation of [ITimeInterpolationExtensionOptions](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md).[timeProperty](../interfaces/_cs_map_src_extensions_time_interpolation_extension_.itimeinterpolationextensionoptions.md#optional-timeproperty)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:22](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L22)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:23](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L23)*

## Methods

### `Private` findInterpolatedFeatureForCurrentTime

▸ **findInterpolatedFeatureForCurrentTime**(): *boolean*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:65](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L65)*

**Returns:** *boolean*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)›): *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)‹›*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:43](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[TimeInterpolationExtension](_cs_map_src_extensions_time_interpolation_extension_.timeinterpolationextension.md)‹›*

___

### `Private` getInterpolatedFeature

▸ **getInterpolatedFeature**(`featureBeforeNow`: Feature‹Point›, `featureAfterNow`: Feature‹Point›): *Feature‹Point›*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:91](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`featureBeforeNow` | Feature‹Point› |
`featureAfterNow` | Feature‹Point› |

**Returns:** *Feature‹Point›*

___

### `Private` restoreOriginalFeatures

▸ **restoreOriginalFeatures**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:104](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L104)*

**Returns:** *void*

___

###  start

▸ **start**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:48](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:56](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L56)*

**Returns:** *void*

___

### `Private` storeOriginalFeatures

▸ **storeOriginalFeatures**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:110](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L110)*

**Returns:** *void*

___

### `Private` subscribeToTimeEvents

▸ **subscribeToTimeEvents**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:125](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L125)*

**Returns:** *void*

___

### `Private` updateInterpolation

▸ **updateInterpolation**(): *void*

*Defined in [cs-map/src/extensions/time-interpolation-extension.ts:136](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/extensions/time-interpolation-extension.ts#L136)*

**Returns:** *void*
