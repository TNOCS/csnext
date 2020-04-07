# Class: DataProperties

## Hierarchy

* any

  ↳ **DataProperties**

## Properties

### `Optional` data

• **data**? : *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md)*

Defined in cs-map/src/components/data-properties/data-properties.ts:20

___

### `Optional` feature

• **feature**? : *mapboxgl.MapboxGeoJSONFeature*

Defined in cs-map/src/components/data-properties/data-properties.ts:23

___

### `Private` featureSectionsExpanded

• **featureSectionsExpanded**: *object*

Defined in cs-map/src/components/data-properties/data-properties.ts:28

#### Type declaration:

* \[ **key**: *string*\]: string[]

___

### `Optional` features

• **features**? : *mapboxgl.MapboxGeoJSONFeature[]*

Defined in cs-map/src/components/data-properties/data-properties.ts:22

___

### `Private` filterPropertiesEnabled

• **filterPropertiesEnabled**: *boolean* = false

Defined in cs-map/src/components/data-properties/data-properties.ts:27

___

### `Optional` layer

• **layer**? : *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

Defined in cs-map/src/components/data-properties/data-properties.ts:24

___

### `Optional` panel

• **panel**? : *[InsightDashboardPanel](../interfaces/_cs_data_src_interfaces_insight_.insightdashboardpanel.md)*

Defined in cs-map/src/components/data-properties/data-properties.ts:19

___

### `Optional` section

• **section**? : *[InsightSection](../interfaces/_cs_data_src_interfaces_insight_.insightsection.md)*

Defined in cs-map/src/components/data-properties/data-properties.ts:21

___

###  sections

• **sections**: *[PropertySection](_cs_map_src_components_feature_details_property_section_.propertysection.md)[]* =  []

Defined in cs-map/src/components/data-properties/data-properties.ts:25

___

### `Private` sectionsPanels

• **sectionsPanels**: *number[]* =  []

Defined in cs-map/src/components/data-properties/data-properties.ts:29

## Accessors

###  style

• **get style**(): *string*

Defined in cs-map/src/components/data-properties/data-properties.ts:48

**Returns:** *string*

## Methods

###  mounted

▸ **mounted**(): *void*

Defined in cs-map/src/components/data-properties/data-properties.ts:157

**Returns:** *void*

___

###  saveSectionsState

▸ **saveSectionsState**(): *void*

Defined in cs-map/src/components/data-properties/data-properties.ts:167

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md)): *void*

Defined in cs-map/src/components/data-properties/data-properties.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) |

**Returns:** *void*

___

###  updateSections

▸ **updateSections**(): *void*

Defined in cs-map/src/components/data-properties/data-properties.ts:52

**Returns:** *void*
