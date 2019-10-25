# Class: TimeDataSource

## Hierarchy

* **TimeDataSource**

## Implements

* any

## Properties

### `Optional` end

• **end**? : *number*

*Defined in [cs-core/src/datasources/time-datasource.ts:5](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-core/src/datasources/time-datasource.ts#L5)*

___

###  events

• **events**: *any* =  new MessageBusService()

*Defined in [cs-core/src/datasources/time-datasource.ts:9](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-core/src/datasources/time-datasource.ts#L9)*

___

### `Optional` focusTime

• **focusTime**? : *number*

*Defined in [cs-core/src/datasources/time-datasource.ts:6](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-core/src/datasources/time-datasource.ts#L6)*

___

###  id

• **id**: *string* = "timedatasource"

*Defined in [cs-core/src/datasources/time-datasource.ts:7](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-core/src/datasources/time-datasource.ts#L7)*

___

### `Optional` start

• **start**? : *number*

*Defined in [cs-core/src/datasources/time-datasource.ts:4](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-core/src/datasources/time-datasource.ts#L4)*

## Methods

### `Optional` execute

▸ **execute**(`datasources?`: object, `data?`: any): *Promise‹[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)›*

*Defined in [cs-core/src/datasources/time-datasource.ts:22](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-core/src/datasources/time-datasource.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources?` | object |
`data?` | any |

**Returns:** *Promise‹[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)›*

___

###  setFocusTime

▸ **setFocusTime**(`time`: number): *void*

*Defined in [cs-core/src/datasources/time-datasource.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-core/src/datasources/time-datasource.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`time` | number |

**Returns:** *void*

___

###  setTimeRange

▸ **setTimeRange**(`start`: number, `end`: number): *void*

*Defined in [cs-core/src/datasources/time-datasource.ts:11](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-core/src/datasources/time-datasource.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | number |
`end` | number |

**Returns:** *void*
