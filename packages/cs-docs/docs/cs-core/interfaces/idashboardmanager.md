# Interface: IDashboardManager

Interface for dashboard manager

## Hierarchy

* **IDashboardManager**

## Properties

### `Optional` dashboardLoaded

• **dashboardLoaded**? : *undefined | function*

*Defined in [dashboard/dashboard-manager-config.ts:15](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/dashboard/dashboard-manager-config.ts#L15)*

___

### `Optional` dataLoaded

• **dataLoaded**? : *undefined | function*

*Defined in [dashboard/dashboard-manager-config.ts:17](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/dashboard/dashboard-manager-config.ts#L17)*

___

### `Optional` editDashboard

• **editDashboard**? : *undefined | function*

*Defined in [dashboard/dashboard-manager-config.ts:16](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/dashboard/dashboard-manager-config.ts#L16)*

___

### `Optional` removeWidget

• **removeWidget**? : *undefined | function*

*Defined in [dashboard/dashboard-manager-config.ts:18](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/dashboard/dashboard-manager-config.ts#L18)*

___

###  start

• **start**: *function*

*Defined in [dashboard/dashboard-manager-config.ts:12](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/dashboard/dashboard-manager-config.ts#L12)*

Start test

#### Type declaration:

▸ (`dashboard`: [IDashboard](idashboard.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](idashboard.md) |

___

###  stop

• **stop**: *function*

*Defined in [dashboard/dashboard-manager-config.ts:14](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/dashboard/dashboard-manager-config.ts#L14)*

#### Type declaration:

▸ (`dashboard`: [IDashboard](idashboard.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](idashboard.md) |
