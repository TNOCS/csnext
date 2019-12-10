# Class: MetaFile

## Hierarchy

* **MetaFile**

## Properties

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Defined in [packages/cs-map/src/classes/meta-file.ts:192](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/meta-file.ts#L192)*

___

### `Optional` propertyTypeData

• **propertyTypeData**? : *[PropertyCollection](../modules/_cs_map_src_classes_property_type_.md#propertycollection)*

*Defined in [packages/cs-map/src/classes/meta-file.ts:193](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/meta-file.ts#L193)*

## Methods

### `Private` checkPropertyLabels

▸ **checkPropertyLabels**(`properties`: object): *void*

*Defined in [packages/cs-map/src/classes/meta-file.ts:226](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/meta-file.ts#L226)*

**Parameters:**

Name | Type |
------ | ------ |
`properties` | object |

**Returns:** *void*

___

###  linkPropertyTypeData

▸ **linkPropertyTypeData**(): *void*

*Defined in [packages/cs-map/src/classes/meta-file.ts:202](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/meta-file.ts#L202)*

**Returns:** *void*

___

### `Static` loadFeatureTypesFromUrl

▸ **loadFeatureTypesFromUrl**(`url`: string): *Promise‹[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)›*

*Defined in [packages/cs-map/src/classes/meta-file.ts:18](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/meta-file.ts#L18)*

Fetches meta file describing feature types and property types

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)›*

___

### `Static` loadMetaUrl

▸ **loadMetaUrl**(`url`: string): *Promise‹[MetaFile](_cs_map_src_classes_meta_file_.metafile.md)›*

*Defined in [packages/cs-map/src/classes/meta-file.ts:32](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/meta-file.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[MetaFile](_cs_map_src_classes_meta_file_.metafile.md)›*

___

### `Static` updateMeta

▸ **updateMeta**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `ft?`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)): *Promise‹any›*

*Defined in [packages/cs-map/src/classes/meta-file.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/meta-file.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`ft?` | [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) |

**Returns:** *Promise‹any›*

___

### `Static` updateMetaProperty

▸ **updateMetaProperty**(`layerSource`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md), `ft`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md), `prop`: [PropertyType](_cs_map_src_classes_property_type_.propertytype.md)): *void*

*Defined in [packages/cs-map/src/classes/meta-file.ts:132](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/meta-file.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`layerSource` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |
`ft` | [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) |
`prop` | [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) |

**Returns:** *void*
