# Class: MetaFile

## Hierarchy

* **MetaFile**

## Properties

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Defined in [cs-map/src/classes/meta-file.ts:18](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L18)*

• **propertyTypeData**? : *[PropertyCollection](../modules/_cs_map_src_classes_feature_type_.md#propertycollection)*

*Defined in [cs-map/src/classes/meta-file.ts:19](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L19)*

## Methods

*Defined in [cs-map/src/classes/meta-file.ts:19](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L19)*

**Returns:** *void*

___

### `Static` loadFeatureTypesFromUrl

*Defined in [cs-map/src/classes/meta-file.ts:22](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)›*

*Defined in [cs-map/src/classes/meta-file.ts:47](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L47)*

*Defined in [cs-map/src/classes/meta-file.ts:142](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[MetaFile](_cs_map_src_classes_meta_file_.metafile.md)›*

___

### `Static` updateMeta

▸ **updateMeta**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `ft?`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)): *Promise‹any›*

*Defined in [cs-map/src/classes/meta-file.ts:142](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L142)*
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`ft?` | [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) |

**Returns:** *Promise‹any›*
*Defined in [cs-map/src/classes/meta-file.ts:65](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/meta-file.ts#L65)*
