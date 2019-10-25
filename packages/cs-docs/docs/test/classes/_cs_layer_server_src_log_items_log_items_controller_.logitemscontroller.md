# Class: LogItemsController

## Hierarchy

* **LogItemsController**

## Constructors

###  constructor

\+ **new LogItemsController**(`logService`: [LogService](_cs_layer_server_src_logs_log_service_.logservice.md)): *[LogItemsController](_cs_layer_server_src_log_items_log_items_controller_.logitemscontroller.md)*

*Defined in [cs-layer-server/src/log-items/log-items-controller.ts:14](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/log-items/log-items-controller.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`logService` | [LogService](_cs_layer_server_src_logs_log_service_.logservice.md) |

**Returns:** *[LogItemsController](_cs_layer_server_src_log_items_log_items_controller_.logitemscontroller.md)*

## Methods

###  addLogItem

▸ **addLogItem**(`log`: string, `body`: [ILogItem](../interfaces/_cs_layer_server_src_classes_log_item_.ilogitem.md)): *Promise‹boolean | undefined›*

*Defined in [cs-layer-server/src/log-items/log-items-controller.ts:31](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/log-items/log-items-controller.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`log` | string |
`body` | [ILogItem](../interfaces/_cs_layer_server_src_classes_log_item_.ilogitem.md) |

**Returns:** *Promise‹boolean | undefined›*

___

###  triggerRefresh

▸ **triggerRefresh**(`id`: string): *Promise‹Boolean›*

*Defined in [cs-layer-server/src/log-items/log-items-controller.ts:53](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/log-items/log-items-controller.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹Boolean›*
