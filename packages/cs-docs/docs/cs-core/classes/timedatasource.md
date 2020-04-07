# Class: TimeDataSource

## Hierarchy

* **TimeDataSource**

## Implements

* [IDatasource](../interfaces/idatasource.md)

## Properties

### `Optional` end

• **end**? : *undefined | number*

*Defined in [datasources/time-datasource.ts:5](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/time-datasource.ts#L5)*

___

###  events

• **events**: *[MessageBusService](messagebusservice.md)* =  new MessageBusService()

*Defined in [datasources/time-datasource.ts:9](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/time-datasource.ts#L9)*

___

### `Optional` focusTime

• **focusTime**? : *undefined | number*

*Defined in [datasources/time-datasource.ts:6](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/time-datasource.ts#L6)*

___

###  id

• **id**: *string* = "timedatasource"

*Implementation of [IDatasource](../interfaces/idatasource.md).[id](../interfaces/idatasource.md#optional-id)*

*Defined in [datasources/time-datasource.ts:7](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/time-datasource.ts#L7)*

___

### `Optional` start

• **start**? : *undefined | number*

*Defined in [datasources/time-datasource.ts:4](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/time-datasource.ts#L4)*

## Methods

### `Optional` execute

▸ **execute**(`datasources?`: undefined | object, `data?`: any): *Promise‹[TimeDataSource](timedatasource.md)›*

*Defined in [datasources/time-datasource.ts:19](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/time-datasource.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources?` | undefined &#124; object |
`data?` | any |

**Returns:** *Promise‹[TimeDataSource](timedatasource.md)›*

___

###  setFocusTime

▸ **setFocusTime**(`time`: number): *void*

*Defined in [datasources/time-datasource.ts:15](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/time-datasource.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`time` | number |

**Returns:** *void*

___

###  setTimeRange

▸ **setTimeRange**(`start`: number, `end`: number): *void*

*Defined in [datasources/time-datasource.ts:11](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/time-datasource.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | number |
`end` | number |

**Returns:** *void*
