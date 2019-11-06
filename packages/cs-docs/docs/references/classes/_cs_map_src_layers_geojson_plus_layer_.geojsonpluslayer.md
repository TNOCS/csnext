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

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:111](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L111)*
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

## Properties

### `Optional` _centerGeoJson

• **_centerGeoJson**? : *FeatureCollection*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:79](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L79)*

___

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:79](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L79)*

___

###  _centerLayer

• **_centerLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:76](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L76)*

• **_centerSource**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:80](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L80)*

___

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:71](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L71)*

___

###  _circleLayer

• **_circleLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:80](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L80)*

• **_circleLayout**? : *mapboxgl.CircleLayout*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:86](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L86)*

___

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:88](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L88)*

___

###  _events

• **_events**: *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:74](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L74)*

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_extensions](_cs_map_src_layers_base_layer_.baselayer.md#_extensions)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:86](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L86)*

• **_featureEventHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_featureEventHandle](_cs_map_src_layers_base_layer_.baselayer.md#optional-_featureeventhandle)*

*Defined in [cs-map/src/layers/base-layer.ts:123](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L123)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:87](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L87)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:103](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L103)*

___

###  _fillLayer

• **_fillLayer**: *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:106](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L106)*

• **_fillLayout**? : *mapboxgl.FillLayout*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:101](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L101)*

___

### `Optional` _fillPaint

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:109](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L109)*

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_initialized](_cs_map_src_layers_base_layer_.baselayer.md#optional-_initialized)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:984](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L984)*

*Defined in [cs-map/src/layers/base-layer.ts:123](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L123)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_legends](_cs_map_src_layers_base_layer_.baselayer.md#optional-_legends)*

*Defined in [cs-map/src/layers/base-layer.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L119)*

list of active layers

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:103](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L103)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:98](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L98)*

___

###  _lineLayer

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:73](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L73)*

### `Optional` _lineLayout

• **_lineLayout**? : *mapboxgl.LineLayout*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:96](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L96)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:101](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L101)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:97](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L97)*

___

### `Optional` _manager

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:102](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L102)*

___

### `Optional` _parent

• **_parent**? : *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_parent](_cs_map_src_layers_base_layer_.baselayer.md#optional-_parent)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:984](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L984)*

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_service](_cs_map_src_layers_base_layer_.baselayer.md#optional-_service)*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L88)*

___

*Defined in [cs-map/src/layers/base-layer.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L119)*

*Defined in [cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L121)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:98](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L98)*

### `Optional` _source

• **_source**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_source](_cs_map_src_layers_base_layer_.baselayer.md#optional-_source)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L72)*

• **_symbolHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:93](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L93)*

___

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:96](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L96)*

___

### `Optional` _symbolLayout

• **_symbolLayout**? : *mapboxgl.SymbolLayout*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:97](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L97)*

• **_symbolPaint**? : *mapboxgl.SymbolPaint*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:92](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L92)*

___

###  color

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:105](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L105)*

___

### `Optional` defaultFeatureType

• **defaultFeatureType**? : *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[defaultFeatureType](_cs_map_src_layers_base_layer_.baselayer.md#optional-defaultfeaturetype)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:69](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L69)*

###  description

• **description**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[description](_cs_map_src_layers_base_layer_.baselayer.md#description)*

*Defined in [cs-map/src/layers/base-layer.ts:65](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L65)*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L88)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[disableFeatureList](_cs_map_src_layers_base_layer_.baselayer.md#optional-disablefeaturelist)*

*Defined in [cs-map/src/layers/base-layer.ts:86](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L86)*

___

### `Optional` extensions

*Defined in [cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L121)*

___

### `Optional` featureType

• **featureType**? : *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:83](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L83)*

*Defined in [cs-map/src/layers/base-layer.ts:122](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L122)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[featureTypes](_cs_map_src_layers_base_layer_.baselayer.md#optional-featuretypes)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L81)*

___

### `Optional` featureTypesUrl

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:983](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L983)*

### `Optional` filter

• **filter**? : *any*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[filter](_cs_map_src_layers_base_layer_.baselayer.md#optional-filter)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:93](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L93)*

• **hideInLayerList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[hideInLayerList](_cs_map_src_layers_base_layer_.baselayer.md#optional-hideinlayerlist)*

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L81)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:70](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L70)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:68](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L68)*

