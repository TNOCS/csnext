# Class: CsMap

## Hierarchy

* any

  ↳ **CsMap**

## Properties

### `Private` _pointerPickerActivated

• **_pointerPickerActivated**: *boolean* = false

*Defined in [cs-map/src/components/cs-map/cs-map.ts:133](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L133)*

___

### `Private` `Optional` geocoderControl

• **geocoderControl**? : *MapboxGeocoder*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:97](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L97)*

___

### `Private` `Optional` geolocatorControl

• **geolocatorControl**? : *GeolocateControl*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:99](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L99)*

___

### `Private` `Optional` gridControl

• **gridControl**? : *[GridControl](_cs_map_src_controls_grid_control_grid_control_.gridcontrol.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:98](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L98)*

___

### `Private` `Optional` legendControl

• **legendControl**? : *[LayerLegendControl](_cs_map_src_controls_layer_legend_control_layer_legend_control_.layerlegendcontrol.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:100](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L100)*

___

###  map

• **map**: *mapboxgl.Map*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:127](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L127)*

actual mapbox gl control

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:130](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L130)*

___

### `Private` mapOptions

• **mapOptions**: *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:134](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L134)*

___

### `Private` `Optional` mapboxStyleSwitcherControl

• **mapboxStyleSwitcherControl**? : *[MapboxStyleSwitcherControl](_cs_map_src_controls_style_switcher_style_switcher_.mapboxstyleswitchercontrol.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:94](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L94)*

___

### `Private` `Optional` rulerControl

• **rulerControl**? : *RulerControl*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:95](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L95)*

___

### `Private` `Optional` scaleControl

• **scaleControl**? : *ScaleControl*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:101](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L101)*

___

###  styles

• **styles**: *[MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition)[]* =  MapboxStyleSwitcherControl.DEFAULT_STYLES

*Defined in [cs-map/src/components/cs-map/cs-map.ts:125](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L125)*

___

### `Private` `Optional` trafficControl

• **trafficControl**? : *MapboxTraffic*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:96](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L96)*

___

### `Static` DRAWLAYER

▪ **DRAWLAYER**: *string* = "drawlayer"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:56](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L56)*

___

### `Static` DRAWLAYER_ACTIVATED

▪ **DRAWLAYER_ACTIVATED**: *string* = "drawlayer.activated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:53](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L53)*

___

### `Static` DRAWLAYER_DEACTIVATED

▪ **DRAWLAYER_DEACTIVATED**: *string* = "drawlayer.deactivated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:54](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L54)*

___

### `Static` DRAWLAYER_START_DRAWING

▪ **DRAWLAYER_START_DRAWING**: *string* = "drawlayer.startdrawing"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:55](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L55)*

___

### `Static` FEATURE_CREATED

▪ **FEATURE_CREATED**: *string* = "created"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L45)*

___

### `Static` FEATURE_DELETED

▪ **FEATURE_DELETED**: *string* = "deleted"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:46](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L46)*

___

### `Static` FEATURE_MOUSE_ENTER

▪ **FEATURE_MOUSE_ENTER**: *string* = "enter"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:47](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L47)*

___

### `Static` FEATURE_MOUSE_LEAVE

▪ **FEATURE_MOUSE_LEAVE**: *string* = "leave"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L48)*

___

### `Static` FEATURE_SELECT

▪ **FEATURE_SELECT**: *string* = "select"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L44)*

___

### `Static` FEATURE_UPDATED

▪ **FEATURE_UPDATED**: *string* = "updated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:49](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L49)*

___

### `Static` LAYER_ACTIVATED

▪ **LAYER_ACTIVATED**: *string* = "layer.activated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:51](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L51)*

___

### `Static` LAYER_DISABLED

▪ **LAYER_DISABLED**: *string* = "layer.disabled"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:52](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L52)*

___

### `Static` LAYER_UPDATED

▪ **LAYER_UPDATED**: *string* = "layer.updated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:50](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L50)*

___

### `Static` MAP_CLICK

▪ **MAP_CLICK**: *string* = "map.click"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:58](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L58)*

___

### `Static` MAP_DOUBLE_CLICK

▪ **MAP_DOUBLE_CLICK**: *string* = "map.doubleclick"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:57](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L57)*

___

### `Static` MAP_LOADED

