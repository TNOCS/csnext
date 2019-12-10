# Class: CsDashboard

## Hierarchy

* any

  ↳ **CsDashboard**

## Properties

### `Optional` dashboard

• **dashboard**? : *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:26](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L26)*

___

###  selectedStepper

• **selectedStepper**: *number* = 1

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:27](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L27)*

___

###  selectedTab

• **selectedTab**: *number* = 0

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:28](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L28)*

## Accessors

###  component

• **get component**(): *[Vue](../interfaces/_cs_client_src_index_._vue_types_vue_.vue.md)*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:249](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L249)*

**Returns:** *[Vue](../interfaces/_cs_client_src_index_._vue_types_vue_.vue.md)*

## Methods

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:240](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L240)*

dashboard will be closed.

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:225](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L225)*

**Returns:** *void*

___

###  checkWidgetId

▸ **checkWidgetId**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:55](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:217](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L217)*

**Returns:** *void*

___

###  dashboardChanged

▸ **dashboardChanged**(`n`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:31](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  denseToolbar

▸ **denseToolbar**(): *boolean*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:82](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L82)*

**Returns:** *boolean*

___

###  hideTitle

▸ **hideTitle**(): *boolean*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:89](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L89)*

**Returns:** *boolean*

___

###  initDashboard

▸ **initDashboard**(`dashboard`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:96](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L96)*

init dashboard: load datasources, init widgets and init manager

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  initWidget

▸ **initWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:61](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *void*

___

###  menusChanged

▸ **menusChanged**(): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:36](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L36)*

**Returns:** *void*

___

###  selectStepperDashboard

▸ **selectStepperDashboard**(`dashboard`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:49](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  showToolbar

▸ **showToolbar**(): *boolean*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:70](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L70)*

**Returns:** *boolean*

___

###  widgetsChanged

▸ **widgetsChanged**(`n`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)[]): *void*

*Defined in [packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts:41](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-dashboard/cs-dashboard.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)[] |

**Returns:** *void*
