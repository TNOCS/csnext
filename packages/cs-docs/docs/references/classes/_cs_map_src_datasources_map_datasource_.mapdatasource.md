# Class: MapDatasource

## Hierarchy

* any

  ↳ **MapDatasource**

  ↳ [MapLayers](_cs_map_src_datasources_map_datasource_.maplayers.md)

  ↳ [StatsDatasource](_cs_map_src_datasources_stats_datasource_.statsdatasource.md)

## Constructors

###  constructor

\+ **new MapDatasource**(`layers?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[], `sources?`: object, `services?`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:84](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`layers?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[] |
`sources?` | object |
`services?` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[] |

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

## Properties

### `Optional` activeDrawLayer

• **activeDrawLayer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:80](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L80)*

___

###  id

• **id**: *string* = "map-datasource"

*Defined in [cs-map/src/datasources/map-datasource.ts:77](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L77)*

___

### `Optional` layers

• **layers**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]*

*Defined in [cs-map/src/datasources/map-datasource.ts:91](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L91)*

___

### `Private` `Optional` map

• **map**? : *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:83](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L83)*

___

### `Private` `Optional` pointPickerHandler

• **pointPickerHandler**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:84](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L84)*

___

### `Optional` services

• **services**? : *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]*

*Defined in [cs-map/src/datasources/map-datasource.ts:95](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L95)*

## Accessors

###  MapControl

• **get MapControl**(): *Map | undefined*

*Defined in [cs-map/src/datasources/map-datasource.ts:59](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L59)*

**Returns:** *Map | undefined*

___

###  MapWidget

• **get MapWidget**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Defined in [cs-map/src/datasources/map-datasource.ts:67](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L67)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

• **set MapWidget**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:71](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) &#124; undefined |

**Returns:** *void*

## Methods

###  addGeojsonLayer

▸ **addGeojsonLayer**(`title`: string, `geojson?`: string | [DataSet](_cs_data_src_classes_data_set_.dataset.md), `style?`: [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md), `meta?`: string | [FeatureTypes](_cs_data_src_classes_feature_type_.featuretypes.md), `args?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:169](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  clearLayers

▸ **clearLayers**(): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:196](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L196)*

**Returns:** *void*

___

###  deleteLayerFeature

▸ **deleteLayerFeature**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `id`: string, `updateSource`: boolean): *void*

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

###  editLayer

▸ **editLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:233](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L233)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  execute

▸ **execute**(`datasources`: object): *Promise‹any›*

*Defined in [cs-map/src/datasources/map-datasource.ts:251](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources` | object |

**Returns:** *Promise‹any›*

___

###  fromGeoJSON

▸ **fromGeoJSON**(`geojson`: FeatureCollection, `title?`: string): *Promise‹[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:273](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L273)*

**Parameters:**

Name | Type |
------ | ------ |
`geojson` | FeatureCollection |
`title?` | string |

**Returns:** *Promise‹[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)›*

___

### `Private` getLayerInstance

▸ **getLayerInstance**(`type`: string, `init?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | undefined*

*Defined in [cs-map/src/datasources/map-datasource.ts:785](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L785)*

Create a IMapLayer instance based on layer type, optionally provide maplayer config

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`init?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | undefined*

___

### `Private` getServiceInstance

▸ **getServiceInstance**(`type`: string, `init?`: [ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md)): *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) | undefined*

*Defined in [cs-map/src/datasources/map-datasource.ts:800](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L800)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`init?` | [ILayerService](../interfaces/_cs_map_src_classes_layer_service_.ilayerservice.md) |

**Returns:** *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) | undefined*

___

###  hideLayer

▸ **hideLayer**(`ml`: string | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:288](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L288)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | string &#124; [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` initLayers

▸ **initLayers**(): *Promise‹void›*

*Defined in [cs-map/src/datasources/map-datasource.ts:813](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L813)*

create an instance and initialize all layers

**Returns:** *Promise‹void›*

___

### `Private` initServices

▸ **initServices**(): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:832](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L832)*

create an instance and initialize all services

**Returns:** *void*

___

###  loadLayer

▸ **loadLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:316](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L316)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `beforeId?`: string): *void*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:392](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L392)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string |

**Returns:** *void*

___

###  refreshLayer

▸ **refreshLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:413](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L413)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  refreshLayerSource

▸ **refreshLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:420](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L420)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  refreshLayers

▸ **refreshLayers**(): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:439](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L439)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layerId`: string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:447](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L447)*

**Parameters:**

Name | Type |
------ | ------ |
`layerId` | string |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `legend`: [PropertyDetails](_cs_map_src_components_feature_details_property_details_.propertydetails.md)): *void*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:455](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L455)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  startPointPicker

▸ **startPointPicker**(`title?`: string): *Promise‹LngLat | undefined›*

*Defined in [cs-map/src/datasources/map-datasource.ts:491](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L491)*

**Parameters:**

Name | Type |
------ | ------ |
`title?` | string |

**Returns:** *Promise‹LngLat | undefined›*

___

###  toggleLayer

▸ **toggleLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:526](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L526)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  updateDataSet

▸ **updateDataSet**(`sourceId`: string, `data`: [DataSet](_cs_data_src_classes_data_set_.dataset.md)): *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:703](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L703)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *[DataSource](_cs_data_src_classes_data_source_.datasource.md)*

___

###  zoomFeature

▸ **zoomFeature**(`feature`: Feature, `zoomLevel?`: number): *void*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:774](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/datasources/map-datasource.ts#L774)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`padding?` | number |

**Returns:** *void*
