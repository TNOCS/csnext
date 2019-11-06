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

*Defined in [cs-map/src/layers/base-layer.ts:123](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L123)*
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)*

## Properties

### `Optional` _events

• **_events**? : *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-map/src/layers/base-layer.ts:100](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L100)*

___

*Defined in [cs-map/src/layers/base-layer.ts:100](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L100)*

___

### `Optional` _featureEventHandle

• **_featureEventHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/base-layer.ts:103](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L103)*

• **_initialized**? : *boolean* = false

*Defined in [cs-map/src/layers/base-layer.ts:56](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L56)*

___

*Defined in [cs-map/src/layers/base-layer.ts:123](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L123)*

list of active layers

___

### `Optional` _manager

*Defined in [cs-map/src/layers/base-layer.ts:56](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L56)*

### `Optional` _parent

• **_parent**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/layers/base-layer.ts:75](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L75)*

*Defined in [cs-map/src/layers/base-layer.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L119)*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L88)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:99](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L99)*

• **_showMore**? : *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:122](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L122)*

___

*Defined in [cs-map/src/layers/base-layer.ts:75](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L75)*

___

### `Private` `Optional` _titleTemplate

• **_titleTemplate**? : *Handlebars.TemplateDelegate*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L88)*

• **color**: *string* = "blue"

*Defined in [cs-map/src/layers/base-layer.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L72)*

___

*Defined in [cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L121)*

if multiple feature types are avaible, this is the default feature type key

___

###  description

*Defined in [cs-map/src/layers/base-layer.ts:122](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L122)*

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:86](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L86)*

*Defined in [cs-map/src/layers/base-layer.ts:55](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L55)*

___

### `Private` `Optional` _titleTemplate

• **_titleTemplate**? : *Handlebars.TemplateDelegate*

*Defined in [cs-map/src/layers/base-layer.ts:32](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L32)*

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L117)*

___

### `Optional` filter

*Defined in [cs-map/src/layers/base-layer.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L72)*

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L81)*

*Defined in [cs-map/src/layers/base-layer.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L78)*

*Defined in [cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L58)*

___

### `Optional` layout

• **layout**? : *mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout*

*Defined in [cs-map/src/layers/base-layer.ts:65](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L65)*

• **openFeatureDetails**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:84](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L84)*

___

*Defined in [cs-map/src/layers/base-layer.ts:86](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L86)*

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [cs-map/src/layers/base-layer.ts:102](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L102)*

• **popupContent**? : *string | Function | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:101](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L101)*

___

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L117)*

___

### `Optional` style

• **style**? : *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Defined in [cs-map/src/layers/base-layer.ts:76](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L76)*

• **tags**: *string[]* =  []

*Defined in [cs-map/src/layers/base-layer.ts:70](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L70)*

___

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L81)*

___

### `Optional` typeId

• **typeId**? : *string* = "geojson"

*Defined in [cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L58)*

• **visible**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:67](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L67)*

## Accessors

*Defined in [cs-map/src/layers/base-layer.ts:89](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L89)*

**Returns:** *boolean | undefined*

• **set Visible**(`value`: boolean | undefined): *void*

*Defined in [cs-map/src/layers/base-layer.ts:38](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L38)*

*Defined in [cs-map/src/layers/base-layer.ts:84](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L84)*

**Returns:** *void*

## Methods

###  addLayer

*Defined in [cs-map/src/layers/base-layer.ts:94](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L94)*

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

*Defined in [cs-map/src/layers/base-layer.ts:74](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L74)*

*Defined in [cs-map/src/layers/base-layer.ts:133](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L133)*

**Returns:** *void*

___

*Defined in [cs-map/src/layers/base-layer.ts:101](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L101)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getStyleLegend

*Defined in [cs-map/src/layers/base-layer.ts:66](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L66)*

Name | Type |
------ | ------ |
`styleKey` | string |
`style` | any |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*
*Defined in [cs-map/src/layers/base-layer.ts:73](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L73)*
▸ **getStyleLegendKey**(`styleKey`: string): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:217](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L217)*

**Parameters:**

Name | Type |
*Defined in [cs-map/src/layers/base-layer.ts:70](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L70)*
___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:152](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L152)*
*Defined in [cs-map/src/layers/base-layer.ts:62](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L62)*
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  moveLayer
*Defined in [cs-map/src/layers/base-layer.ts:57](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L57)*
**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*
*Defined in [cs-map/src/layers/base-layer.ts:67](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L67)*
▸ **parsePopup**(`f?`: Feature): *any*

*Defined in [cs-map/src/layers/base-layer.ts:257](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L257)*

**Parameters:**

Name | Type |
*Defined in [cs-map/src/layers/base-layer.ts:34](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L34)*
___

###  parseTitle

▸ **parseTitle**(`f?`: Feature): *any*
*Defined in [cs-map/src/layers/base-layer.ts:38](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L38)*
Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:204](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L204)*

**Parameters:**
*Defined in [cs-map/src/layers/base-layer.ts:150](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L150)*
**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [cs-map/src/layers/base-layer.ts:207](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string |
*Defined in [cs-map/src/layers/base-layer.ts:133](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L133)*

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [cs-map/src/layers/base-layer.ts:212](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L212)*

**Parameters:**

*Defined in [cs-map/src/layers/base-layer.ts:154](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L154)*
**Returns:** *void*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Defined in [cs-map/src/layers/base-layer.ts:153](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L153)*
*Defined in [cs-map/src/layers/base-layer.ts:230](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L230)*
`value` | number |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:203](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L203)*

**Returns:** *void*

___

*Defined in [cs-map/src/layers/base-layer.ts:217](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L217)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *Feature | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
*Defined in [cs-map/src/layers/base-layer.ts:152](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L152)*

###  intlData

### ▪ **intlData**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:135](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L135)*

###  locales

• **locales**: *string* = "en-US"

*Defined in [cs-map/src/layers/base-layer.ts:136](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L136)*

▪ **formats**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:205](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L205)*

    * **currency**: *string* = "USD"

    * **style**: *string* = "currency"

  * **percentage**: *object*

    * **style**: *string* = "percent"
*Defined in [cs-map/src/layers/base-layer.ts:257](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L257)*
*Defined in [cs-map/src/layers/base-layer.ts:267](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L267)*
*Defined in [cs-map/src/layers/base-layer.ts:204](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L204)*
*Defined in [cs-map/src/layers/base-layer.ts:207](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L207)*
*Defined in [cs-map/src/layers/base-layer.ts:212](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L212)*
*Defined in [cs-map/src/layers/base-layer.ts:153](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L153)*
*Defined in [cs-map/src/layers/base-layer.ts:203](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L203)*
*Defined in [cs-map/src/layers/base-layer.ts:250](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L250)*
*Defined in [cs-map/src/layers/base-layer.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L45)*

## Object literals

###  intlData

### ▪ **intlData**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:135](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L135)*

###  locales

• **locales**: *string* = "en-US"

*Defined in [cs-map/src/layers/base-layer.ts:136](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L136)*

▪ **formats**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:137](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L137)*

* **number**: *object*

  * **USD**: *object*

    * **currency**: *string* = "USD"

    * **style**: *string* = "currency"

  * **percentage**: *object*

    * **style**: *string* = "percent"
