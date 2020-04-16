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

*Defined in [cs-map/src/layers/grid-layer.ts:6](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/grid-layer.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)*

## Properties

###  _busManager

• **_busManager**: *[MessageBusManager](_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)* =  new MessageBusManager()

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_busManager](_cs_map_src_layers_base_layer_.baselayer.md#_busmanager)*

*Defined in [cs-map/src/layers/base-layer.ts:46](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L46)*

___

###  _events

• **_events**: *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_events](_cs_map_src_layers_base_layer_.baselayer.md#_events)*

*Defined in [cs-map/src/layers/base-layer.ts:47](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L47)*

___

###  _extensions

• **_extensions**: *[ILayerExtension](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextension.md)[]* =  []

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_extensions](_cs_map_src_layers_base_layer_.baselayer.md#_extensions)*

*Defined in [cs-map/src/layers/base-layer.ts:48](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L48)*

___

###  _featureType

• **_featureType**: *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_featureType](_cs_map_src_layers_base_layer_.baselayer.md#_featuretype)*

*Defined in [cs-map/src/layers/base-layer.ts:49](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L49)*

___

### `Optional` _filters

• **_filters**? : *object*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_filters](_cs_map_src_layers_base_layer_.baselayer.md#optional-_filters)*

*Defined in [cs-map/src/layers/base-layer.ts:50](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L50)*

#### Type declaration:

* \[ **key**: *string*\]: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)

___

### `Optional` _initialized

