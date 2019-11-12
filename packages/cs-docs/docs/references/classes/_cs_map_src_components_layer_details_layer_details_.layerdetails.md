# Class: LayerDetails

## Hierarchy

* any

  ↳ **LayerDetails**

## Properties

### `Optional` allFeatures

• **allFeatures**? : *Feature[]*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:19](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L19)*

___

###  filter

• **filter**: *string* = ""

*Defined in [cs-map/src/components/layer-details/layer-details.ts:18](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L18)*

___

###  filterItems

• **filterItems**: *string* = ""

*Defined in [cs-map/src/components/layer-details/layer-details.ts:17](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L17)*

___

###  filteredFeatures

• **filteredFeatures**: *Feature[]* =  []

*Defined in [cs-map/src/components/layer-details/layer-details.ts:44](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L44)*

## Accessors

###  layer

• **get layer**(): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:28](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L28)*

get active layer

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:57](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L57)*

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:65](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L65)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  title

• **get title**(): *string*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:47](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L47)*

get feature title

**Returns:** *string*

## Methods

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:99](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L99)*

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(`v`: string): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:23](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string |

**Returns:** *void*

___

### `Private` filterFeature

▸ **filterFeature**(`f`: Feature, `s`: string): *boolean*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:38](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L38)*

returns true if features is included filter

**Parameters:**

Name | Type |
------ | ------ |
`f` | Feature |
`s` | string |

**Returns:** *boolean*

___

###  fitLayer

▸ **fitLayer**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:71](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L71)*

**Returns:** *void*

___

### `Private` getAllFeatures

▸ **getAllFeatures**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:83](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L83)*

**Returns:** *void*

___

###  openFeature

▸ **openFeature**(`feature`: any): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:77](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | any |

**Returns:** *void*

___

### `Private` updateFeatures

▸ **updateFeatures**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:91](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/components/layer-details/layer-details.ts#L91)*

**Returns:** *void*
