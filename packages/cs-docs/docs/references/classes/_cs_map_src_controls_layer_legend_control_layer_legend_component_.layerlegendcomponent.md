# Class: LayerLegendComponent

## Hierarchy

* any

  ↳ **LayerLegendComponent**

## Properties

###  activeLayer

• **activeLayer**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | any*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:25](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L25)*

___

###  activeLegend

• **activeLegend**: *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md) | any*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:26](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L26)*

___

### `Optional` activeType

• **activeType**? : *any*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:21](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L21)*

___

### `Optional` busHandle

• **busHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L19)*

___

###  layer

• **layer**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | undefined*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L20)*

___

###  layers

• **layers**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]* =  []

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:24](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L24)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:18](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L18)*

___

### `Optional` map

• **map**? : *Map*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:23](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L23)*

___

### `Optional` types

• **types**? : *[FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md)*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:22](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L22)*

___

###  value2

• **value2**: *number[]* =  [30, 60]

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:27](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L27)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:17](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L17)*

## Methods

### `Private` applyFilter

▸ **applyFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:91](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:53](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L53)*

**Returns:** *void*

___

### `Private` getStopColor

▸ **getStopColor**(`stop`: any[], `legend`: any): *object*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:61](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L61)*

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

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:45](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`legend` | [LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md) |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:34](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L34)*

**Returns:** *void*

___

### `Private` removeFilter

▸ **removeFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:70](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

### `Private` removeLegend

▸ **removeLegend**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `legend`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md)): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:55](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`legend` | [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) |

**Returns:** *void*

___

###  resetFilter

▸ **resetFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:49](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  selectLayer

▸ **selectLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:29](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` updateFilterList

▸ **updateFilterList**(): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:65](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L65)*

**Returns:** *void*

___

### `Private` updateLegendList

▸ **updateLegendList**(): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:74](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L74)*

**Returns:** *void*
