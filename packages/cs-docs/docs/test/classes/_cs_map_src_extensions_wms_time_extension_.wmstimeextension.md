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

*Defined in [cs-map/src/extensions/wms-time-extension.ts:30](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/wms-time-extension.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

## Properties

### `Optional` historyDelayMinutes

• **historyDelayMinutes**? : *number*

*Implementation of [IWmsTimeExtensionOptions](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md).[historyDelayMinutes](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md#optional-historydelayminutes)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:21](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/wms-time-extension.ts#L21)*

___

###  id

• **id**: *string* = "wms-time"

*Implementation of [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md).[id](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md#id)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:18](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/wms-time-extension.ts#L18)*

___

### `Optional` timeProperty

• **timeProperty**? : *string*

*Implementation of [IWmsTimeExtensionOptions](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md).[timeProperty](../interfaces/_cs_map_src_extensions_wms_time_extension_.iwmstimeextensionoptions.md#optional-timeproperty)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:20](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/wms-time-extension.ts#L20)*

___

### `Optional` title

• **title**? : *string | undefined*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:19](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/wms-time-extension.ts#L19)*

## Methods

###  getInstance

▸ **getInstance**(`init?`: Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)›): *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:27](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/wms-time-extension.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)› |

**Returns:** *[WmsTimeExtension](_cs_map_src_extensions_wms_time_extension_.wmstimeextension.md)*

___

###  start

▸ **start**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:36](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/wms-time-extension.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Implementation of [ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)*

*Defined in [cs-map/src/extensions/wms-time-extension.ts:44](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/extensions/wms-time-extension.ts#L44)*

**Returns:** *void*
