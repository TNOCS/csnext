# Class: DatasourceManager

The DatasourceManager maintains a list of all datasource processors and all datasources?.

## Hierarchy

* **DatasourceManager**

## Constructors

###  constructor

\+ **new DatasourceManager**(): *[DatasourceManager](_cs_client_src_services_datasource_manager_.datasourcemanager.md)*

*Defined in [cs-client/src/services/datasource-manager.ts:7](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/datasource-manager.ts#L7)*

Available datasource handlers

**Returns:** *[DatasourceManager](_cs_client_src_services_datasource_manager_.datasourcemanager.md)*

## Methods

###  load

▸ **load**<**T**>(`source`: [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md) | string): *Promise‹T›*

*Defined in [cs-client/src/services/datasource-manager.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/datasource-manager.ts#L19)*

Load a data source using the assigned data summary handler(s)

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`source` | [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md) &#124; string |

**Returns:** *Promise‹T›*

___

###  loadAll

▸ **loadAll**(): *void*

*Defined in [cs-client/src/services/datasource-manager.ts:89](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/datasource-manager.ts#L89)*

load all data sources

**Returns:** *void*

___

###  update

▸ **update**(`id`: string, `value`: any): *void*

*Defined in [cs-client/src/services/datasource-manager.ts:80](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/datasource-manager.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`value` | any |

**Returns:** *void*
