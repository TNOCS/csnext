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

*Defined in [cs-map/src/layers/base-layer.ts:123](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)*

## Properties

### `Optional` _events

• **_events**? : *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-map/src/layers/base-layer.ts:100](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L100)*

___

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Defined in [cs-map/src/layers/base-layer.ts:103](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L103)*

___

### `Optional` _featureEventHandle

• **_featureEventHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/base-layer.ts:123](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L123)*

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Defined in [cs-map/src/layers/base-layer.ts:56](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L56)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:119](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L119)*

list of active layers

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:99](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L99)*

___

### `Optional` _parent

• **_parent**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/layers/base-layer.ts:75](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L75)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L88)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:121](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L121)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:122](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L122)*

___

### `Optional` _source

• **_source**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:55](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L55)*

___

### `Private` `Optional` _titleTemplate

• **_titleTemplate**? : *Handlebars.TemplateDelegate*

*Defined in [cs-map/src/layers/base-layer.ts:32](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L32)*

___

###  color

• **color**: *string* = "blue"

*Defined in [cs-map/src/layers/base-layer.ts:72](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L72)*

___

### `Optional` defaultFeatureType

• **defaultFeatureType**? : *string*

*Defined in [cs-map/src/layers/base-layer.ts:78](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L78)*

if multiple feature types are avaible, this is the default feature type key

___

###  description

• **description**: *string* = ""

*Defined in [cs-map/src/layers/base-layer.ts:65](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L65)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:86](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L86)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:102](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L102)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L117)*

___

### `Optional` filter

• **filter**? : *any*

*Defined in [cs-map/src/layers/base-layer.ts:76](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L76)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L81)*

___

###  id

• **id**: *string*

*Defined in [cs-map/src/layers/base-layer.ts:58](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L58)*

___

### `Optional` layout

• **layout**? : *mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout*

*Defined in [cs-map/src/layers/base-layer.ts:89](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L89)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:84](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L84)*

___

### `Optional` paint

• **paint**? : *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Defined in [cs-map/src/layers/base-layer.ts:94](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L94)*

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [cs-map/src/layers/base-layer.ts:74](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L74)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:101](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L101)*

___

### `Optional` source

• **source**? : *string | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:66](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L66)*

___

### `Optional` style

• **style**? : *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Defined in [cs-map/src/layers/base-layer.ts:73](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L73)*

___

###  tags

• **tags**: *string[]* =  []

*Defined in [cs-map/src/layers/base-layer.ts:70](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L70)*

___

###  title

• **title**: *string* = ""

*Defined in [cs-map/src/layers/base-layer.ts:62](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L62)*

___

### `Optional` typeId

• **typeId**? : *string* = "geojson"

*Defined in [cs-map/src/layers/base-layer.ts:57](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L57)*

___

### `Optional` visible

• **visible**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:67](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L67)*

## Accessors

###  Visible

• **get Visible**(): *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:34](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L34)*

**Returns:** *boolean | undefined*

• **set Visible**(`value`: boolean | undefined): *void*

*Defined in [cs-map/src/layers/base-layer.ts:38](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean &#124; undefined |

**Returns:** *void*

## Methods

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:150](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  getBounds

▸ **getBounds**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:133](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L133)*

**Returns:** *void*

___

###  getLayerActions

▸ **getLayerActions**(): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:154](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L154)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getStyleLegend

▸ **getStyleLegend**(`styleKey`: string, `style`: any): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:230](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |
`style` | any |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  getStyleLegendKey

▸ **getStyleLegendKey**(`styleKey`: string): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:217](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:152](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Defined in [cs-map/src/layers/base-layer.ts:205](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup

▸ **parsePopup**(`f?`: Feature): *any*

*Defined in [cs-map/src/layers/base-layer.ts:257](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L257)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  parseTitle

▸ **parseTitle**(`f?`: Feature): *any*

*Defined in [cs-map/src/layers/base-layer.ts:267](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L267)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:204](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [cs-map/src/layers/base-layer.ts:207](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [cs-map/src/layers/base-layer.ts:212](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L212)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Defined in [cs-map/src/layers/base-layer.ts:153](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:203](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L203)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:250](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L250)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *Feature | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:45](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *Feature | undefined*

## Object literals

###  intlData

### ▪ **intlData**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:135](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L135)*

###  locales

• **locales**: *string* = "en-US"

*Defined in [cs-map/src/layers/base-layer.ts:136](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L136)*

▪ **formats**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:137](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-map/src/layers/base-layer.ts#L137)*

* **number**: *object*

  * **USD**: *object*

    * **currency**: *string* = "USD"

    * **style**: *string* = "currency"

  * **percentage**: *object*

    * **style**: *string* = "percent"
