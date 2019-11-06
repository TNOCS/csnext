# Interface: IDashboardManager

Interface for dashboard manager

## Hierarchy

* **IDashboardManager**

## Properties

### `Optional` contentLoaded

• **contentLoaded**? : *function*

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:7](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | any |

___

### `Optional` dashboardLoaded

• **dashboardLoaded**? : *function*

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:6](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L6)*

#### Type declaration:

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:6](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L6)*

• **dataLoaded**? : *function*

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:9](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L9)*

#### Type declaration:

▸ (`d`: any): *void*

**Parameters:**

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:9](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L9)*

### `Optional` editDashboard

• **editDashboard**? : *function*

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:8](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L8)*

#### Type declaration:

▸ (`dashboard`: [IDashboard](_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](_cs_core_src_dashboard_dashboard_.idashboard.md) |

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:8](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L8)*

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:10](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L10)*

#### Type declaration:

▸ (`widget`: [IWidget](_cs_core_src_widget_widget_.iwidget.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](_cs_core_src_widget_widget_.iwidget.md) |

___

### `Optional` start

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:10](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L10)*

▸ (`dashboard`: [IDashboard](_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](_cs_core_src_dashboard_dashboard_.idashboard.md) |

___

### `Optional` stop

• **stop**? : *function*

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:5](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L5)*

*Defined in [cs-core/src/dashboard/dashboard-manager.ts:4](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L4)*

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](_cs_core_src_dashboard_dashboard_.idashboard.md) |
*Defined in [cs-core/src/dashboard/dashboard-manager.ts:5](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/dashboard/dashboard-manager.ts#L5)*
