# Class: StatsDatasource

## Hierarchy

  ↳ [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)

  ↳ **StatsDatasource**

## Constructors

###  constructor

\+ **new StatsDatasource**(`layers?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[], `sources?`: object, `services?`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]): *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[constructor](_cs_map_src_datasources_map_datasource_.mapdatasource.md#constructor)*

*Defined in [cs-map/src/datasources/map-datasource.ts:84](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`layers?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[] |
`sources?` | object |
`services?` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[] |

**Returns:** *[StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md)*

## Properties

### `Optional` activeDrawLayer

• **activeDrawLayer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[activeDrawLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-activedrawlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:80](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L80)*

___

### `Optional` activeInsight

• **activeInsight**? : *[Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md)*

Defined in cs-map/src/datasources/stats-datasource.ts:16

___

### `Optional` activeInsightView

• **activeInsightView**? : *[InsightView](../interfaces/_cs_data_src_interfaces_insight_.insightview.md)*

Defined in cs-map/src/datasources/stats-datasource.ts:17

___

###  id

• **id**: *string* = "stats-datasource"

*Overrides [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[id](_cs_map_src_datasources_map_datasource_.mapdatasource.md#id)*

Defined in cs-map/src/datasources/stats-datasource.ts:14

___

### `Optional` layers

• **layers**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[layers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-layers)*

*Defined in [cs-map/src/datasources/map-datasource.ts:91](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L91)*

___

### `Optional` mainLayer

• **mainLayer**? : *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

Defined in cs-map/src/datasources/stats-datasource.ts:18

___

### `Optional` services

• **services**? : *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[services](_cs_map_src_datasources_map_datasource_.mapdatasource.md#optional-services)*

*Defined in [cs-map/src/datasources/map-datasource.ts:95](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L95)*

## Accessors

###  MapControl

• **get MapControl**(): *Map | undefined*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapControl](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapcontrol)*

*Defined in [cs-map/src/datasources/map-datasource.ts:59](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L59)*

**Returns:** *Map | undefined*

___

###  MapWidget

• **get MapWidget**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapWidget](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapwidget)*

*Defined in [cs-map/src/datasources/map-datasource.ts:67](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L67)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

• **set MapWidget**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[MapWidget](_cs_map_src_datasources_map_datasource_.mapdatasource.md#mapwidget)*

*Defined in [cs-map/src/datasources/map-datasource.ts:71](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) &#124; undefined |

**Returns:** *void*

## Methods

###  activateInsight

▸ **activateInsight**(`insight`: [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md)): *void*

Defined in cs-map/src/datasources/stats-datasource.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`insight` | [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md) |

**Returns:** *void*

___

###  activateInsightView

▸ **activateInsightView**(`view`: [InsightView](../interfaces/_cs_data_src_interfaces_insight_.insightview.md), `insight`: [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md)): *Promise‹void›*

Defined in cs-map/src/datasources/stats-datasource.ts:54

**Parameters:**

Name | Type |
------ | ------ |
`view` | [InsightView](../interfaces/_cs_data_src_interfaces_insight_.insightview.md) |
`insight` | [Insight](../interfaces/_cs_data_src_interfaces_insight_.insight.md) |

**Returns:** *Promise‹void›*

___

###  activateLayerResource

▸ **activateLayerResource**(`resourceName`: string): *Promise‹[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)›*

Defined in cs-map/src/datasources/stats-datasource.ts:104

**Parameters:**

Name | Type |
------ | ------ |
`resourceName` | string |

**Returns:** *Promise‹[DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)›*

___

###  addGeojsonLayer

▸ **addGeojsonLayer**(`title`: string, `geojson?`: string | [DataSet](_cs_data_src_classes_data_set_.dataset.md), `style?`: [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md), `meta?`: string | [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md), `args?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[addGeojsonLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#addgeojsonlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:143](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`geojson?` | string &#124; [DataSet](_cs_data_src_classes_data_set_.dataset.md) |
`style?` | [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md) |
`meta?` | string &#124; [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md) |
`args?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  addGeojsonLayerFromSource

▸ **addGeojsonLayerFromSource**(`title`: string, `source`: [DataSource](_cs_data_src_classes_data_source_.datasource.md), `style?`: [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md), `args?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) | undefined›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[addGeojsonLayerFromSource](_cs_map_src_datasources_map_datasource_.mapdatasource.md#addgeojsonlayerfromsource)*

*Defined in [cs-map/src/datasources/map-datasource.ts:105](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`source` | [DataSource](_cs_data_src_classes_data_source_.datasource.md) |
`style?` | [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md) |
`args?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) | undefined›*

___

###  addLayer

▸ **addLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[addLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#addlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:169](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  clearLayers

▸ **clearLayers**(): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[clearLayers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#clearlayers)*

*Defined in [cs-map/src/datasources/map-datasource.ts:196](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L196)*

**Returns:** *void*

___

###  deleteLayerFeature

▸ **deleteLayerFeature**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `id`: string, `updateSource`: boolean): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[deleteLayerFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#deletelayerfeature)*

*Defined in [cs-map/src/datasources/map-datasource.ts:206](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L206)*

delete feature from a feature

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string | - |
`id` | string | - |
`updateSource` | boolean | true |

**Returns:** *void*

___

###  disableInsight

▸ **disableInsight**(): *void*

Defined in cs-map/src/datasources/stats-datasource.ts:31

**Returns:** *void*

___

###  downloadFile

▸ **downloadFile**(`layer`: [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)): *void*

Defined in cs-map/src/datasources/stats-datasource.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md) |

**Returns:** *void*

___

###  downloadSource

▸ **downloadSource**(`source`: [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md)): *void*

Defined in cs-map/src/datasources/stats-datasource.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`source` | [DataResource](../interfaces/_cs_data_src_interfaces_datapackage_.dataresource.md) |

**Returns:** *void*

___

###  editLayer

▸ **editLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[editLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#editlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:233](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L233)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  execute

▸ **execute**(`datasources`: object): *Promise‹any›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[execute](_cs_map_src_datasources_map_datasource_.mapdatasource.md#execute)*

*Defined in [cs-map/src/datasources/map-datasource.ts:251](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources` | object |

**Returns:** *Promise‹any›*

___

### `Private` forceFileDownload

▸ **forceFileDownload**(`data`: any, `filename`: string): *void*

Defined in cs-map/src/datasources/stats-datasource.ts:121

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`filename` | string |

**Returns:** *void*

___

###  fromGeoJSON

▸ **fromGeoJSON**(`geojson`: FeatureCollection, `title?`: string): *Promise‹[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[fromGeoJSON](_cs_map_src_datasources_map_datasource_.mapdatasource.md#fromgeojson)*

*Defined in [cs-map/src/datasources/map-datasource.ts:273](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L273)*

**Parameters:**

Name | Type |
------ | ------ |
`geojson` | FeatureCollection |
`title?` | string |

**Returns:** *Promise‹[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)›*

___

###  hideLayer

▸ **hideLayer**(`ml`: string | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[hideLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#hidelayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:288](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L288)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | string &#124; [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  loadLayer

▸ **loadLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[loadLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#loadlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:316](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L316)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `beforeId?`: string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[moveLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#movelayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:338](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L338)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`beforeId?` | string |

**Returns:** *void*

___

###  openFeature

▸ **openFeature**(`feature?`: Feature, `layer?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[openFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#openfeature)*

*Defined in [cs-map/src/datasources/map-datasource.ts:364](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L364)*

**Parameters:**

Name | Type |
------ | ------ |
`feature?` | Feature |
`layer?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  openLayer

▸ **openLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[openLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#openlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:392](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L392)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  refreshLayer

▸ **refreshLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:413](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L413)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  refreshLayerSource

▸ **refreshLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayerSource](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayersource)*

*Defined in [cs-map/src/datasources/map-datasource.ts:420](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L420)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  refreshLayers

▸ **refreshLayers**(): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[refreshLayers](_cs_map_src_datasources_map_datasource_.mapdatasource.md#refreshlayers)*

*Defined in [cs-map/src/datasources/map-datasource.ts:439](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L439)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layerId`: string): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[removeLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#removelayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:447](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L447)*

**Parameters:**

Name | Type |
------ | ------ |
`layerId` | string |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `legend`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[removeLegend](_cs_map_src_datasources_map_datasource_.mapdatasource.md#removelegend)*

*Defined in [cs-map/src/datasources/map-datasource.ts:453](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L453)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`legend` | [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md) |

**Returns:** *void*

___

###  selectFeature

▸ **selectFeature**(`feature`: number | Feature | undefined, `layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `open`: boolean): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[selectFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#selectfeature)*

*Defined in [cs-map/src/datasources/map-datasource.ts:343](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L343)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | number &#124; Feature &#124; undefined |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`open` | boolean |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[showLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#showlayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:455](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L455)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  startPointPicker

▸ **startPointPicker**(`title?`: string): *Promise‹LngLat | undefined›*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[startPointPicker](_cs_map_src_datasources_map_datasource_.mapdatasource.md#startpointpicker)*

*Defined in [cs-map/src/datasources/map-datasource.ts:491](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L491)*

**Parameters:**

Name | Type |
------ | ------ |
`title?` | string |

**Returns:** *Promise‹LngLat | undefined›*

___

###  toggleLayer

▸ **toggleLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[toggleLayer](_cs_map_src_datasources_map_datasource_.mapdatasource.md#togglelayer)*

*Defined in [cs-map/src/datasources/map-datasource.ts:526](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L526)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  updateDataSet

▸ **updateDataSet**(`sourceId`: string, `data`: [DataSet](_cs_data_src_classes_data_set_.dataset.md)): *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateDataSet](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatedataset)*

*Defined in [cs-map/src/datasources/map-datasource.ts:691](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L691)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceId` | string |
`data` | [DataSet](_cs_data_src_classes_data_set_.dataset.md) |

**Returns:** *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

___

###  updateFeatureProperty

▸ **updateFeatureProperty**(`source`: string, `featureId`: number, `props`: any): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateFeatureProperty](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatefeatureproperty)*

*Defined in [cs-map/src/datasources/map-datasource.ts:534](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L534)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:548](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L548)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:588](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L588)*

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

▸ **updateLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `geojson?`: [DataCollection](../interfaces/_cs_data_src_classes_data_collection_.datacollection.md) | string, `triggerEvent`: boolean): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateLayerSource](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatelayersource)*

*Defined in [cs-map/src/datasources/map-datasource.ts:630](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L630)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | - |
`geojson?` | [DataCollection](../interfaces/_cs_data_src_classes_data_collection_.datacollection.md) &#124; string | - |
`triggerEvent` | boolean | true |

**Returns:** *void*

___

###  updateSource

▸ **updateSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[updateSource](_cs_map_src_datasources_map_datasource_.mapdatasource.md#updatesource)*

*Defined in [cs-map/src/datasources/map-datasource.ts:703](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L703)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

___

###  zoomFeature

▸ **zoomFeature**(`feature`: Feature, `zoomLevel?`: number): *void*

*Inherited from [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md).[zoomFeature](_cs_map_src_datasources_map_datasource_.mapdatasource.md#zoomfeature)*

*Defined in [cs-map/src/datasources/map-datasource.ts:719](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L719)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:748](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L748)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:774](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L774)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`padding?` | number |

**Returns:** *void*
