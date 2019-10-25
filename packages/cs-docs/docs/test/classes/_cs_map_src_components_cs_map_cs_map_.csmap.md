# Class: CsMap

## Hierarchy

* any

  ↳ **CsMap**

## Properties

###  busHandlers

• **busHandlers**: *object*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:121](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L121)*

#### Type declaration:

* \[ **key**: *string*\]: object

___

###  map

• **map**: *mapboxgl.Map*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:127](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L127)*

___

###  mapDraw

• **mapDraw**: *any*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:128](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L128)*

___

###  styles

• **styles**: *[MapboxStyleDefinition](../modules/_cs_map_src_components_style_switcher_style_switcher_.md#mapboxstyledefinition)[]* =  MapboxStyleSwitcherControl.DEFAULT_STYLES

*Defined in [cs-map/src/components/cs-map/cs-map.ts:123](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L123)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:126](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L126)*

___

### `Static` DRAWLAYER

▪ **DRAWLAYER**: *string* = "drawlayer"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:81](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L81)*

___

### `Static` DRAWLAYER_ACTIVATED

▪ **DRAWLAYER_ACTIVATED**: *string* = "drawlayer.activated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:78](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L78)*

___

### `Static` DRAWLAYER_DEACTIVATED

▪ **DRAWLAYER_DEACTIVATED**: *string* = "drawlayer.deactivated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:79](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L79)*

___

### `Static` DRAWLAYER_START_DRAWING

▪ **DRAWLAYER_START_DRAWING**: *string* = "drawlayer.startdrawing"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:80](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L80)*

___

### `Static` FEATURE_CREATED

▪ **FEATURE_CREATED**: *string* = "created"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:70](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L70)*

___

### `Static` FEATURE_DELETED

▪ **FEATURE_DELETED**: *string* = "deleted"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:71](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L71)*

___

### `Static` FEATURE_MOUSE_ENTER

▪ **FEATURE_MOUSE_ENTER**: *string* = "enter"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:72](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L72)*

___

### `Static` FEATURE_MOUSE_LEAVE

▪ **FEATURE_MOUSE_LEAVE**: *string* = "leave"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:73](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L73)*

___

### `Static` FEATURE_SELECT

▪ **FEATURE_SELECT**: *string* = "select"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:69](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L69)*

___

### `Static` FEATURE_UPDATED

▪ **FEATURE_UPDATED**: *string* = "updated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:74](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L74)*

___

### `Static` LAYER_ACTIVATED

▪ **LAYER_ACTIVATED**: *string* = "layer.activated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:76](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L76)*

___

### `Static` LAYER_DISABLED

▪ **LAYER_DISABLED**: *string* = "layer.disabled"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:77](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L77)*

___

### `Static` LAYER_UPDATED

▪ **LAYER_UPDATED**: *string* = "layer.updated"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:75](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L75)*

___

### `Static` MAP_CLICK

▪ **MAP_CLICK**: *string* = "map.click"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:83](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L83)*

___

### `Static` MAP_DOUBLE_CLICK

▪ **MAP_DOUBLE_CLICK**: *string* = "map.doubleclick"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:82](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L82)*

___

### `Static` MAP_LOADED

▪ **MAP_LOADED**: *string* = "loaded"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:84](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L84)*

___

### `Static` SEARCH_RESULT_SELECT

▪ **SEARCH_RESULT_SELECT**: *string* = "search.select"

*Defined in [cs-map/src/components/cs-map/cs-map.ts:85](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L85)*

___

### `Static` layerExtensions

▪ **layerExtensions**: *[ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:89](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L89)*

___

### `Static` layerTypes

▪ **layerTypes**: *[IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:87](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L87)*

___

### `Static` serviceTypes

▪ **serviceTypes**: *[IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)[]* =  []

*Defined in [cs-map/src/components/cs-map/cs-map.ts:88](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L88)*

## Accessors

###  manager

• **get manager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:51](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L51)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

___

###  options

• **get options**(): *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:62](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L62)*

**Returns:** *[MapOptions](_cs_map_src_classes_map_options_.mapoptions.md)*

___

###  pointPickerActivated

• **get pointPickerActivated**(): *boolean*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:42](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L42)*

**Returns:** *boolean*

• **set pointPickerActivated**(`value`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:46](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *void*

## Methods

###  addImage

▸ **addImage**(`id`: string, `url`: string): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:303](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L303)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`url` | string |

**Returns:** *void*

___

###  addSource

▸ **addSource**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:601](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L601)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:283](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L283)*

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:277](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L277)*

**Returns:** *void*

___

###  dataLoaded

▸ **dataLoaded**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:134](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L134)*

**Returns:** *void*

___

###  destroyed

▸ **destroyed**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:632](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L632)*

**Returns:** *void*

___

###  initLayerSource

▸ **initLayerSource**(`source`: [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md)): *any*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:636](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L636)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [LayerSource](_cs_layer_server_src_classes_layer_source_.layersource.md) |

**Returns:** *any*

___

###  initMapLayers

▸ **initMapLayers**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:330](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L330)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:440](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L440)*

**Returns:** *void*

___

###  removeLayer

▸ **removeLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:429](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L429)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  setStyle

▸ **setStyle**(`style`: [MapboxStyleDefinition](../modules/_cs_map_src_components_style_switcher_style_switcher_.md#mapboxstyledefinition)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:314](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L314)*

**Parameters:**

Name | Type |
------ | ------ |
`style` | [MapboxStyleDefinition](../modules/_cs_map_src_components_style_switcher_style_switcher_.md#mapboxstyledefinition) |

**Returns:** *void*

___

###  showCompass

▸ **showCompass**(`enabled`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:139](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *void*

___

###  showGeocoder

▸ **showGeocoder**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:230](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L230)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showGeolocator

▸ **showGeolocator**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:241](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L241)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showGrid

▸ **showGrid**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:182](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L182)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showLayer

▸ **showLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:363](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L363)*

Add layer to mapbox. Load source of necessary

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *Promise‹[IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  showLayers

▸ **showLayers**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:255](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L255)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showRuler

▸ **showRuler**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:168](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L168)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showScale

▸ **showScale**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:199](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L199)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showStyles

▸ **showStyles**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:144](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L144)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  showTraffic

▸ **showTraffic**(`enabled`: boolean, `old?`: boolean): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:216](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L216)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`old?` | boolean | - |

**Returns:** *void*

___

###  startServices

▸ **startServices**(): *Promise‹void›*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:320](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L320)*

**Returns:** *Promise‹void›*

___

###  zoomLayer

▸ **zoomLayer**(`mapLayer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md), `padding`: number): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:296](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L296)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mapLayer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) | - |
`padding` | number | 20 |

**Returns:** *void*

___

### `Static` AddLayerExtension

▸ **AddLayerExtension**(`type`: [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:101](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L101)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ILayerExtensionType](../interfaces/_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md) |

**Returns:** *void*

___

### `Static` AddLayerServiceType

▸ **AddLayerServiceType**(`type`: [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:116](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IStartStopService](../interfaces/_cs_map_src_classes_layer_service_.istartstopservice.md) |

**Returns:** *void*

___

### `Static` AddLayerType

▸ **AddLayerType**(`type`: [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md)): *void*

*Defined in [cs-map/src/components/cs-map/cs-map.ts:108](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-map/src/components/cs-map/cs-map.ts#L108)*

register new layertype

**Parameters:**

Name | Type |
------ | ------ |
`type` | [IMapLayerType](../interfaces/_cs_map_src_classes_imap_layer_.imaplayertype.md) |

**Returns:** *void*
