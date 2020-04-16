# Class: MetaUtils

## Hierarchy

* **MetaUtils**

## Methods

### `Static` `Private` checkPropertyLabels

▸ **checkPropertyLabels**(`properties`: object): *void*

Defined in cs-data/src/utils/meta-utils.ts:216

**Parameters:**

Name | Type |
------ | ------ |
`properties` | object |

**Returns:** *void*

___

### `Static` linkPropertyTypeData

▸ **linkPropertyTypeData**(`featureTypes`: [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md), `propertyTypeData`: [PropertyCollection](../modules/_cs_data_src_classes_property_type_.md#propertycollection)): *void*

Defined in cs-data/src/utils/meta-utils.ts:192

**Parameters:**

Name | Type |
------ | ------ |
`featureTypes` | [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md) |
`propertyTypeData` | [PropertyCollection](../modules/_cs_data_src_classes_property_type_.md#propertycollection) |

**Returns:** *void*

___

### `Static` loadFeatureTypesFromUrl

▸ **loadFeatureTypesFromUrl**(`url`: string): *Promise‹[FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md)›*

Defined in cs-data/src/utils/meta-utils.ts:16

Fetches meta file describing feature types and property types

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md)›*

___

### `Static` loadMetaUrl

▸ **loadMetaUrl**(`url`: string): *Promise‹[MetaFile](_cs_data_src_classes_meta_file_.metafile.md)›*

Defined in cs-data/src/utils/meta-utils.ts:30

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[MetaFile](_cs_data_src_classes_meta_file_.metafile.md)›*

___

### `Static` updateMeta

▸ **updateMeta**(`source`: any, `ft?`: [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md)): *Promise‹any›*

Defined in cs-data/src/utils/meta-utils.ts:59

**Parameters:**

Name | Type |
------ | ------ |
`source` | any |
`ft?` | [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) |

**Returns:** *Promise‹any›*

___

### `Static` updateMetaProperty

▸ **updateMetaProperty**(`source`: [DataSource](_cs_data_src_classes_data_source_.datasource.md), `ft`: [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md), `prop`: [PropertyType](_cs_data_src_classes_property_type_.propertytype.md)): *void*

Defined in cs-data/src/utils/meta-utils.ts:131

**Parameters:**

Name | Type |
------ | ------ |
`source` | [DataSource](_cs_data_src_classes_data_source_.datasource.md) |
`ft` | [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) |
`prop` | [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) |

**Returns:** *void*
