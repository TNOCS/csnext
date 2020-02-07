# Class: FeatureDetails

## Hierarchy

* any

  ↳ **FeatureDetails**

## Properties

### `Private` featureSectionsExpanded

• **featureSectionsExpanded**: *object*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:31](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L31)*

#### Type declaration:

* \[ **key**: *string*\]: string[]

___

###  filter

• **filter**: *string* = ""

*Defined in [cs-map/src/components/feature-details/feature-details.ts:26](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L26)*

___

###  sections

• **sections**: *[PropertySection](_cs_map_src_components_feature_details_property_section_.propertysection.md)[]* =  []

*Defined in [cs-map/src/components/feature-details/feature-details.ts:27](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L27)*

___

###  sectionsPanels

• **sectionsPanels**: *number[]* =  []

*Defined in [cs-map/src/components/feature-details/feature-details.ts:28](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L28)*

___

###  tabs

• **tabs**: *string* = "feature-details"

*Defined in [cs-map/src/components/feature-details/feature-details.ts:29](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L29)*

## Accessors

###  feature

• **get feature**(): *mapboxgl.MapboxGeoJSONFeature | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:38](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L38)*

get active feature

**Returns:** *mapboxgl.MapboxGeoJSONFeature | undefined*

___

###  filterPropertiesEnabled

• **get filterPropertiesEnabled**(): *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:45](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L45)*

**Returns:** *boolean*

___

###  layer

• **get layer**(): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:50](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L50)*

get active layer

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:58](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L58)*

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:66](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L66)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  properties

• **get properties**(): *any[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:72](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L72)*

**Returns:** *any[]*

___

###  title

• **get title**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:86](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L86)*

get feature title

**Returns:** *string*

## Methods

###  centerFeature

▸ **centerFeature**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:99](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L99)*

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:105](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L105)*

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:132](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L132)*

**Returns:** *void*

___

###  initMenu

▸ **initMenu**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:136](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L136)*

**Returns:** *void*

___

### `Private` propertyFilter

▸ **propertyFilter**(`prop`: [PropertyType](_cs_data_src_classes_property_type_.propertytype.md), `filter`: string): *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:288](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L288)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) |
`filter` | string |

**Returns:** *boolean*

___

###  saveSectionsState

▸ **saveSectionsState**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:173](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L173)*

**Returns:** *void*

___

###  sectionChanged

▸ **sectionChanged**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:168](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L168)*

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md)): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:151](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) |

**Returns:** *void*

___

###  updateFilter

▸ **updateFilter**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:164](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L164)*

**Returns:** *void*

___

###  updateSections

▸ **updateSections**(): *any[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:186](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/feature-details/feature-details.ts#L186)*

get list of available section, with their properties

**Returns:** *any[]*
