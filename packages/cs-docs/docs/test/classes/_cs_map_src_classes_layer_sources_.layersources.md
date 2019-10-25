# Class: LayerSources

## Hierarchy

* **LayerSources**

## Implements

* any

## Constructors

###  constructor

\+ **new LayerSources**(`layers`: object, `images?`: object): *[LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

*Defined in [cs-map/src/classes/layer-sources.ts:19](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-sources.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`layers` | object |
`images?` | object |

**Returns:** *[LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

## Properties

###  id

• **id**: *string* = "layersources"

*Defined in [cs-map/src/classes/layer-sources.ts:7](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-sources.ts#L7)*

___

###  images

• **images**: *object*

*Defined in [cs-map/src/classes/layer-sources.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-sources.ts#L17)*

#### Type declaration:

* \[ **id**: *string*\]: string

___

###  layers

• **layers**: *object*

*Defined in [cs-map/src/classes/layer-sources.ts:19](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-sources.ts#L19)*

#### Type declaration:

* \[ **name**: *string*\]: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)

## Methods

###  execute

▸ **execute**(): *Promise‹any›*

*Defined in [cs-map/src/classes/layer-sources.ts:37](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-sources.ts#L37)*

**Returns:** *Promise‹any›*

___

###  initSource

▸ **initSource**(`id`: string, `source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/classes/layer-sources.ts:31](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-sources.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

___

###  updateLayerSource

▸ **updateLayerSource**(`id`: string, `geojson`: FeatureCollection): *void*

*Defined in [cs-map/src/classes/layer-sources.ts:9](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/classes/layer-sources.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`geojson` | FeatureCollection |

**Returns:** *void*
