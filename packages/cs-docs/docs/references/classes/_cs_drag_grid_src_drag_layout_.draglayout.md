# Class: DragLayout

## Hierarchy

* any

  ↳ **DragLayout**

## Properties

###  dashboard

• **dashboard**: *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-drag-grid/src/drag-layout.ts:28](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L28)*

___

###  dragEnabled

• **dragEnabled**: *boolean* = false

*Defined in [cs-drag-grid/src/drag-layout.ts:42](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L42)*

___

### `Private` editSubscription

• **editSubscription**: *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:41](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L41)*

___

###  grid

• **grid**: *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:39](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L39)*

___

###  isMoving

• **isMoving**: *boolean* = false

*Defined in [cs-drag-grid/src/drag-layout.ts:43](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L43)*

___

###  items

• **items**: *string[]* =  []

*Defined in [cs-drag-grid/src/drag-layout.ts:40](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L40)*

___

###  layout

• **layout**: *any[]* =  []

*Defined in [cs-drag-grid/src/drag-layout.ts:46](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L46)*

___

###  mode

• **mode**: *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:27](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L27)*

___

### `Static` id

▪ **id**: *string* = "drag-grid"

*Defined in [cs-drag-grid/src/drag-layout.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L44)*

## Accessors

###  Margin

• **get Margin**(): *number[]*

*Defined in [cs-drag-grid/src/drag-layout.ts:89](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L89)*

**Returns:** *number[]*

___

###  backgroundWidgets

• **get backgroundWidgets**(): *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:102](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L102)*

**Returns:** *any*

___

###  options

• **get options**(): *[DragLayoutOptions](_cs_drag_grid_src_drag_layout_options_.draglayoutoptions.md) | undefined*

*Defined in [cs-drag-grid/src/drag-layout.ts:30](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L30)*

**Returns:** *[DragLayoutOptions](_cs_drag_grid_src_drag_layout_options_.draglayoutoptions.md) | undefined*

• **set options**(`value`: [DragLayoutOptions](_cs_drag_grid_src_drag_layout_options_.draglayoutoptions.md) | undefined): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:34](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [DragLayoutOptions](_cs_drag_grid_src_drag_layout_options_.draglayoutoptions.md) &#124; undefined |

**Returns:** *void*

___

###  widgets

• **get widgets**(): *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:95](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L95)*

**Returns:** *any*

## Methods

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L119)*

**Returns:** *void*

___

###  checkPosition

▸ **checkPosition**(`options`: [WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md)): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:156](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md) |

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:259](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L259)*

**Returns:** *void*

___

###  initGrid

▸ **initGrid**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:257](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L257)*

**Returns:** *void*

___

### `Private` initLayout

▸ **initLayout**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L48)*

**Returns:** *void*

___

###  layoutUpdatedEvent

▸ **layoutUpdatedEvent**(`l`: any[]): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:198](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L198)*

**Parameters:**

Name | Type |
------ | ------ |
`l` | any[] |

**Returns:** *void*

___

###  moveEvent

▸ **moveEvent**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:251](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L251)*

**Returns:** *void*

___

###  movedEvent

▸ **movedEvent**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:247](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L247)*

**Returns:** *void*

___

###  optionsChanged

▸ **optionsChanged**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:110](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L110)*

**Returns:** *void*

___

###  resizeEvent

▸ **resizeEvent**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:255](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L255)*

**Returns:** *void*

___

###  widgetsChanged

▸ **widgetsChanged**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:115](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-drag-grid/src/drag-layout.ts#L115)*

**Returns:** *void*
