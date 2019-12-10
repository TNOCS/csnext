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

*Defined in [packages/cs-map/src/layers/base-layer.ts:138](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)*

## Properties

###  _busManager

• **_busManager**: *[MessageBusManager](_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)* =  new MessageBusManager()

*Defined in [packages/cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L58)*

___

### `Optional` _events

• **_events**? : *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L59)*

___

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Defined in [packages/cs-map/src/layers/base-layer.ts:60](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L60)*

___

###  _featureType

• **_featureType**: *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) | undefined*

*Defined in [packages/cs-map/src/layers/base-layer.ts:61](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L61)*

___

### `Optional` _filters

• **_filters**? : *object*

*Defined in [packages/cs-map/src/layers/base-layer.ts:62](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L62)*

#### Type declaration:

* \[ **key**: *string*\]: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Defined in [packages/cs-map/src/layers/base-layer.ts:64](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L64)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [packages/cs-map/src/layers/base-layer.ts:66](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L66)*

list of active layers

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:67](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L67)*

___

### `Optional` _parent

• **_parent**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:68](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L68)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:69](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L69)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Defined in [packages/cs-map/src/layers/base-layer.ts:70](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L70)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Defined in [packages/cs-map/src/layers/base-layer.ts:71](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L71)*

___

### `Optional` _source

• **_source**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:73](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L73)*

___

### `Private` `Optional` _titleTemplate

• **_titleTemplate**? : *Handlebars.TemplateDelegate*

*Defined in [packages/cs-map/src/layers/base-layer.ts:138](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L138)*

___

###  color

• **color**: *string* = "blue"

*Defined in [packages/cs-map/src/layers/base-layer.ts:75](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L75)*

___

### `Optional` defaultFeatureType

• **defaultFeatureType**? : *string*

*Defined in [packages/cs-map/src/layers/base-layer.ts:77](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L77)*

if multiple feature types are avaible, this is the default feature type key

___

###  description

• **description**: *string* = ""

*Defined in [packages/cs-map/src/layers/base-layer.ts:79](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L79)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Defined in [packages/cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L81)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Defined in [packages/cs-map/src/layers/base-layer.ts:82](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L82)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:95](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L95)*

___

### `Optional` filter

• **filter**? : *any[]*

*Defined in [packages/cs-map/src/layers/base-layer.ts:96](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L96)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Defined in [packages/cs-map/src/layers/base-layer.ts:98](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L98)*

___

###  id

• **id**: *string*

*Defined in [packages/cs-map/src/layers/base-layer.ts:99](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L99)*

___

### `Optional` layout

• **layout**? : *mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout*

*Defined in [packages/cs-map/src/layers/base-layer.ts:114](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L114)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Defined in [packages/cs-map/src/layers/base-layer.ts:120](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L120)*

___

### `Optional` paint

• **paint**? : *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Defined in [packages/cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L121)*

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [packages/cs-map/src/layers/base-layer.ts:126](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L126)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Defined in [packages/cs-map/src/layers/base-layer.ts:127](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L127)*

___

### `Optional` source

• **source**? : *string | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:128](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L128)*

___

### `Optional` style

• **style**? : *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:129](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L129)*

___

###  tags

• **tags**: *string[]* =  []

*Defined in [packages/cs-map/src/layers/base-layer.ts:131](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L131)*

___

###  title

• **title**: *string* = ""

*Defined in [packages/cs-map/src/layers/base-layer.ts:134](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L134)*

___

### `Optional` typeId

• **typeId**? : *string* = "geojson"

*Defined in [packages/cs-map/src/layers/base-layer.ts:135](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L135)*

___

### `Optional` visible

• **visible**? : *boolean*

*Defined in [packages/cs-map/src/layers/base-layer.ts:136](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L136)*

## Accessors

###  MapControl

• **get MapControl**(): *mapboxgl.Map | undefined*

*Defined in [packages/cs-map/src/layers/base-layer.ts:156](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L156)*

**Returns:** *mapboxgl.Map | undefined*

___

###  Visible

• **get Visible**(): *boolean | undefined*

*Defined in [packages/cs-map/src/layers/base-layer.ts:167](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L167)*

**Returns:** *boolean | undefined*

• **set Visible**(`value`: boolean | undefined): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:171](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean &#124; undefined |

**Returns:** *void*

## Methods

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:184](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  applyFilter

▸ **applyFilter**(`filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:186](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

### `Private` applyFilterArray

▸ **applyFilterArray**(`filter`: any[], `newFilter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:431](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L431)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |
`newFilter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

### `Private` createDefaultPopup

▸ **createDefaultPopup**(`f`: Feature): *string*

*Defined in [packages/cs-map/src/layers/base-layer.ts:469](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L469)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | Feature |

**Returns:** *string*

___

###  getBounds

▸ **getBounds**(): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:227](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L227)*

**Returns:** *void*

___

###  getFeatureType

▸ **getFeatureType**(): *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:229](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L229)*

**Returns:** *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

___

###  getLayerActions

▸ **getLayerActions**(): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [packages/cs-map/src/layers/base-layer.ts:248](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L248)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getPropertType

▸ **getPropertType**(`prop`: string): *[PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | undefined*

*Defined in [packages/cs-map/src/layers/base-layer.ts:298](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L298)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | string |

**Returns:** *[PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | undefined*

___

###  getStyleLegend

▸ **getStyleLegend**(`styleKey`: string, `style`: any): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [packages/cs-map/src/layers/base-layer.ts:309](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L309)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |
`style` | any |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  getStyleLegendKey

▸ **getStyleLegendKey**(`styleKey`: string): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [packages/cs-map/src/layers/base-layer.ts:330](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L330)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  initFilter

▸ **initFilter**(`property`: string): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:343](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L343)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | string |

**Returns:** *void*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:354](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L354)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:356](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L356)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup

▸ **parsePopup**(`f?`: Feature): *string*

*Defined in [packages/cs-map/src/layers/base-layer.ts:358](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L358)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *string*

___

###  parseTitle

▸ **parseTitle**(`f?`: Feature): *any*

*Defined in [packages/cs-map/src/layers/base-layer.ts:371](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L371)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:382](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L382)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:387](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L387)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setFilter

▸ **setFilter**(`filter`: any[]): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:392](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L392)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:399](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L399)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:404](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L404)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  setPopupContent

▸ **setPopupContent**(`value`: string | function): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:406](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L406)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; function |

**Returns:** *void*

___

### `Private` updateFilterArray

▸ **updateFilterArray**(`filter`: any[]): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:484](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L484)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *void*

___

###  updateFilters

▸ **updateFilters**(): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:410](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L410)*

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:418](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L418)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Defined in [packages/cs-map/src/layers/base-layer.ts:420](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L420)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *Feature | undefined*

*Defined in [packages/cs-map/src/layers/base-layer.ts:46](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *Feature | undefined*

## Object literals

###  intlData

### ▪ **intlData**: *object*

*Defined in [packages/cs-map/src/layers/base-layer.ts:100](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L100)*

###  locales

• **locales**: *string* = "en-US"

*Defined in [packages/cs-map/src/layers/base-layer.ts:101](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L101)*

▪ **formats**: *object*

*Defined in [packages/cs-map/src/layers/base-layer.ts:102](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L102)*

* **number**: *object*

  * **USD**: *object*

    * **currency**: *string* = "USD"

    * **style**: *string* = "currency"

  * **percentage**: *object*

    * **style**: *string* = "percent"
