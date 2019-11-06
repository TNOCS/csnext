# Interface: IMapLayer

## Hierarchy

* any

  ↳ **IMapLayer**

## Properties

### `Optional` _events

• **_events**? : *[MessageBusService](../classes/_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:24](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L24)*

___

### `Optional` _featureEventHandle

• **_featureEventHandle**? : *[MessageBusHandle](../classes/_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:32](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L32)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/classes/imap-layer.ts:25](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L25)*

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:14](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L14)*

___

### `Optional` _service

• **_service**? : *[ILayerService](_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:29](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L29)*

associated service

___

### `Optional` _showMenu

• **_showMenu**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:30](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L30)*

___

### `Optional` _showMore

• **_showMore**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:31](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L31)*

___

### `Optional` _source

• **_source**? : *[LayerSource](../classes/_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:13](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L13)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:26](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L26)*

## Methods

###  addLayer

▸ **addLayer**(`map`: [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md)): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:15](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *any*

___

###  getBounds

▸ **getBounds**(): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:12](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L12)*

**Returns:** *any*

___

### `Optional` getLayerActions

▸ **getLayerActions**(): *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [cs-map/src/classes/imap-layer.ts:18](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L18)*

**Returns:** *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:16](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *any*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:20](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md)): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:19](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *any*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](../classes/_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](../classes/_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:23](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](../classes/_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](../classes/_cs_map_src_classes_feature_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *any*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:17](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *any*

___

###  updateLayer

▸ **updateLayer**(): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:21](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L21)*

**Returns:** *any*

___

###  updateLegends

▸ **updateLegends**(): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:22](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/classes/imap-layer.ts#L22)*

**Returns:** *any*
