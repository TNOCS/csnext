# Class: LogController

## Hierarchy

* **LogController**

## Constructors

###  constructor

\+ **new LogController**(`logService`: [LogService](_cs_layer_server_src_logs_log_service_.logservice.md)): *[LogController](_cs_layer_server_src_logs_log_controller_.logcontroller.md)*

*Defined in [cs-layer-server/src/logs/log-controller.ts:14](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-controller.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`logService` | [LogService](_cs_layer_server_src_logs_log_service_.logservice.md) |

**Returns:** *[LogController](_cs_layer_server_src_logs_log_controller_.logcontroller.md)*

## Methods

###  getLog

▸ **getLog**(`id`: string, `source`: boolean): *Promise‹[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md) | undefined›*

*Defined in [cs-layer-server/src/logs/log-controller.ts:57](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-controller.ts#L57)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`id` | string | - |
`source` | boolean | true |

**Returns:** *Promise‹[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md) | undefined›*

___

###  logs

▸ **logs**(): *object*

*Defined in [cs-layer-server/src/logs/log-controller.ts:27](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-controller.ts#L27)*

**Returns:** *object*

* \[ **id**: *string*\]: [LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)

___

###  triggerLog

▸ **triggerLog**(`id`: string, `body`: [LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)): *Promise‹[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md) | undefined›*

*Defined in [cs-layer-server/src/logs/log-controller.ts:88](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-controller.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`body` | [LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md) |

**Returns:** *Promise‹[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md) | undefined›*

___

###  triggerRefresh

▸ **triggerRefresh**(`id`: string): *Promise‹Boolean›*

*Defined in [cs-layer-server/src/logs/log-controller.ts:109](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-controller.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹Boolean›*
