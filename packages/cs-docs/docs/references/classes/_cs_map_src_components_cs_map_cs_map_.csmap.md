# Class: CsMap

## Hierarchy

* any

  ↳ **CsMap**

## Properties

### `Private` _pointerPickerActivated

• **_pointerPickerActivated**: *boolean* = false

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:131](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L131)*

___

### `Private` `Optional` geocoderControl

• **geocoderControl**? : *MapboxGeocoder*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:132](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L132)*

___

### `Private` `Optional` geolocatorControl

• **geolocatorControl**? : *GeolocateControl*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:133](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L133)*

___

### `Private` `Optional` gridControl

• **gridControl**? : *[GridControl](_cs_map_src_controls_grid_control_grid_control_.gridcontrol.md)*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:134](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L134)*

___

### `Private` `Optional` layersWidgetControl

• **layersWidgetControl**? : *[LayersWidgetControl](_cs_map_src_controls_layers_widget_control_layers_widget_.layerswidgetcontrol.md)*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:135](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L135)*

___

### `Private` `Optional` legendControl

• **legendControl**? : *[LayerLegendControl](_cs_map_src_controls_layer_legend_control_layer_legend_control_.layerlegendcontrol.md)*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:136](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L136)*

___

###  map

• **map**: *mapboxgl.Map*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:126](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L126)*

actual mapbox gl control

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:127](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L127)*

___

### `Private` mapOptions

• **mapOptions**: *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:137](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L137)*

___

### `Private` `Optional` mapboxStyleSwitcherControl

• **mapboxStyleSwitcherControl**? : *[MapboxStyleSwitcherControl](_cs_map_src_controls_style_switcher_style_switcher_.mapboxstyleswitchercontrol.md)*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:139](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L139)*

___

### `Private` `Optional` rulerControl

• **rulerControl**? : *RulerControl*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:140](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L140)*

___

### `Private` `Optional` scaleControl

• **scaleControl**? : *ScaleControl*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:141](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L141)*

___

###  styles

• **styles**: *[MapboxStyleDefinition](../modules/_cs_map_src_classes_map_style_definition_.md#mapboxstyledefinition)[]* =  MapboxStyleSwitcherControl.DEFAULT_STYLES

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:128](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L128)*

___

### `Private` `Optional` trafficControl

• **trafficControl**? : *MapboxTraffic*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:142](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L142)*

___

### `Static` DRAWLAYER

▪ **DRAWLAYER**: *string* = "drawlayer"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:77](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L77)*

___

### `Static` DRAWLAYER_ACTIVATED

▪ **DRAWLAYER_ACTIVATED**: *string* = "drawlayer.activated"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:78](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L78)*

___

### `Static` DRAWLAYER_DEACTIVATED

▪ **DRAWLAYER_DEACTIVATED**: *string* = "drawlayer.deactivated"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:79](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L79)*

___

### `Static` DRAWLAYER_START_DRAWING

▪ **DRAWLAYER_START_DRAWING**: *string* = "drawlayer.startdrawing"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:80](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L80)*

___

### `Static` FEATURE_CREATED

▪ **FEATURE_CREATED**: *string* = "created"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:81](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L81)*

___

### `Static` FEATURE_DELETED

▪ **FEATURE_DELETED**: *string* = "deleted"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:82](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L82)*

___

### `Static` FEATURE_MOUSE_ENTER

▪ **FEATURE_MOUSE_ENTER**: *string* = "enter"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:83](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L83)*

___

### `Static` FEATURE_MOUSE_LEAVE

▪ **FEATURE_MOUSE_LEAVE**: *string* = "leave"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:84](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L84)*

___

### `Static` FEATURE_SELECT

▪ **FEATURE_SELECT**: *string* = "select"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:86](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L86)*

___

### `Static` FEATURE_UPDATED

▪ **FEATURE_UPDATED**: *string* = "updated"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:87](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L87)*

___

### `Static` LAYER_ACTIVATED

▪ **LAYER_ACTIVATED**: *string* = "layer.activated"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:88](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L88)*

___

### `Static` LAYER_DISABLED

▪ **LAYER_DISABLED**: *string* = "layer.disabled"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:89](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L89)*

___

### `Static` LAYER_UPDATED

▪ **LAYER_UPDATED**: *string* = "layer.updated"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:90](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L90)*

___

### `Static` MAP_CLICK

▪ **MAP_CLICK**: *string* = "map.click"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:91](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L91)*

___

### `Static` MAP_DOUBLE_CLICK

▪ **MAP_DOUBLE_CLICK**: *string* = "map.doubleclick"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:92](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L92)*

___

### `Static` MAP_LOADED

▪ **MAP_LOADED**: *string* = "loaded"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:93](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L93)*

___

