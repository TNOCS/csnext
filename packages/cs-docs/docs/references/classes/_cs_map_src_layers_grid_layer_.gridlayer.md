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

*Defined in [cs-map/src/layers/grid-layer.ts:6](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/grid-layer.ts#L6)*
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)*

## Properties

### `Optional` _events

• **_events**? : *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[_events](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-_events)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_events](_cs_map_src_layers_base_layer_.baselayer.md#optional-_events)*

*Defined in [cs-map/src/layers/geojson-layer.ts:47](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L47)*

___

*Defined in [cs-map/src/layers/geojson-layer.ts:47](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L47)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_extensions](_cs_map_src_layers_base_layer_.baselayer.md#_extensions)*

*Defined in [cs-map/src/layers/geojson-layer.ts:50](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L50)*

___

### `Optional` _featureEventHandle

• **_featureEventHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/layers/geojson-layer.ts:50](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L50)*

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[_initialized](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-_initialized)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_initialized](_cs_map_src_layers_base_layer_.baselayer.md#optional-_initialized)*

*Defined in [cs-map/src/layers/base-layer.ts:123](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L123)*

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_legends](_cs_map_src_layers_base_layer_.baselayer.md#optional-_legends)*

*Defined in [cs-map/src/layers/base-layer.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L119)*

list of active layers

___

*Defined in [cs-map/src/layers/geojson-layer.ts:52](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L52)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_manager](_cs_map_src_layers_base_layer_.baselayer.md#optional-_manager)*

*Defined in [cs-map/src/layers/geojson-layer.ts:46](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L46)*

___

### `Optional` _parent

*Defined in [cs-map/src/layers/base-layer.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L119)*

*Defined in [cs-map/src/layers/geojson-layer.ts:34](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L34)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_service](_cs_map_src_layers_base_layer_.baselayer.md#optional-_service)*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L88)*

*Defined in [cs-map/src/layers/geojson-layer.ts:46](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L46)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMenu](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmenu)*

*Defined in [cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L121)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Defined in [cs-map/src/layers/geojson-layer.ts:34](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L34)*

### `Optional` _source

