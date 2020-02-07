# Class: BaseLayer

## Hierarchy

* **BaseLayer**

  ↳ [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)

## Implements

* any

## Constructors

###  constructor

\+ **new BaseLayer**(`init?`: Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›): *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)*

*Defined in [cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)*

## Properties

###  _busManager

• **_busManager**: *[MessageBusManager](_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)* =  new MessageBusManager()

*Defined in [cs-map/src/layers/base-layer.ts:46](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L46)*

___

###  _events

• **_events**: *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-map/src/layers/base-layer.ts:47](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L47)*

___

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Defined in [cs-map/src/layers/base-layer.ts:48](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L48)*

___

###  _featureType

• **_featureType**: *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:49](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L49)*

___

### `Optional` _filters

• **_filters**? : *object*

*Defined in [cs-map/src/layers/base-layer.ts:50](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L50)*

#### Type declaration:

* \[ **key**: *string*\]: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Defined in [cs-map/src/layers/base-layer.ts:52](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L52)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:54](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L54)*

list of active layers

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:55](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L55)*

___

### `Optional` _parent

• **_parent**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/layers/base-layer.ts:56](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L56)*

___

### `Private` `Optional` _popupTemplate

• **_popupTemplate**? : *Handlebars.TemplateDelegate*

*Defined in [cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L121)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Defined in [cs-map/src/layers/base-layer.ts:57](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L57)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L58)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:59](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L59)*

___

### `Optional` _source

• **_source**? : *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:61](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L61)*

___

### `Private` `Optional` _titleTemplate

• **_titleTemplate**? : *Handlebars.TemplateDelegate*

*Defined in [cs-map/src/layers/base-layer.ts:120](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L120)*

___

###  color

• **color**: *string* = "blue"

*Defined in [cs-map/src/layers/base-layer.ts:63](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L63)*

___

### `Optional` defaultFeatureType

• **defaultFeatureType**? : *string*

*Defined in [cs-map/src/layers/base-layer.ts:65](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L65)*

if multiple feature types are avaible, this is the default feature type key

___

###  description

• **description**: *string* = ""

*Defined in [cs-map/src/layers/base-layer.ts:67](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L67)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:69](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L69)*

___

### `Optional` enabled

• **enabled**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:109](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L109)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:70](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L70)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md)*

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L117)*

___

### `Optional` filter

• **filter**? : *any[]*

*Defined in [cs-map/src/layers/base-layer.ts:85](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L85)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:87](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L87)*

___

###  id

• **id**: *string*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L88)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Defined in [cs-map/src/layers/base-layer.ts:104](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L104)*

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [cs-map/src/layers/base-layer.ts:105](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L105)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:106](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L106)*

___

### `Optional` source

• **source**? : *string | [DataSource](_cs_data_src_classes_data_source_.datasource.md)*

*Defined in [cs-map/src/layers/base-layer.ts:107](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L107)*

___

### `Optional` state

• **state**? : *"hidden" | "loading" | "visible"*

*Defined in [cs-map/src/layers/base-layer.ts:108](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L108)*

___

### `Optional` style

• **style**? : *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Defined in [cs-map/src/layers/base-layer.ts:110](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L110)*

___

###  supportLayers

• **supportLayers**: *string[]* =  []

*Defined in [cs-map/src/layers/base-layer.ts:71](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L71)*

___

###  tags

• **tags**: *string[]* =  []

*Defined in [cs-map/src/layers/base-layer.ts:112](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L112)*

___

###  title

• **title**: *string* = ""

*Defined in [cs-map/src/layers/base-layer.ts:115](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L115)*

___

### `Optional` typeId

• **typeId**? : *string* = "geojson"

*Defined in [cs-map/src/layers/base-layer.ts:116](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L116)*

## Accessors

###  Map

• **get Map**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:137](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L137)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

___

###  MapControl

• **get MapControl**(): *mapboxgl.Map | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:147](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L147)*

**Returns:** *mapboxgl.Map | undefined*

