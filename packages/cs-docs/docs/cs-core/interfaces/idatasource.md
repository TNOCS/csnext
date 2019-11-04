# Interface: IDatasource

## Hierarchy

* **IDatasource**

## Implemented by

* [TimeDataSource](../classes/timedatasource.md)

## Properties

### `Optional` data

• **data**? : *any*

*Defined in [datasources/datasource.ts:4](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L4)*

___

### `Optional` id

• **id**? : *undefined | string*

*Defined in [datasources/datasource.ts:2](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L2)*

___

### `Optional` instant

• **instant**? : *undefined | false | true*

*Defined in [datasources/datasource.ts:7](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L7)*

___

### `Optional` isLoading

• **isLoading**? : *undefined | false | true*

*Defined in [datasources/datasource.ts:8](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L8)*

___

### `Optional` loaded

• **loaded**? : *undefined | false | true*

*Defined in [datasources/datasource.ts:9](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L9)*

___

### `Optional` options

• **options**? : *any*

*Defined in [datasources/datasource.ts:5](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L5)*

___

### `Optional` requestQueue

• **requestQueue**? : *Array‹object›*

*Defined in [datasources/datasource.ts:11](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L11)*

___

### `Optional` source

• **source**? : *undefined | string*

*Defined in [datasources/datasource.ts:3](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L3)*

## Methods

### `Optional` execute

▸ **execute**(`datasources?`: undefined | object, `data?`: any): *Promise‹any›*

*Defined in [datasources/datasource.ts:12](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/datasources/datasource.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources?` | undefined &#124; object |
`data?` | any |

**Returns:** *Promise‹any›*
