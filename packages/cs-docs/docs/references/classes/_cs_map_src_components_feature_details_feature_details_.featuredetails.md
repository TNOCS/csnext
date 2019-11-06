# Class: FeatureDetails

## Hierarchy

* any

  ↳ **FeatureDetails**

## Properties

###  filter

• **filter**: *string* = ""

*Defined in [cs-map/src/components/feature-details/feature-details.ts:36](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L36)*

___

###  tabs

• **tabs**: *string* = "feature-details"

*Defined in [cs-map/src/components/feature-details/feature-details.ts:38](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L38)*

• **get feature**(): *Feature | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:87](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L87)*

get active feature

*Defined in [cs-map/src/components/feature-details/feature-details.ts:34](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L34)*

• **get filterPropertiesEnabled**(): *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:40](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L40)*

**Returns:** *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:35](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L35)*

###  layerColor

• **get layerColor**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L72)*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:87](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L87)*

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:80](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L80)*

###  filterPropertiesEnabled

• **get filterPropertiesEnabled**(): *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:40](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L40)*

**Returns:** *boolean*

___


###  title

• **get title**(): *string*
*Defined in [cs-map/src/components/feature-details/feature-details.ts:54](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L54)*
**Returns:** *string*

## Methods

###  centerFeature

▸ **centerFeature**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:237](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L237)*

**Returns:** *void*
*Defined in [cs-map/src/components/feature-details/feature-details.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L72)*
▸ **contentLoaded**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:258](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L258)*

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(`v`: string): *void*
*Defined in [cs-map/src/components/feature-details/feature-details.ts:80](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L80)*
Name | Type |
------ | ------ |
`v` | string |

**Returns:** *void*

___

###  initMenu
*Defined in [cs-map/src/components/feature-details/feature-details.ts:223](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L223)*
**Returns:** *void*

___

### `Private` propertyFilter

▸ **propertyFilter**(`prop`: [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md), `filter`: string): *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:94](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L94)*
*Defined in [cs-map/src/components/feature-details/feature-details.ts:62](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L62)*
`prop` | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) |
`filter` | string |

**Returns:** *boolean*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:237](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L237)*
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |

**Returns:** *void*

___

###  updateFilter

*Defined in [cs-map/src/components/feature-details/feature-details.ts:258](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L258)*

___

###  updateSections

▸ **updateSections**(): *any[]*

▸ **filterChanged**(`v`: string): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string |
###  initMenu

▸ **initMenu**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:243](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L243)*
*Defined in [cs-map/src/components/feature-details/feature-details.ts:94](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L94)*
###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:211](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |
###  updateFilter

▸ **updateFilter**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:49](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L49)*

**Returns:** *void*

___

###  updateSections

▸ **updateSections**(): *any[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:108](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/feature-details/feature-details.ts#L108)*

get list of available section, with their properties

**Returns:** *any[]*
