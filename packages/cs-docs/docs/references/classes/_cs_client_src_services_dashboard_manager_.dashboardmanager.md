# Class: DashboardManager

## Hierarchy

* **DashboardManager**

## Properties

### `Static` dashboardManagers

▪ **dashboardManagers**: *object*

*Defined in [cs-client/src/services/dashboard-manager.ts:7](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/services/dashboard-manager.ts#L7)*

Available dashboard managers for layouting

#### Type declaration:

* \[ **id**: *string*\]: [IDashboardManagerConfig](../interfaces/_cs_core_src_dashboard_dashboard_manager_config_.idashboardmanagerconfig.md)

## Methods

### `Static` add

▸ **add**(`manager`: [IDashboardManagerConfig](../interfaces/_cs_core_src_dashboard_dashboard_manager_config_.idashboardmanagerconfig.md)): *void*

*Defined in [cs-client/src/services/dashboard-manager.ts:9](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/services/dashboard-manager.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [IDashboardManagerConfig](../interfaces/_cs_core_src_dashboard_dashboard_manager_config_.idashboardmanagerconfig.md) |

**Returns:** *void*

___

### `Static` addDashboardManager

▸ **addDashboardManager**(`comp`: any, `id?`: string): *void*

*Defined in [cs-client/src/services/dashboard-manager.ts:18](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/services/dashboard-manager.ts#L18)*

Registration of a new dashboard manager

**Parameters:**

Name | Type |
------ | ------ |
`comp` | any |
`id?` | string |

**Returns:** *void*
