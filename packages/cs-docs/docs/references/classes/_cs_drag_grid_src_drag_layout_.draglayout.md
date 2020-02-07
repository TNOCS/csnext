# Class: DragLayout

## Hierarchy

* any

  ↳ **DragLayout**

## Properties

###  dashboard

• **dashboard**: *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-drag-grid/src/drag-layout.ts:54](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L54)*

___

###  dragEnabled

• **dragEnabled**: *boolean* = false

*Defined in [cs-drag-grid/src/drag-layout.ts:67](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L67)*

___

###  grid

• **grid**: *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:65](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L65)*

___

###  isMoving

• **isMoving**: *boolean* = false

*Defined in [cs-drag-grid/src/drag-layout.ts:68](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L68)*

___

###  items

• **items**: *string[]* =  []

*Defined in [cs-drag-grid/src/drag-layout.ts:66](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L66)*

___

###  layout

• **layout**: *any[]* =  []

*Defined in [cs-drag-grid/src/drag-layout.ts:71](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L71)*

___

###  mode

• **mode**: *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:53](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L53)*

___

### `Static` id

▪ **id**: *string* = "drag-grid"

*Defined in [cs-drag-grid/src/drag-layout.ts:29](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L29)*

## Accessors

###  Margin

• **get Margin**(): *number[]*

*Defined in [cs-drag-grid/src/drag-layout.ts:31](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L31)*

**Returns:** *number[]*

___

###  backgroundWidgets

• **get backgroundWidgets**(): *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:45](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L45)*

**Returns:** *any*

___

###  options

• **get options**(): *[DragLayoutOptions](_cs_drag_grid_src_drag_layout_options_.draglayoutoptions.md) | undefined*

*Defined in [cs-drag-grid/src/drag-layout.ts:56](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L56)*

**Returns:** *[DragLayoutOptions](_cs_drag_grid_src_drag_layout_options_.draglayoutoptions.md) | undefined*

• **set options**(`value`: [DragLayoutOptions](_cs_drag_grid_src_drag_layout_options_.draglayoutoptions.md) | undefined): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:60](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [DragLayoutOptions](_cs_drag_grid_src_drag_layout_options_.draglayoutoptions.md) &#124; undefined |

**Returns:** *void*

___

###  widgets

• **get widgets**(): *any*

*Defined in [cs-drag-grid/src/drag-layout.ts:37](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L37)*

**Returns:** *any*

## Methods

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:84](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L84)*

**Returns:** *void*

___

###  checkPosition

▸ **checkPosition**(`options`: [WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md)): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:88](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md) |

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:191](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L191)*

**Returns:** *void*

___

###  initGrid

▸ **initGrid**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:189](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L189)*

**Returns:** *void*

___

### `Private` initLayout

▸ **initLayout**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:198](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L198)*

**Returns:** *void*

___

###  layoutUpdatedEvent

▸ **layoutUpdatedEvent**(`l`: any[]): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:130](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`l` | any[] |

**Returns:** *void*

___

###  marginChanged

▸ **marginChanged**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:75](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L75)*

**Returns:** *void*

___

###  moveEvent

▸ **moveEvent**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:183](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L183)*

**Returns:** *void*

___

###  movedEvent

▸ **movedEvent**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:179](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L179)*

**Returns:** *void*

___

###  resizeEvent

▸ **resizeEvent**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:187](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L187)*

**Returns:** *void*

___

###  widgetsChanged

▸ **widgetsChanged**(): *void*

*Defined in [cs-drag-grid/src/drag-layout.ts:80](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-drag-grid/src/drag-layout.ts#L80)*

**Returns:** *void*
