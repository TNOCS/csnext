# Class: LogService

## Hierarchy

* **LogService**

## Constructors

###  constructor

\+ **new LogService**(`socket`: [DefaultWebSocketGateway](_cs_layer_server_src_websocket_gateway_.defaultwebsocketgateway.md)): *[LogService](_cs_layer_server_src_logs_log_service_.logservice.md)*

*Defined in [cs-layer-server/src/logs/log-service.ts:68](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`socket` | [DefaultWebSocketGateway](_cs_layer_server_src_websocket_gateway_.defaultwebsocketgateway.md) |

**Returns:** *[LogService](_cs_layer_server_src_logs_log_service_.logservice.md)*

## Properties

###  logs

• **logs**: *object*

*Defined in [cs-layer-server/src/logs/log-service.ts:8](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L8)*

#### Type declaration:

* \[ **id**: *string*\]: [LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)

## Methods

###  addLogItem

▸ **addLogItem**(`id`: string, `logItem`: [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)): *void*

*Defined in [cs-layer-server/src/logs/log-service.ts:33](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`logItem` | [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md) |

**Returns:** *void*

___

###  createLog

▸ **createLog**(`id`: string): *any*

*Defined in [cs-layer-server/src/logs/log-service.ts:47](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *any*

___

###  getLogAndSourceById

▸ **getLogAndSourceById**(`id`: string): *[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)*

*Defined in [cs-layer-server/src/logs/log-service.ts:60](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)*

___

###  getLogById

▸ **getLogById**(`id`: string): *[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)*

*Defined in [cs-layer-server/src/logs/log-service.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)*

___

###  getLogs

▸ **getLogs**(): *object*

*Defined in [cs-layer-server/src/logs/log-service.ts:66](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L66)*

**Returns:** *object*

* \[ **key**: *string*\]: [LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)

___

###  putLogDefinitionById

▸ **putLogDefinitionById**(`id`: string, `body`: [LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)): *[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md) | PromiseLike‹[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)›*

*Defined in [cs-layer-server/src/logs/log-service.ts:13](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`body` | [LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md) |

**Returns:** *[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md) | PromiseLike‹[LogDefintion](_cs_layer_server_src_classes_log_definition_.logdefintion.md)›*

___

###  triggerLogRefresh

▸ **triggerLogRefresh**(`id`: string): *Boolean | PromiseLike‹Boolean›*

*Defined in [cs-layer-server/src/logs/log-service.ts:10](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/logs/log-service.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Boolean | PromiseLike‹Boolean›*
