# Class: DataSources

## Hierarchy

* any

  ↳ **DataSources**

## Properties

###  data

• **data**: *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md)*

Defined in cs-map/src/components/data-sources/data-sources.ts:15

___

###  formatFilter

• **formatFilter**: *string* =  this.allTitle

Defined in cs-map/src/components/data-sources/data-sources.ts:16

___

###  organisationFilter

• **organisationFilter**: *string* =  this.allTitle

Defined in cs-map/src/components/data-sources/data-sources.ts:17

## Accessors

###  allTitle

• **get allTitle**(): *string*

Defined in cs-map/src/components/data-sources/data-sources.ts:19

**Returns:** *string*

___

###  filteredSources

• **get filteredSources**(): *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)[] | undefined*

Defined in cs-map/src/components/data-sources/data-sources.ts:47

**Returns:** *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)[] | undefined*

___

###  sourceFormats

• **get sourceFormats**(): *string[]*

Defined in cs-map/src/components/data-sources/data-sources.ts:43

**Returns:** *string[]*

___

###  sourceOrganisations

• **get sourceOrganisations**(): *string[]*

Defined in cs-map/src/components/data-sources/data-sources.ts:39

**Returns:** *string[]*

___

###  sources

• **get sources**(): *any*

Defined in cs-map/src/components/data-sources/data-sources.ts:53

**Returns:** *any*

## Methods

###  downloadSource

▸ **downloadSource**(`source`: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)): *void*

Defined in cs-map/src/components/data-sources/data-sources.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`source` | [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) |

**Returns:** *void*

___

### `Private` uniques

▸ **uniques**(`prop`: string): *string[]*

Defined in cs-map/src/components/data-sources/data-sources.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`prop` | string |

**Returns:** *string[]*
