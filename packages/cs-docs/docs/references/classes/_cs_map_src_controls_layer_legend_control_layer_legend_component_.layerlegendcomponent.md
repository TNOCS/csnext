# Class: LayerLegendComponent

## Hierarchy

* any

  ↳ **LayerLegendComponent**

## Properties

###  activeLayer

• **activeLayer**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | any*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:24](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L24)*

___

###  activeLegend

• **activeLegend**: *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md) | any*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:25](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L25)*

___

###  activeType

• **activeType**: *any*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:20](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L20)*

___

### `Optional` busHandle

• **busHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:18](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L18)*

___

###  layer

• **layer**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | undefined*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:19](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L19)*

___

###  layers

• **layers**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]* =  []

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:23](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L23)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:17](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L17)*

___

### `Optional` map

• **map**? : *Map*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:22](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L22)*

___

### `Optional` types

• **types**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:21](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L21)*

___

###  value2

• **value2**: *number[]* =  [30, 60]

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:26](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L26)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:16](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L16)*

## Methods

### `Private` applyFilter

▸ **applyFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:81](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:51](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L51)*

**Returns:** *void*

___

### `Private` getStopColor

▸ **getStopColor**(`stop`: any[], `legend`: any): *object*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:55](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`stop` | any[] |
`legend` | any |

**Returns:** *object*

* **background**: *any* =  stop[1]

* **height**: *string* = "20px"

* **width**: *string* = "20px"

___

###  initFilter

▸ **initFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `legend`: [LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)): *void*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:43](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`legend` | [LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md) |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:33](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L33)*

**Returns:** *void*

___

###  resetFilter

▸ **resetFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:47](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  selectLayer

▸ **selectLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:28](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` updateFilterList

▸ **updateFilterList**(): *void*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L59)*

**Returns:** *void*

___

### `Private` updateLegendList

▸ **updateLegendList**(): *void*

*Defined in [packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts:64](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L64)*

**Returns:** *void*
