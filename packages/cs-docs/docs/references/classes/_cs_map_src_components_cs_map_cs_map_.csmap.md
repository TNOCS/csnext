# Class: CsMap

## Hierarchy

* any

  ↳ **CsMap**

## Properties

### `Private` _pointerPickerActivated

• **_pointerPickerActivated**: *boolean* = false

*Defined in [cs-map/src/components/cs-map/cs-map.ts:137](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L137)*

___

### `Private` `Optional` geocoderControl

• **geocoderControl**? : *MapboxGeocoder*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:138](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L138)*

___

### `Private` `Optional` geolocatorControl

• **geolocatorControl**? : *GeolocateControl*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:139](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L139)*

___

### `Private` `Optional` gridControl

• **gridControl**? : *[GridControl](_cs_map_src_controls_grid_control_grid_control_.gridcontrol.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:140](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L140)*

___

### `Private` `Optional` layersWidgetControl

• **layersWidgetControl**? : *[LayersWidgetControl](_cs_map_src_controls_layers_widget_control_layers_widget_.layerswidgetcontrol.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:141](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L141)*

___

### `Private` `Optional` legendControl

• **legendControl**? : *[LayerLegendControl](_cs_map_src_controls_layer_legend_control_layer_legend_control_.layerlegendcontrol.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:142](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L142)*

___

###  map

• **map**: *mapboxgl.Map*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:132](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L132)*

actual mapbox gl control

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:133](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L133)*

___

### `Private` mapOptions

• **mapOptions**: *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:143](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L143)*

___

### `Private` `Optional` mapboxStyleSwitcherControl

• **mapboxStyleSwitcherControl**? : *[MapboxStyleSwitcherControl](_cs_map_src_controls_style_switcher_style_switcher_.mapboxstyleswitchercontrol.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:145](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L145)*

___

### `Private` `Optional` navigationControl

• **navigationControl**? : *NavigationControl*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:149](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L149)*

___

### `Private` `Optional` rulerControl

• **rulerControl**? : *RulerControl*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:146](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L146)*

___

### `Private` `Optional` scaleControl

• **scaleControl**? : *ScaleControl*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:147](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L147)*

___

### `Private` `Optional` searchLayer

• **searchLayer**? : *[GeojsonPlusLayer](_cs_map_src_layers_geojson_plus_layer_.geojsonpluslayer.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:150](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L150)*

___

###  styles

• **styles**: *[MapboxStyleDefinition](../modules/_cs_map_src_classes_map_style_definition_.md#mapboxstyledefinition)[]* =  MapboxStyleSwitcherControl.DEFAULT_STYLES

*Defined in [cs-map/src/components/cs-map/cs-map.ts:134](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L134)*

___

### `Private` `Optional` trafficControl

• **trafficControl**? : *MapboxTraffic*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:148](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L148)*

___

### `Static` DRAWLAYER

▪ **DRAWLAYER**: *string* = "drawlayer"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:82](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L82)*

___

### `Static` DRAWLAYER_ACTIVATED

▪ **DRAWLAYER_ACTIVATED**: *string* = "drawlayer.activated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:83](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L83)*

___

### `Static` DRAWLAYER_DEACTIVATED

▪ **DRAWLAYER_DEACTIVATED**: *string* = "drawlayer.deactivated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:84](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L84)*

___

### `Static` DRAWLAYER_START_DRAWING

▪ **DRAWLAYER_START_DRAWING**: *string* = "drawlayer.startdrawing"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:85](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L85)*

___

### `Static` FEATURE_CREATED

▪ **FEATURE_CREATED**: *string* = "created"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:86](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L86)*

___

### `Static` FEATURE_DELETED

▪ **FEATURE_DELETED**: *string* = "deleted"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:87](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L87)*

___

### `Static` FEATURE_MOUSE_ENTER

▪ **FEATURE_MOUSE_ENTER**: *string* = "enter"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:88](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L88)*

___

### `Static` FEATURE_MOUSE_LEAVE

▪ **FEATURE_MOUSE_LEAVE**: *string* = "leave"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:89](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L89)*

___

### `Static` FEATURE_SELECT

▪ **FEATURE_SELECT**: *string* = "select"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:91](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L91)*

___

### `Static` FEATURE_UPDATED

▪ **FEATURE_UPDATED**: *string* = "updated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:92](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L92)*

___

### `Static` LAYER_ACTIVATED

▪ **LAYER_ACTIVATED**: *string* = "layer.activated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:93](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L93)*

___

### `Static` LAYER_DISABLED

▪ **LAYER_DISABLED**: *string* = "layer.disabled"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:94](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L94)*

___

### `Static` LAYER_UPDATED

▪ **LAYER_UPDATED**: *string* = "layer.updated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:95](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L95)*

___

### `Static` MAP_CLICK

▪ **MAP_CLICK**: *string* = "map.click"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:96](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L96)*

___

### `Static` MAP_DOUBLE_CLICK

▪ **MAP_DOUBLE_CLICK**: *string* = "map.doubleclick"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:97](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L97)*

___

### `Static` MAP_LOADED

▪ **MAP_LOADED**: *string* = "loaded"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:98](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L98)*

___

### `Static` SEARCH_RESULT_SELECT

