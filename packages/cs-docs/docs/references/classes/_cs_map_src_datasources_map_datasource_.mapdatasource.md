# Class: MapDatasource

## Hierarchy

* **MapDatasource**

  ↳ [MapLayers](_cs_map_src_datasources_map_datasource_.maplayers.md)

## Implements

* any

## Constructors

###  constructor

\+ **new MapDatasource**(`layers?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[], `sources?`: string | [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md), `services?`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:74](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L74)*
------ | ------ |
`layers?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[] |
`sources?` | string &#124; [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md) |
`services?` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[] |

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

## Properties

### `Private` FEATURE_SIDEBAR_ID

• **FEATURE_SIDEBAR_ID**: *"feature"* = "feature"

### `Private` FEATURE_SIDEBAR_ID

• **FEATURE_SIDEBAR_ID**: *"feature"* = "feature"

*Defined in [cs-map/src/datasources/map-datasource.ts:57](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L57)*

___

### `Private` LAYER_DETAILS_SIDEBAR_ID

• **LAYER_DETAILS_SIDEBAR_ID**: *"layerdetails"* = "layerdetails"

*Defined in [cs-map/src/datasources/map-datasource.ts:58](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L58)*

___


### `Optional` activeDrawLayer

• **activeDrawLayer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*
*Defined in [cs-map/src/datasources/map-datasource.ts:51](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L51)*
###  events

• **events**: *any* =  new MessageBusService()

*Defined in [cs-map/src/datasources/map-datasource.ts:54](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L54)*

___
*Defined in [cs-map/src/datasources/map-datasource.ts:55](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L55)*
*Defined in [cs-map/src/datasources/map-datasource.ts:52](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L52)*

___

### `Optional` layers

• **layers**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]*
*Defined in [cs-map/src/datasources/map-datasource.ts:54](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L54)*
### `Private` `Optional` map

• **map**? : *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:56](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L56)*

___
*Defined in [cs-map/src/datasources/map-datasource.ts:52](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L52)*
*Defined in [cs-map/src/datasources/map-datasource.ts:53](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L53)*

___

### `Optional` services

• **services**? : *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]*
*Defined in [cs-map/src/datasources/map-datasource.ts:77](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L77)*
### `Optional` sources

• **sources**? : *string | [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L78)*

## Accessors
*Defined in [cs-map/src/datasources/map-datasource.ts:56](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L56)*
*Defined in [cs-map/src/datasources/map-datasource.ts:68](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L68)*

**Returns:** *Map | undefined*

___

###  MapWidget
*Defined in [cs-map/src/datasources/map-datasource.ts:53](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L53)*
**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

• **set MapWidget**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:64](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L64)*

**Parameters:**
*Defined in [cs-map/src/datasources/map-datasource.ts:79](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L79)*
**Returns:** *void*

## Methods

###  addGeojsonLayer

▸ **addGeojsonLayer**(`title`: string, `url?`: string, `style?`: [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md), `tags?`: string[], `featureTypes?`: string | [FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md), `defaultFeatureType?`: string): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*
*Defined in [cs-map/src/datasources/map-datasource.ts:78](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L78)*
Name | Type |
------ | ------ |
`title` | string |
`url?` | string |
`style?` | [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md) |
`tags?` | string[] |
`featureTypes?` | string &#124; [FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md) |
*Defined in [cs-map/src/datasources/map-datasource.ts:68](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L68)*

###  addLayer

▸ **addLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:717](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L717)*

**Parameters:**

*Defined in [cs-map/src/datasources/map-datasource.ts:60](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L60)*

___

###  clearLayers

*Defined in [cs-map/src/datasources/map-datasource.ts:64](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L64)*

___

###  deleteLayerFeature

▸ **deleteLayerFeature**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `id`: string, `updateSource`: boolean): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:351](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L351)*

delete feature from a feature

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
*Defined in [cs-map/src/datasources/map-datasource.ts:671](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L671)*

___

###  editLayer

▸ **editLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:652](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L652)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  execute
*Defined in [cs-map/src/datasources/map-datasource.ts:717](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L717)*
**Parameters:**

Name | Type |
------ | ------ |
`datasources` | object |

**Returns:** *Promise‹any›*

___

###  fromGeoJSON

▸ **fromGeoJSON**(`geojson`: FeatureCollection, `title?`: string): *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:93](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L93)*
*Defined in [cs-map/src/datasources/map-datasource.ts:84](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L84)*
`geojson` | FeatureCollection |
`title?` | string |

**Returns:** *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

___

### `Private` getLayerInstance