___

###  id

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:91](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L91)*

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:92](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L92)*

• **isLive**? : *boolean*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L78)*

___

### `Optional` layout

*Defined in [cs-map/src/layers/base-layer.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L72)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[openFeatureDetails](_cs_map_src_layers_base_layer_.baselayer.md#optional-openfeaturedetails)*

*Defined in [cs-map/src/layers/base-layer.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L78)*

• **paint**? : *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[paint](_cs_map_src_layers_base_layer_.baselayer.md#optional-paint)*

*Defined in [cs-map/src/layers/base-layer.ts:94](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L94)*

___

### `Optional` parentId

*Defined in [cs-map/src/layers/base-layer.ts:65](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L65)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[popupContent](_cs_map_src_layers_base_layer_.baselayer.md#optional-popupcontent)*

*Defined in [cs-map/src/layers/base-layer.ts:86](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L86)*

• **socketEmitters**: *object*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:111](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L111)*

#### Type declaration:

* \[ **key**: *string*\]: Emitter

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:108](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L108)*

___

### `Optional` featureType

• **featureType**? : *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:83](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L83)*

• **style**: *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[style](_cs_map_src_layers_base_layer_.baselayer.md#optional-style)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:75](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L75)*

___

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L81)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:64](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L64)*

___

###  title

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:82](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L82)*

___

### `Optional` type

• **type**? : *"poi"*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:61](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L61)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:67](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L67)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[typeId](_cs_map_src_layers_base_layer_.baselayer.md#optional-typeid)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:60](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L60)*

___

### `Optional` types

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L81)*

### `Optional` visible

• **visible**? : *boolean*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[visible](_cs_map_src_layers_base_layer_.baselayer.md#optional-visible)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:68](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L68)*

• **get Visible**(): *boolean | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L119)*

**Returns:** *boolean | undefined*

*Defined in [cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean &#124; undefined |

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:77](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L77)*

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[addLayer](_cs_map_src_layers_base_layer_.baselayer.md#addlayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:899](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L899)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L78)*

**Returns:** *void*

___

###  createCenterSource

▸ **createCenterSource**(): *void*

*Defined in [cs-map/src/layers/base-layer.ts:89](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L89)*

###  getBounds

▸ **getBounds**(): *LngLatBounds | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getBounds](_cs_map_src_layers_base_layer_.baselayer.md#getbounds)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:397](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L397)*

*Defined in [cs-map/src/layers/base-layer.ts:84](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L84)*

▸ **getFeatureType**(): *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) | undefined*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:309](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L309)*

**Returns:** *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) | undefined*

___

*Defined in [cs-map/src/layers/base-layer.ts:94](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)› |

**Returns:** *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:66](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L66)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getLayerActions](_cs_map_src_layers_base_layer_.baselayer.md#getlayeractions)*

*Defined in [cs-map/src/layers/base-layer.ts:154](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L154)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:107](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L107)*

*Defined in [cs-map/src/layers/base-layer.ts:230](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:111](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L111)*
___

###  getStyleLegendKey

▸ **getStyleLegendKey**(`styleKey`: string): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getStyleLegendKey](_cs_map_src_layers_base_layer_.baselayer.md#getstylelegendkey)*

*Defined in [cs-map/src/layers/base-layer.ts:217](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L217)*

**Parameters:**

Name | Type |
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:62](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L62)*
___

### `Private` initFeatureTypes

▸ **initFeatureTypes**(): *Promise‹boolean›*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:550](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L550)*

**Returns:** *Promise‹boolean›*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:75](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L75)*
▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initLayer](_cs_map_src_layers_base_layer_.baselayer.md#initlayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:643](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L643)*

**Parameters:**

Name | Type |
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:64](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L64)*
___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[moveLayer](_cs_map_src_layers_base_layer_.baselayer.md#movelayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:412](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L412)*
*Defined in [cs-map/src/layers/base-layer.ts:62](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L62)*
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:61](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L61)*
*Defined in [cs-map/src/layers/base-layer.ts:257](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L257)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:60](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L60)*
▸ **parseTitle**(`f?`: Feature): *any*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parseTitle](_cs_map_src_layers_base_layer_.baselayer.md#parsetitle)*

*Defined in [cs-map/src/layers/base-layer.ts:267](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L267)*

**Parameters:**
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:54](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L54)*
**Returns:** *any*