• **_initialized**? : *boolean* = false

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_initialized](_cs_map_src_layers_base_layer_.baselayer.md#optional-_initialized)*

*Defined in [cs-map/src/layers/base-layer.ts:52](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L52)*

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_legends](_cs_map_src_layers_base_layer_.baselayer.md#optional-_legends)*

*Defined in [cs-map/src/layers/base-layer.ts:54](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L54)*

list of active layers

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_manager](_cs_map_src_layers_base_layer_.baselayer.md#optional-_manager)*

*Defined in [cs-map/src/layers/base-layer.ts:55](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L55)*

___

### `Optional` _parent

• **_parent**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_parent](_cs_map_src_layers_base_layer_.baselayer.md#optional-_parent)*

*Defined in [cs-map/src/layers/base-layer.ts:56](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L56)*

___

### `Optional` _service

• **_service**? : *[ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_service](_cs_map_src_layers_base_layer_.baselayer.md#optional-_service)*

*Defined in [cs-map/src/layers/base-layer.ts:57](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L57)*

___

### `Optional` _showMenu

• **_showMenu**? : *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMenu](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmenu)*

*Defined in [cs-map/src/layers/base-layer.ts:58](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L58)*

___

### `Optional` _showMore

• **_showMore**? : *boolean | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_showMore](_cs_map_src_layers_base_layer_.baselayer.md#optional-_showmore)*

*Defined in [cs-map/src/layers/base-layer.ts:59](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L59)*

___

### `Optional` _source

• **_source**? : *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[_source](_cs_map_src_layers_base_layer_.baselayer.md#optional-_source)*

*Defined in [cs-map/src/layers/base-layer.ts:61](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L61)*

___

###  color

• **color**: *string* = "blue"

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[color](_cs_map_src_layers_base_layer_.baselayer.md#color)*

*Defined in [cs-map/src/layers/base-layer.ts:63](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L63)*

___

### `Optional` defaultFeatureType

• **defaultFeatureType**? : *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[defaultFeatureType](_cs_map_src_layers_base_layer_.baselayer.md#optional-defaultfeaturetype)*

*Defined in [cs-map/src/layers/base-layer.ts:65](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L65)*

if multiple feature types are avaible, this is the default feature type key

___

###  description

• **description**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[description](_cs_map_src_layers_base_layer_.baselayer.md#description)*

*Defined in [cs-map/src/layers/base-layer.ts:67](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L67)*

___

### `Optional` disableFeatureList

• **disableFeatureList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[disableFeatureList](_cs_map_src_layers_base_layer_.baselayer.md#optional-disablefeaturelist)*

*Defined in [cs-map/src/layers/base-layer.ts:69](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L69)*

___

### `Optional` enabled

• **enabled**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[enabled](_cs_map_src_layers_base_layer_.baselayer.md#optional-enabled)*

*Defined in [cs-map/src/layers/base-layer.ts:109](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L109)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[extensions](_cs_map_src_layers_base_layer_.baselayer.md#optional-extensions)*

*Defined in [cs-map/src/layers/base-layer.ts:70](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L70)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[featureTypes](_cs_map_src_layers_base_layer_.baselayer.md#optional-featuretypes)*

*Defined in [cs-map/src/layers/base-layer.ts:117](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L117)*

___

### `Optional` filter

• **filter**? : *any[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[filter](_cs_map_src_layers_base_layer_.baselayer.md#optional-filter)*

*Defined in [cs-map/src/layers/base-layer.ts:85](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L85)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[hideInLayerList](_cs_map_src_layers_base_layer_.baselayer.md#optional-hideinlayerlist)*

*Defined in [cs-map/src/layers/base-layer.ts:87](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L87)*

___

###  id

• **id**: *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[id](_cs_map_src_layers_base_layer_.baselayer.md#id)*

*Defined in [cs-map/src/layers/base-layer.ts:88](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L88)*

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[isEditable](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#optional-iseditable)*

*Defined in [cs-map/src/layers/geojson-layer.ts:21](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L21)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[openFeatureDetails](_cs_map_src_layers_base_layer_.baselayer.md#optional-openfeaturedetails)*

*Defined in [cs-map/src/layers/base-layer.ts:104](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L104)*

___

### `Optional` parentId

• **parentId**? : *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parentId](_cs_map_src_layers_base_layer_.baselayer.md#optional-parentid)*

*Defined in [cs-map/src/layers/base-layer.ts:105](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L105)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[popupContent](_cs_map_src_layers_base_layer_.baselayer.md#optional-popupcontent)*

*Defined in [cs-map/src/layers/base-layer.ts:106](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L106)*

___

### `Optional` source

• **source**? : *string | [DataSource](_cs_data_src_classes_data_source_.datasource.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[source](_cs_map_src_layers_base_layer_.baselayer.md#optional-source)*

*Defined in [cs-map/src/layers/base-layer.ts:107](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L107)*

___

### `Optional` state

• **state**? : *"hidden" | "loading" | "visible"*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[state](_cs_map_src_layers_base_layer_.baselayer.md#optional-state)*

*Defined in [cs-map/src/layers/base-layer.ts:108](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L108)*

___

### `Optional` style

• **style**? : *[LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[style](_cs_map_src_layers_base_layer_.baselayer.md#optional-style)*

*Defined in [cs-map/src/layers/base-layer.ts:110](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L110)*

___

###  supportLayers

• **supportLayers**: *string[]* =  []

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[supportLayers](_cs_map_src_layers_base_layer_.baselayer.md#supportlayers)*

*Defined in [cs-map/src/layers/base-layer.ts:71](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L71)*

___

###  tags

• **tags**: *string[]* =  []

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[tags](_cs_map_src_layers_base_layer_.baselayer.md#tags)*

*Defined in [cs-map/src/layers/base-layer.ts:112](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L112)*

___

###  title

• **title**: *string* = ""

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[title](_cs_map_src_layers_base_layer_.baselayer.md#title)*

*Defined in [cs-map/src/layers/base-layer.ts:115](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L115)*

___

###  typeId

• **typeId**: *string* = "line"

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[typeId](_cs_map_src_layers_base_layer_.baselayer.md#optional-typeid)*

*Defined in [cs-map/src/layers/grid-layer.ts:5](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/grid-layer.ts#L5)*

___

###  types

• **types**: *string[]* =  ['grid']

*Defined in [cs-map/src/layers/grid-layer.ts:6](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/grid-layer.ts#L6)*

## Accessors

###  Map

• **get Map**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[Map](_cs_map_src_layers_base_layer_.baselayer.md#map)*

*Defined in [cs-map/src/layers/base-layer.ts:137](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L137)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

___

###  MapControl

• **get MapControl**(): *mapboxgl.Map | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[MapControl](_cs_map_src_layers_base_layer_.baselayer.md#mapcontrol)*

*Defined in [cs-map/src/layers/base-layer.ts:147](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L147)*

**Returns:** *mapboxgl.Map | undefined*

___

###  layout

• **get layout**(): *mapboxgl.Layout*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[layout](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#layout)*

*Defined in [cs-map/src/layers/geojson-layer.ts:35](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L35)*

**Returns:** *mapboxgl.Layout*

• **set layout**(`value`: mapboxgl.Layout): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[layout](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#layout)*

*Defined in [cs-map/src/layers/geojson-layer.ts:56](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | mapboxgl.Layout |

**Returns:** *void*

___

###  opacity

• **get opacity**(): *number | undefined*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[opacity](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#opacity)*

*Defined in [cs-map/src/layers/geojson-layer.ts:76](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L76)*

**Returns:** *number | undefined*

• **set opacity**(`value`: number | undefined): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[opacity](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#opacity)*

*Defined in [cs-map/src/layers/geojson-layer.ts:99](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number &#124; undefined |

**Returns:** *void*

___

###  paint

• **get paint**(): *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[paint](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#paint)*

*Defined in [cs-map/src/layers/geojson-layer.ts:108](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L108)*

**Returns:** *mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint*

• **set paint**(`value`: mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[paint](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#paint)*

*Defined in [cs-map/src/layers/geojson-layer.ts:127](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | mapboxgl.SymbolPaint &#124; mapboxgl.LinePaint &#124; mapboxgl.FillPaint &#124; mapboxgl.CirclePaint |

**Returns:** *void*

## Methods

###  addImage

▸ **addImage**(`id`: string, `url`: string): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[addImage](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#addimage)*

*Defined in [cs-map/src/layers/geojson-layer.ts:154](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L154)*

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

*Defined in [cs-map/src/layers/grid-layer.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/grid-layer.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  addSupportLayer

▸ **addSupportLayer**(`layer`: mapboxgl.Layer): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[addSupportLayer](_cs_map_src_layers_base_layer_.baselayer.md#addsupportlayer)*

*Defined in [cs-map/src/layers/base-layer.ts:388](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L388)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | mapboxgl.Layer |

**Returns:** *void*

___

###  applyFilter

▸ **applyFilter**(`filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[applyFilter](_cs_map_src_layers_base_layer_.baselayer.md#applyfilter)*

*Defined in [cs-map/src/layers/base-layer.ts:182](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L182)*

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

*Defined in [cs-map/src/layers/geojson-layer.ts:204](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L204)*

**Returns:** *LngLatBounds | undefined*

___

###  getFeatureType

▸ **getFeatureType**(): *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getFeatureType](_cs_map_src_layers_base_layer_.baselayer.md#getfeaturetype)*

*Defined in [cs-map/src/layers/base-layer.ts:177](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L177)*

**Returns:** *[FeatureType](_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

___

###  getInstance

▸ **getInstance**(`init?`: Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›): *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)‹›*

*Overrides [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[getInstance](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#getinstance)*

*Defined in [cs-map/src/layers/grid-layer.ts:14](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/grid-layer.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | Partial‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)› |

**Returns:** *[GridLayer](_cs_map_src_layers_grid_layer_.gridlayer.md)‹›*

___

###  getLayerActions

▸ **getLayerActions**(): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getLayerActions](_cs_map_src_layers_base_layer_.baselayer.md#getlayeractions)*

*Defined in [cs-map/src/layers/base-layer.ts:224](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L224)*

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getStyleLegend

▸ **getStyleLegend**(`styleKey`: string, `style?`: any): *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getStyleLegend](_cs_map_src_layers_base_layer_.baselayer.md#getstylelegend)*

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

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getStyleLegendKey](_cs_map_src_layers_base_layer_.baselayer.md#getstylelegendkey)*

*Defined in [cs-map/src/layers/base-layer.ts:296](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L296)*

**Parameters:**

Name | Type |
------ | ------ |
`styleKey` | string |

**Returns:** *[LayerLegend](../interfaces/_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

___

###  initFilter

▸ **initFilter**(`property`: string): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initFilter](_cs_map_src_layers_base_layer_.baselayer.md#initfilter)*

*Defined in [cs-map/src/layers/base-layer.ts:309](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L309)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | string |

**Returns:** *void*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[initLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#initlayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[initLayer](_cs_map_src_layers_base_layer_.baselayer.md#initlayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:224](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L224)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[moveLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#movelayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[moveLayer](_cs_map_src_layers_base_layer_.baselayer.md#movelayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:319](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L319)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *void*

___

###  parsePopup

▸ **parsePopup**(`f?`: mapboxgl.MapboxGeoJSONFeature): *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parsePopup](_cs_map_src_layers_base_layer_.baselayer.md#parsepopup)*

*Defined in [cs-map/src/layers/base-layer.ts:332](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L332)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | mapboxgl.MapboxGeoJSONFeature |

**Returns:** *string*

___

###  parseTitle

▸ **parseTitle**(`f?`: mapboxgl.MapboxGeoJSONFeature): *string*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[parseTitle](_cs_map_src_layers_base_layer_.baselayer.md#parsetitle)*

*Defined in [cs-map/src/layers/base-layer.ts:355](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L355)*

**Parameters:**

Name | Type |
------ | ------ |
`f?` | mapboxgl.MapboxGeoJSONFeature |

**Returns:** *string*

___

### `Protected` registerLayerExtensions

▸ **registerLayerExtensions**(): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[registerLayerExtensions](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#protected-registerlayerextensions)*

*Defined in [cs-map/src/layers/geojson-layer.ts:370](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L370)*

**Returns:** *void*

___

### `Protected` removeExtensions

▸ **removeExtensions**(): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[removeExtensions](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#protected-removeextensions)*

*Defined in [cs-map/src/layers/geojson-layer.ts:387](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L387)*

**Returns:** *void*

___

###  removeFilter

▸ **removeFilter**(`filter`: [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md)): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeFilter](_cs_map_src_layers_base_layer_.baselayer.md#removefilter)*

*Defined in [cs-map/src/layers/base-layer.ts:413](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L413)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [LayerFilter](_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`widget`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *void*

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[removeLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#removelayer)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLayer](_cs_map_src_layers_base_layer_.baselayer.md#removelayer)*

*Defined in [cs-map/src/layers/geojson-layer.ts:325](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L325)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) | [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[removeLegend](_cs_map_src_layers_base_layer_.baselayer.md#removelegend)*

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

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setFilter](_cs_map_src_layers_base_layer_.baselayer.md#setfilter)*

*Defined in [cs-map/src/layers/base-layer.ts:400](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L400)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *void*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) | [PropertyType](_cs_data_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setLegend](_cs_map_src_layers_base_layer_.baselayer.md#setlegend)*

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

*Inherited from [GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md).[setOpacity](_cs_map_src_layers_geojson_layer_.geojsonlayer.md#setopacity)*

*Overrides [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setOpacity](_cs_map_src_layers_base_layer_.baselayer.md#setopacity)*

*Defined in [cs-map/src/layers/geojson-layer.ts:347](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/geojson-layer.ts#L347)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

___

###  setPopupContent

▸ **setPopupContent**(`value`: string | function): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[setPopupContent](_cs_map_src_layers_base_layer_.baselayer.md#setpopupcontent)*

*Defined in [cs-map/src/layers/base-layer.ts:435](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L435)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; function |

**Returns:** *void*

___

###  updateFilters

▸ **updateFilters**(): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateFilters](_cs_map_src_layers_base_layer_.baselayer.md#updatefilters)*

*Defined in [cs-map/src/layers/base-layer.ts:439](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L439)*

**Returns:** *void*

___

###  updateGeojson

▸ **updateGeojson**(`data`: [DataSet](_cs_data_src_classes_data_set_.dataset.md)): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateGeojson](_cs_map_src_layers_base_layer_.baselayer.md#updategeojson)*

*Defined in [cs-map/src/layers/base-layer.ts:446](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L446)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DataSet](_cs_data_src_classes_data_set_.dataset.md) |

**Returns:** *void*

___

###  updateLayer

▸ **updateLayer**(): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLayer](_cs_map_src_layers_base_layer_.baselayer.md#updatelayer)*

*Defined in [cs-map/src/layers/base-layer.ts:452](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L452)*

**Returns:** *void*

___

###  updateLegends

▸ **updateLegends**(): *void*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[updateLegends](_cs_map_src_layers_base_layer_.baselayer.md#updatelegends)*

*Defined in [cs-map/src/layers/base-layer.ts:454](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L454)*

**Returns:** *void*

___

### `Static` getFeatureFromEventDetails

▸ **getFeatureFromEventDetails**(`e`: [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md)): *MapboxGeoJSONFeature | undefined*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[getFeatureFromEventDetails](_cs_map_src_layers_base_layer_.baselayer.md#static-getfeaturefromeventdetails)*

*Defined in [cs-map/src/layers/base-layer.ts:34](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/layers/base-layer.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [FeatureEventDetails](../interfaces/_cs_map_src_components_cs_map_feature_event_details_.featureeventdetails.md) |

**Returns:** *MapboxGeoJSONFeature | undefined*

## Object literals

###  intlData

### ▪ **intlData**: *object*

*Inherited from [BaseLayer](_cs_map_src_layers_base_layer_.baselayer.md).[intlData](_cs_map_src_layers_base_layer_.baselayer.md#intldata)*

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
