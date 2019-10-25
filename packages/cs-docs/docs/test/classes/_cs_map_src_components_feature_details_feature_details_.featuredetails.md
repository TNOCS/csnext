# Class: FeatureDetails

## Hierarchy

* any

  ↳ **FeatureDetails**

## Properties

###  filterProperties

• **filterProperties**: *string* = ""

*Defined in [cs-map/src/components/feature-details/feature-details.ts:38](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L38)*

___

###  filterPropertiesEnabled

• **filterPropertiesEnabled**: *boolean* = false

*Defined in [cs-map/src/components/feature-details/feature-details.ts:39](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L39)*

___

###  sectionsPanels

• **sectionsPanels**: *number[]* =  []

*Defined in [cs-map/src/components/feature-details/feature-details.ts:36](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L36)*

___

###  tabs

• **tabs**: *string* = "feature-details"

*Defined in [cs-map/src/components/feature-details/feature-details.ts:37](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L37)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:35](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L35)*

## Accessors

###  feature

• **get feature**(): *Feature | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:84](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L84)*

get active feature

**Returns:** *Feature | undefined*

___

###  layer

• **get layer**(): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:51](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L51)*

get active layer

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md) | undefined*

___

###  layerColor

• **get layerColor**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:69](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L69)*

get layer color

**Returns:** *string*

___

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:77](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L77)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  properties

• **get properties**(): *any[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:204](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L204)*

**Returns:** *any[]*

___

###  sections

• **get sections**(): *[section](_cs_map_src_components_feature_details_feature_details_.section.md)[]*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:105](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L105)*

get list of available section, with their properties

**Returns:** *[section](_cs_map_src_components_feature_details_feature_details_.section.md)[]*

___

###  title

• **get title**(): *string*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:59](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L59)*

get feature title

**Returns:** *string*

## Methods

###  centerFeature

▸ **centerFeature**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:218](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L218)*

**Returns:** *void*

___

###  filterChanged

▸ **filterChanged**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:42](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L42)*

**Returns:** *void*

___

###  openLayer

▸ **openLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:197](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L197)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  updateFilter

▸ **updateFilter**(): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:46](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L46)*

**Returns:** *void*

___

###  updateStyle

▸ **updateStyle**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Defined in [cs-map/src/components/feature-details/feature-details.ts:179](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/feature-details/feature-details.ts#L179)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |

**Returns:** *void*
