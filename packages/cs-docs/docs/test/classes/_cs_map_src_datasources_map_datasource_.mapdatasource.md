# Class: MapDatasource

## Hierarchy

* **MapDatasource**

  ↳ [MapLayers](_cs_map_src_datasources_map_datasource_.maplayers.md)

## Implements

* any

## Constructors

###  constructor

\+ **new MapDatasource**(`layers?`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[], `sources?`: string | [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md), `services?`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:66](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`layers?` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[] |
`sources?` | string &#124; [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md) |
`services?` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[] |

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

## Properties

### `Optional` _sources

• **_sources**? : *[LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:45](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L45)*

___

### `Optional` activeDrawLayer

• **activeDrawLayer**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:49](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L49)*

___

###  events

• **events**: *any* =  new MessageBusService()

*Defined in [cs-map/src/datasources/map-datasource.ts:48](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L48)*

___

###  id

• **id**: *string* = "map-datasource"

*Defined in [cs-map/src/datasources/map-datasource.ts:46](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L46)*

___

### `Optional` layers

• **layers**? : *[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)[]*

*Defined in [cs-map/src/datasources/map-datasource.ts:69](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L69)*

___

### `Optional` services

• **services**? : *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]*

*Defined in [cs-map/src/datasources/map-datasource.ts:71](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L71)*

___

### `Optional` sources

• **sources**? : *string | [LayerSources](_cs_map_src_classes_layer_sources_.layersources.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:70](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L70)*

## Accessors

###  MapControl

• **get MapControl**(): *Map | undefined*

*Defined in [cs-map/src/datasources/map-datasource.ts:60](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L60)*

**Returns:** *Map | undefined*

___

###  MapWidget

• **get MapWidget**(): *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

*Defined in [cs-map/src/datasources/map-datasource.ts:52](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L52)*

**Returns:** *[CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined*

• **set MapWidget**(`map`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) | undefined): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:56](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) &#124; undefined |

**Returns:** *void*

## Methods

###  addGeojsonLayer

▸ **addGeojsonLayer**(`title`: string, `url`: string, `style?`: [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:593](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L593)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`url` | string |
`style?` | [LayerStyle](_cs_map_src_classes_layer_style_.layerstyle.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  addLayer

▸ **addLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:620](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L620)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  clearLayers

▸ **clearLayers**(): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:76](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L76)*

**Returns:** *void*

___

###  deleteLayerFeature

▸ **deleteLayerFeature**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | string, `id`: string, `updateSource`: boolean): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:339](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L339)*

delete feature from a feature

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) &#124; string | - |
`id` | string | - |
`updateSource` | boolean | true |

**Returns:** *void*

___

###  execute

▸ **execute**(`datasources`: object): *Promise‹any›*

*Defined in [cs-map/src/datasources/map-datasource.ts:647](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L647)*

**Parameters:**

Name | Type |
------ | ------ |
`datasources` | object |

**Returns:** *Promise‹any›*

___

###  fromGeoJSON

▸ **fromGeoJSON**(`geojson`: FeatureCollection, `title?`: string): *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

*Defined in [cs-map/src/datasources/map-datasource.ts:85](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`geojson` | FeatureCollection |
`title?` | string |

**Returns:** *[GeojsonLayer](_cs_map_src_layers_geojson_layer_.geojsonlayer.md)*

___

###  hideLayer

▸ **hideLayer**(`ml`: string | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:304](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L304)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | string &#124; [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  loadLayer

▸ **loadLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:194](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `beforeId?`: string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:246](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`beforeId?` | string |

**Returns:** *void*

___

###  refreshLayer

▸ **refreshLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:233](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L233)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  refreshLayerSource

▸ **refreshLayerSource**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:137](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  refreshLayers

▸ **refreshLayers**(): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:216](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L216)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layerId`: string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:332](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L332)*

**Parameters:**

Name | Type |
------ | ------ |
`layerId` | string |

**Returns:** *void*

___

###  removeLegend

▸ **removeLegend**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `pd`: [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:100](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`pd` | [PropertyDetails](_cs_map_src_components_feature_details_feature_details_.propertydetails.md) |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`ml`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/datasources/map-datasource.ts:156](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`ml` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  startPointPicker

▸ **startPointPicker**(`title?`: string): *Promise‹LngLat | undefined›*

*Defined in [cs-map/src/datasources/map-datasource.ts:102](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`title?` | string |

**Returns:** *Promise‹LngLat | undefined›*

___

###  toggleLayer

▸ **toggleLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:224](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L224)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  updateFeatureProperty

▸ **updateFeatureProperty**(`source`: string, `featureId`: number, `props`: any): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:451](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L451)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:367](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L367)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:408](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L408)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:505](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L505)*

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

*Defined in [cs-map/src/datasources/map-datasource.ts:464](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L464)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  zoomFeature

▸ **zoomFeature**(`feature`: Feature, `zoomLevel?`: number): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:250](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L250)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature |
`zoomLevel?` | number |

**Returns:** *void*

___

###  zoomFeatureId

▸ **zoomFeatureId**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `featureId`: string): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:278](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L278)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`featureId` | string |

**Returns:** *void*

___

###  zoomLayer

▸ **zoomLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `padding?`: number): *void*

*Defined in [cs-map/src/datasources/map-datasource.ts:240](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/datasources/map-datasource.ts#L240)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |
`padding?` | number |

**Returns:** *void*