## Methods

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:175](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  addSupportLayer

▸ **addSupportLayer**(`layer`: mapboxgl.Layer): *void*

*Defined in [cs-map/src/layers/base-layer.ts:388](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L388)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | mapboxgl.Layer |

**Returns:** *void*

___

###  applyFilter

▸ **applyFilter**(`filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:182](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

### `Private` createDefaultPopup

▸ **createDefaultPopup**(`f`: Feature, `style`: [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md), `ft`: [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md)): *string*

*Defined in [cs-map/src/layers/base-layer.ts:464](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L464)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | Feature |
`style` | [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md) |
`ft` | [FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) |

**Returns:** *string*

___

###  getBounds

▸ **getBounds**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:222](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L222)*

**Returns:** *void*

___

###  getFeatureType

▸ **getFeatureType**(): *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:177](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L177)*

**Returns:** *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

___

###  getLayerActions

▸ **getLayerActions**(): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:224](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L224)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getStyleLegend

▸ **getStyleLegend**(`styleKey`: string, `style?`: any): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:274](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L274)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |
`style?` | any |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  getStyleLegendKey

▸ **getStyleLegendKey**(`styleKey`: string): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/layers/base-layer.ts:296](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L296)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  initFilter

▸ **initFilter**(`property`: string): *void*

*Defined in [cs-map/src/layers/base-layer.ts:309](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L309)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | string |

**Returns:** *void*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/layers/base-layer.ts:321](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L321)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Defined in [cs-map/src/layers/base-layer.ts:330](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L330)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup

▸ **parsePopup**(`f?`: mapboxgl.MapboxGeoJSONFeature): *string*

*Defined in [cs-map/src/layers/base-layer.ts:332](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L332)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | mapboxgl.MapboxGeoJSONFeature |

**Returns:** *string*

___

###  parseTitle

▸ **parseTitle**(`f?`: mapboxgl.MapboxGeoJSONFeature): *string*

*Defined in [cs-map/src/layers/base-layer.ts:355](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L355)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | mapboxgl.MapboxGeoJSONFeature |

**Returns:** *string*

___

###  removeFilter

▸ **removeFilter**(`filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:413](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L413)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:376](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L376)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) | [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [cs-map/src/layers/base-layer.ts:395](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L395)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) &#124; [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setFilter

▸ **setFilter**(`filter`: any[]): *void*

*Defined in [cs-map/src/layers/base-layer.ts:400](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L400)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) | [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Defined in [cs-map/src/layers/base-layer.ts:428](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L428)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) &#124; [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Defined in [cs-map/src/layers/base-layer.ts:433](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L433)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  setPopupContent

▸ **setPopupContent**(`value`: string | function): *void*

*Defined in [cs-map/src/layers/base-layer.ts:435](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L435)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; function |

**Returns:** *void*

___

### `Private` updateFilterArray

▸ **updateFilterArray**(`filter`: any[]): *void*

*Defined in [cs-map/src/layers/base-layer.ts:479](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L479)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *void*

___

###  updateFilters

▸ **updateFilters**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:439](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L439)*

**Returns:** *void*

___

###  updateGeojson

▸ **updateGeojson**(`data`: [DataSet](_cs_data_src_classes_data_set_.dataset.md)): *void*

*Defined in [cs-map/src/layers/base-layer.ts:446](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L446)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DataSet](_cs_data_src_classes_data_set_.dataset.md) |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:452](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L452)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:454](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L454)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *MapboxGeoJSONFeature | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:34](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *MapboxGeoJSONFeature | undefined*

## Object literals

###  intlData

### ▪ **intlData**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:89](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L89)*

###  locales

• **locales**: *string* = "en-US"

*Defined in [cs-map/src/layers/base-layer.ts:90](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L90)*

▪ **formats**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:91](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L91)*

* **number**: *object*

  * **USD**: *object*

    * **currency**: *string* = "USD"

    * **style**: *string* = "currency"

  * **percentage**: *object*

    * **style**: *string* = "percent"
