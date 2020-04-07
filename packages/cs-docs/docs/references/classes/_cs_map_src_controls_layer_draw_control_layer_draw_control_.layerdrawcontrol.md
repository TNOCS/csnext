# Class: LayerDrawControl

## Hierarchy

* any

  ↳ **LayerDrawControl**

## Properties

###  activeType

• **activeType**: *any*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:18](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L18)*

___

### `Optional` busHandle

• **busHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L19)*

___

### `Optional` layer

• **layer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)* =  {} as IMapLayer

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L20)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:21](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L21)*

___

### `Optional` map

• **map**? : *Map*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:22](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L22)*

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:23](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L23)*

___

### `Optional` types

• **types**? : *object*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:24](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L24)*

#### Type declaration:

* \[ **key**: *string*\]: [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md)

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:25](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L25)*

## Methods

###  addIcon

▸ **addIcon**(`type`: string): *void*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:31](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:49](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L49)*

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:139](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L139)*

**Returns:** *void*
