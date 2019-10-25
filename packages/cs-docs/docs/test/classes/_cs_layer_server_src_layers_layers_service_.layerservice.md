# Class: LayerService

## Hierarchy

* **LayerService**

## Constructors

###  constructor

\+ **new LayerService**(`socket`: [DefaultWebSocketGateway](_cs_layer_server_src_websocket_gateway_.defaultwebsocketgateway.md)): *[LayerService](_cs_layer_server_src_layers_layers_service_.layerservice.md)*

*Defined in [cs-layer-server/src/layers/layers.service.ts:50](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`socket` | [DefaultWebSocketGateway](_cs_layer_server_src_websocket_gateway_.defaultwebsocketgateway.md) |

**Returns:** *[LayerService](_cs_layer_server_src_layers_layers_service_.layerservice.md)*

## Properties

### `Static` sourcePlugins

▪ **sourcePlugins**: *[ISourcePluginType](../interfaces/_cs_layer_server_src_classes_source_plugin_.isourceplugintype.md)[]* =  []

*Defined in [cs-layer-server/src/layers/layers.service.ts:41](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L41)*

## Methods

###  addLayer

▸ **addLayer**(`def`: [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:220](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L220)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)›*

___

###  deleteFeature

▸ **deleteFeature**(`sourceid`: string, `featureId`: string): *Promise‹boolean›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:485](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L485)*

add or update feature

**Parameters:**

Name | Type |
------ | ------ |
`sourceid` | string |
`featureId` | string |

**Returns:** *Promise‹boolean›*

___

###  flushSocketQueue

▸ **flushSocketQueue**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:410](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L410)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  getLayerAndSourceById

▸ **getLayerAndSourceById**(`id`: string): *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) | undefined›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:560](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L560)*

find one specific layer

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) | undefined›*

___

###  getLayerById

▸ **getLayerById**(`id`: string): *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) | undefined›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:384](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L384)*

find one specific layer

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) | undefined›*

___

###  getLayerSourceById

▸ **getLayerSourceById**(`id`: string): *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:579](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L579)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

___

###  getLayers

▸ **getLayers**(): *[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)[]*

*Defined in [cs-layer-server/src/layers/layers.service.ts:379](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L379)*

return all layers

**Returns:** *[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)[]*

___

###  handleConnection

▸ **handleConnection**(`d`: Client): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:36](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | Client |

**Returns:** *void*

___

###  importLayers

▸ **importLayers**(): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:115](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L115)*

look in the import folder if there are any layers to be imported

**Returns:** *void*

___

###  init

▸ **init**(`configFile?`: string, `serverPath?`: string): *Promise‹void›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:72](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`configFile?` | string |
`serverPath?` | string |

**Returns:** *Promise‹void›*

___

###  initLayer

▸ **initLayer**(`layer`: [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:299](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L299)*

init layer

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)›*

___

###  initLayers

▸ **initLayers**(): *Promise‹boolean›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:283](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L283)*

initialize all layers

**Returns:** *Promise‹boolean›*

___

###  loadLayerSource

▸ **loadLayerSource**(`def`: [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:676](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L676)*

load & return layer source

**Parameters:**

Name | Type |
------ | ------ |
`def` | [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *Promise‹[LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) | undefined›*

___

###  putLayerDefinitionById

▸ **putLayerDefinitionById**(`id`: string, `body`: [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:517](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L517)*

update defintion for layer

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`body` | [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *Promise‹[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)›*

___

###  putLayerSourceById

▸ **putLayerSourceById**(`id`: string, `body`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *Promise‹boolean›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:786](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L786)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`body` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *Promise‹boolean›*

___

###  queueSocketUpdate

▸ **queueSocketUpdate**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md), `feature`: Feature): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:395](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L395)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |
`feature` | Feature |

**Returns:** *void*

___

###  saveMetaConfig

▸ **saveMetaConfig**(`def`: [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:272](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L272)*

save meta for layer definition

**Parameters:**

Name | Type |
------ | ------ |
`def` | [LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md) |

**Returns:** *void*

___

###  saveServerConfig

▸ **saveServerConfig**(): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:242](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L242)*

save active server config

**Returns:** *void*

___

###  saveServerConfigDelay

▸ **saveServerConfigDelay**(): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:214](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L214)*

**Returns:** *void*

___

###  saveSource

▸ **saveSource**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:769](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L769)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  triggerLayerRefresh

▸ **triggerLayerRefresh**(`id`: string): *Promise‹boolean›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:572](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L572)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹boolean›*

___

###  updateFeature

▸ **updateFeature**(`sourceid`: string, `feature`: Feature, `featureId?`: string): *Promise‹Feature | undefined›*

*Defined in [cs-layer-server/src/layers/layers.service.ts:428](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L428)*

add or update feature

**Parameters:**

Name | Type |
------ | ------ |
`sourceid` | string |
`feature` | Feature |
`featureId?` | string |

**Returns:** *Promise‹Feature | undefined›*

___

### `Static` AddSourcePlugin

▸ **AddSourcePlugin**(`type`: [ISourcePluginType](../interfaces/_cs_layer_server_src_classes_source_plugin_.isourceplugintype.md)): *void*

*Defined in [cs-layer-server/src/layers/layers.service.ts:44](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/layers/layers.service.ts#L44)*

register new source plugin

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ISourcePluginType](../interfaces/_cs_layer_server_src_classes_source_plugin_.isourceplugintype.md) |

**Returns:** *void*
