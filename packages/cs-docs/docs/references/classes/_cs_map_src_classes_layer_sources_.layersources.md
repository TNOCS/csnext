# Class: LayerSources

## Hierarchy

* **LayerSources**

## Implements

* any

## Constructors

###  constructor

\+ **new LayerSources**(`layers`: object, `images?`: object): *[LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

*Defined in [cs-map/src/classes/layer-sources.ts:10](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/layer-sources.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`layers` | object |
`images?` | object |

**Returns:** *[LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

## Properties

###  images

• **images**: *object*

*Defined in [cs-map/src/classes/layer-sources.ts:8](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/layer-sources.ts#L8)*

#### Type declaration:

* \[ **id**: *string*\]: string

___

###  layers

• **layers**: *object*

*Defined in [cs-map/src/classes/layer-sources.ts:10](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/layer-sources.ts#L10)*

#### Type declaration:

* \[ **name**: *string*\]: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)

## Methods

###  execute

▸ **execute**(): *Promise‹any›*

*Defined in [cs-map/src/classes/layer-sources.ts:38](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/layer-sources.ts#L38)*

**Returns:** *Promise‹any›*

___

###  initSource

▸ **initSource**(`id`: string, `source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/classes/layer-sources.ts:33](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/layer-sources.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *[LayerSource](_cs_map_src_classes_layer_source_.layersource.md)*

___

###  updateLayerSource

▸ **updateLayerSource**(`id`: string, `geojson`: [DataSet](_cs_data_src_classes_data_set_.dataset.md)): *void*

*Defined in [cs-map/src/classes/layer-sources.ts:25](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/layer-sources.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`geojson` | [DataSet](_cs_data_src_classes_data_set_.dataset.md) |

**Returns:** *void*
