# Class: GeojsonLayer

## Hierarchy

* [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md)

  ↳ **GeojsonLayer**

  ↳ [GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)

## Implements

* any

## Constructors

###  constructor

\+ **new GeojsonLayer**(`init?`: Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›): *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[constructor](_cs_map_src_layers_base_layer_.baselayer.md#constructor)*

*Defined in [cs-map/src/layers/geojson-layer.ts:60](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

## Properties

### `Optional` _events

• **_events**? : *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_events](_cs_map_src_layers_base_layer_.baselayer.md#optional-_events)*

*Defined in [cs-map/src/layers/geojson-layer.ts:47](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L47)*

___

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_extensions](_cs_map_src_layers_base_layer_.baselayer.md#_extensions)*

*Defined in [cs-map/src/layers/geojson-layer.ts:50](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L50)*

___

### `Optional` _featureEventHandle

• **_featureEventHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_featureEventHandle](_cs_map_src_layers_base_layer_.baselayer.md#optional-_featureeventhandle)*

*Defined in [cs-map/src/layers/base-layer.ts:118](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L118)*

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_initialized](_cs_map_src_layers_base_layer_.baselayer.md#optional-_initialized)*

*Defined in [cs-map/src/layers/geojson-layer.ts:53](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L53)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_legends](_cs_map_src_layers_base_layer_.baselayer.md#optional-_legends)*

*Defined in [cs-map/src/layers/base-layer.ts:114](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L114)*

list of active layers

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_manager](_cs_map_src_layers_base_layer_.baselayer.md#optional-_manager)*

*Defined in [cs-map/src/layers/geojson-layer.ts:46](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L46)*

___

### `Optional` _opacity

• **_opacity**? : *number*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_opacity](_cs_map_src_layers_base_layer_.baselayer.md#optional-_opacity)*

*Defined in [cs-map/src/layers/geojson-layer.ts:51](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L51)*

___

### `Optional` _parent

• **_parent**? : *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_parent](_cs_map_src_layers_base_layer_.baselayer.md#optional-_parent)*

*Defined in [cs-map/src/layers/geojson-layer.ts:34](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L34)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_service](_cs_map_src_layers_base_layer_.baselayer.md#optional-_service)*

*Defined in [cs-map/src/layers/base-layer.ts:83](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L83)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMenu](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmenu)*

*Defined in [cs-map/src/layers/base-layer.ts:116](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L116)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMore](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmore)*

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L117)*

___

### `Optional` _source

