# Interface: IStartStopService

## Hierarchy

* [ILayerService](_cs_map_src_classes_layer_service_.ilayerservice.md)

  ↳ **IStartStopService**

## Implemented by

* [LayerServiceBase](../classes/_cs_map_src_classes_layer_service_.layerservicebase.md)

## Properties

### `Optional` Start

• **Start**? : *function*

*Defined in [cs-map/src/classes/layer-service.ts:13](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

___

### `Optional` Stop

• **Stop**? : *function*

*Defined in [cs-map/src/classes/layer-service.ts:14](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L14)*

#### Type declaration:

*Defined in [cs-map/src/classes/layer-service.ts:14](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L14)*
------ | ------ |
`manager` | [MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

___

### `Optional` getInstance

• **getInstance**? : *function*

*Defined in [cs-map/src/classes/layer-service.ts:15](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L15)*

#### Type declaration:

▸ (`init?`: Partial‹any›): *[IStartStopService](_cs_map_src_classes_layer_service_.istartstopservice.md)*

**Parameters:**

*Defined in [cs-map/src/classes/layer-service.ts:15](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L15)*

###  id

• **id**: *string*

*Inherited from [ILayerService](_cs_map_src_classes_layer_service_.ilayerservice.md).[id](_cs_map_src_classes_layer_service_.ilayerservice.md#id)*

*Defined in [cs-map/src/classes/layer-service.ts:4](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L4)*

___

### `Optional` options

• **options**? : *[ILayerServiceOptions](_cs_map_src_classes_layer_service_options_.ilayerserviceoptions.md)*

*Inherited from [ILayerService](_cs_map_src_classes_layer_service_.ilayerservice.md).[options](_cs_map_src_classes_layer_service_.ilayerservice.md#optional-options)*

*Defined in [cs-map/src/classes/layer-service.ts:6](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L6)*

*Defined in [cs-map/src/classes/layer-service.ts:4](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L4)*

*Inherited from [ILayerService](_cs_map_src_classes_layer_service_.ilayerservice.md).[title](_cs_map_src_classes_layer_service_.ilayerservice.md#optional-title)*

*Defined in [cs-map/src/classes/layer-service.ts:5](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L5)*

___

###  type

*Defined in [cs-map/src/classes/layer-service.ts:6](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L6)*

### `Optional` getLayerActions

▸ **getLayerActions**(`layer`: [IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md)): *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Inherited from [ILayerService](_cs_map_src_classes_layer_service_.ilayerservice.md).[getLayerActions](_cs_map_src_classes_layer_service_.ilayerservice.md#optional-getlayeractions)*

*Defined in [cs-map/src/classes/layer-service.ts:7](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L7)*

*Defined in [cs-map/src/classes/layer-service.ts:5](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L5)*

**Returns:** *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

### `Optional` updateLayer

*Defined in [cs-map/src/classes/layer-service.ts:12](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *any*
*Defined in [cs-map/src/classes/layer-service.ts:7](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L7)*
*Defined in [cs-map/src/classes/layer-service.ts:8](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/classes/layer-service.ts#L8)*
