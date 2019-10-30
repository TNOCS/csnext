# Class: LogManager

## Hierarchy

* **LogManager**

## Properties

###  items

• **items**: *[ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)[]* =  []

*Defined in [cs-client/src/datasources/log/log-manager.ts:7](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-client/src/datasources/log/log-manager.ts#L7)*

___

###  source

• **source**: *[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md) | undefined*

*Defined in [cs-client/src/datasources/log/log-manager.ts:8](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-client/src/datasources/log/log-manager.ts#L8)*

## Methods

###  init

▸ **init**(`sourceId`: string, `state`: [AppState](_cs_client_src_services_app_state_.appstate.md)): *Promise‹[ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)[]›*

*Defined in [cs-client/src/datasources/log/log-manager.ts:12](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-client/src/datasources/log/log-manager.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceId` | string |
`state` | [AppState](_cs_client_src_services_app_state_.appstate.md) |

**Returns:** *Promise‹[ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)[]›*
