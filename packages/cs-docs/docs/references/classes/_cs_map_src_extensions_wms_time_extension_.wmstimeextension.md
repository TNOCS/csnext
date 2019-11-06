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

*Defined in [cs-map/src/extensions/wms-time-extension.ts:30](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L30)*
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

## Properties

### `Private` `Optional` _layer

• **_layer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:22](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L22)*

___

*Defined in [cs-map/src/extensions/wms-time-extension.ts:22](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L22)*

___

### `Private` _selectedTime

• **_selectedTime**: *Date* =  new Date()

*Defined in [cs-map/src/extensions/wms-time-extension.ts:25](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L25)*

• **_timeHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:24](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L24)*

___

*Defined in [cs-map/src/extensions/wms-time-extension.ts:23](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L23)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:21](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L21)*

___

###  id

*Defined in [cs-map/src/extensions/wms-time-extension.ts:24](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L24)*

___

### `Optional` timeProperty

• **timeProperty**? : *string*

*Implementation of [IWmsTimeExtensionOptions](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md).[timeProperty](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md#optional-timeproperty)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:21](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L21)*

• **title**? : *string | undefined*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:19](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L19)*

## Methods

### `Private` addSelectedTimeToUrl

*Defined in [cs-map/src/extensions/wms-time-extension.ts:18](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L18)*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)›): *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:27](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L27)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:20](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L20)*

**Returns:** *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

___

### `Private` removeTimePropertyFromUrl

*Defined in [cs-map/src/extensions/wms-time-extension.ts:19](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L19)*

___

### `Private` roundTimeToFiveMinutes

▸ **roundTimeToFiveMinutes**(): *string*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:55](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L55)*

###  start

▸ **start**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:36](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L36)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:27](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L27)*

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L44)*

**Returns:** *void*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:67](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L67)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L81)*

**Returns:** *void*

___

### `Private` updateTime

*Defined in [cs-map/src/extensions/wms-time-extension.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L72)*
*Defined in [cs-map/src/extensions/wms-time-extension.ts:36](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L36)*
*Defined in [cs-map/src/extensions/wms-time-extension.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L44)*
*Defined in [cs-map/src/extensions/wms-time-extension.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L81)*
*Defined in [cs-map/src/extensions/wms-time-extension.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/extensions/wms-time-extension.ts#L48)*
