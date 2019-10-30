# Class: LayerDetails

## Hierarchy

* any

  ↳ **LayerDetails**

## Properties

###  filterItems

• **filterItems**: *string* = ""

*Defined in [cs-map/src/components/layer-details/layer-details.ts:37](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L37)*

___

###  filterProperties

• **filterProperties**: *string* = ""

*Defined in [cs-map/src/components/layer-details/layer-details.ts:35](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L35)*

___

###  filterPropertiesEnabled

• **filterPropertiesEnabled**: *boolean* = false

*Defined in [cs-map/src/components/layer-details/layer-details.ts:36](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L36)*

___

###  sectionsPanels

• **sectionsPanels**: *boolean[]* =  []

*Defined in [cs-map/src/components/layer-details/layer-details.ts:33](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L33)*

___

###  tabs

• **tabs**: *string* = "layer-items"

*Defined in [cs-map/src/components/layer-details/layer-details.ts:34](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L34)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:32](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L32)*

## Accessors

###  filteredFeatures

• **get filteredFeatures**(): *Feature[]*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:58](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L58)*

**Returns:** *Feature[]*

___

###  layer

• **get layer**(): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:40](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L40)*

get active layer

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:79](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L79)*

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:87](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L87)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  title

• **get title**(): *string*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:69](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L69)*

get feature title

**Returns:** *string*

## Methods

###  fitLayer

▸ **fitLayer**(): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:93](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L93)*

**Returns:** *void*

___

###  openFeature

▸ **openFeature**(`feature`: any): *void*

*Defined in [cs-map/src/components/layer-details/layer-details.ts:99](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/layer-details/layer-details.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | any |

**Returns:** *void*
