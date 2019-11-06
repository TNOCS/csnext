# Class: LayerLegendComponent

## Hierarchy

* any

  ↳ **LayerLegendComponent**

## Properties

###  activeLayer

• **activeLayer**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | any*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:23](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L23)*

___

###  activeLegend

• **activeLegend**: *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md) | any*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:24](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L24)*

___

###  activeType

• **activeType**: *any*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:19](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L19)*

___

### `Optional` busHandle

• **busHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:16](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L16)*

___

###  layer

• **layer**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | undefined*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:17](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L17)*

___

###  layers

• **layers**: *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]* =  []

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:22](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L22)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:15](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L15)*

___

### `Optional` map

• **map**? : *Map*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:21](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L21)*

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:18](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L18)*

___

### `Optional` types

• **types**? : *object*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:20](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L20)*

#### Type declaration:

* \[ **key**: *string*\]: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:14](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L14)*

## Methods

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:31](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L31)*

**Returns:** *void*

___

###  selectLayer

▸ **selectLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:26](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` updateLegendList

▸ **updateLegendList**(): *void*

*Defined in [cs-map/src/controls/layer-legend-control/layer-legend-component.ts:42](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/controls/layer-legend-control/layer-legend-component.ts#L42)*

**Returns:** *void*
