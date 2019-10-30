# Class: LogDataSource

## Hierarchy

* **LogDataSource**

## Implements

* any

## Constructors

###  constructor

\+ **new LogDataSource**(`logurl?`: string, `logid?`: string): *[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md)*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:13](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`logurl?` | string |
`logid?` | string |

**Returns:** *[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md)*

## Properties

###  bus

• **bus**: *any* =  new MessageBusService()

*Defined in [cs-client/src/datasources/log/log-datasource.ts:9](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L9)*

___

###  id

• **id**: *string* = "logdatasource"

*Defined in [cs-client/src/datasources/log/log-datasource.ts:7](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L7)*

___

###  items

• **items**: *[ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)[]* =  []

*Defined in [cs-client/src/datasources/log/log-datasource.ts:8](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L8)*

___

### `Optional` logid

• **logid**? : *string*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:15](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L15)*

___

### `Optional` logurl

• **logurl**? : *string*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:15](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L15)*

## Accessors

###  socket

• **get socket**(): *Socket | undefined*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:11](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L11)*

**Returns:** *Socket | undefined*

## Methods

###  addItem

▸ **addItem**(`item`: [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)): *void*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:17](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md) |

**Returns:** *void*

___

### `Optional` execute

▸ **execute**(`datasources?`: object, `data?`: any): *Promise‹[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md)›*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:45](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources?` | object |
`data?` | any |

**Returns:** *Promise‹[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md)›*

___

###  removeItem

▸ **removeItem**(`item`: [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)): *void*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:39](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md) |

**Returns:** *void*

___

###  removeItemById

▸ **removeItemById**(`id`: string): *void*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:31](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*

___

###  selectItemId

▸ **selectItemId**(`id`: string): *void*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:27](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*

___

###  updateItem

▸ **updateItem**(`item`: [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)): *void*

*Defined in [cs-client/src/datasources/log/log-datasource.ts:22](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-client/src/datasources/log/log-datasource.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md) |

**Returns:** *void*