▪ **MAP_LOADED**: *string* = "loaded"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:59](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L59)*

___

### `Static` SEARCH_RESULT_SELECT

▪ **SEARCH_RESULT_SELECT**: *string* = "search.select"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:60](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L60)*

___

### `Static` layerExtensions

▪ **layerExtensions**: *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:91](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L91)*

___

### `Static` layerTypes

▪ **layerTypes**: *[IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:89](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L89)*

___

### `Static` serviceTypes

▪ **serviceTypes**: *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:90](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L90)*

## Accessors

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:71](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L71)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  options

• **get options**(): *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:82](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L82)*

**Returns:** *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

___

###  pointPickerActivated

• **get pointPickerActivated**(): *boolean*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:62](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L62)*

**Returns:** *boolean*

• **set pointPickerActivated**(`value`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:66](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *void*

## Methods

### `Private` addClickLayer

▸ **addClickLayer**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:836](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L836)*

**Returns:** *void*

___

### `Private` addGeocoder

▸ **addGeocoder**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:742](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L742)*

**Returns:** *void*

___

###  addImage

▸ **addImage**(`id`: string, `url`: string): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:359](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L359)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`url` | string |

**Returns:** *void*

___

###  addSource

▸ **addSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:655](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L655)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:346](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L346)*

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:340](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L340)*

**Returns:** *void*

___

###  dataLoaded

▸ **dataLoaded**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:137](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L137)*

**Returns:** *void*

___

###  destroyed

▸ **destroyed**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:686](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L686)*

**Returns:** *void*

___

### `Private` getRouteOptions

▸ **getRouteOptions**(): *mapboxgl.MapboxOptions*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:699](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L699)*

**Returns:** *mapboxgl.MapboxOptions*

___

### `Private` getStyleUri

▸ **getStyleUri**(`styleId`: string): *string*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:727](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L727)*

**Parameters:**

Name | Type |
------ | ------ |
`styleId` | string |

**Returns:** *string*

___

###  initLayerSource

▸ **initLayerSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *any*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:690](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L690)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *any*

___

###  initMapLayers

▸ **initMapLayers**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:386](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L386)*

**Returns:** *void*

___

### `Private` mapLoaded

▸ **mapLoaded**(`e`: any): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:898](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L898)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:500](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L500)*

**Returns:** *void*

___

### `Private` removeGeocoder

▸ **removeGeocoder**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:735](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L735)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:489](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L489)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  setStyle

▸ **setStyle**(`style`: [MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:370](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L370)*

**Parameters:**

Name | Type |
------ | ------ |
`style` | [MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition) |

**Returns:** *void*

___

###  showBuildings

▸ **showBuildings**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:272](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L272)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showCompass

▸ **showCompass**(`enabled`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:142](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *void*

___

###  showGeocoder

▸ **showGeocoder**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:233](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L233)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showGeolocator

▸ **showGeolocator**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:258](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L258)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showGrid

▸ **showGrid**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:185](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L185)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:419](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L419)*

Add layer to mapbox. Load source of necessary

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  showLayers

▸ **showLayers**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:318](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L318)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showLegend

▸ **showLegend**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:244](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showRuler

▸ **showRuler**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:171](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showScale

▸ **showScale**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:202](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showStyles

▸ **showStyles**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:147](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showTraffic

▸ **showTraffic**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:219](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L219)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  startServices

▸ **startServices**(): *Promise‹void›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:376](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L376)*

**Returns:** *Promise‹void›*

___

### `Private` updateUrlQueryParams

▸ **updateUrlQueryParams**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:718](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L718)*

**Returns:** *void*

___

###  zoomLayer

▸ **zoomLayer**(`mapLayer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `padding`: number): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:352](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L352)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mapLayer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | - |
`padding` | number | 20 |

**Returns:** *void*

___

### `Static` AddLayerExtension

▸ **AddLayerExtension**(`type`: [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:104](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L104)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md) |

**Returns:** *void*

___

### `Static` AddLayerServiceType

▸ **AddLayerServiceType**(`type`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:119](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) |

**Returns:** *void*

___

### `Static` AddLayerType

▸ **AddLayerType**(`type`: [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:111](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/cs-map/cs-map.ts#L111)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md) |

**Returns:** *void*
