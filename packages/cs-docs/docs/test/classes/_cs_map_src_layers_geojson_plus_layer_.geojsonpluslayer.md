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

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:108](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

## Properties

### `Optional` _centerGeoJson

• **_centerGeoJson**? : *FeatureCollection*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:77](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L77)*

___

### `Optional` _centerHandle

• **_centerHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:74](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L74)*

___

###  _centerLayer

• **_centerLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:69](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L69)*

___

### `Optional` _centerSource

• **_centerSource**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:78](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L78)*

___

### `Optional` _circleHandle

• **_circleHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:85](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L85)*

___

###  _circleLayer

• **_circleLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:72](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L72)*

___

### `Optional` _circleLayout

• **_circleLayout**? : *mapboxgl.CircleLayout*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:83](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L83)*

___

### `Optional` _circlePaint

• **_circlePaint**? : *mapboxgl.CirclePaint*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:84](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L84)*

___

###  _events

• **_events**: *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_events](_cs_map_src_layers_base_layer_.baselayer.md#optional-_events)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:103](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L103)*

___

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_extensions](_cs_map_src_layers_base_layer_.baselayer.md#_extensions)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:106](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L106)*

___

### `Optional` _featureEventHandle

• **_featureEventHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_featureEventHandle](_cs_map_src_layers_base_layer_.baselayer.md#optional-_featureeventhandle)*

*Defined in [cs-map/src/layers/base-layer.ts:120](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L120)*

___

### `Optional` _fillHandle

• **_fillHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:100](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L100)*

___

###  _fillLayer

• **_fillLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:71](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L71)*

___

### `Optional` _fillLayout

• **_fillLayout**? : *mapboxgl.FillLayout*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:98](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L98)*

___

### `Optional` _fillPaint

• **_fillPaint**? : *mapboxgl.FillPaint*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:99](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L99)*

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_initialized](_cs_map_src_layers_base_layer_.baselayer.md#optional-_initialized)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:913](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L913)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_legends](_cs_map_src_layers_base_layer_.baselayer.md#optional-_legends)*

*Defined in [cs-map/src/layers/base-layer.ts:116](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L116)*

list of active layers

___

### `Optional` _lineHandle

• **_lineHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:95](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L95)*

___

###  _lineLayer

• **_lineLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:70](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L70)*

___

### `Optional` _lineLayout

• **_lineLayout**? : *mapboxgl.LineLayout*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:93](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L93)*

___

### `Optional` _linePaint

• **_linePaint**? : *mapboxgl.LinePaint*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:94](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L94)*

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_manager](_cs_map_src_layers_base_layer_.baselayer.md#optional-_manager)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:102](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L102)*

___

### `Optional` _parent

• **_parent**? : *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_parent](_cs_map_src_layers_base_layer_.baselayer.md#optional-_parent)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:67](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L67)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_service](_cs_map_src_layers_base_layer_.baselayer.md#optional-_service)*

*Defined in [cs-map/src/layers/base-layer.ts:85](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L85)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMenu](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmenu)*

*Defined in [cs-map/src/layers/base-layer.ts:118](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L118)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMore](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmore)*

*Defined in [cs-map/src/layers/base-layer.ts:119](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L119)*

___

### `Optional` _source

• **_source**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_source](_cs_map_src_layers_base_layer_.baselayer.md#optional-_source)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:912](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L912)*

___

### `Optional` _symbolHandle

• **_symbolHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:90](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L90)*

___

###  _symbolLayer

• **_symbolLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:68](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L68)*

___

### `Optional` _symbolLayout

• **_symbolLayout**? : *mapboxgl.SymbolLayout*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:88](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L88)*

___

### `Optional` _symbolPaint

• **_symbolPaint**? : *mapboxgl.SymbolPaint*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:89](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L89)*

___

###  color

