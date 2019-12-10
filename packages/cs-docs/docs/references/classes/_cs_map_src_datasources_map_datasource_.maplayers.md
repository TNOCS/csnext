# Class: MapLayers

## Hierarchy

* [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)

  ↳ **MapLayers**

## Implements

* any

## Constructors

###  constructor

\+ **new MapLayers**(`layers?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[], `sources?`: string | [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md), `services?`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]): *[MapLayers](_cs_map_src_datasources_map_datasource_.maplayers.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[constructor](_cs_map_src_datasources_map_datasource_.mapdatasource.md#constructor)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:82](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`layers?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[] |
`sources?` | string &#124; [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md) |
`services?` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[] |

**Returns:** *[MapLayers](_cs_map_src_datasources_map_datasource_.maplayers.md)*

## Properties

### `Optional` _sources

• **_sources**? : *[LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[_sources](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-_sources)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:72](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L72)*

___

### `Optional` activeDrawLayer

• **activeDrawLayer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[activeDrawLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-activedrawlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:73](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L73)*

___

###  events

• **events**: *any* =  new MessageBusService()

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[events](_cs_map_src_datasources_map_datasource_.mapdatasource.md#events)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:74](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L74)*

___

###  id

• **id**: *string* = "map-datasource"

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[id](_cs_map_src_datasources_map_datasource_.mapdatasource.md#id)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:75](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L75)*

___

### `Optional` layers

• **layers**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[layers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-layers)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:89](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L89)*

___

### `Optional` services

• **services**? : *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[services](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-services)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:91](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L91)*

___

### `Optional` sources

• **sources**? : *string | [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[sources](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-sources)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:90](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L90)*

## Accessors

###  MapControl

• **get MapControl**(): *Map | undefined*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapControl](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapcontrol)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:56](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L56)*

**Returns:** *Map | undefined*

___

###  MapWidget

• **get MapWidget**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapWidget](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapwidget)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:64](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L64)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

• **set MapWidget**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapWidget](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapwidget)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:68](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) &#124; undefined |

**Returns:** *void*

## Methods

###  addGeojsonLayer

▸ **addGeojsonLayer**(`title`: string, `geojson?`: string | FeatureCollection, `style?`: [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md), `tags?`: string[], `featureTypes?`: string | [FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md), `defaultFeatureType?`: string): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[addGeojsonLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#addgeojsonlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:100](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`geojson?` | string &#124; FeatureCollection |
`style?` | [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md) |
`tags?` | string[] |
`featureTypes?` | string &#124; [FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md) |
`defaultFeatureType?` | string |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  addLayer

▸ **addLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[addLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#addlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:147](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  clearLayers

▸ **clearLayers**(): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[clearLayers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#clearlayers)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:174](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L174)*

**Returns:** *void*

___

###  deleteLayerFeature

▸ **deleteLayerFeature**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `id`: string, `updateSource`: boolean): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[deleteLayerFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#deletelayerfeature)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:184](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L184)*

delete feature from a feature

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string | - |
`id` | string | - |
`updateSource` | boolean | true |

**Returns:** *void*

___

###  editLayer

▸ **editLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[editLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#editlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:211](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  execute

▸ **execute**(`datasources`: object): *Promise‹any›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[execute](_cs_map_src_datasources_map_datasource_.mapdatasource.md#execute)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:229](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L229)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources` | object |

**Returns:** *Promise‹any›*

___

###  fromGeoJSON

▸ **fromGeoJSON**(`geojson`: FeatureCollection, `title?`: string): *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[fromGeoJSON](_cs_map_src_datasources_map_datasource_.mapdatasource.md#fromgeojson)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:247](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L247)*

**Parameters:**

Name | Type |
------ | ------ |
`geojson` | FeatureCollection |
`title?` | string |

**Returns:** *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

___

###  hideLayer

▸ **hideLayer**(`ml`: string | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[hideLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#hidelayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:262](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L262)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | string &#124; [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  loadLayer

▸ **loadLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[loadLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#loadlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:290](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L290)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `beforeId?`: string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[moveLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#movelayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:312](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L312)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`beforeId?` | string |

**Returns:** *void*

___

###  openFeature

▸ **openFeature**(`feature`: Feature, `layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[openFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#openfeature)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:316](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L316)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  openLayer

▸ **openLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[openLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#openlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:344](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L344)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  refreshLayer

▸ **refreshLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:365](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L365)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  refreshLayerSource

▸ **refreshLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayerSource](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayersource)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:372](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L372)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  refreshLayers

▸ **refreshLayers**(): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayers)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:391](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L391)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layerId`: string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[removeLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#removelayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:399](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L399)*

**Parameters:**

Name | Type |
------ | ------ |
`layerId` | string |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `pd`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[removeLegend](_cs_map_src_datasources_map_datasource_.mapdatasource.md#removelegend)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:405](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L405)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`pd` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[showLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#showlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:407](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L407)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  startPointPicker

▸ **startPointPicker**(`title?`: string): *Promise‹LngLat | undefined›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[startPointPicker](_cs_map_src_datasources_map_datasource_.mapdatasource.md#startpointpicker)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:441](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L441)*

**Parameters:**

Name | Type |
------ | ------ |
`title?` | string |

**Returns:** *Promise‹LngLat | undefined›*

___

###  toggleLayer

▸ **toggleLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[toggleLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#togglelayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:476](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L476)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  updateFeatureProperty

▸ **updateFeatureProperty**(`source`: string, `featureId`: number, `props`: any): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateFeatureProperty](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatefeatureproperty)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:485](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L485)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | string |
`featureId` | number |
`props` | any |

**Returns:** *void*

___

###  updateLayerFeature

▸ **updateLayerFeature**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `feature`: Feature, `updateSource`: boolean): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateLayerFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatelayerfeature)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:499](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L499)*

Replace/update a feature for a given layer

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string | - |
`feature` | Feature | - |
`updateSource` | boolean | true |

**Returns:** *void*

___

###  updateLayerFeatures

▸ **updateLayerFeatures**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `features`: object, `updateSource`: boolean): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateLayerFeatures](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatelayerfeatures)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:539](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L539)*

Replace/update a collection of features for a given layer

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string | - |
`features` | object | - |
`updateSource` | boolean | true |

**Returns:** *void*

___

###  updateLayerSource

▸ **updateLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `geojson?`: FeatureCollection | string, `triggerEvent`: boolean): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateLayerSource](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatelayersource)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:581](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L581)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | - |
`geojson?` | FeatureCollection &#124; string | - |
`triggerEvent` | boolean | true |

**Returns:** *void*

___

###  updateSource

▸ **updateSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateSource](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatesource)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:642](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L642)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  zoomFeature

▸ **zoomFeature**(`feature`: Feature, `zoomLevel?`: number): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[zoomFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#zoomfeature)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:656](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L656)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature |
`zoomLevel?` | number |

**Returns:** *void*

___

###  zoomFeatureId

▸ **zoomFeatureId**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `featureId`: string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[zoomFeatureId](_cs_map_src_datasources_map_datasource_.mapdatasource.md#zoomfeatureid)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:685](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L685)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`featureId` | string |

**Returns:** *void*

___

###  zoomLayer

▸ **zoomLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `padding?`: number): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[zoomLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#zoomlayer)*

*Defined in [packages/cs-map/src/datasources/map-datasource.ts:711](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/datasources/map-datasource.ts#L711)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`padding?` | number |

**Returns:** *void*
