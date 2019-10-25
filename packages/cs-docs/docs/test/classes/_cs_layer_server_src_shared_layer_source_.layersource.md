# Class: LayerSource

## Hierarchy

* **LayerSource**

## Implements

* any

## Constructors

###  constructor

\+ **new LayerSource**(`geojson?`: FeatureCollection): *[LayerSource](_cs_layer_server_src_shared_layer_source_.layersource.md)*

*Defined in [cs-layer-server/src/shared/layer-source.ts:19](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`geojson?` | FeatureCollection |

**Returns:** *[LayerSource](_cs_layer_server_src_shared_layer_source_.layersource.md)*

## Properties

### `Optional` _geojson

• **_geojson**? : *FeatureCollection*

*Defined in [cs-layer-server/src/shared/layer-source.ts:18](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L18)*

___

### `Optional` _loaded

• **_loaded**? : *boolean* = false

*Defined in [cs-layer-server/src/shared/layer-source.ts:19](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L19)*

___

### `Optional` id

• **id**? : *string*

*Defined in [cs-layer-server/src/shared/layer-source.ts:7](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L7)*

id of this layer

___

### `Optional` tileSize

• **tileSize**? : *number*

*Defined in [cs-layer-server/src/shared/layer-source.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L17)*

___

### `Optional` title

• **title**? : *string*

*Defined in [cs-layer-server/src/shared/layer-source.ts:8](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L8)*

___

### `Optional` type

• **type**? : *"vector" | "raster" | "raster-dem" | "geojson" | "image" | "video"*

*Defined in [cs-layer-server/src/shared/layer-source.ts:9](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L9)*

___

### `Optional` url

• **url**? : *string*

*Defined in [cs-layer-server/src/shared/layer-source.ts:16](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L16)*

## Methods

###  LoadSource

▸ **LoadSource**(): *Promise‹FeatureCollection›*

*Defined in [cs-layer-server/src/shared/layer-source.ts:30](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer-source.ts#L30)*

**Returns:** *Promise‹FeatureCollection›*