• **_source**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_source](_cs_map_src_layers_base_layer_.baselayer.md#optional-_source)*

*Defined in [cs-map/src/layers/geojson-layer.ts:52](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L52)*

___

###  color

• **color**: *string* = "blue"

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[color](_cs_map_src_layers_base_layer_.baselayer.md#color)*

*Defined in [cs-map/src/layers/base-layer.ts:72](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L72)*

___

###  description

• **description**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[description](_cs_map_src_layers_base_layer_.baselayer.md#description)*

*Defined in [cs-map/src/layers/base-layer.ts:62](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L62)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[disableFeatureList](_cs_map_src_layers_base_layer_.baselayer.md#optional-disablefeaturelist)*

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L81)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[extensions](_cs_map_src_layers_base_layer_.baselayer.md#optional-extensions)*

*Defined in [cs-map/src/layers/geojson-layer.ts:49](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L49)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[featureTypes](_cs_map_src_layers_base_layer_.baselayer.md#optional-featuretypes)*

*Defined in [cs-map/src/layers/base-layer.ts:112](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L112)*

___

### `Optional` filter

• **filter**? : *any*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[filter](_cs_map_src_layers_base_layer_.baselayer.md#optional-filter)*

*Defined in [cs-map/src/layers/geojson-layer.ts:35](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L35)*

___

###  id

• **id**: *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[id](_cs_map_src_layers_base_layer_.baselayer.md#id)*

*Defined in [cs-map/src/layers/base-layer.ts:55](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L55)*

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Defined in [cs-map/src/layers/geojson-layer.ts:33](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L33)*

___

### `Optional` layout

• **layout**? : *mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[layout](_cs_map_src_layers_base_layer_.baselayer.md#optional-layout)*

*Defined in [cs-map/src/layers/geojson-layer.ts:36](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L36)*

___

### `Optional` mask

• **mask**? : *boolean*

*Defined in [cs-map/src/layers/geojson-layer.ts:30](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L30)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[openFeatureDetails](_cs_map_src_layers_base_layer_.baselayer.md#optional-openfeaturedetails)*

*Defined in [cs-map/src/layers/base-layer.ts:79](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L79)*

___

### `Optional` paint

• **paint**? : *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[paint](_cs_map_src_layers_base_layer_.baselayer.md#optional-paint)*

*Defined in [cs-map/src/layers/geojson-layer.ts:41](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L41)*

___

### `Optional` parentId

• **parentId**? : *string*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parentId](_cs_map_src_layers_base_layer_.baselayer.md#optional-parentid)*

*Defined in [cs-map/src/layers/geojson-layer.ts:32](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L32)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[popupContent](_cs_map_src_layers_base_layer_.baselayer.md#optional-popupcontent)*

*Defined in [cs-map/src/layers/geojson-layer.ts:48](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L48)*

___

### `Optional` source

• **source**? : *string | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[source](_cs_map_src_layers_base_layer_.baselayer.md#optional-source)*

*Defined in [cs-map/src/layers/geojson-layer.ts:28](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L28)*

___

### `Optional` style

• **style**? : *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[style](_cs_map_src_layers_base_layer_.baselayer.md#optional-style)*

*Defined in [cs-map/src/layers/geojson-layer.ts:31](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L31)*

___

###  tags

• **tags**: *string[]* =  []

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[tags](_cs_map_src_layers_base_layer_.baselayer.md#tags)*

*Defined in [cs-map/src/layers/base-layer.ts:70](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L70)*

___

###  title

• **title**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[title](_cs_map_src_layers_base_layer_.baselayer.md#title)*

*Defined in [cs-map/src/layers/base-layer.ts:59](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L59)*

___

### `Optional` type

• **type**? : *"symbol" | "raster" | "line" | "fill" | "circle"*

*Defined in [cs-map/src/layers/geojson-layer.ts:26](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L26)*

___

### `Optional` typeId

• **typeId**? : *string* = "geojson"

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[typeId](_cs_map_src_layers_base_layer_.baselayer.md#optional-typeid)*

*Defined in [cs-map/src/layers/geojson-layer.ts:25](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L25)*

___

###  types

• **types**: *string[]* =  ['symbol', 'raster', 'line', 'fill', 'circle']

*Defined in [cs-map/src/layers/geojson-layer.ts:23](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L23)*

___

### `Optional` visible

• **visible**? : *boolean*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[visible](_cs_map_src_layers_base_layer_.baselayer.md#optional-visible)*

*Defined in [cs-map/src/layers/geojson-layer.ts:29](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L29)*

## Accessors

###  Map

• **get Map**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Defined in [cs-map/src/layers/geojson-layer.ts:74](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L74)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

___

###  Visible

• **get Visible**(): *boolean | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [cs-map/src/layers/geojson-layer.ts:80](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L80)*

**Returns:** *boolean | undefined*

• **set Visible**(`value`: boolean | undefined): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [cs-map/src/layers/geojson-layer.ts:84](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean &#124; undefined |

**Returns:** *void*

___

###  opacity

• **get opacity**(): *number | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[opacity](_cs_map_src_layers_base_layer_.baselayer.md#optional-opacity)*

*Defined in [cs-map/src/layers/geojson-layer.ts:100](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L100)*

**Returns:** *number | undefined*

• **set opacity**(`value`: number | undefined): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[opacity](_cs_map_src_layers_base_layer_.baselayer.md#optional-opacity)*

*Defined in [cs-map/src/layers/geojson-layer.ts:91](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number &#124; undefined |

**Returns:** *void*

## Methods

###  addImage

▸ **addImage**(`id`: string, `url`: string): *void*

*Defined in [cs-map/src/layers/geojson-layer.ts:248](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L248)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`url` | string |

**Returns:** *void*

___

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[addLayer](_cs_map_src_layers_base_layer_.baselayer.md#addlayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:277](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L277)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  getBounds

▸ **getBounds**(): *LngLatBounds | undefined*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getBounds](_cs_map_src_layers_base_layer_.baselayer.md#getbounds)*

*Defined in [cs-map/src/layers/geojson-layer.ts:159](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L159)*

**Returns:** *LngLatBounds | undefined*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›): *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/layers/geojson-layer.ts:69](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

___

###  getLayerActions

▸ **getLayerActions**(): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getLayerActions](_cs_map_src_layers_base_layer_.baselayer.md#getlayeractions)*

*Defined in [cs-map/src/layers/base-layer.ts:134](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L134)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getStyleLegend

▸ **getStyleLegend**(`styleKey`: string, `style`: any): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getStyleLegend](_cs_map_src_layers_base_layer_.baselayer.md#getstylelegend)*

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

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getStyleLegendKey](_cs_map_src_layers_base_layer_.baselayer.md#getstylelegendkey)*

*Defined in [cs-map/src/layers/base-layer.ts:204](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *any*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initLayer](_cs_map_src_layers_base_layer_.baselayer.md#initlayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:174](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *any*

___

###  layerTypeProps

▸ **layerTypeProps**(): *string[]*

*Defined in [cs-map/src/layers/geojson-layer.ts:128](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L128)*

**Returns:** *string[]*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[moveLayer](_cs_map_src_layers_base_layer_.baselayer.md#movelayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:260](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L260)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup

▸ **parsePopup**(`f?`: Feature): *any*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parsePopup](_cs_map_src_layers_base_layer_.baselayer.md#parsepopup)*

*Defined in [cs-map/src/layers/base-layer.ts:244](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  parseTitle

▸ **parseTitle**(`f?`: Feature): *any*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parseTitle](_cs_map_src_layers_base_layer_.baselayer.md#parsetitle)*

*Defined in [cs-map/src/layers/base-layer.ts:254](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L254)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLayer](_cs_map_src_layers_base_layer_.baselayer.md#removelayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:266](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLegend](_cs_map_src_layers_base_layer_.baselayer.md#removelegend)*

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

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setLegend](_cs_map_src_layers_base_layer_.baselayer.md#setlegend)*

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

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setOpacity](_cs_map_src_layers_base_layer_.baselayer.md#setopacity)*

*Defined in [cs-map/src/layers/geojson-layer.ts:139](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/geojson-layer.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLayer](_cs_map_src_layers_base_layer_.baselayer.md#updatelayer)*

*Defined in [cs-map/src/layers/base-layer.ts:190](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L190)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLegends](_cs_map_src_layers_base_layer_.baselayer.md#updatelegends)*

*Defined in [cs-map/src/layers/base-layer.ts:237](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L237)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *Feature | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getFeatureFromEventDetails](_cs_map_src_layers_base_layer_.baselayer.md#static-getfeaturefromeventdetails)*

*Defined in [cs-map/src/layers/base-layer.ts:42](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/layers/base-layer.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *Feature | undefined*