*Defined in [cs-map/src/datasources/map-datasource.ts:351](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L351)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`init?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | undefined*

___

### `Private` getServiceInstance

▸ **getServiceInstance**(`type`: string, `init?`: [ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)): *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) | undefined*

*Defined in [cs-map/src/datasources/map-datasource.ts:575](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L575)*

**Parameters:**
*Defined in [cs-map/src/datasources/map-datasource.ts:652](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L652)*

**Returns:** *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) | undefined*

___

###  hideLayer

▸ **hideLayer**(`ml`: string | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:314](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L314)*

**Parameters:**

Name | Type |
------ | ------ |
*Defined in [cs-map/src/datasources/map-datasource.ts:744](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L744)*

### `Private` initLayers

▸ **initLayers**(): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:763](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L763)*

create an instance and initialize all layers

**Returns:** *void*

___

### `Private` initServices

*Defined in [cs-map/src/datasources/map-datasource.ts:93](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L93)*

**Returns:** *void*

___

###  loadLayer

▸ **loadLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:202](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
*Defined in [cs-map/src/datasources/map-datasource.ts:588](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L588)*
###  moveLayer

▸ **moveLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `beforeId?`: string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:256](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L256)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`beforeId?` | string |

**Returns:** *void*

___

###  openFeature
*Defined in [cs-map/src/datasources/map-datasource.ts:575](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L575)*
**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  openLayer

▸ **openLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:631](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L631)*
*Defined in [cs-map/src/datasources/map-datasource.ts:314](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L314)*
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  refreshLayer

▸ **refreshLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:241](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L241)*

**Parameters:**

Name | Type |
*Defined in [cs-map/src/datasources/map-datasource.ts:763](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L763)*
___

###  refreshLayerSource

▸ **refreshLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:145](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L145)*

**Parameters:**

Name | Type |
*Defined in [cs-map/src/datasources/map-datasource.ts:782](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L782)*
___

###  refreshLayers

▸ **refreshLayers**(): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:224](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L224)*

**Returns:** *void*

___
*Defined in [cs-map/src/datasources/map-datasource.ts:202](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L202)*
*Defined in [cs-map/src/datasources/map-datasource.ts:344](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L344)*

**Parameters:**

Name | Type |
------ | ------ |
`layerId` | string |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `pd`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*
*Defined in [cs-map/src/datasources/map-datasource.ts:256](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L256)*
Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`pd` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*
###  openFeature

▸ **openFeature**(`feature`: Feature, `layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:603](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L603)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  openLayer

▸ **openLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:631](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L631)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___


Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
*Defined in [cs-map/src/datasources/map-datasource.ts:241](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L241)*
###  updateFeatureProperty

▸ **updateFeatureProperty**(`source`: string, `featureId`: number, `props`: any): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:463](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L463)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | string |
`featureId` | number |
`props` | any |

**Returns:** *void*
*Defined in [cs-map/src/datasources/map-datasource.ts:145](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L145)*
▸ **updateLayerFeature**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `feature`: Feature, `updateSource`: boolean): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:379](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L379)*

Replace/update a feature for a given layer

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string | - |
`feature` | Feature | - |
`updateSource` | boolean | true |

**Returns:** *void*
*Defined in [cs-map/src/datasources/map-datasource.ts:224](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L224)*
▸ **updateLayerFeatures**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `features`: object, `updateSource`: boolean): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:420](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L420)*

Replace/update a collection of features for a given layer

**Parameters:**

Name | Type | Default |
*Defined in [cs-map/src/datasources/map-datasource.ts:344](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L344)*
**Returns:** *void*

___

###  updateLayerSource

▸ **updateLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `geojson?`: FeatureCollection | string, `triggerEvent`: boolean): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:517](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L517)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | - |
*Defined in [cs-map/src/datasources/map-datasource.ts:108](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L108)*
___

###  updateSource

▸ **updateSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:476](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L476)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:164](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L164)*

*Defined in [cs-map/src/datasources/map-datasource.ts:260](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L260)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature |
`zoomLevel?` | number |

**Returns:** *void*

___

###  zoomFeatureId
*Defined in [cs-map/src/datasources/map-datasource.ts:110](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L110)*
**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`featureId` | string |

**Returns:** *void*

___

###  zoomLayer

▸ **zoomLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `padding?`: number): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:232](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L232)*
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`padding?` | number |

**Returns:** *void*
*Defined in [cs-map/src/datasources/map-datasource.ts:463](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L463)*
*Defined in [cs-map/src/datasources/map-datasource.ts:379](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L379)*
*Defined in [cs-map/src/datasources/map-datasource.ts:420](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L420)*
*Defined in [cs-map/src/datasources/map-datasource.ts:517](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L517)*
*Defined in [cs-map/src/datasources/map-datasource.ts:476](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L476)*
*Defined in [cs-map/src/datasources/map-datasource.ts:260](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L260)*
*Defined in [cs-map/src/datasources/map-datasource.ts:288](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L288)*
*Defined in [cs-map/src/datasources/map-datasource.ts:248](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/datasources/map-datasource.ts#L248)*
