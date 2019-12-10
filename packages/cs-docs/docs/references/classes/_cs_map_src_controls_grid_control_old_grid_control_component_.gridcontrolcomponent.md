# Class: GridControlComponent

## Hierarchy

* any

  ↳ **GridControlComponent**

## Properties

### `Optional` busHandle

• **busHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:18](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L18)*

___

###  gridEnabled

• **gridEnabled**: *boolean* = true

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:20](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L20)*

___

###  gridStyle

• **gridStyle**: *string* = "Lat/Lon"

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:21](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L21)*

___

###  gridStyles

• **gridStyles**: *string[]* =  ['Lat/Lon', 'MGRS']

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:22](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L22)*

___

###  layer

• **layer**: *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:17](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L17)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:16](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L16)*

___

### `Optional` map

• **map**? : *Map*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:19](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L19)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:15](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L15)*

## Methods

###  init

▸ **init**(): *void*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:37](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L37)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:24](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L24)*

**Returns:** *void*

___

###  selectGridStyle

▸ **selectGridStyle**(`style`: string): *void*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:160](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`style` | string |

**Returns:** *void*

___

###  toggleGrid

▸ **toggleGrid**(): *void*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:28](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L28)*

**Returns:** *void*

___

### `Private` updateGrid

▸ **updateGrid**(): *void*

*Defined in [packages/cs-map/src/controls/grid-control-old/grid-control-component.ts:164](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/controls/grid-control-old/grid-control-component.ts#L164)*

**Returns:** *void*
