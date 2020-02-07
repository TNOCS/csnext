# Class: DataSources

## Hierarchy

* **DataSources**

## Implements

* any

## Constructors

###  constructor

\+ **new DataSources**(`data?`: object, `images?`: object): *[DataSources](_cs_data_src_classes_data_sources_.datasources.md)*

Defined in cs-data/src/classes/data-sources.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`data?` | object |
`images?` | object |

**Returns:** *[DataSources](_cs_data_src_classes_data_sources_.datasources.md)*

## Properties

### `Optional` activeResource

• **activeResource**? : *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)*

Defined in cs-data/src/classes/data-sources.ts:22

___

### `Optional` dataPackage

• **dataPackage**? : *[DataPackage](../interfaces/_cs_data_src_interfaces_datapackage_.datapackage.md)*

Defined in cs-data/src/classes/data-sources.ts:25

___

###  events

• **events**: *any* =  new MessageBusService()

Defined in cs-data/src/classes/data-sources.ts:23

___

### `Optional` id

• **id**? : *string*

Defined in cs-data/src/classes/data-sources.ts:24

___

###  images

• **images**: *object*

Defined in cs-data/src/classes/data-sources.ts:20

#### Type declaration:

* \[ **id**: *string*\]: string

___

###  loader

• **loader**: *[Loader](_cs_core_src_utils_loader_.loader.md)*

Defined in cs-data/src/classes/data-sources.ts:27

___

###  resources

• **resources**: *object*

Defined in cs-data/src/classes/data-sources.ts:26

#### Type declaration:

* \[ **name**: *string*\]: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)

___

###  sources

• **sources**: *object*

Defined in cs-data/src/classes/data-sources.ts:21

#### Type declaration:

* \[ **name**: *string*\]: [DataSource](_cs_data_src_classes_data_source_.datasource.md)

## Methods

###  activateResource

▸ **activateResource**(`source`: string): *Promise‹[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)›*

Defined in cs-data/src/classes/data-sources.ts:227

**Parameters:**

Name | Type |
------ | ------ |
`source` | string |

**Returns:** *Promise‹[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)›*

___

###  createDataSourceFromResource

▸ **createDataSourceFromResource**(`data`: any, `resource`: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)): *Promise‹[DataSource](_cs_data_src_classes_data_source_.datasource.md) | undefined›*

Defined in cs-data/src/classes/data-sources.ts:164

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`resource` | [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) |

**Returns:** *Promise‹[DataSource](_cs_data_src_classes_data_source_.datasource.md) | undefined›*

___

###  execute

▸ **execute**(`datasources`: object): *Promise‹any›*

Defined in cs-data/src/classes/data-sources.ts:262

**Parameters:**

Name | Type |
------ | ------ |
`datasources` | object |

**Returns:** *Promise‹any›*

___

###  getDataSource

▸ **getDataSource**(`id`: string): *[DataSource](_cs_data_src_classes_data_source_.datasource.md) | undefined*

Defined in cs-data/src/classes/data-sources.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[DataSource](_cs_data_src_classes_data_source_.datasource.md) | undefined*

___

###  initPackage

▸ **initPackage**(`p`: [DataPackage](../interfaces/_cs_data_src_interfaces_datapackage_.datapackage.md)): *void*

Defined in cs-data/src/classes/data-sources.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`p` | [DataPackage](../interfaces/_cs_data_src_interfaces_datapackage_.datapackage.md) |

**Returns:** *void*

___

###  initSource

▸ **initSource**(`id`: string, `source`: [DataSource](_cs_data_src_classes_data_source_.datasource.md)): *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

Defined in cs-data/src/classes/data-sources.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`source` | [DataSource](_cs_data_src_classes_data_source_.datasource.md) |

**Returns:** *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

___

###  loadPackage

▸ **loadPackage**(`uri`: string): *Promise‹[DataPackage](../interfaces/_cs_data_src_interfaces_datapackage_.datapackage.md)›*

Defined in cs-data/src/classes/data-sources.ts:103

**Parameters:**

Name | Type |
------ | ------ |
`uri` | string |

**Returns:** *Promise‹[DataPackage](../interfaces/_cs_data_src_interfaces_datapackage_.datapackage.md)›*

___

###  loadResource

▸ **loadResource**(`resourceName`: string): *Promise‹[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)›*

Defined in cs-data/src/classes/data-sources.ts:235

**Parameters:**

Name | Type |
------ | ------ |
`resourceName` | string |

**Returns:** *Promise‹[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)›*

___

###  mergeResources

▸ **mergeResources**(`first`: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md), `second`: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)): *Promise‹boolean›*

Defined in cs-data/src/classes/data-sources.ts:121

**Parameters:**

Name | Type |
------ | ------ |
`first` | [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) |
`second` | [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) |

**Returns:** *Promise‹boolean›*

___

###  parseCSv

▸ **parseCSv**(`data`: any): *Promise‹Papa.ParseResult›*

Defined in cs-data/src/classes/data-sources.ts:158

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *Promise‹Papa.ParseResult›*

___

###  unloadResource

▸ **unloadResource**(`source`: string): *Promise‹boolean›*

Defined in cs-data/src/classes/data-sources.ts:208

**Parameters:**

Name | Type |
------ | ------ |
`source` | string |

**Returns:** *Promise‹boolean›*

___

###  updateDataSet

▸ **updateDataSet**(`id`: string, `dataset`: [DataSet](_cs_data_src_classes_data_set_.dataset.md)): *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

Defined in cs-data/src/classes/data-sources.ts:49

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`dataset` | [DataSet](_cs_data_src_classes_data_set_.dataset.md) |

**Returns:** *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

___

###  updateSource

▸ **updateSource**(`source`: [DataSource](_cs_data_src_classes_data_source_.datasource.md)): *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

Defined in cs-data/src/classes/data-sources.ts:58

**Parameters:**

Name | Type |
------ | ------ |
`source` | [DataSource](_cs_data_src_classes_data_source_.datasource.md) |

**Returns:** *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*
