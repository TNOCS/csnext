# Class: DashboardManagerBase

## Hierarchy

* **DashboardManagerBase**

## Implements

* any

## Properties

###  busManager

• **busManager**: *[MessageBusManager](_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)*

*Defined in [cs-client/src/services/dashboard-manager-base.ts:7](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/dashboard-manager-base.ts#L7)*

access the original widget from configuration

___

###  dashboard

• **dashboard**: *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-client/src/services/dashboard-manager-base.ts:8](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/dashboard-manager-base.ts#L8)*

## Methods

###  start

▸ **start**(`dashboard`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/services/dashboard-manager-base.ts:16](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/dashboard-manager-base.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Defined in [cs-client/src/services/dashboard-manager-base.ts:25](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/dashboard-manager-base.ts#L25)*

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`bus`: [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md) | undefined, `topic`: string, `callback`: [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md), `id?`: string): *void*

*Defined in [cs-client/src/services/dashboard-manager-base.ts:10](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/dashboard-manager-base.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`bus` | [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md) &#124; undefined |
`topic` | string |
`callback` | [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md) |
`id?` | string |

**Returns:** *void*
