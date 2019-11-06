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

*Defined in [cs-map/src/datasources/map-datasource.ts:71](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L71)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:50](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L50)*

___

### `Optional` activeDrawLayer

• **activeDrawLayer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[activeDrawLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-activedrawlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:54](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L54)*

___

###  events

• **events**: *any* =  new MessageBusService()

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[events](_cs_map_src_datasources_map_datasource_.mapdatasource.md#events)*

*Defined in [cs-map/src/datasources/map-datasource.ts:53](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L53)*

___

###  id

• **id**: *string* = "map-datasource"

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[id](_cs_map_src_datasources_map_datasource_.mapdatasource.md#id)*

*Defined in [cs-map/src/datasources/map-datasource.ts:51](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L51)*

___

### `Optional` layers

• **layers**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[layers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-layers)*

*Defined in [cs-map/src/datasources/map-datasource.ts:74](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L74)*

___

### `Optional` services

• **services**? : *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[services](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-services)*

*Defined in [cs-map/src/datasources/map-datasource.ts:76](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L76)*

___

### `Optional` sources

• **sources**? : *string | [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[sources](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-sources)*

*Defined in [cs-map/src/datasources/map-datasource.ts:75](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L75)*

## Accessors

###  MapControl

• **get MapControl**(): *Map | undefined*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapControl](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapcontrol)*

*Defined in [cs-map/src/datasources/map-datasource.ts:65](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L65)*

**Returns:** *Map | undefined*

___

###  MapWidget

• **get MapWidget**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapWidget](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapwidget)*

*Defined in [cs-map/src/datasources/map-datasource.ts:57](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L57)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

• **set MapWidget**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapWidget](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapwidget)*

*Defined in [cs-map/src/datasources/map-datasource.ts:61](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) &#124; undefined |

**Returns:** *void*

## Methods

###  addGeojsonLayer

▸ **addGeojsonLayer**(`title`: string, `url?`: string, `style?`: [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md), `tags?`: string[], `featureTypes?`: string | [FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md), `defaultFeatureType?`: string): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[addGeojsonLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#addgeojsonlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:622](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L622)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`url?` | string |
`style?` | [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md) |
`tags?` | string[] |
`featureTypes?` | string &#124; [FeatureTypes](_cs_map_src_classes_feature_type_.featuretypes.md) |
`defaultFeatureType?` | string |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  addLayer

▸ **addLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[addLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#addlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:660](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L660)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  clearLayers

▸ **clearLayers**(): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[clearLayers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#clearlayers)*

*Defined in [cs-map/src/datasources/map-datasource.ts:81](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L81)*

**Returns:** *void*

___

###  deleteLayerFeature

▸ **deleteLayerFeature**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `id`: string, `updateSource`: boolean): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[deleteLayerFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#deletelayerfeature)*

*Defined in [cs-map/src/datasources/map-datasource.ts:348](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L348)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:601](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L601)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  execute

▸ **execute**(`datasources`: object): *Promise‹any›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[execute](_cs_map_src_datasources_map_datasource_.mapdatasource.md#execute)*

*Defined in [cs-map/src/datasources/map-datasource.ts:687](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L687)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources` | object |

**Returns:** *Promise‹any›*

___

###  fromGeoJSON

▸ **fromGeoJSON**(`geojson`: FeatureCollection, `title?`: string): *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[fromGeoJSON](_cs_map_src_datasources_map_datasource_.mapdatasource.md#fromgeojson)*

*Defined in [cs-map/src/datasources/map-datasource.ts:90](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L90)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:311](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L311)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | string &#124; [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  loadLayer

▸ **loadLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[loadLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#loadlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:199](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `beforeId?`: string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[moveLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#movelayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:253](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L253)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`beforeId?` | string |

**Returns:** *void*

___

###  refreshLayer

▸ **refreshLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:238](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L238)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  refreshLayerSource

▸ **refreshLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayerSource](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayersource)*

*Defined in [cs-map/src/datasources/map-datasource.ts:142](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  refreshLayers

▸ **refreshLayers**(): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayers)*

*Defined in [cs-map/src/datasources/map-datasource.ts:221](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L221)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layerId`: string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[removeLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#removelayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:341](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L341)*

**Parameters:**

Name | Type |
------ | ------ |
`layerId` | string |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `pd`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[removeLegend](_cs_map_src_datasources_map_datasource_.mapdatasource.md#removelegend)*

*Defined in [cs-map/src/datasources/map-datasource.ts:105](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L105)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:161](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L161)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  startPointPicker

▸ **startPointPicker**(`title?`: string): *Promise‹LngLat | undefined›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[startPointPicker](_cs_map_src_datasources_map_datasource_.mapdatasource.md#startpointpicker)*

*Defined in [cs-map/src/datasources/map-datasource.ts:107](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`title?` | string |

**Returns:** *Promise‹LngLat | undefined›*

___

###  toggleLayer

▸ **toggleLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[toggleLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#togglelayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:229](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L229)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  updateFeatureProperty

▸ **updateFeatureProperty**(`source`: string, `featureId`: number, `props`: any): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateFeatureProperty](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatefeatureproperty)*

*Defined in [cs-map/src/datasources/map-datasource.ts:460](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L460)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:376](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L376)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:417](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L417)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:514](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L514)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:473](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L473)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  zoomFeature

▸ **zoomFeature**(`feature`: Feature, `zoomLevel?`: number): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[zoomFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#zoomfeature)*

*Defined in [cs-map/src/datasources/map-datasource.ts:257](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L257)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:285](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L285)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:245](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-map/src/datasources/map-datasource.ts#L245)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`padding?` | number |

**Returns:** *void*
