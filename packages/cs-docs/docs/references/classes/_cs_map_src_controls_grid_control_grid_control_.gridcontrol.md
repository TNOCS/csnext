# Class: GridControl

## Hierarchy

* **GridControl**

## Implements

* IControl

## Constructors

###  constructor

\+ **new GridControl**(`mapControl`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *[GridControl](_cs_map_src_controls_grid_control_grid_control_.gridcontrol.md)*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:16](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`mapControl` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *[GridControl](_cs_map_src_controls_grid_control_grid_control_.gridcontrol.md)*

## Properties

### `Private` controlContainer

• **controlContainer**: *HTMLElement | undefined*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:16](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L16)*

___

### `Private` gridEnabled

• **gridEnabled**: *boolean* = true

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:14](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L14)*

___

###  layer

• **layer**: *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:13](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L13)*

___

###  manager

• **manager**: *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:12](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L12)*

___

###  mapControl

• **mapControl**: *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:19](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L19)*

___

### `Static` `Private` DEFAULT_STYLE

▪ **DEFAULT_STYLE**: *"LatLon"* = "LatLon"

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:8](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L8)*

___

### `Static` DEFAULT_STYLES

▪ **DEFAULT_STYLES**: *object[]* =  [
        { id: "LatLon", title: "Lat / Lon" }
    ]

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:9](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L9)*

## Methods

###  getDefaultPosition

▸ **getDefaultPosition**(): *string*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:26](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L26)*

**Returns:** *string*

___

###  onAdd

▸ **onAdd**(`map`: MapboxMap): *HTMLElement*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:31](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | MapboxMap |

**Returns:** *HTMLElement*

___

###  onRemove

▸ **onRemove**(): *void*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:83](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L83)*

**Returns:** *void*

___

###  toggleGrid

▸ **toggleGrid**(): *void*

*Defined in [cs-map/src/controls/grid-control/grid-control.ts:89](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/controls/grid-control/grid-control.ts#L89)*

**Returns:** *void*
