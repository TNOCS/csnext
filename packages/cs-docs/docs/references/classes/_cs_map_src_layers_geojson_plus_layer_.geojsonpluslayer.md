# Class: GeojsonPlusLayer

## Hierarchy

* [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)

  ↳ **GeojsonPlusLayer**

## Implements

* any
* any
* any

## Constructors

###  constructor

\+ **new GeojsonPlusLayer**(`init?`: Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›): *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[constructor](_cs_map_src_layers_base_layer_.baselayer.md#constructor)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:79](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

## Properties

###  _busManager

• **_busManager**: *[MessageBusManager](_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)* =  new MessageBusManager()

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_busManager](_cs_map_src_layers_base_layer_.baselayer.md#_busmanager)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L58)*

___

### `Optional` _centerGeoJson

• **_centerGeoJson**? : *FeatureCollection*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:45](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L45)*

___

### `Optional` _centerHandle

• **_centerHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:46](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L46)*

___

###  _centerLayer

• **_centerLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:47](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L47)*

___

### `Optional` _centerSource

• **_centerSource**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:48](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L48)*

___

### `Optional` _circleHandle

• **_circleHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:49](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L49)*

___

###  _circleLayer

• **_circleLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:50](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L50)*

___

### `Optional` _circleLayout

• **_circleLayout**? : *mapboxgl.CircleLayout*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:52](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L52)*

___

### `Optional` _circlePaint

• **_circlePaint**? : *mapboxgl.CirclePaint*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:53](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L53)*

___

### `Optional` _events

• **_events**? : *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_events](_cs_map_src_layers_base_layer_.baselayer.md#optional-_events)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L59)*

___

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_extensions](_cs_map_src_layers_base_layer_.baselayer.md#_extensions)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:60](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L60)*

___

###  _featureType

• **_featureType**: *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_featureType](_cs_map_src_layers_base_layer_.baselayer.md#_featuretype)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:61](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L61)*

___

### `Optional` _fillHandle

• **_fillHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:54](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L54)*

___

###  _fillLayer

• **_fillLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:55](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L55)*

___

### `Optional` _fillLayout

• **_fillLayout**? : *mapboxgl.FillLayout*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:57](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L57)*

___

### `Optional` _fillPaint

• **_fillPaint**? : *mapboxgl.FillPaint*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:58](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L58)*

___

### `Optional` _filters

• **_filters**? : *object*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_filters](_cs_map_src_layers_base_layer_.baselayer.md#optional-_filters)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:62](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L62)*

#### Type declaration:

* \[ **key**: *string*\]: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_initialized](_cs_map_src_layers_base_layer_.baselayer.md#optional-_initialized)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L59)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_legends](_cs_map_src_layers_base_layer_.baselayer.md#optional-_legends)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:66](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L66)*

list of active layers

___

### `Optional` _lineHandle

• **_lineHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:60](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L60)*

___

###  _lineLayer

• **_lineLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:61](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L61)*

___

### `Optional` _lineLayout

• **_lineLayout**? : *mapboxgl.LineLayout*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:63](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L63)*

___

### `Optional` _linePaint

• **_linePaint**? : *mapboxgl.LinePaint*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:64](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L64)*

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_manager](_cs_map_src_layers_base_layer_.baselayer.md#optional-_manager)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:67](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L67)*

___

### `Optional` _parent

• **_parent**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_parent](_cs_map_src_layers_base_layer_.baselayer.md#optional-_parent)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:68](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L68)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_service](_cs_map_src_layers_base_layer_.baselayer.md#optional-_service)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:69](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L69)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMenu](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmenu)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:70](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L70)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMore](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmore)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:71](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L71)*

___

### `Optional` _source

• **_source**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_source](_cs_map_src_layers_base_layer_.baselayer.md#optional-_source)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:65](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L65)*

___

### `Optional` _symbolHandle

• **_symbolHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:66](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L66)*

___

###  _symbolLayer

• **_symbolLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:67](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L67)*

___

### `Optional` _symbolLayout

• **_symbolLayout**? : *mapboxgl.SymbolLayout*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:69](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L69)*

___

### `Optional` _symbolPaint

• **_symbolPaint**? : *mapboxgl.SymbolPaint*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:70](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L70)*

___

###  color

