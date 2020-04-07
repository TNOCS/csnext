# Class: LayerDetails

## Hierarchy

* any

  ↳ **LayerDetails**

## Properties

### `Optional` allFeatures

• **allFeatures**? : *mapboxgl.MapboxGeoJSONFeature[]*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:17](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L17)*

___

###  filterItems

• **filterItems**: *string* = ""

*Defined in [cs-map/src/components/layer-details/layer-details.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L19)*

___

###  filteredFeatures

• **filteredFeatures**: *mapboxgl.MapboxGeoJSONFeature[]* =  []

*Defined in [cs-map/src/components/layer-details/layer-details.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L20)*

___

###  listFilter

• **listFilter**: *string* = ""

*Defined in [cs-map/src/components/layer-details/layer-details.ts:18](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L18)*

## Accessors

###  layer

• **get layer**(): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:27](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L27)*

get active layer

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:35](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L35)*

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:43](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L43)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  title

• **get title**(): *string*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:50](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L50)*

get feature title

**Returns:** *string*

## Methods

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:63](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L63)*

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(`v`: string): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:68](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string |

**Returns:** *void*

___

### `Private` filterFeature

▸ **filterFeature**(`f`: mapboxgl.MapboxGeoJSONFeature, `s`: string): *boolean*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:89](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L89)*

returns true if features is included filter

**Parameters:**

Name | Type |
------ | ------ |
`f` | mapboxgl.MapboxGeoJSONFeature |
`s` | string |

**Returns:** *boolean*

___

###  fitLayer

▸ **fitLayer**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:72](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L72)*

**Returns:** *void*

___

### `Private` getAllFeatures

▸ **getAllFeatures**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:95](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L95)*

**Returns:** *void*

___

###  openFeature

▸ **openFeature**(`feature`: any): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:78](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | any |

**Returns:** *void*

___

### `Private` updateFeatures

▸ **updateFeatures**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:101](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/layer-details/layer-details.ts#L101)*

**Returns:** *void*
