# Interface: IMapLayer

## Hierarchy

* **IMapLayer**

## Properties

###  _busManager

• **_busManager**: *[MessageBusManager](../classes/_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:45](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L45)*

___

### `Optional` _events

• **_events**? : *[MessageBusService](../classes/_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:46](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L46)*

___

### `Optional` _filters

• **_filters**? : *object*

*Defined in [cs-map/src/classes/imap-layer.ts:48](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L48)*

#### Type declaration:

* \[ **key**: *string*\]: [LayerFilter](../classes/_cs_map_src_classes_layer_filter_.layerfilter.md)

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [cs-map/src/classes/imap-layer.ts:47](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L47)*

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:49](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L49)*

___

### `Optional` _service

• **_service**? : *[ILayerService](_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:51](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L51)*

associated service

___

### `Optional` _showMenu

• **_showMenu**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:52](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L52)*

___

### `Optional` _showMore

• **_showMore**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:53](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L53)*

___

### `Optional` _source

• **_source**? : *[DataSource](../classes/_cs_data_src_classes_data_source_.datasource.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:54](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L54)*

___

###  color

• **color**: *string*

*Defined in [cs-map/src/classes/imap-layer.ts:24](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L24)*

___

###  description

• **description**: *string*

*Defined in [cs-map/src/classes/imap-layer.ts:25](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L25)*

___

### `Optional` enabled

• **enabled**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:22](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L22)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Defined in [cs-map/src/classes/imap-layer.ts:32](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L32)*

___

### `Optional` externalUrl

• **externalUrl**? : *string*

*Defined in [cs-map/src/classes/imap-layer.ts:35](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L35)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](../classes/_cs_data_src_classes_feature_type_.featuretypes.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:56](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L56)*

___

### `Optional` filter

• **filter**? : *any*

*Defined in [cs-map/src/classes/imap-layer.ts:33](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L33)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:55](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L55)*

___

###  id

• **id**: *string*

*Defined in [cs-map/src/classes/imap-layer.ts:16](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L16)*

layer id

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:36](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L36)*

___

### `Optional` isLive

• **isLive**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:37](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L37)*

___

### `Optional` opacity

• **opacity**? : *number*

*Defined in [cs-map/src/classes/imap-layer.ts:27](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L27)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Defined in [cs-map/src/classes/imap-layer.ts:42](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L42)*

toggle visibility of layer

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [cs-map/src/classes/imap-layer.ts:30](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L30)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Defined in [cs-map/src/classes/imap-layer.ts:26](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L26)*

___

### `Optional` source

• **source**? : *string | [DataSource](../classes/_cs_data_src_classes_data_source_.datasource.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:28](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L28)*

___

### `Optional` sourceType

• **sourceType**? : *string*

*Defined in [cs-map/src/classes/imap-layer.ts:23](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L23)*

___

### `Optional` state

• **state**? : *"hidden" | "loading" | "visible"*

*Defined in [cs-map/src/classes/imap-layer.ts:21](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L21)*

___

### `Optional` style

• **style**? : *[LayerStyle](../classes/_cs_map_src_classes_layer_style_.layerstyle.md)*

*Defined in [cs-map/src/classes/imap-layer.ts:31](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L31)*

___

###  tags

• **tags**: *string[]*

*Defined in [cs-map/src/classes/imap-layer.ts:20](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L20)*

list of tags, used for clustering in layer selection

___

###  title

• **title**: *string*

*Defined in [cs-map/src/classes/imap-layer.ts:18](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L18)*

layer as shown in interface

___

### `Optional` type

• **type**? : *string*

*Defined in [cs-map/src/classes/imap-layer.ts:29](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L29)*

## Methods

###  addLayer

▸ **addLayer**(`widget`: [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md)): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:62](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *any*

___

###  applyFilter

▸ **applyFilter**(`filter`: [LayerFilter](../classes/_cs_map_src_classes_layer_filter_.layerfilter.md)): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:70](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [LayerFilter](../classes/_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *any*

___

###  getBounds

▸ **getBounds**(): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:63](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L63)*

**Returns:** *any*

___

###  getFeatureType

▸ **getFeatureType**(): *[FeatureType](../classes/_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

*Defined in [cs-map/src/classes/imap-layer.ts:78](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L78)*

**Returns:** *[FeatureType](../classes/_cs_data_src_classes_feature_type_.featuretype.md) | undefined*

___

### `Optional` getLayerActions

▸ **getLayerActions**(): *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [cs-map/src/classes/imap-layer.ts:64](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L64)*

**Returns:** *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  initFilter

▸ **initFilter**(`property`: string): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:69](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | string |

**Returns:** *any*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *Promise‹[IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md)›*

*Defined in [cs-map/src/classes/imap-layer.ts:65](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *Promise‹[IMapLayer](_cs_map_src_classes_imap_layer_.imaplayer.md)›*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:66](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *any*

___

###  removeFilter

▸ **removeFilter**(`filter`: [LayerFilter](../classes/_cs_map_src_classes_layer_filter_.layerfilter.md)): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:71](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [LayerFilter](../classes/_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`widget`: [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md)): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:67](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *any*

___

###  setFilter

▸ **setFilter**(`filter`: any[]): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:68](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *any*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](../classes/_cs_map_src_components_feature_details_property_details_.propertydetails.md) | [PropertyType](../classes/_cs_data_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:72](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](../classes/_cs_map_src_components_feature_details_property_details_.propertydetails.md) &#124; [PropertyType](../classes/_cs_data_src_classes_property_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *any*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:73](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *any*

___

###  setPopupContent

▸ **setPopupContent**(`value`: string | function): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:74](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; function |

**Returns:** *any*

___

###  updateFilters

▸ **updateFilters**(): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:77](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L77)*

**Returns:** *any*

___

###  updateLayer

▸ **updateLayer**(): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:75](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L75)*

**Returns:** *any*

___

###  updateLegends

▸ **updateLegends**(): *any*

*Defined in [cs-map/src/classes/imap-layer.ts:76](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-map/src/classes/imap-layer.ts#L76)*

**Returns:** *any*
