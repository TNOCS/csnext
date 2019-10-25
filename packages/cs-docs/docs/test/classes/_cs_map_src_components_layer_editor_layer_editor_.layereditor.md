# Class: LayerEditor

## Hierarchy

* any

  ↳ **LayerEditor**

## Properties

###  activeType

• **activeType**: *any*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:20](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L20)*

___

### `Optional` busHandle

• **busHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L17)*

___

### `Optional` layer

• **layer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)* =  {} as IMapLayer

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:18](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L18)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:16](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L16)*

___

### `Optional` map

• **map**? : *Map*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:22](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L22)*

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:19](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L19)*

___

### `Optional` types

• **types**? : *object*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L21)*

#### Type declaration:

* \[ **key**: *string*\]: [FeatureType](_cs_layer_server_src_shared_feature_type_.featuretype.md)

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L15)*

## Methods

###  addIcon

▸ **addIcon**(`type`: string): *void*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:28](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:53](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L53)*

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Defined in [cs-map/src/components/layer-editor/layer-editor.ts:45](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/layer-editor/layer-editor.ts#L45)*

**Returns:** *void*
