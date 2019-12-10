# Class: GridLayer

## Hierarchy

  ↳ [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)

  ↳ **GridLayer**

## Implements

* any

## Constructors

###  constructor

\+ **new GridLayer**(`init?`: Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›): *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)*

*Overrides [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[constructor](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#constructor)*

*Defined in [packages/cs-map/src/layers/grid-layer.ts:6](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/grid-layer.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)*

## Properties

###  _busManager

• **_busManager**: *[MessageBusManager](_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)* =  new MessageBusManager()

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_busManager](_cs_map_src_layers_base_layer_.baselayer.md#_busmanager)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L58)*

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

### `Optional` _filters

• **_filters**? : *object*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_filters](_cs_map_src_layers_base_layer_.baselayer.md#optional-_filters)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:62](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L62)*

#### Type declaration:

* \[ **key**: *string*\]: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_initialized](_cs_map_src_layers_base_layer_.baselayer.md#optional-_initialized)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:64](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L64)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_legends](_cs_map_src_layers_base_layer_.baselayer.md#optional-_legends)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:66](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L66)*

list of active layers

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

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_source](_cs_map_src_layers_base_layer_.baselayer.md#optional-_source)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:73](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L73)*

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

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[featureTypes](_cs_map_src_layers_base_layer_.baselayer.md#optional-featuretypes)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:95](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L95)*

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

###  id

• **id**: *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[id](_cs_map_src_layers_base_layer_.baselayer.md#id)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:99](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L99)*

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[isEditable](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-iseditable)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:74](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L74)*

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

• **type**? : *"symbol" | "raster" | "line" | "fill" | "circle"*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[type](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-type)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:71](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L71)*

___

###  typeId

• **typeId**: *string* = "line"

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[typeId](_cs_map_src_layers_base_layer_.baselayer.md#optional-typeid)*

*Defined in [packages/cs-map/src/layers/grid-layer.ts:5](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/grid-layer.ts#L5)*

___

###  types

• **types**: *string[]* =  ['grid']

*Overrides [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[types](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#types)*

*Defined in [packages/cs-map/src/layers/grid-layer.ts:6](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/grid-layer.ts#L6)*

___

### `Optional` visible

• **visible**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[visible](_cs_map_src_layers_base_layer_.baselayer.md#optional-visible)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:136](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L136)*

## Accessors

###  Map

• **get Map**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[Map](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#map)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:18](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L18)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

___

###  MapControl

• **get MapControl**(): *mapboxgl.Map | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[MapControl](_cs_map_src_layers_base_layer_.baselayer.md#mapcontrol)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:156](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L156)*

**Returns:** *mapboxgl.Map | undefined*

___

###  Visible

• **get Visible**(): *boolean | undefined*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[Visible](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#visible)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:24](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L24)*

**Returns:** *boolean | undefined*

• **set Visible**(`value`: boolean | undefined): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[Visible](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#visible)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:28](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean &#124; undefined |

**Returns:** *void*

___

###  opacity

• **get opacity**(): *number | undefined*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[opacity](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#opacity)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:44](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L44)*

**Returns:** *number | undefined*

• **set opacity**(`value`: number | undefined): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[opacity](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#opacity)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:35](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number &#124; undefined |

**Returns:** *void*

## Methods

###  addImage

▸ **addImage**(`id`: string, `url`: string): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[addImage](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#addimage)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:220](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L220)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`url` | string |

**Returns:** *void*

___

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[addLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#addlayer)*

*Defined in [packages/cs-map/src/layers/grid-layer.ts:19](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/grid-layer.ts#L19)*

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

###  getBounds

▸ **getBounds**(): *LngLatBounds | undefined*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[getBounds](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#getbounds)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getBounds](_cs_map_src_layers_base_layer_.baselayer.md#getbounds)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:129](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L129)*

**Returns:** *LngLatBounds | undefined*

___

###  getFeatureType

▸ **getFeatureType**(): *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getFeatureType](_cs_map_src_layers_base_layer_.baselayer.md#getfeaturetype)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:229](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L229)*

**Returns:** *[FeatureType](_cs_map_src_classes_feature_type_.featuretype.md)*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›): *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)‹›*

*Overrides [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[getInstance](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#getinstance)*

*Defined in [packages/cs-map/src/layers/grid-layer.ts:14](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/grid-layer.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)‹›*

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

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *any*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[initLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#initlayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initLayer](_cs_map_src_layers_base_layer_.baselayer.md#initlayer)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:144](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *any*

___

###  layerTypeProps

▸ **layerTypeProps**(): *string[]*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[layerTypeProps](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#layertypeprops)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:99](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L99)*

**Returns:** *string[]*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[moveLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#movelayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[moveLayer](_cs_map_src_layers_base_layer_.baselayer.md#movelayer)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:232](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L232)*

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

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[removeLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#removelayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLayer](_cs_map_src_layers_base_layer_.baselayer.md#removelayer)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:238](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L238)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLegend](_cs_map_src_layers_base_layer_.baselayer.md#removelegend)*

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

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setFilter](_cs_map_src_layers_base_layer_.baselayer.md#setfilter)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:392](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L392)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setLegend](_cs_map_src_layers_base_layer_.baselayer.md#setlegend)*

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

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[setOpacity](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#setopacity)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setOpacity](_cs_map_src_layers_base_layer_.baselayer.md#setopacity)*

*Defined in [packages/cs-map/src/layers/geojson-layer.ts:110](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/geojson-layer.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  setPopupContent

▸ **setPopupContent**(`value`: string | function): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setPopupContent](_cs_map_src_layers_base_layer_.baselayer.md#setpopupcontent)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:406](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L406)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; function |

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

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLayer](_cs_map_src_layers_base_layer_.baselayer.md#updatelayer)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:418](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L418)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLegends](_cs_map_src_layers_base_layer_.baselayer.md#updatelegends)*

*Defined in [packages/cs-map/src/layers/base-layer.ts:420](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/layers/base-layer.ts#L420)*

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