___

###  pipeEvents

▸ **pipeEvents**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md), `layer?`: [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md), `handle?`: [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)): *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:859](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L859)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:63](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L63)*
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |
`layer?` | [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md) |
`handle?` | [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) |

**Returns:** *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) | undefined*

___

### `Private` registerLayerExtensions
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L119)*
**Returns:** *void*

___

### `Private` removeExtensions

▸ **removeExtensions**(): *void*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:123](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L123)*
___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLayer](_cs_map_src_layers_base_layer_.baselayer.md#removelayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:945](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L945)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:899](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L899)*
▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLegend](_cs_map_src_layers_base_layer_.baselayer.md#removelegend)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:145](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L145)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string | - |
`refreshLayer` | boolean | true |

**Returns:** *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:443](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L443)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:883](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L883)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |
`layer?` | [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md) |
`handle?` | [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) |

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:397](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L397)*

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setLegend](_cs_map_src_layers_base_layer_.baselayer.md#setlegend)*

### `Private` getFeatureType

▸ **getFeatureType**(): *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) | undefined*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:309](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L309)*

**Returns:** *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) | undefined*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:56](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L56)*

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

### `Private` updateFeatureTypePropertyMap

▸ **updateFeatureTypePropertyMap**(`type`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)): *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:630](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L630)*

**Parameters:**

*Defined in [cs-map/src/layers/base-layer.ts:154](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L154)*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLayer](_cs_map_src_layers_base_layer_.baselayer.md#updatelayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:369](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L369)*

*Defined in [cs-map/src/layers/base-layer.ts:230](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L230)*

▸ **updateLegends**(): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLegends](_cs_map_src_layers_base_layer_.baselayer.md#updatelegends)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:130](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L130)*

**Returns:** *void*

___

###  updateMeta

▸ **updateMeta**(): *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:234](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L234)*

**Returns:** *void*
*Defined in [cs-map/src/layers/base-layer.ts:217](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L217)*
▸ **updateMetaProperty**(`ft`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md), `prop`: [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md)): *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:171](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`ft` | [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) |
`prop` | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) |

**Returns:** *void*

▸ **initFeatureTypes**(): *Promise‹boolean›*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:550](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L550)*

**Returns:** *Promise‹boolean›*
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *Feature | undefined*

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initLayer](_cs_map_src_layers_base_layer_.baselayer.md#initlayer)*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:643](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L643)*

*Defined in [cs-map/src/layers/base-layer.ts:136](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L136)*

▪ **formats**: *object*

*Defined in [cs-map/src/layers/base-layer.ts:137](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L137)*

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

    * **style**: *string* = "currency"

  * **percentage**: *object*

    * **style**: *string* = "percent"
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:412](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L412)*
*Defined in [cs-map/src/layers/base-layer.ts:257](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L257)*
*Defined in [cs-map/src/layers/base-layer.ts:267](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L267)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:859](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L859)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:426](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L426)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:936](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L936)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:945](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L945)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:145](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L145)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:883](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L883)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:323](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L323)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:378](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L378)*
### `Private` updateFeatureTypePropertyMap

▸ **updateFeatureTypePropertyMap**(`type`: [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)): *void*

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:630](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L630)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [FeatureType](_cs_map_src_classes_feature_type_.featuretype.md) |

**Returns:** *void*

___

*Defined in [cs-map/src/layers/geojson-plus-layer.ts:369](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L369)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:130](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L130)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:234](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L234)*
*Defined in [cs-map/src/layers/geojson-plus-layer.ts:171](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-plus-layer.ts#L171)*
*Defined in [cs-map/src/layers/base-layer.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L45)*

## Object literals

###  intlData

### ▪ **intlData**: *object*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[intlData](_cs_map_src_layers_base_layer_.baselayer.md#intldata)*

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