### `Static` SEARCH_RESULT_SELECT

▪ **SEARCH_RESULT_SELECT**: *string* = "search.select"

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:94](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L94)*

___

### `Static` layerExtensions

▪ **layerExtensions**: *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]* =  []

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:95](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L95)*

___

### `Static` layerTypes

▪ **layerTypes**: *[IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)[]* =  []

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:96](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L96)*

___

### `Static` serviceTypes

▪ **serviceTypes**: *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]* =  []

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:97](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L97)*

## Accessors

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:49](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L49)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  options

• **get options**(): *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:60](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L60)*

**Returns:** *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

___

###  pointPickerActivated

• **get pointPickerActivated**(): *boolean*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:67](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L67)*

**Returns:** *boolean*

• **set pointPickerActivated**(`value`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:71](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *void*

## Methods

### `Private` addClickLayer

▸ **addClickLayer**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:726](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L726)*

**Returns:** *void*

___

### `Private` addGeocoder

▸ **addGeocoder**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:787](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L787)*

**Returns:** *void*

___

###  addImage

▸ **addImage**(`id`: string, `url`: string): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:148](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`url` | string |

**Returns:** *void*

___

###  addSource

▸ **addSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:159](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:190](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L190)*

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:195](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L195)*

**Returns:** *void*

___

###  dataLoaded

▸ **dataLoaded**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:202](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L202)*

**Returns:** *void*

___

###  destroyed

▸ **destroyed**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:206](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L206)*

**Returns:** *void*

___

### `Private` getRouteOptions

▸ **getRouteOptions**(): *mapboxgl.MapboxOptions*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:880](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L880)*

**Returns:** *mapboxgl.MapboxOptions*

___

### `Private` getStyleUri

▸ **getStyleUri**(`styleId`: string): *string*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:899](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L899)*

**Parameters:**

Name | Type |
------ | ------ |
`styleId` | string |

**Returns:** *string*

___

###  initLayerSource

▸ **initLayerSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *any*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:210](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *any*

___

###  initMapLayers

▸ **initMapLayers**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:219](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L219)*

**Returns:** *void*

___

### `Private` loadTranslations

▸ **loadTranslations**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:907](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L907)*

**Returns:** *void*

___

### `Private` mapLoaded

▸ **mapLoaded**(`e`: any): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:916](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L916)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:250](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L250)*

**Returns:** *void*

___

### `Private` removeGeocoder

▸ **removeGeocoder**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:939](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L939)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:405](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L405)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  setStyle

▸ **setStyle**(`style`: [MapboxStyleDefinition](../modules/_cs_map_src_classes_map_style_definition_.md#mapboxstyledefinition)): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:416](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L416)*

**Parameters:**

Name | Type |
------ | ------ |
`style` | [MapboxStyleDefinition](../modules/_cs_map_src_classes_map_style_definition_.md#mapboxstyledefinition) |

**Returns:** *void*

___

###  showBuildings

▸ **showBuildings**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:423](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L423)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showCompass

▸ **showCompass**(`enabled`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:467](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L467)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *void*

___

###  showGeocoder

▸ **showGeocoder**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:472](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L472)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showGeolocator

▸ **showGeolocator**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:483](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L483)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showGrid

▸ **showGrid**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:497](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L497)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:514](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L514)*

Add layer to mapbox. Load source of necessary

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  showLayers

▸ **showLayers**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:583](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L583)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showLayersWidget

▸ **showLayersWidget**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:606](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L606)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showLegend

▸ **showLegend**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:623](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L623)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showRuler

▸ **showRuler**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:637](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L637)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showScale

▸ **showScale**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:651](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L651)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showStyles

▸ **showStyles**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:668](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L668)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showTraffic

▸ **showTraffic**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:692](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L692)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  startServices

▸ **startServices**(): *Promise‹void›*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:705](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L705)*

**Returns:** *Promise‹void›*

___

### `Private` updateUrlQueryParams

▸ **updateUrlQueryParams**(): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:945](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L945)*

**Returns:** *void*

___

###  zoomLayer

▸ **zoomLayer**(`mapLayer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `padding`: number): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:715](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L715)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mapLayer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | - |
`padding` | number | 20 |

**Returns:** *void*

___

### `Static` AddLayerExtension

▸ **AddLayerExtension**(`type`: [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:104](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L104)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md) |

**Returns:** *void*

___

### `Static` AddLayerServiceType

▸ **AddLayerServiceType**(`type`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:110](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) |

**Returns:** *void*

___

### `Static` AddLayerType

▸ **AddLayerType**(`type`: [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)): *void*

*Defined in [packages/cs-map/src/components/cs-map/cs-map.ts:117](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/cs-map/cs-map.ts#L117)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md) |

**Returns:** *void*
