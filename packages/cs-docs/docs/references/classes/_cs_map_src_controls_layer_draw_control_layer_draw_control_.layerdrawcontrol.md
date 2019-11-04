# Class: LayerDrawControl

## Hierarchy

* any

  ↳ **LayerDrawControl**

## Properties

###  activeType

• **activeType**: *any*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:20](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L20)*

___

### `Optional` busHandle

• **busHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:17](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L17)*

___

### `Optional` layer

• **layer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)* =  {} as IMapLayer

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:18](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L18)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:16](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L16)*

___

### `Optional` map

• **map**? : *Map*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:22](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L22)*

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:19](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L19)*

___

### `Optional` types

• **types**? : *object*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:21](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L21)*

#### Type declaration:

* \[ **key**: *string*\]: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:15](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L15)*

## Methods

###  addIcon

▸ **addIcon**(`type`: string): *void*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:28](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *void*

___

### `Private` hasLayer

▸ **hasLayer**(): *boolean*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:24](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L24)*

**Returns:** *boolean*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:53](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L53)*

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Defined in [cs-map/src/controls/layer-draw-control/layer-draw-control.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/layer-draw-control/layer-draw-control.ts#L45)*

**Returns:** *void*
