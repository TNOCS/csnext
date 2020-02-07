# Class: FeatureComponent

## Hierarchy

* any

  ↳ **FeatureComponent**

## Properties

### `Private` featureSectionsExpanded

• **featureSectionsExpanded**: *object*

Defined in cs-map/src/components/feature-details/feature-component.ts:68

#### Type declaration:

* \[ **key**: *string*\]: string[]

___

###  filter

• **filter**: *string* = ""

Defined in cs-map/src/components/feature-details/feature-component.ts:25

___

###  sections

• **sections**: *[PropertySection](_cs_map_src_components_feature_details_property_section_.propertysection.md)[]* =  []

Defined in cs-map/src/components/feature-details/feature-component.ts:26

___

###  sectionsPanels

• **sectionsPanels**: *number[]* =  []

Defined in cs-map/src/components/feature-details/feature-component.ts:27

___

###  tabs

• **tabs**: *any* =  null

Defined in cs-map/src/components/feature-details/feature-component.ts:28

## Accessors

###  dashboard

• **get dashboard**(): *[InsightDashboard](../interfaces/_cs_data_src_interfaces_insight_.insightdashboard.md)*

Defined in cs-map/src/components/feature-details/feature-component.ts:30

**Returns:** *[InsightDashboard](../interfaces/_cs_data_src_interfaces_insight_.insightdashboard.md)*

___

###  feature

• **get feature**(): *mapboxgl.MapboxGeoJSONFeature | undefined*

Defined in cs-map/src/components/feature-details/feature-component.ts:75

get active feature

**Returns:** *mapboxgl.MapboxGeoJSONFeature | undefined*

___

###  filterPropertiesEnabled

• **get filterPropertiesEnabled**(): *boolean*

Defined in cs-map/src/components/feature-details/feature-component.ts:99

**Returns:** *boolean*

___

###  isBookmarked

• **get isBookmarked**(): *boolean*

Defined in cs-map/src/components/feature-details/feature-component.ts:149

**Returns:** *boolean*

___

###  layer

• **get layer**(): *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) | undefined*

Defined in cs-map/src/components/feature-details/feature-component.ts:104

get active layer

**Returns:** *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

Defined in cs-map/src/components/feature-details/feature-component.ts:112

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md) | undefined*

Defined in cs-map/src/components/feature-details/feature-component.ts:120

**Returns:** *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md) | undefined*

___

###  panels

• **get panels**(): *string[]*

Defined in cs-map/src/components/feature-details/feature-component.ts:85

**Returns:** *string[]*

___

###  properties

• **get properties**(): *any[]*

Defined in cs-map/src/components/feature-details/feature-component.ts:126

**Returns:** *any[]*

___

###  resources

• **get resources**(): *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)[] | undefined*

Defined in cs-map/src/components/feature-details/feature-component.ts:93

**Returns:** *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)[] | undefined*

___

###  title

• **get title**(): *string*

Defined in cs-map/src/components/feature-details/feature-component.ts:140

get feature title

**Returns:** *string*

## Methods

###  centerFeature

▸ **centerFeature**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:204

**Returns:** *void*

___

###  closeSidebar

▸ **closeSidebar**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:196

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:210

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:240

**Returns:** *void*

___

###  getSectionProperties

▸ **getSectionProperties**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:161

**Returns:** *void*

___

###  getSections

▸ **getSections**(`resource`: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)): *[PropertySection](_cs_map_src_components_feature_details_property_section_.propertysection.md)[]*

Defined in cs-map/src/components/feature-details/feature-component.ts:165

**Parameters:**

Name | Type |
------ | ------ |
`resource` | [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) |

**Returns:** *[PropertySection](_cs_map_src_components_feature_details_property_section_.propertysection.md)[]*

___

###  initMenu

▸ **initMenu**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:244

**Returns:** *void*

___

### `Private` propertyFilter

▸ **propertyFilter**(`prop`: [PropertyType](_cs_data_src_classes_property_type_.propertytype.md), `filter`: string): *boolean*

Defined in cs-map/src/components/feature-details/feature-component.ts:394

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) |
`filter` | string |

**Returns:** *boolean*

___

###  saveSectionsState

▸ **saveSectionsState**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:281

**Returns:** *void*

___

###  sectionChanged

▸ **sectionChanged**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:276

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md)): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:259

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) |

**Returns:** *void*

___

###  toggleBookmark

▸ **toggleBookmark**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:153

**Returns:** *void*

___

###  updateFilter

▸ **updateFilter**(): *void*

Defined in cs-map/src/components/feature-details/feature-component.ts:272

**Returns:** *void*

___

###  updateSections

▸ **updateSections**(): *any[]*

Defined in cs-map/src/components/feature-details/feature-component.ts:294

get list of available section, with their properties

**Returns:** *any[]*
