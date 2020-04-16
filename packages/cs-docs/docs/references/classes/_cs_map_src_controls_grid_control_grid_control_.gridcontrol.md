# Class: GridControl

## Hierarchy

* **GridControl**

## Implements

* IControl

## Constructors

###  constructor

\+ **new GridControl**(`mapControl`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *[GridControl](_cs_map_src_controls_grid_control_grid_control_.gridcontrol.md)*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`mapControl` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *[GridControl](_cs_map_src_controls_grid_control_grid_control_.gridcontrol.md)*

## Properties

### `Private` controlContainer

• **controlContainer**: *HTMLElement | undefined*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L19)*

___

### `Private` gridEnabled

• **gridEnabled**: *boolean* = true

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L20)*

___

###  layer

• **layer**: *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:16](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L16)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:17](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L17)*

___

###  mapControl

• **mapControl**: *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:26](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L26)*

___

### `Static` `Private` DEFAULT_STYLE

▪ **DEFAULT_STYLE**: *"LatLon"* = "LatLon"

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:14](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L14)*

___

### `Static` DEFAULT_STYLES

▪ **DEFAULT_STYLES**: *object[]* =  [
        { id: 'LatLon', title: 'Lat / Lon' }
    ]

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:9](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L9)*

## Methods

###  getDefaultPosition

▸ **getDefaultPosition**(): *string*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:36](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L36)*

**Returns:** *string*

___

###  onAdd

▸ **onAdd**(`map`: MapboxMap): *HTMLElement*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:41](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | MapboxMap |

**Returns:** *HTMLElement*

___

###  onRemove

▸ **onRemove**(): *void*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:92](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L92)*

**Returns:** *void*

___

###  toggleGrid

▸ **toggleGrid**(): *void*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:98](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/controls/grid-control/grid-control.ts#L98)*

**Returns:** *void*
