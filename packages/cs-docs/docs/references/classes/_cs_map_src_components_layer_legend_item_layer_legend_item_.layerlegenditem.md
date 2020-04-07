# Class: LayerLegendItem

## Hierarchy

* any

  ↳ **LayerLegendItem**

## Properties

### `Optional` layer

• **layer**? : *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:17

___

### `Optional` legend

• **legend**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:15

___

### `Optional` source

• **source**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:16

## Accessors

###  filter

• **get filter**(): *[LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) | undefined*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:19

**Returns:** *[LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) | undefined*

___

###  rules

• **get rules**(): *(Anonymous function) | (Anonymous function) | (Anonymous function)[]*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:26

**Returns:** *(Anonymous function) | (Anonymous function) | (Anonymous function)[]*

___

###  step

• **get step**(): *string*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:32

**Returns:** *string*

## Methods

### `Private` applyFilter

▸ **applyFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:56

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

### `Private` getStopColor

▸ **getStopColor**(`stop`: any[], `legend`: any): *object*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:65

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

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:48

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`legend` | [LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md) |

**Returns:** *void*

___

### `Private` removeFilter

▸ **removeFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:61

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

###  resetFilter

▸ **resetFilter**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

Defined in cs-map/src/components/layer-legend-item/layer-legend-item.ts:52

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*
