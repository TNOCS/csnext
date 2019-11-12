# Class: WmsTimeExtension

## Hierarchy

* **WmsTimeExtension**

## Implements

* [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)
* [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)
* [IWmsTimeExtensionOptions](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md)

## Constructors

###  constructor

\+ **new WmsTimeExtension**(`init?`: Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)›): *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:30](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

## Properties

### `Private` `Optional` _layer

• **_layer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:22](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L22)*

___

### `Private` `Optional` _originalUrl

• **_originalUrl**? : *string*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:25](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L25)*

___

### `Private` _selectedTime

• **_selectedTime**: *Date* =  new Date()

*Defined in [cs-map/src/extensions/wms-time-extension.ts:23](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L23)*

___

### `Private` `Optional` _timeHandle

• **_timeHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:24](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L24)*

___

### `Optional` historyDelayMinutes

• **historyDelayMinutes**? : *number*

*Implementation of [IWmsTimeExtensionOptions](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md).[historyDelayMinutes](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md#optional-historydelayminutes)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:21](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L21)*

___

###  id

• **id**: *string* = "wms-time"

*Implementation of [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md).[id](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md#id)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:18](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L18)*

___

### `Optional` timeProperty

• **timeProperty**? : *string*

*Implementation of [IWmsTimeExtensionOptions](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md).[timeProperty](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md#optional-timeproperty)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:20](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L20)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:19](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L19)*

## Methods

### `Private` addSelectedTimeToUrl

▸ **addSelectedTimeToUrl**(): *void*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:55](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L55)*

**Returns:** *void*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)›): *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:27](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

___

### `Private` removeTimePropertyFromUrl

▸ **removeTimePropertyFromUrl**(): *void*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:67](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L67)*

**Returns:** *void*

___

### `Private` roundTimeToFiveMinutes

▸ **roundTimeToFiveMinutes**(): *string*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:72](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L72)*

**Returns:** *string*

___

###  start

▸ **start**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:36](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:44](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L44)*

**Returns:** *void*

___

### `Private` subscribeToTimeEvents

▸ **subscribeToTimeEvents**(): *void*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:81](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L81)*

**Returns:** *void*

___

### `Private` updateTime

▸ **updateTime**(): *void*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:48](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/extensions/wms-time-extension.ts#L48)*

**Returns:** *void*
