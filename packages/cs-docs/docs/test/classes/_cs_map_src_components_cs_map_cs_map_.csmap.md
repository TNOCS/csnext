# Class: CsMap

## Hierarchy

* any

  ↳ **CsMap**

## Properties

###  map

• **map**: *mapboxgl.Map*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:131](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L131)*

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:132](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L132)*

___

###  styles

• **styles**: *[MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition)[]* =  MapboxStyleSwitcherControl.DEFAULT_STYLES

*Defined in [cs-map/src/components/cs-map/cs-map.ts:127](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L127)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:130](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L130)*

___

### `Static` DRAWLAYER

▪ **DRAWLAYER**: *string* = "drawlayer"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:56](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L56)*

___

### `Static` DRAWLAYER_ACTIVATED

▪ **DRAWLAYER_ACTIVATED**: *string* = "drawlayer.activated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:53](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L53)*

___

### `Static` DRAWLAYER_DEACTIVATED

▪ **DRAWLAYER_DEACTIVATED**: *string* = "drawlayer.deactivated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:54](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L54)*

___

### `Static` DRAWLAYER_START_DRAWING

▪ **DRAWLAYER_START_DRAWING**: *string* = "drawlayer.startdrawing"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:55](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L55)*

___

### `Static` FEATURE_CREATED

▪ **FEATURE_CREATED**: *string* = "created"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:45](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L45)*

___

### `Static` FEATURE_DELETED

▪ **FEATURE_DELETED**: *string* = "deleted"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:46](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L46)*

___

### `Static` FEATURE_MOUSE_ENTER

▪ **FEATURE_MOUSE_ENTER**: *string* = "enter"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:47](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L47)*

___

### `Static` FEATURE_MOUSE_LEAVE

▪ **FEATURE_MOUSE_LEAVE**: *string* = "leave"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:48](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L48)*

___

### `Static` FEATURE_SELECT

▪ **FEATURE_SELECT**: *string* = "select"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:44](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L44)*

___

### `Static` FEATURE_UPDATED

▪ **FEATURE_UPDATED**: *string* = "updated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:49](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L49)*

___

### `Static` LAYER_ACTIVATED

▪ **LAYER_ACTIVATED**: *string* = "layer.activated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:51](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L51)*

___

### `Static` LAYER_DISABLED

▪ **LAYER_DISABLED**: *string* = "layer.disabled"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:52](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L52)*

___

### `Static` LAYER_UPDATED

▪ **LAYER_UPDATED**: *string* = "layer.updated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:50](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L50)*

___

### `Static` MAP_CLICK

▪ **MAP_CLICK**: *string* = "map.click"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:58](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L58)*

___

### `Static` MAP_DOUBLE_CLICK

▪ **MAP_DOUBLE_CLICK**: *string* = "map.doubleclick"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:57](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L57)*

___

### `Static` MAP_LOADED

▪ **MAP_LOADED**: *string* = "loaded"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:59](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L59)*

___

### `Static` SEARCH_RESULT_SELECT

▪ **SEARCH_RESULT_SELECT**: *string* = "search.select"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:60](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L60)*

___

### `Static` layerExtensions

▪ **layerExtensions**: *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:93](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L93)*

___

### `Static` layerTypes

▪ **layerTypes**: *[IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:91](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L91)*

___

### `Static` serviceTypes

▪ **serviceTypes**: *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:92](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L92)*

## Accessors

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:73](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L73)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  options

• **get options**(): *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:84](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L84)*

**Returns:** *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

___

###  pointPickerActivated

• **get pointPickerActivated**(): *boolean*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:64](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L64)*

**Returns:** *boolean*

• **set pointPickerActivated**(`value`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:68](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *void*

## Methods

###  addImage

▸ **addImage**(`id`: string, `url`: string): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:346](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L346)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`url` | string |

**Returns:** *void*

___

###  addSource

▸ **addSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:648](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L648)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:333](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L333)*

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:327](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L327)*

**Returns:** *void*

___

###  dataLoaded

▸ **dataLoaded**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:138](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L138)*

**Returns:** *void*

___

###  destroyed

▸ **destroyed**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:679](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L679)*

**Returns:** *void*

___

###  initLayerSource

▸ **initLayerSource**(`source`: [LayerSource](_cs_map_src_classes_layer_source_.layersource.md)): *any*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:683](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L683)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_map_src_classes_layer_source_.layersource.md) |

**Returns:** *any*

___

###  initMapLayers

▸ **initMapLayers**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:373](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L373)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:487](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L487)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:476](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L476)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  setStyle

▸ **setStyle**(`style`: [MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:357](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L357)*

**Parameters:**

Name | Type |
------ | ------ |
`style` | [MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition) |

**Returns:** *void*

___

###  showBuildings

▸ **showBuildings**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:259](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L259)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showCompass

▸ **showCompass**(`enabled`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:143](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *void*

___

###  showGeocoder

▸ **showGeocoder**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:234](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L234)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showGeolocator

▸ **showGeolocator**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:245](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L245)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showGrid

▸ **showGrid**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:186](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L186)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:406](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L406)*

Add layer to mapbox. Load source of necessary

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  showLayers

▸ **showLayers**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:305](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L305)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showRuler

▸ **showRuler**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:172](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L172)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showScale

▸ **showScale**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:203](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L203)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showStyles

▸ **showStyles**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:148](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L148)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showTraffic

▸ **showTraffic**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:220](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L220)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  startServices

▸ **startServices**(): *Promise‹void›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:363](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L363)*

**Returns:** *Promise‹void›*

___

###  zoomLayer

▸ **zoomLayer**(`mapLayer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `padding`: number): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:339](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L339)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mapLayer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | - |
`padding` | number | 20 |

**Returns:** *void*

___

### `Static` AddLayerExtension

▸ **AddLayerExtension**(`type`: [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:105](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L105)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md) |

**Returns:** *void*

___

### `Static` AddLayerServiceType

▸ **AddLayerServiceType**(`type`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:120](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) |

**Returns:** *void*

___

### `Static` AddLayerType

▸ **AddLayerType**(`type`: [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:112](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-map/src/components/cs-map/cs-map.ts#L112)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md) |

**Returns:** *void*