• **color**: *string* = "blue"

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[color](_cs_map_src_layers_base_layer_.baselayer.md#color)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:75](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L75)*

___

### `Optional` defaultFeatureType

• **defaultFeatureType**? : *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[defaultFeatureType](_cs_map_src_layers_base_layer_.baselayer.md#optional-defaultfeaturetype)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:77](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L77)*

if multiple feature types are avaible, this is the default feature type key

___

###  description

• **description**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[description](_cs_map_src_layers_base_layer_.baselayer.md#description)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:79](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L79)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[disableFeatureList](_cs_map_src_layers_base_layer_.baselayer.md#optional-disablefeaturelist)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L81)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[extensions](_cs_map_src_layers_base_layer_.baselayer.md#optional-extensions)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:82](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L82)*

___

### `Optional` featureType

• **featureType**? : *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:71](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L71)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[featureTypes](_cs_map_src_layers_base_layer_.baselayer.md#optional-featuretypes)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:95](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L95)*

___

### `Optional` featureTypesUrl

• **featureTypesUrl**? : *string*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:72](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L72)*

___

### `Optional` filter

• **filter**? : *any[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[filter](_cs_map_src_layers_base_layer_.baselayer.md#optional-filter)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:96](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L96)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[hideInLayerList](_cs_map_src_layers_base_layer_.baselayer.md#optional-hideinlayerlist)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:98](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L98)*

___

### `Optional` iconZoomLevel

• **iconZoomLevel**? : *number*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:73](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L73)*

___

###  id

• **id**: *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[id](_cs_map_src_layers_base_layer_.baselayer.md#id)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:99](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L99)*

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:74](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L74)*

___

### `Optional` isLive

• **isLive**? : *boolean*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:75](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L75)*

___

### `Optional` layout

• **layout**? : *mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[layout](_cs_map_src_layers_base_layer_.baselayer.md#optional-layout)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:114](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L114)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[openFeatureDetails](_cs_map_src_layers_base_layer_.baselayer.md#optional-openfeaturedetails)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:120](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L120)*

___

### `Optional` paint

• **paint**? : *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[paint](_cs_map_src_layers_base_layer_.baselayer.md#optional-paint)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L121)*

___

### `Optional` parentId

• **parentId**? : *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parentId](_cs_map_src_layers_base_layer_.baselayer.md#optional-parentid)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:126](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L126)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[popupContent](_cs_map_src_layers_base_layer_.baselayer.md#optional-popupcontent)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:127](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L127)*

___

###  socketEmitters

• **socketEmitters**: *object*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:76](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L76)*

#### Type declaration:

* \[ **key**: *string*\]: Emitter

___

### `Optional` source

• **source**? : *string | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[source](_cs_map_src_layers_base_layer_.baselayer.md#optional-source)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:128](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L128)*

___

### `Optional` style

• **style**? : *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[style](_cs_map_src_layers_base_layer_.baselayer.md#optional-style)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:129](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L129)*

___

###  tags

• **tags**: *string[]* =  []

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[tags](_cs_map_src_layers_base_layer_.baselayer.md#tags)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:131](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L131)*

___

###  title

• **title**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[title](_cs_map_src_layers_base_layer_.baselayer.md#title)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:134](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L134)*

___

### `Optional` type

• **type**? : *"poi"*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:77](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L77)*

___

### `Optional` typeId

• **typeId**? : *string* = "poi"

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[typeId](_cs_map_src_layers_base_layer_.baselayer.md#optional-typeid)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:78](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L78)*

___

### `Optional` types

• **types**? : *string[]* =  ['poi', 'geojson']

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:79](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L79)*

___

### `Optional` visible

• **visible**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[visible](_cs_map_src_layers_base_layer_.baselayer.md#optional-visible)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:136](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L136)*

## Accessors

###  MapControl

• **get MapControl**(): *mapboxgl.Map | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[MapControl](_cs_map_src_layers_base_layer_.baselayer.md#mapcontrol)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:156](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L156)*

**Returns:** *mapboxgl.Map | undefined*

___

###  Visible

• **get Visible**(): *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:167](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L167)*

**Returns:** *boolean | undefined*

• **set Visible**(`value`: boolean | undefined): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:171](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean &#124; undefined |

**Returns:** *void*

## Methods

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[addLayer](_cs_map_src_layers_base_layer_.baselayer.md#addlayer)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:94](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  applyFilter

▸ **applyFilter**(`filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[applyFilter](_cs_map_src_layers_base_layer_.baselayer.md#applyfilter)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:186](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

###  createCenterSource

▸ **createCenterSource**(): *void*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:131](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L131)*

**Returns:** *void*

___

###  getBounds

▸ **getBounds**(): *LngLatBounds | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getBounds](_cs_map_src_layers_base_layer_.baselayer.md#getbounds)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:245](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L245)*

**Returns:** *LngLatBounds | undefined*

___

###  getFeatureType

▸ **getFeatureType**(): *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getFeatureType](_cs_map_src_layers_base_layer_.baselayer.md#getfeaturetype)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:229](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L229)*

**Returns:** *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)›): *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)‹›*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:260](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L260)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)› |

**Returns:** *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)‹›*

___

###  getLayerActions

▸ **getLayerActions**(): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getLayerActions](_cs_map_src_layers_base_layer_.baselayer.md#getlayeractions)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:248](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L248)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getPropertType

▸ **getPropertType**(`prop`: string): *[PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getPropertType](_cs_map_src_layers_base_layer_.baselayer.md#getproperttype)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:298](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L298)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | string |

**Returns:** *[PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | undefined*

___

###  getStyleLegend

▸ **getStyleLegend**(`styleKey`: string, `style`: any): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getStyleLegend](_cs_map_src_layers_base_layer_.baselayer.md#getstylelegend)*

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

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getStyleLegendKey](_cs_map_src_layers_base_layer_.baselayer.md#getstylelegendkey)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:330](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L330)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

### `Private` initFeatureTypes

▸ **initFeatureTypes**(): *Promise‹boolean›*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:770](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L770)*

**Returns:** *Promise‹boolean›*

___

###  initFilter

▸ **initFilter**(`property`: string): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initFilter](_cs_map_src_layers_base_layer_.baselayer.md#initfilter)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:343](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L343)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | string |

**Returns:** *void*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initLayer](_cs_map_src_layers_base_layer_.baselayer.md#initlayer)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:265](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L265)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[moveLayer](_cs_map_src_layers_base_layer_.baselayer.md#movelayer)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:486](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L486)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup

▸ **parsePopup**(`f?`: Feature): *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parsePopup](_cs_map_src_layers_base_layer_.baselayer.md#parsepopup)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:358](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L358)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *string*

___

###  parseTitle

▸ **parseTitle**(`f?`: Feature): *any*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parseTitle](_cs_map_src_layers_base_layer_.baselayer.md#parsetitle)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:371](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L371)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  pipeEvents

▸ **pipeEvents**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md), `layer?`: [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md), `handle?`: [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)): *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:503](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L503)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |
`layer?` | [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md) |
`handle?` | [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) |

**Returns:** *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

___

### `Private` registerLayerExtensions

▸ **registerLayerExtensions**(): *void*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:851](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L851)*

**Returns:** *void*

___

### `Private` removeExtensions

▸ **removeExtensions**(): *void*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:868](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L868)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLayer](_cs_map_src_layers_base_layer_.baselayer.md#removelayer)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:534](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L534)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLegend](_cs_map_src_layers_base_layer_.baselayer.md#removelegend)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:572](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L572)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) &#124; string | - |
`refreshLayer` | boolean | true |

**Returns:** *void*

___

###  removeSubLayer

▸ **removeSubLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md), `layer?`: [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md), `handle?`: [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)): *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:597](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L597)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |
`layer?` | [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md) |
`handle?` | [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) |

**Returns:** *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

___

###  setFilter

▸ **setFilter**(`filter`: any[]): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setFilter](_cs_map_src_layers_base_layer_.baselayer.md#setfilter)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:236](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setLegend](_cs_map_src_layers_base_layer_.baselayer.md#setlegend)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:613](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L613)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) &#124; string | - |
`refreshLayer` | boolean | true |

**Returns:** *void*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setOpacity](_cs_map_src_layers_base_layer_.baselayer.md#setopacity)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:683](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L683)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  setPopupContent

▸ **setPopupContent**(`popup`: string | function): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setPopupContent](_cs_map_src_layers_base_layer_.baselayer.md#setpopupcontent)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:702](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L702)*

**Parameters:**

Name | Type |
------ | ------ |
`popup` | string &#124; function |

**Returns:** *void*

___

### `Private` updateFeatureTypePropertyMap

▸ **updateFeatureTypePropertyMap**(`type`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)): *void*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:755](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L755)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) |

**Returns:** *void*

___

###  updateFilters

▸ **updateFilters**(): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateFilters](_cs_map_src_layers_base_layer_.baselayer.md#updatefilters)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:410](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L410)*

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLayer](_cs_map_src_layers_base_layer_.baselayer.md#updatelayer)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:721](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L721)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLegends](_cs_map_src_layers_base_layer_.baselayer.md#updatelegends)*

*Defined in [packages/cs-map/src/layers/geojson-plus-layer.ts:728](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-plus-layer.ts#L728)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *Feature | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getFeatureFromEventDetails](_cs_map_src_layers_base_layer_.baselayer.md#static-getfeaturefromeventdetails)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:46](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *Feature | undefined*

## Object literals

###  intlData

### ▪ **intlData**: *object*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[intlData](_cs_map_src_layers_base_layer_.baselayer.md#intldata)*

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
