# Class: FlexGrid

## Hierarchy

* any

  ↳ **FlexGrid**

## Properties

###  containers

• **containers**: *[IFlexGridContainer](../interfaces/_cs_client_src_layout_flex_grid_flex_grid_options_.iflexgridcontainer.md)[]* =  []

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:25](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L25)*

___

###  dashboard

• **dashboard**: *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:24](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L24)*

## Accessors

###  backgroundWidgets

• **get backgroundWidgets**(): *any*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:36](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L36)*

**Returns:** *any*

___

###  options

• **get options**(): *[FlexGridOptions](_cs_client_src_layout_flex_grid_flex_grid_options_.flexgridoptions.md)*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:26](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L26)*

**Returns:** *[FlexGridOptions](_cs_client_src_layout_flex_grid_flex_grid_options_.flexgridoptions.md)*

## Methods

###  containerStyles

▸ **containerStyles**(`container`: [IFlexGridContainer](../interfaces/_cs_client_src_layout_flex_grid_flex_grid_options_.iflexgridcontainer.md)): *any*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:94](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`container` | [IFlexGridContainer](../interfaces/_cs_client_src_layout_flex_grid_flex_grid_options_.iflexgridcontainer.md) |

**Returns:** *any*

___

###  created

▸ **created**(): *void*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:129](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L129)*

**Returns:** *void*

___

###  flexClasses

▸ **flexClasses**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *"md2 sm4 xs6" | "md4 sm4 xs6" | "md6 sm6 xs12" | "md4 sm6 xs12" | "autowidth" | "md2 sm6 xs12"*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:103](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *"md2 sm4 xs6" | "md4 sm4 xs6" | "md6 sm6 xs12" | "md4 sm6 xs12" | "autowidth" | "md2 sm6 xs12"*

___

###  flexStyles

▸ **flexStyles**(): *object*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:125](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L125)*

**Returns:** *object*

* **padding**: *string* = "5px"

___

###  getContainer

▸ **getContainer**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *[IFlexGridContainer](../interfaces/_cs_client_src_layout_flex_grid_flex_grid_options_.iflexgridcontainer.md)*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:45](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *[IFlexGridContainer](../interfaces/_cs_client_src_layout_flex_grid_flex_grid_options_.iflexgridcontainer.md)*

___

###  updateContainers

▸ **updateContainers**(): *void*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:81](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L81)*

**Returns:** *void*

___

###  widgetsUpdated

▸ **widgetsUpdated**(`n`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)[]): *void*

*Defined in [cs-client/src/layout/flex-grid/flex-grid.ts:31](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/layout/flex-grid/flex-grid.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)[] |

**Returns:** *void*
