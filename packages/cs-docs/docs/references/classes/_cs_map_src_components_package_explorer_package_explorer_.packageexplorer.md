# Class: PackageExplorer

## Hierarchy

* any

  ↳ **PackageExplorer**

## Constructors

###  constructor

\+ **new PackageExplorer**(): *[PackageExplorer](_cs_map_src_components_package_explorer_package_explorer_.packageexplorer.md)*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:29

**Returns:** *[PackageExplorer](_cs_map_src_components_package_explorer_package_explorer_.packageexplorer.md)*

## Properties

### `Private` busManager

• **busManager**: *any* =  new MessageBusManager()

Defined in cs-map/src/components/package-explorer/package-explorer.ts:29

___

###  collapsed

• **collapsed**: *boolean* = true

Defined in cs-map/src/components/package-explorer/package-explorer.ts:21

___

###  data

• **data**: *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md)*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:20

___

###  search

• **search**: *string* = ""

Defined in cs-map/src/components/package-explorer/package-explorer.ts:26

___

###  searchResult

• **searchResult**: *any[]* =  []

Defined in cs-map/src/components/package-explorer/package-explorer.ts:28

___

###  searchSelection

• **searchSelection**: *any* =  null

Defined in cs-map/src/components/package-explorer/package-explorer.ts:27

___

###  showInsightDetails

• **showInsightDetails**: *boolean* = false

Defined in cs-map/src/components/package-explorer/package-explorer.ts:24

___

###  showLegendDetails

• **showLegendDetails**: *boolean* = false

Defined in cs-map/src/components/package-explorer/package-explorer.ts:25

___

###  tab

• **tab**: *string* = "insights"

Defined in cs-map/src/components/package-explorer/package-explorer.ts:22

___

###  value

• **value**: *any[]* =  []

Defined in cs-map/src/components/package-explorer/package-explorer.ts:23

## Accessors

###  activeBookmarks

• **get activeBookmarks**(): *mapboxgl.MapboxGeoJSONFeature[]*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:52

**Returns:** *mapboxgl.MapboxGeoJSONFeature[]*

___

###  insights

• **get insights**(): *[Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md)[] | undefined*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:59

**Returns:** *[Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md)[] | undefined*

___

###  layers

• **get layers**(): *any*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:46

**Returns:** *any*

___

###  legends

• **get legends**(): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:65

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

## Methods

###  activateInsight

▸ **activateInsight**(`insight`: [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md)): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:99

**Parameters:**

Name | Type |
------ | ------ |
`insight` | [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md) |

**Returns:** *void*

___

###  activateInsightView

▸ **activateInsightView**(`view`: [InsightView](../interfaces/_cs_data_src_interfaces_insight_.insightview.md), `insight`: [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md)): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:104

**Parameters:**

Name | Type |
------ | ------ |
`view` | [InsightView](../interfaces/_cs_data_src_interfaces_insight_.insightview.md) |
`insight` | [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md) |

**Returns:** *void*

___

###  activateLayer

▸ **activateLayer**(`layer`: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:109

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:42

**Returns:** *void*

___

###  dataChanged

▸ **dataChanged**(): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:116

**Returns:** *void*

___

###  doSearch

▸ **doSearch**(`val`: string): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:83

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *void*

___

###  downloadFile

▸ **downloadFile**(): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:69

**Returns:** *void*

___

###  insightResources

▸ **insightResources**(`insight`: [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md)): *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)[]*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:136

**Parameters:**

Name | Type |
------ | ------ |
`insight` | [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md) |

**Returns:** *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)[]*

___

###  loadResource

▸ **loadResource**(`resource`: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:155

**Parameters:**

Name | Type |
------ | ------ |
`resource` | [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) |

**Returns:** *void*

___

###  openBookmarks

▸ **openBookmarks**(): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:94

**Returns:** *void*

___

###  openInsights

▸ **openInsights**(): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:89

**Returns:** *void*

___

###  resourceInfo

▸ **resourceInfo**(`resourceName`: string): *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) | undefined*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:129

**Parameters:**

Name | Type |
------ | ------ |
`resourceName` | string |

**Returns:** *[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) | undefined*

___

###  searchSelectionChanged

▸ **searchSelectionChanged**(`value`: any): *void*

Defined in cs-map/src/components/package-explorer/package-explorer.ts:76

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *void*
