# Class: FeatureDetails

## Hierarchy

* any

  ↳ **FeatureDetails**

## Properties

###  filterProperties

• **filterProperties**: *string* = ""

*Defined in [cs-map/src/components/feature-details/feature-details.ts:39](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L39)*

___

###  filterPropertiesEnabled

• **filterPropertiesEnabled**: *boolean* = false

*Defined in [cs-map/src/components/feature-details/feature-details.ts:40](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L40)*

___

###  sections

• **sections**: *[section](_cs_map_src_components_feature_details_feature_details_.section.md)[]* =  []

*Defined in [cs-map/src/components/feature-details/feature-details.ts:41](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L41)*

___

###  sectionsPanels

• **sectionsPanels**: *number[]* =  []

*Defined in [cs-map/src/components/feature-details/feature-details.ts:37](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L37)*

___

###  tabs

• **tabs**: *string* = "feature-details"

*Defined in [cs-map/src/components/feature-details/feature-details.ts:38](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L38)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:36](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L36)*

## Accessors

###  feature

• **get feature**(): *Feature | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:86](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L86)*

get active feature

**Returns:** *Feature | undefined*

___

###  layer

• **get layer**(): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:53](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L53)*

get active layer

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:71](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L71)*

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:79](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L79)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  properties

• **get properties**(): *any[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:235](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L235)*

**Returns:** *any[]*

___

###  title

• **get title**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:61](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L61)*

get feature title

**Returns:** *string*

## Methods

###  centerFeature

▸ **centerFeature**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:249](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L249)*

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:255](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L255)*

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:44](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L44)*

**Returns:** *void*

___

###  openLayer

▸ **openLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:228](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` propertyFilter

▸ **propertyFilter**(`prop`: [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md), `filter`: string): *boolean*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:93](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) |
`filter` | string |

**Returns:** *boolean*

___

###  updateFilter

▸ **updateFilter**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:48](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L48)*

**Returns:** *void*

___

###  updateSections

▸ **updateSections**(): *any[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:107](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L107)*

get list of available section, with their properties

**Returns:** *any[]*

___

###  updateStyle

▸ **updateStyle**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:210](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/components/feature-details/feature-details.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |

**Returns:** *void*
