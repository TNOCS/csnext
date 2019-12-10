# Class: FeatureDetails

## Hierarchy

* any

  ↳ **FeatureDetails**

## Properties

###  filter

• **filter**: *string* = ""

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:45](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L45)*

___

###  sections

• **sections**: *[section](_cs_map_src_components_feature_details_feature_details_.section.md)[]* =  []

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:46](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L46)*

___

###  sectionsPanels

• **sectionsPanels**: *number[]* =  []

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:47](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L47)*

___

###  tabs

• **tabs**: *string* = "feature-details"

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:48](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L48)*

## Accessors

###  feature

• **get feature**(): *Feature | undefined*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:55](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L55)*

get active feature

**Returns:** *Feature | undefined*

___

###  filterPropertiesEnabled

• **get filterPropertiesEnabled**(): *boolean*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:62](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L62)*

**Returns:** *boolean*

___

###  layer

• **get layer**(): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:67](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L67)*

get active layer

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:75](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L75)*

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:83](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L83)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  properties

• **get properties**(): *any[]*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:89](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L89)*

**Returns:** *any[]*

___

###  title

• **get title**(): *string*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:104](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L104)*

get feature title

**Returns:** *string*

## Methods

###  centerFeature

▸ **centerFeature**(): *void*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:117](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L117)*

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:123](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L123)*

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(): *void*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:150](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L150)*

**Returns:** *void*

___

###  initMenu

▸ **initMenu**(): *void*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:154](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L154)*

**Returns:** *void*

___

### `Private` propertyFilter

▸ **propertyFilter**(`prop`: [PropertyType](_cs_map_src_classes_property_type_.propertytype.md), `filter`: string): *boolean*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:281](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L281)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) |
`filter` | string |

**Returns:** *boolean*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:169](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |

**Returns:** *void*

___

###  updateFilter

▸ **updateFilter**(): *void*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:181](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L181)*

**Returns:** *void*

___

###  updateSections

▸ **updateSections**(): *any[]*

*Defined in [packages/cs-map/src/components/feature-details/feature-details.ts:186](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/feature-details/feature-details.ts#L186)*

get list of available section, with their properties

**Returns:** *any[]*
