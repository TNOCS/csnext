# Class: FeatureDetails

## Hierarchy

* any

  ↳ **FeatureDetails**

## Properties

###  filter

• **filter**: *string* = ""

*Defined in [cs-map/src/components/feature-details/feature-details.ts:36](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L36)*

___

###  sections

• **sections**: *[section](_cs_map_src_components_feature_details_feature_details_.section.md)[]* =  []

*Defined in [cs-map/src/components/feature-details/feature-details.ts:38](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L38)*

___

###  sectionsPanels

• **sectionsPanels**: *number[]* =  []

*Defined in [cs-map/src/components/feature-details/feature-details.ts:34](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L34)*

___

###  tabs

• **tabs**: *string* = "feature-details"

*Defined in [cs-map/src/components/feature-details/feature-details.ts:35](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L35)*

## Accessors

###  feature

• **get feature**(): *Feature | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:87](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L87)*

get active feature

**Returns:** *Feature | undefined*

___

###  filterPropertiesEnabled

• **get filterPropertiesEnabled**(): *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:40](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L40)*

**Returns:** *boolean*

___

###  layer

• **get layer**(): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:54](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L54)*

get active layer

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:72](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L72)*

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:80](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L80)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  properties

• **get properties**(): *any[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:223](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L223)*

**Returns:** *any[]*

___

###  title

• **get title**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:62](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L62)*

get feature title

**Returns:** *string*

## Methods

###  centerFeature

▸ **centerFeature**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:237](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L237)*

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:258](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L258)*

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(`v`: string): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:45](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string |

**Returns:** *void*

___

###  initMenu

▸ **initMenu**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:243](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L243)*

**Returns:** *void*

___

### `Private` propertyFilter

▸ **propertyFilter**(`prop`: [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md), `filter`: string): *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:94](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) |
`filter` | string |

**Returns:** *boolean*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:211](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |

**Returns:** *void*

___

###  updateFilter

▸ **updateFilter**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:49](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L49)*

**Returns:** *void*

___

###  updateSections

▸ **updateSections**(): *any[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:108](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-map/src/components/feature-details/feature-details.ts#L108)*

get list of available section, with their properties

**Returns:** *any[]*
