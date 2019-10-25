# Class: FeatureController

## Hierarchy

* **FeatureController**

## Constructors

###  constructor

\+ **new FeatureController**(`layerService`: [LayerService](_cs_layer_server_src_layers_layers_service_.layerservice.md)): *[FeatureController](_cs_layer_server_src_features_features_controller_.featurecontroller.md)*

*Defined in [cs-layer-server/src/features/features.controller.ts:16](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/features/features.controller.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`layerService` | [LayerService](_cs_layer_server_src_layers_layers_service_.layerservice.md) |

**Returns:** *[FeatureController](_cs_layer_server_src_features_features_controller_.featurecontroller.md)*

## Methods

###  deleteFeature

▸ **deleteFeature**(`sourceid`: string, `featureid`: string): *Promise‹boolean›*

*Defined in [cs-layer-server/src/features/features.controller.ts:65](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/features/features.controller.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceid` | string |
`featureid` | string |

**Returns:** *Promise‹boolean›*

___

###  postFeature

▸ **postFeature**(`body`: Feature, `sourceid`: string, `featureid?`: string): *Promise‹Feature | undefined›*

*Defined in [cs-layer-server/src/features/features.controller.ts:40](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/features/features.controller.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Feature |
`sourceid` | string |
`featureid?` | string |

**Returns:** *Promise‹Feature | undefined›*