• **color**: *string* = "blue"

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[color](_cs_map_src_layers_base_layer_.baselayer.md#color)*

*Defined in [cs-map/src/layers/base-layer.ts:69](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L69)*

___

### `Optional` defaultFeatureType

• **defaultFeatureType**? : *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[defaultFeatureType](_cs_map_src_layers_base_layer_.baselayer.md#optional-defaultfeaturetype)*

*Defined in [cs-map/src/layers/base-layer.ts:75](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L75)*

if multiple feature types are avaible, this is the default feature type key

___

###  description

• **description**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[description](_cs_map_src_layers_base_layer_.baselayer.md#description)*

*Defined in [cs-map/src/layers/base-layer.ts:62](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L62)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[disableFeatureList](_cs_map_src_layers_base_layer_.baselayer.md#optional-disablefeaturelist)*

*Defined in [cs-map/src/layers/base-layer.ts:83](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L83)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[extensions](_cs_map_src_layers_base_layer_.baselayer.md#optional-extensions)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:105](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L105)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[featureTypes](_cs_map_src_layers_base_layer_.baselayer.md#optional-featuretypes)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:79](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L79)*

___

### `Optional` featureTypesUrl

• **featureTypesUrl**? : *string*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:80](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L80)*

___

### `Optional` filter

• **filter**? : *any*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[filter](_cs_map_src_layers_base_layer_.baselayer.md#optional-filter)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:65](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L65)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[hideInLayerList](_cs_map_src_layers_base_layer_.baselayer.md#optional-hideinlayerlist)*

*Defined in [cs-map/src/layers/base-layer.ts:78](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L78)*

___

### `Optional` iconZoomLevel

• **iconZoomLevel**? : *number*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:66](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L66)*

___

###  id

• **id**: *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[id](_cs_map_src_layers_base_layer_.baselayer.md#id)*

*Defined in [cs-map/src/layers/base-layer.ts:55](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L55)*

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:75](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L75)*

___

### `Optional` isLive

• **isLive**? : *boolean*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:76](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L76)*

___

### `Optional` layout

• **layout**? : *mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[layout](_cs_map_src_layers_base_layer_.baselayer.md#optional-layout)*

*Defined in [cs-map/src/layers/base-layer.ts:86](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L86)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[openFeatureDetails](_cs_map_src_layers_base_layer_.baselayer.md#optional-openfeaturedetails)*

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L81)*

___

### `Optional` paint

• **paint**? : *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[paint](_cs_map_src_layers_base_layer_.baselayer.md#optional-paint)*

*Defined in [cs-map/src/layers/base-layer.ts:91](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L91)*

___

### `Optional` parentId

• **parentId**? : *string*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parentId](_cs_map_src_layers_base_layer_.baselayer.md#optional-parentid)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:64](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L64)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[popupContent](_cs_map_src_layers_base_layer_.baselayer.md#optional-popupcontent)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:104](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L104)*

___

###  socketEmitters

• **socketEmitters**: *object*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:108](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L108)*

#### Type declaration:

* \[ **key**: *string*\]: Emitter

___

### `Optional` source

• **source**? : *string | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[source](_cs_map_src_layers_base_layer_.baselayer.md#optional-source)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:60](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L60)*

___

###  style

• **style**: *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[style](_cs_map_src_layers_base_layer_.baselayer.md#optional-style)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:73](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L73)*

___

###  tags

• **tags**: *string[]* =  []

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[tags](_cs_map_src_layers_base_layer_.baselayer.md#tags)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:62](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L62)*

___

###  title

• **title**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[title](_cs_map_src_layers_base_layer_.baselayer.md#title)*

*Defined in [cs-map/src/layers/base-layer.ts:59](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L59)*

___

### `Optional` type

• **type**? : *"poi"*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:59](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L59)*

___

### `Optional` typeId

• **typeId**? : *string* = "poi"

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[typeId](_cs_map_src_layers_base_layer_.baselayer.md#optional-typeid)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:58](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L58)*

___

### `Optional` types

• **types**? : *string[]* =  ['poi', 'geojson']

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:52](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L52)*

___

### `Optional` visible

• **visible**? : *boolean*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[visible](_cs_map_src_layers_base_layer_.baselayer.md#optional-visible)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:61](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L61)*

## Accessors

###  Visible

• **get Visible**(): *boolean | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:116](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L116)*

**Returns:** *boolean | undefined*

• **set Visible**(`value`: boolean | undefined): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:120](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean &#124; undefined |

**Returns:** *void*

## Methods

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[addLayer](_cs_map_src_layers_base_layer_.baselayer.md#addlayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:828](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L828)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  createCenterSource

▸ **createCenterSource**(): *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:426](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L426)*

**Returns:** *void*

___

###  getBounds

▸ **getBounds**(): *LngLatBounds | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getBounds](_cs_map_src_layers_base_layer_.baselayer.md#getbounds)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:380](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L380)*

**Returns:** *LngLatBounds | undefined*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)›): *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:54](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)› |

**Returns:** *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

___

###  getLayerActions

▸ **getLayerActions**(): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getLayerActions](_cs_map_src_layers_base_layer_.baselayer.md#getlayeractions)*

*Defined in [cs-map/src/layers/base-layer.ts:136](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L136)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getStyleLegend

▸ **getStyleLegend**(`styleKey`: string, `style`: any): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getStyleLegend](_cs_map_src_layers_base_layer_.baselayer.md#getstylelegend)*

*Defined in [cs-map/src/layers/base-layer.ts:219](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L219)*

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

*Defined in [cs-map/src/layers/base-layer.ts:206](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L206)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹this›*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initLayer](_cs_map_src_layers_base_layer_.baselayer.md#initlayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:569](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L569)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹this›*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[moveLayer](_cs_map_src_layers_base_layer_.baselayer.md#movelayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:395](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L395)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup

▸ **parsePopup**(`f?`: Feature): *any*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parsePopup](_cs_map_src_layers_base_layer_.baselayer.md#parsepopup)*

*Defined in [cs-map/src/layers/base-layer.ts:246](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  parseTitle

▸ **parseTitle**(`f?`: Feature): *any*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parseTitle](_cs_map_src_layers_base_layer_.baselayer.md#parsetitle)*

*Defined in [cs-map/src/layers/base-layer.ts:256](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L256)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  pipeEvents

▸ **pipeEvents**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md), `layer?`: [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md), `handle?`: [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)): *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:790](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L790)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |
`layer?` | [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md) |
`handle?` | [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) |

**Returns:** *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLayer](_cs_map_src_layers_base_layer_.baselayer.md#removelayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:874](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L874)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLegend](_cs_map_src_layers_base_layer_.baselayer.md#removelegend)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:139](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L139)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string | - |
`refreshLayer` | boolean | true |

**Returns:** *void*

___

###  removeSubLayer

▸ **removeSubLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md), `layer?`: [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md), `handle?`: [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)): *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:812](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L812)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |
`layer?` | [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md) |
`handle?` | [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) |

**Returns:** *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setLegend](_cs_map_src_layers_base_layer_.baselayer.md#setlegend)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:301](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L301)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string | - |
`refreshLayer` | boolean | true |

**Returns:** *void*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setOpacity](_cs_map_src_layers_base_layer_.baselayer.md#setopacity)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:361](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L361)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLayer](_cs_map_src_layers_base_layer_.baselayer.md#updatelayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:352](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L352)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLegends](_cs_map_src_layers_base_layer_.baselayer.md#updatelegends)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:127](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L127)*

**Returns:** *void*

___

###  updateMeta

▸ **updateMeta**(): *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:226](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L226)*

**Returns:** *void*

___

###  updateMetaProperty

▸ **updateMetaProperty**(`ft`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md), `prop`: [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md)): *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:165](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/geojson-plus-layer.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`ft` | [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) |
`prop` | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) |

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *Feature | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getFeatureFromEventDetails](_cs_map_src_layers_base_layer_.baselayer.md#static-getfeaturefromeventdetails)*

*Defined in [cs-map/src/layers/base-layer.ts:42](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/layers/base-layer.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *Feature | undefined*
