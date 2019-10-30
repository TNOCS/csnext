# Class: BaseLayer

## Hierarchy

* **BaseLayer**

  ↳ [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)

  ↳ [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)

## Implements

* any

## Constructors

###  constructor

\+ **new BaseLayer**(`init?`: Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)*

*Defined in [cs-map/src/layers/base-layer.ts:118](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)*

## Properties

### `Optional` _events

• **_events**? : *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-map/src/layers/base-layer.ts:95](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L95)*

___

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Defined in [cs-map/src/layers/base-layer.ts:98](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L98)*

___

### `Optional` _featureEventHandle

• **_featureEventHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/base-layer.ts:118](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L118)*

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Defined in [cs-map/src/layers/base-layer.ts:53](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L53)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:114](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L114)*

list of active layers

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:94](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L94)*

___

### `Optional` _opacity

• **_opacity**? : *number*

*Defined in [cs-map/src/layers/base-layer.ts:99](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L99)*

___

### `Optional` _parent

• **_parent**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/layers/base-layer.ts:75](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L75)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Defined in [cs-map/src/layers/base-layer.ts:83](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L83)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:116](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L116)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L117)*

___

### `Optional` _source

• **_source**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:52](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L52)*

___

###  color

• **color**: *string* = "blue"

*Defined in [cs-map/src/layers/base-layer.ts:72](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L72)*

___

###  description

• **description**: *string* = ""

*Defined in [cs-map/src/layers/base-layer.ts:62](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L62)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L81)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:97](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L97)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Defined in [cs-map/src/layers/base-layer.ts:112](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L112)*

___

### `Optional` filter

• **filter**? : *any*

*Defined in [cs-map/src/layers/base-layer.ts:76](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L76)*

___

###  id

• **id**: *string*

*Defined in [cs-map/src/layers/base-layer.ts:55](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L55)*

___

### `Optional` layout

• **layout**? : *mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout*

*Defined in [cs-map/src/layers/base-layer.ts:84](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L84)*

___

### `Optional` opacity

• **opacity**? : *number* = 1

*Defined in [cs-map/src/layers/base-layer.ts:67](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L67)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:79](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L79)*

___

### `Optional` paint

• **paint**? : *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Defined in [cs-map/src/layers/base-layer.ts:89](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L89)*

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [cs-map/src/layers/base-layer.ts:74](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L74)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:96](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L96)*

___

### `Optional` source

• **source**? : *string | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:63](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L63)*

___

### `Optional` style

• **style**? : *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Defined in [cs-map/src/layers/base-layer.ts:73](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L73)*

___

###  tags

• **tags**: *string[]* =  []

*Defined in [cs-map/src/layers/base-layer.ts:70](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L70)*

___

###  title

• **title**: *string* = ""

*Defined in [cs-map/src/layers/base-layer.ts:59](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L59)*

___

### `Optional` typeId

• **typeId**? : *string* = "geojson"

*Defined in [cs-map/src/layers/base-layer.ts:54](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L54)*

___

### `Optional` visible

• **visible**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:64](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L64)*

## Accessors

###  Visible

• **get Visible**(): *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:31](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L31)*

**Returns:** *boolean | undefined*

• **set Visible**(`value`: boolean | undefined): *void*

*Defined in [cs-map/src/layers/base-layer.ts:35](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean &#124; undefined |

**Returns:** *void*

## Methods

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:130](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  getBounds

▸ **getBounds**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:128](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L128)*

**Returns:** *void*

___

###  getLayerActions

▸ **getLayerActions**(): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:134](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L134)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getStyleLegend

▸ **getStyleLegend**(`styleKey`: string, `style`: any): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:217](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |
`style` | any |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  getStyleLegendKey

▸ **getStyleLegendKey**(`styleKey`: string): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:204](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:132](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Defined in [cs-map/src/layers/base-layer.ts:192](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup

▸ **parsePopup**(`f?`: Feature): *any*

*Defined in [cs-map/src/layers/base-layer.ts:244](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  parseTitle

▸ **parseTitle**(`f?`: Feature): *any*

*Defined in [cs-map/src/layers/base-layer.ts:254](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L254)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:191](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L191)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [cs-map/src/layers/base-layer.ts:194](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [cs-map/src/layers/base-layer.ts:199](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Defined in [cs-map/src/layers/base-layer.ts:133](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:190](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L190)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:237](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L237)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *Feature | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:42](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *Feature | undefined*
