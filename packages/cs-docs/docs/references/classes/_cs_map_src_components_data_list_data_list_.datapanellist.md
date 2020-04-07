# Class: DataPanelList

## Hierarchy

* any

  ↳ **DataPanelList**

## Properties

###  dashboard

• **dashboard**: *[InsightDashboard](../interfaces/_cs_data_src_interfaces_insight_.insightdashboard.md)*

Defined in cs-map/src/components/data-list/data-list.ts:20

___

###  data

• **data**: *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md)*

Defined in cs-map/src/components/data-list/data-list.ts:19

___

###  layer

• **layer**: *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

Defined in cs-map/src/components/data-list/data-list.ts:24

___

###  panel

• **panel**: *[InsightDashboardPanel](../interfaces/_cs_data_src_interfaces_insight_.insightdashboardpanel.md)*

Defined in cs-map/src/components/data-list/data-list.ts:21

___

###  search

• **search**: *string* = ""

Defined in cs-map/src/components/data-list/data-list.ts:23

___

###  section

• **section**: *[InsightSection](../interfaces/_cs_data_src_interfaces_insight_.insightsection.md)*

Defined in cs-map/src/components/data-list/data-list.ts:22

___

### `Optional` tab

• **tab**? : *string* =  undefined

Defined in cs-map/src/components/data-list/data-list.ts:18

## Methods

###  dataLoaded

▸ **dataLoaded**(): *void*

Defined in cs-map/src/components/data-list/data-list.ts:27

**Returns:** *void*

___

###  listHeaders

▸ **listHeaders**(): *any[]*

Defined in cs-map/src/components/data-list/data-list.ts:37

**Returns:** *any[]*

___

###  listItems

▸ **listItems**(): *Array‹Feature‹Geometry, GeoJsonProperties›› | undefined*

Defined in cs-map/src/components/data-list/data-list.ts:57

**Returns:** *Array‹Feature‹Geometry, GeoJsonProperties›› | undefined*

___

###  listSort

▸ **listSort**(): *string*

Defined in cs-map/src/components/data-list/data-list.ts:33

**Returns:** *string*

___

###  mounted

▸ **mounted**(): *void*

Defined in cs-map/src/components/data-list/data-list.ts:66

**Returns:** *void*

___

###  selectListRow

▸ **selectListRow**(`listItem`: any): *void*

Defined in cs-map/src/components/data-list/data-list.ts:61

**Parameters:**

Name | Type |
------ | ------ |
`listItem` | any |

**Returns:** *void*
