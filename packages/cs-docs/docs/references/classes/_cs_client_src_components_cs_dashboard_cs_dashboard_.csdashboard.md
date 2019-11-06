# Class: CsDashboard

## Hierarchy

* any

  ↳ **CsDashboard**

## Properties

### `Optional` dashboard

• **dashboard**? : *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:28](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L28)*

___

###  selectedStepper

• **selectedStepper**: *number* = 1

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:29](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L29)*

___

###  selectedTab

• **selectedTab**: *number* = 0

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:30](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L30)*

## Accessors

###  component

• **get component**(): *[Vue](../interfaces/_cs_client_src_index_._vue_types_vue_.vue.md)*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:251](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L251)*

**Returns:** *[Vue](../interfaces/_cs_client_src_index_._vue_types_vue_.vue.md)*

## Methods

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:242](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L242)*

dashboard will be closed.

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:227](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L227)*

**Returns:** *void*

___

###  checkWidgetId

▸ **checkWidgetId**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:57](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:219](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L219)*

**Returns:** *void*

___

###  dashboardChanged

▸ **dashboardChanged**(`n`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:33](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  denseToolbar

▸ **denseToolbar**(): *boolean*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:84](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L84)*

**Returns:** *boolean*

___

###  hideTitle

▸ **hideTitle**(): *boolean*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:91](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L91)*

**Returns:** *boolean*

___

###  initDashboard

▸ **initDashboard**(`dashboard`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:98](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L98)*

init dashboard: load datasources, init widgets and init manager

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  initWidget

▸ **initWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:63](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *void*

___

###  menusChanged

▸ **menusChanged**(): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:38](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L38)*

**Returns:** *void*

___

###  selectStepperDashboard

▸ **selectStepperDashboard**(`dashboard`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:51](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  showToolbar

▸ **showToolbar**(): *boolean*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:72](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L72)*

**Returns:** *boolean*

___

###  widgetsChanged

▸ **widgetsChanged**(`n`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)[]): *void*

*Defined in [cs-client/src/components/cs-dashboard/cs-dashboard.ts:43](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)[] |

**Returns:** *void*
