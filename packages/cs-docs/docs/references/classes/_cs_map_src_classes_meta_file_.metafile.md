# Class: MetaFile

## Hierarchy

* **MetaFile**

## Properties

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Defined in [cs-map/src/classes/meta-file.ts:18](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L18)*

___

### `Optional` propertyTypeData

• **propertyTypeData**? : *[PropertyCollection](../modules/_cs_map_src_classes_feature_type_.md#propertycollection)*

*Defined in [cs-map/src/classes/meta-file.ts:19](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L19)*

## Methods

###  linkPropertyTypeData

▸ **linkPropertyTypeData**(): *void*

*Defined in [cs-map/src/classes/meta-file.ts:22](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L22)*

**Returns:** *void*

___

### `Static` loadFeatureTypesFromUrl

▸ **loadFeatureTypesFromUrl**(`url`: string): *Promise‹[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)›*

*Defined in [cs-map/src/classes/meta-file.ts:47](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L47)*

Fetches meta file describing feature types and property types

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)›*

___

### `Static` loadMetaUrl

▸ **loadMetaUrl**(`url`: string): *Promise‹[MetaFile](_cs_map_src_classes_meta_file_.metafile.md)›*

*Defined in [cs-map/src/classes/meta-file.ts:142](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[MetaFile](_cs_map_src_classes_meta_file_.metafile.md)›*

___

### `Static` updateMeta

▸ **updateMeta**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `ft?`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)): *Promise‹any›*

*Defined in [cs-map/src/classes/meta-file.ts:65](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`ft?` | [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) |

**Returns:** *Promise‹any›*
