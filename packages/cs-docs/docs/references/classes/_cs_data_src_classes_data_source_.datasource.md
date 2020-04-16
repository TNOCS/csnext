# Class: DataSource

## Hierarchy

* **DataSource**

## Constructors

###  constructor

\+ **new DataSource**(`data?`: string | [DataSet](_cs_data_src_classes_data_set_.dataset.md)): *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

Defined in cs-data/src/classes/data-source.ts:41

**Parameters:**

Name | Type |
------ | ------ |
`data?` | string &#124; [DataSet](_cs_data_src_classes_data_set_.dataset.md) |

**Returns:** *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

## Properties

### `Optional` _bookmarks

• **_bookmarks**? : *any[]* =  []

Defined in cs-data/src/classes/data-source.ts:27

___

### `Optional` _data

• **_data**? : *[DataSet](_cs_data_src_classes_data_set_.dataset.md)*

Defined in cs-data/src/classes/data-source.ts:25

___

### `Private` `Optional` _featureType

• **_featureType**? : *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md)*

Defined in cs-data/src/classes/data-source.ts:41

___

### `Private` `Optional` _flat

• **_flat**? : *any[]*

Defined in cs-data/src/classes/data-source.ts:39

___

###  _loaded

• **_loaded**: *boolean* = false

Defined in cs-data/src/classes/data-source.ts:26

___

### `Optional` _meta

• **_meta**? : *[FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md)*

Defined in cs-data/src/classes/data-source.ts:24

___

### `Optional` defaultFeatureType

• **defaultFeatureType**? : *string*

Defined in cs-data/src/classes/data-source.ts:21

___

### `Optional` featureType

• **featureType**? : *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md)*

Defined in cs-data/src/classes/data-source.ts:19

___

### `Optional` id

• **id**? : *string*

Defined in cs-data/src/classes/data-source.ts:15

___

### `Optional` metaUrl

• **metaUrl**? : *string*

Defined in cs-data/src/classes/data-source.ts:18

___

###  state

• **state**: *[DataSourceState](../enums/_cs_data_src_classes_data_source_.datasourcestate.md)*

Defined in cs-data/src/classes/data-source.ts:22

___

### `Optional` title

• **title**? : *string*

Defined in cs-data/src/classes/data-source.ts:16

___

### `Optional` type

• **type**? : *"vector" | "raster" | "raster-dem" | "geojson" | "image" | "video" | "table"*

Defined in cs-data/src/classes/data-source.ts:29

___

### `Optional` url

• **url**? : *string*

Defined in cs-data/src/classes/data-source.ts:17

## Methods

### `Private` InitFeatures

▸ **InitFeatures**(`data`: [DataSet](_cs_data_src_classes_data_set_.dataset.md), `layerId?`: string): *[DataSet](_cs_data_src_classes_data_set_.dataset.md)‹›*

Defined in cs-data/src/classes/data-source.ts:253

make sure all features have an id and properties object

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DataSet](_cs_data_src_classes_data_set_.dataset.md) |
`layerId?` | string |

**Returns:** *[DataSet](_cs_data_src_classes_data_set_.dataset.md)‹›*

___

###  exportToCsv

▸ **exportToCsv**(): *Promise‹any›*

Defined in cs-data/src/classes/data-source.ts:120

**Returns:** *Promise‹any›*

___

###  getFeatureType

▸ **getFeatureType**(): *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

Defined in cs-data/src/classes/data-source.ts:131

**Returns:** *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

___

###  getFlatProperties

▸ **getFlatProperties**(): *any[]*

Defined in cs-data/src/classes/data-source.ts:105

**Returns:** *any[]*

___

###  getPropertType

▸ **getPropertType**(`prop`: string): *[PropertyType](_cs_data_src_classes_property_type_.propertytype.md) | undefined*

Defined in cs-data/src/classes/data-source.ts:150

**Parameters:**

Name | Type |
------ | ------ |
`prop` | string |

**Returns:** *[PropertyType](_cs_data_src_classes_property_type_.propertytype.md) | undefined*

___

###  initFeatureTypes

▸ **initFeatureTypes**(`featureTypes?`: [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md)): *Promise‹boolean›*

Defined in cs-data/src/classes/data-source.ts:161

**Parameters:**

Name | Type |
------ | ------ |
`featureTypes?` | [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md) |

**Returns:** *Promise‹boolean›*

___

###  loadSource

▸ **loadSource**(`featureTypes?`: [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md)): *Promise‹[DataSet](_cs_data_src_classes_data_set_.dataset.md)›*

Defined in cs-data/src/classes/data-source.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`featureTypes?` | [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md) |

**Returns:** *Promise‹[DataSet](_cs_data_src_classes_data_set_.dataset.md)›*

___

###  updateFeatureTypePropertyMap

▸ **updateFeatureTypePropertyMap**(`type`: [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md)): *void*

Defined in cs-data/src/classes/data-source.ts:241

**Parameters:**

Name | Type |
------ | ------ |
`type` | [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) |

**Returns:** *void*
