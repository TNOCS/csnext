# Class: DataChart

## Hierarchy

* any

  ↳ **DataChart**

## Properties

###  $refs

• **$refs**: *object*

Defined in cs-map/src/components/data-chart/data-chart.ts:29

#### Type declaration:

* **vegachart**: *HTMLElement*

___

###  data

• **data**: *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md)*

Defined in cs-map/src/components/data-chart/data-chart.ts:24

___

###  features

• **features**: *mapboxgl.MapboxGeoJSONFeature[]*

Defined in cs-map/src/components/data-chart/data-chart.ts:27

___

###  layer

• **layer**: *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

Defined in cs-map/src/components/data-chart/data-chart.ts:26

___

###  panel

• **panel**: *[InsightDashboardPanel](../interfaces/_cs_data_src_interfaces_insight_.insightdashboardpanel.md)*

Defined in cs-map/src/components/data-chart/data-chart.ts:23

___

###  section

• **section**: *[InsightSection](../interfaces/_cs_data_src_interfaces_insight_.insightsection.md)*

Defined in cs-map/src/components/data-chart/data-chart.ts:25

___

###  vegadata

• **vegadata**: *any*

Defined in cs-map/src/components/data-chart/data-chart.ts:33

## Accessors

###  dataSources

• **get dataSources**(): *[DataSources](_cs_data_src_classes_data_sources_.datasources.md) | undefined*

Defined in cs-map/src/components/data-chart/data-chart.ts:43

**Returns:** *[DataSources](_cs_data_src_classes_data_sources_.datasources.md) | undefined*

___

###  options

• **get options**(): *[DataChartOptions](_cs_map_src_components_data_chart_data_chart_options_.datachartoptions.md)*

Defined in cs-map/src/components/data-chart/data-chart.ts:35

**Returns:** *[DataChartOptions](_cs_map_src_components_data_chart_data_chart_options_.datachartoptions.md)*

___

###  vegaid

• **get vegaid**(): *string*

Defined in cs-map/src/components/data-chart/data-chart.ts:49

**Returns:** *string*

## Methods

###  contentLoaded

▸ **contentLoaded**(`d`: [DataSources](_cs_data_src_classes_data_sources_.datasources.md)): *void*

Defined in cs-map/src/components/data-chart/data-chart.ts:57

**Parameters:**

Name | Type |
------ | ------ |
`d` | [DataSources](_cs_data_src_classes_data_sources_.datasources.md) |

**Returns:** *void*

___

### `Private` getPropertyGroupValues

▸ **getPropertyGroupValues**(): *any*

Defined in cs-map/src/components/data-chart/data-chart.ts:231

**Returns:** *any*

___

### `Private` getTitle

▸ **getTitle**(`key?`: string): *string*

Defined in cs-map/src/components/data-chart/data-chart.ts:214

**Parameters:**

Name | Type |
------ | ------ |
`key?` | string |

**Returns:** *string*

___

###  mounted

▸ **mounted**(): *void*

Defined in cs-map/src/components/data-chart/data-chart.ts:53

**Returns:** *void*

___

###  updateChart

▸ **updateChart**(): *void*

Defined in cs-map/src/components/data-chart/data-chart.ts:77

**Returns:** *void*

___

### `Private` updateVega

▸ **updateVega**(`spec`: any): *void*

Defined in cs-map/src/components/data-chart/data-chart.ts:227

**Parameters:**

Name | Type |
------ | ------ |
`spec` | any |

**Returns:** *void*
