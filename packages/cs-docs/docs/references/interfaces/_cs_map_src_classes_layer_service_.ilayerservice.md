# Interface: ILayerService

## Hierarchy

* **ILayerService**

  ↳ [IStartStopService](_cs_map_src_classes_layer_service_.istartstopservice.md)

## Implemented by

* [LayerServiceBase](../classes/_cs_map_src_classes_layer_service_.layerservicebase.md)

## Properties

###  id

• **id**: *string*

*Defined in [packages/cs-map/src/classes/layer-service.ts:4](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/layer-service.ts#L4)*

___

### `Optional` options

• **options**? : *[ILayerServiceOptions](_cs_map_src_classes_layer_service_options_.ilayerserviceoptions.md)*

*Defined in [packages/cs-map/src/classes/layer-service.ts:6](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/layer-service.ts#L6)*

___

### `Optional` title

• **title**? : *string*

*Defined in [packages/cs-map/src/classes/layer-service.ts:5](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/layer-service.ts#L5)*

## Methods

### `Optional` getLayerActions

▸ **getLayerActions**(`layer`: [IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md)): *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [packages/cs-map/src/classes/layer-service.ts:7](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/layer-service.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

### `Optional` updateLayer

▸ **updateLayer**(`layer`: [IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md)): *any*

*Defined in [packages/cs-map/src/classes/layer-service.ts:8](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/layer-service.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *any*