• **_source**? : *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[_source](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-_source)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_source](_cs_map_src_layers_base_layer_.baselayer.md#optional-_source)*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L88)*

• **color**: *string* = "blue"

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[color](_cs_map_src_layers_base_layer_.baselayer.md#color)*

*Defined in [cs-map/src/layers/base-layer.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L72)*

___

*Defined in [cs-map/src/layers/base-layer.ts:121](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L121)*

*Defined in [cs-map/src/layers/base-layer.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L78)*

if multiple feature types are avaible, this is the default feature type key

___

###  description

*Defined in [cs-map/src/layers/base-layer.ts:122](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L122)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[disableFeatureList](_cs_map_src_layers_base_layer_.baselayer.md#optional-disablefeaturelist)*

*Defined in [cs-map/src/layers/base-layer.ts:86](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L86)*

*Defined in [cs-map/src/layers/geojson-layer.ts:51](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L51)*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[extensions](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-extensions)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[extensions](_cs_map_src_layers_base_layer_.baselayer.md#optional-extensions)*

*Defined in [cs-map/src/layers/geojson-layer.ts:49](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L49)*

___

*Defined in [cs-map/src/layers/base-layer.ts:72](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L72)*

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L117)*

___

### `Optional` filter

• **filter**? : *any*

*Defined in [cs-map/src/layers/base-layer.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L78)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[hideInLayerList](_cs_map_src_layers_base_layer_.baselayer.md#optional-hideinlayerlist)*

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L81)*

*Defined in [cs-map/src/layers/base-layer.ts:65](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L65)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[id](_cs_map_src_layers_base_layer_.baselayer.md#id)*

*Defined in [cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L58)*

___

### `Optional` isEditable

*Defined in [cs-map/src/layers/base-layer.ts:86](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L86)*

___

### `Optional` layout

• **layout**? : *mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[layout](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-layout)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[layout](_cs_map_src_layers_base_layer_.baselayer.md#optional-layout)*

*Defined in [cs-map/src/layers/geojson-layer.ts:49](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L49)*

• **mask**? : *boolean*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[mask](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-mask)*

*Defined in [cs-map/src/layers/geojson-layer.ts:30](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L30)*

___

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L117)*

*Defined in [cs-map/src/layers/base-layer.ts:84](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L84)*

___

### `Optional` paint

• **paint**? : *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[paint](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-paint)*

*Defined in [cs-map/src/layers/geojson-layer.ts:35](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L35)*

### `Optional` parentId

• **parentId**? : *string*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[parentId](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-parentid)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parentId](_cs_map_src_layers_base_layer_.baselayer.md#optional-parentid)*

*Defined in [cs-map/src/layers/base-layer.ts:81](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L81)*

• **popupContent**? : *string | Function | undefined*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[popupContent](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-popupcontent)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[popupContent](_cs_map_src_layers_base_layer_.baselayer.md#optional-popupcontent)*

*Defined in [cs-map/src/layers/geojson-layer.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L48)*

*Defined in [cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L58)*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[source](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-source)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[source](_cs_map_src_layers_base_layer_.baselayer.md#optional-source)*

*Defined in [cs-map/src/layers/geojson-layer.ts:28](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L28)*

___

*Defined in [cs-map/src/layers/geojson-layer.ts:33](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L33)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[style](_cs_map_src_layers_base_layer_.baselayer.md#optional-style)*

*Defined in [cs-map/src/layers/geojson-layer.ts:31](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L31)*

___

###  tags

• **tags**: *string[]* =  []

*Defined in [cs-map/src/layers/geojson-layer.ts:36](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L36)*

###  title

• **title**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[title](_cs_map_src_layers_base_layer_.baselayer.md#title)*

*Defined in [cs-map/src/layers/base-layer.ts:62](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L62)*

*Defined in [cs-map/src/layers/geojson-layer.ts:30](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L30)*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[type](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-type)*

*Defined in [cs-map/src/layers/geojson-layer.ts:26](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L26)*

___

###  typeId

*Defined in [cs-map/src/layers/base-layer.ts:84](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L84)*

___

###  types

• **types**: *string[]* =  ['grid']

*Overrides [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[types](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#types)*

*Defined in [cs-map/src/layers/grid-layer.ts:6](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/grid-layer.ts#L6)*

*Defined in [cs-map/src/layers/geojson-layer.ts:41](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L41)*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[visible](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-visible)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[visible](_cs_map_src_layers_base_layer_.baselayer.md#optional-visible)*

*Defined in [cs-map/src/layers/geojson-layer.ts:29](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L29)*

## Accessors

###  Map

*Defined in [cs-map/src/layers/geojson-layer.ts:32](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L32)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

___

###  Visible

• **get Visible**(): *boolean | undefined*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[Visible](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#visible)*

*Defined in [cs-map/src/layers/geojson-layer.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L48)*

• **set Visible**(`value`: boolean | undefined): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[Visible](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#visible)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Visible](_cs_map_src_layers_base_layer_.baselayer.md#visible)*

*Defined in [cs-map/src/layers/geojson-layer.ts:83](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L83)*

**Parameters:**

*Defined in [cs-map/src/layers/geojson-layer.ts:28](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L28)*

___

###  opacity

• **get opacity**(): *number | undefined*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[opacity](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#opacity)*

*Defined in [cs-map/src/layers/geojson-layer.ts:99](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L99)*

*Defined in [cs-map/src/layers/geojson-layer.ts:31](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L31)*

*Defined in [cs-map/src/layers/geojson-layer.ts:90](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number &#124; undefined |

*Defined in [cs-map/src/layers/base-layer.ts:70](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L70)*

▸ **addImage**(`id`: string, `url`: string): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[addImage](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#addimage)*

*Defined in [cs-map/src/layers/geojson-layer.ts:254](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L254)*

**Parameters:**

*Defined in [cs-map/src/layers/base-layer.ts:62](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L62)*
**Returns:** *void*

___

###  addLayer

▸ **addLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Overrides [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[addLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#addlayer)*
*Defined in [cs-map/src/layers/geojson-layer.ts:26](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L26)*
Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  getBounds
*Defined in [cs-map/src/layers/grid-layer.ts:5](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/grid-layer.ts#L5)*
*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getBounds](_cs_map_src_layers_base_layer_.baselayer.md#getbounds)*

*Defined in [cs-map/src/layers/geojson-layer.ts:163](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L163)*

**Returns:** *LngLatBounds | undefined*

___

###  getInstance
*Defined in [cs-map/src/layers/grid-layer.ts:6](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/grid-layer.ts#L6)*
*Defined in [cs-map/src/layers/grid-layer.ts:14](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/grid-layer.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)*

___
*Defined in [cs-map/src/layers/geojson-layer.ts:29](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L29)*
*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getLayerActions](_cs_map_src_layers_base_layer_.baselayer.md#getlayeractions)*

*Defined in [cs-map/src/layers/base-layer.ts:154](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L154)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getStyleLegend
*Defined in [cs-map/src/layers/geojson-layer.ts:73](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L73)*
*Defined in [cs-map/src/layers/base-layer.ts:230](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |
`style` | any |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

*Defined in [cs-map/src/layers/geojson-layer.ts:79](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L79)*

*Defined in [cs-map/src/layers/base-layer.ts:217](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

*Defined in [cs-map/src/layers/geojson-layer.ts:83](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L83)*

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *any*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[initLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#initlayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initLayer](_cs_map_src_layers_base_layer_.baselayer.md#initlayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:178](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *any*

*Defined in [cs-map/src/layers/geojson-layer.ts:99](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L99)*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[layerTypeProps](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#layertypeprops)*

*Defined in [cs-map/src/layers/geojson-layer.ts:130](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L130)*

**Returns:** *string[]*

*Defined in [cs-map/src/layers/geojson-layer.ts:90](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L90)*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[moveLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#movelayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[moveLayer](_cs_map_src_layers_base_layer_.baselayer.md#movelayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:266](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

*Defined in [cs-map/src/layers/geojson-layer.ts:254](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L254)*

*Defined in [cs-map/src/layers/base-layer.ts:257](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L257)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  parseTitle

▸ **parseTitle**(`f?`: Feature): *any*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parseTitle](_cs_map_src_layers_base_layer_.baselayer.md#parsetitle)*
*Defined in [cs-map/src/layers/grid-layer.ts:19](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/grid-layer.ts#L19)*
Name | Type |
------ | ------ |
`f?` | Feature |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[removeLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#removelayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLayer](_cs_map_src_layers_base_layer_.baselayer.md#removelayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:272](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L272)*

**Parameters:**
*Defined in [cs-map/src/layers/geojson-layer.ts:163](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L163)*
**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLegend](_cs_map_src_layers_base_layer_.baselayer.md#removelegend)*

*Defined in [cs-map/src/layers/base-layer.ts:207](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L207)*
*Defined in [cs-map/src/layers/grid-layer.ts:14](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/grid-layer.ts#L14)*
`property` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](_cs_map_src_classes_feature_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setLegend](_cs_map_src_layers_base_layer_.baselayer.md#setlegend)*

*Defined in [cs-map/src/layers/base-layer.ts:212](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L212)*

**Parameters:**

*Defined in [cs-map/src/layers/base-layer.ts:154](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L154)*
**Returns:** *void*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[setOpacity](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#setopacity)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setOpacity](_cs_map_src_layers_base_layer_.baselayer.md#setopacity)*
*Defined in [cs-map/src/layers/base-layer.ts:230](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L230)*
Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLayer](_cs_map_src_layers_base_layer_.baselayer.md#updatelayer)*

*Defined in [cs-map/src/layers/base-layer.ts:203](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L203)*

**Returns:** *void*

*Defined in [cs-map/src/layers/base-layer.ts:217](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L217)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLegends](_cs_map_src_layers_base_layer_.baselayer.md#updatelegends)*

*Defined in [cs-map/src/layers/base-layer.ts:250](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L250)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *Feature | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getFeatureFromEventDetails](_cs_map_src_layers_base_layer_.baselayer.md#static-getfeaturefromeventdetails)*

*Defined in [cs-map/src/layers/base-layer.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L45)*

**Parameters:**

*Defined in [cs-map/src/layers/geojson-layer.ts:178](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L178)*

## Object literals

###  intlData

### ▪ **intlData**: *object*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[intlData](_cs_map_src_layers_base_layer_.baselayer.md#intldata)*

*Defined in [cs-map/src/layers/base-layer.ts:135](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L135)*

###  locales

• **locales**: *string* = "en-US"

*Defined in [cs-map/src/layers/base-layer.ts:136](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L136)*

*Defined in [cs-map/src/layers/geojson-layer.ts:130](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L130)*

  * **USD**: *object*

    * **currency**: *string* = "USD"

    * **style**: *string* = "currency"

  * **percentage**: *object*

    * **style**: *string* = "percent"
*Defined in [cs-map/src/layers/geojson-layer.ts:266](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L266)*
*Defined in [cs-map/src/layers/base-layer.ts:257](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L257)*
*Defined in [cs-map/src/layers/base-layer.ts:267](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L267)*
*Defined in [cs-map/src/layers/geojson-layer.ts:272](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L272)*
*Defined in [cs-map/src/layers/base-layer.ts:207](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L207)*
*Defined in [cs-map/src/layers/base-layer.ts:212](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L212)*
*Defined in [cs-map/src/layers/geojson-layer.ts:141](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/geojson-layer.ts#L141)*
*Defined in [cs-map/src/layers/base-layer.ts:203](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L203)*
*Defined in [cs-map/src/layers/base-layer.ts:250](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/layers/base-layer.ts#L250)*
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
