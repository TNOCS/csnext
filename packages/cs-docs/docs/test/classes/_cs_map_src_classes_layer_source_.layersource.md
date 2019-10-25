# Class: LayerSource

## Hierarchy

* **LayerSource**

## Implements

* any

## Constructors

###  constructor

\+ **new LayerSource**(`geojson?`: FeatureCollection): *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/classes/layer-source.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`geojson?` | FeatureCollection |

**Returns:** *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

## Properties

### `Optional` _geojson

• **_geojson**? : *FeatureCollection*

*Defined in [cs-map/src/classes/layer-source.ts:20](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L20)*

___

### `Optional` _loaded

• **_loaded**? : *boolean* = false

*Defined in [cs-map/src/classes/layer-source.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L21)*

___

### `Optional` id

• **id**? : *string*

*Defined in [cs-map/src/classes/layer-source.ts:9](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L9)*

id of this layer

___

### `Optional` tileSize

• **tileSize**? : *number*

*Defined in [cs-map/src/classes/layer-source.ts:19](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L19)*

___

### `Optional` title

• **title**? : *string*

*Defined in [cs-map/src/classes/layer-source.ts:10](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L10)*

___

### `Optional` type

• **type**? : *"vector" | "raster" | "raster-dem" | "geojson" | "image" | "video"*

*Defined in [cs-map/src/classes/layer-source.ts:11](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L11)*

___

### `Optional` url

• **url**? : *string*

*Defined in [cs-map/src/classes/layer-source.ts:18](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L18)*

## Methods

###  LoadSource

▸ **LoadSource**(): *Promise‹FeatureCollection›*

*Defined in [cs-map/src/classes/layer-source.ts:61](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-source.ts#L61)*

**Returns:** *Promise‹FeatureCollection›*