▪ **SEARCH_RESULT_SELECT**: *string* = "search.select"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:99](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L99)*

___

### `Static` layerExtensions

▪ **layerExtensions**: *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:100](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L100)*

___

### `Static` layerTypes

▪ **layerTypes**: *[IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:101](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L101)*

___

### `Static` serviceTypes

▪ **serviceTypes**: *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:102](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L102)*

## Accessors

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:48](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L48)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  options

• **get options**(): *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:59](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L59)*

**Returns:** *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

• **set options**(`options`: [MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:66](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [MapOptions](_cs_map_src_classes_map_options_.mapoptions.md) |

**Returns:** *void*

___

###  pointPickerActivated

• **get pointPickerActivated**(): *boolean*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:72](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L72)*

**Returns:** *boolean*

• **set pointPickerActivated**(`value`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:76](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *void*

## Methods

### `Private` addGeocoder

▸ **addGeocoder**(): *Promise‹void›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:861](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L861)*

**Returns:** *Promise‹void›*

___

###  addImage

▸ **addImage**(`id`: string, `url`: string): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:156](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`url` | string |

**Returns:** *void*

___

###  addSource

▸ **addSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:167](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:198](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L198)*

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:204](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L204)*

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(`d`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:211](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

###  destroyed

▸ **destroyed**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:216](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L216)*

**Returns:** *void*

___

### `Private` getRouteOptions

▸ **getRouteOptions**(): *mapboxgl.MapboxOptions*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:971](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L971)*

**Returns:** *mapboxgl.MapboxOptions*

___

### `Private` getStyleUri

▸ **getStyleUri**(`styleId`: string): *string*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:990](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L990)*

**Parameters:**

Name | Type |
------ | ------ |
`styleId` | string |

**Returns:** *string*

___

###  initLayerSource

▸ **initLayerSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *any*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:220](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L220)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *any*

___

###  initMapLayers

▸ **initMapLayers**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:229](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L229)*

**Returns:** *void*

___

### `Private` loadTranslations

▸ **loadTranslations**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:998](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L998)*

**Returns:** *void*

___

### `Private` mapLoaded

▸ **mapLoaded**(`e`: any): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:1007](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L1007)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:259](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L259)*

**Returns:** *void*

___

### `Private` removeGeocoder

▸ **removeGeocoder**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:1030](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L1030)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:423](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L423)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  setBoxZoom

▸ **setBoxZoom**(`enabled`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:451](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L451)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *void*

___

###  setDoubleClickZoom

▸ **setDoubleClickZoom**(`enabled`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:441](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L441)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *void*

___

###  setDragPan

▸ **setDragPan**(`enabled`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:469](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L469)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *void*

___

###  setScrollZoom

▸ **setScrollZoom**(`enabled`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:460](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L460)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *void*

___

###  setStyle

▸ **setStyle**(`style`: [MapboxStyleDefinition](../modules/_cs_map_src_classes_map_style_definition_.md#mapboxstyledefinition)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:434](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L434)*

**Parameters:**

Name | Type |
------ | ------ |
`style` | [MapboxStyleDefinition](../modules/_cs_map_src_classes_map_style_definition_.md#mapboxstyledefinition) |

**Returns:** *void*

___

###  showBuildings

▸ **showBuildings**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:478](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L478)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showFeatureDetails

▸ **showFeatureDetails**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:667](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L667)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showFeatureList

▸ **showFeatureList**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:677](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L677)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showGeocoder

▸ **showGeocoder**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:538](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L538)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showGeolocator

▸ **showGeolocator**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:548](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L548)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showGrid

▸ **showGrid**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:561](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L561)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:576](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L576)*

Add layer to mapbox. Load source of necessary

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  showLayers

▸ **showLayers**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:645](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L645)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showLayersWidget

▸ **showLayersWidget**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:687](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L687)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showLegend

▸ **showLegend**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:702](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L702)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showRuler

▸ **showRuler**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:715](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L715)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showScale

▸ **showScale**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:728](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L728)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showStyles

▸ **showStyles**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:743](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L743)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  showTraffic

▸ **showTraffic**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:766](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L766)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
`old?` | boolean |

**Returns:** *void*

___

###  startServices

▸ **startServices**(): *Promise‹void›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:778](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L778)*

**Returns:** *Promise‹void›*

___

###  updateNavigationControl

▸ **updateNavigationControl**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:523](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L523)*

**Returns:** *void*

___

### `Private` updateUrlQueryParams

▸ **updateUrlQueryParams**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:1036](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L1036)*

**Returns:** *void*

___

###  zoomLayer

▸ **zoomLayer**(`mapLayer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `padding`: number): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:788](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L788)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mapLayer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | - |
`padding` | number | 20 |

**Returns:** *void*

___

### `Static` AddLayerExtension

▸ **AddLayerExtension**(`type`: [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:110](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L110)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md) |

**Returns:** *void*

___

### `Static` AddLayerServiceType

▸ **AddLayerServiceType**(`type`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:116](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) |

**Returns:** *void*

___

### `Static` AddLayerType

▸ **AddLayerType**(`type`: [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:123](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/components/cs-map/cs-map.ts#L123)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md) |

**Returns:** *void*
