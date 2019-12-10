# Interface: IMapLayer

## Hierarchy

* **IMapLayer**

## Properties

### `Optional` Visible

• **Visible**? : *boolean*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:40](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L40)*

toggle visibility of layer

___

###  _busManager

• **_busManager**: *[MessageBusManager](../classes/_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:47](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L47)*

___

### `Optional` _events

• **_events**? : *[MessageBusService](../classes/_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:49](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L49)*

___

### `Optional` _filters

• **_filters**? : *object*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:51](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L51)*

#### Type declaration:

* \[ **key**: *string*\]: [LayerFilter](../classes/_cs_map_src_classes_layer_filter_.layerfilter.md)

___

### `Optional` _legends

• **_legends**? : *[LayerLegend](_cs_map_src_classes_layer_legend_.layerlegend.md)[]*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:50](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L50)*

___

### `Optional` _manager

• **_manager**? : *[MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md)*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:52](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L52)*

___

### `Optional` _service

• **_service**? : *[ILayerService](_cs_map_src_classes_layer_service_.ilayerservice.md)*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:54](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L54)*

associated service

___

### `Optional` _showMenu

• **_showMenu**? : *boolean*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:55](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L55)*

___

### `Optional` _showMore

• **_showMore**? : *boolean*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:56](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L56)*

___

### `Optional` _source

• **_source**? : *[LayerSource](../classes/_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:57](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L57)*

___

###  color

• **color**: *string*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:25](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L25)*

___

###  description

• **description**: *string*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:26](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L26)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:33](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L33)*

___

### `Optional` externalUrl

• **externalUrl**? : *string*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:36](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L36)*

___

### `Optional` featureTypes

• **featureTypes**? : *[FeatureTypes](../classes/_cs_map_src_classes_feature_type_.featuretypes.md)*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:58](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L58)*

___

### `Optional` filter

• **filter**? : *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:34](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L34)*

___

### `Optional` hideInLayerList

• **hideInLayerList**? : *boolean*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L59)*

___

###  id

• **id**: *string*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:19](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L19)*

layer id

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:37](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L37)*

___

### `Optional` isLive

• **isLive**? : *boolean*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:38](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L38)*

___

### `Optional` layout

• **layout**? : *SymbolLayout | FillLayout | LineLayout | CircleLayout*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:41](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L41)*

___

### `Optional` opacity

• **opacity**? : *number*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:28](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L28)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:43](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L43)*

___

### `Optional` paint

• **paint**? : *SymbolPaint | LinePaint | FillPaint | CirclePaint*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:42](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L42)*

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:31](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L31)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:27](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L27)*

___

### `Optional` source

• **source**? : *string | [LayerSource](../classes/_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:29](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L29)*

___

### `Optional` sourceType

• **sourceType**? : *string*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:24](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L24)*

___

### `Optional` style

• **style**? : *[LayerStyle](../classes/_cs_map_src_classes_layer_style_.layerstyle.md)*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:32](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L32)*

___

###  tags

• **tags**: *string[]*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:23](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L23)*

list of tags, used for clustering in layer selection

___

###  title

• **title**: *string*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:21](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L21)*

layer as shown in interface

___

### `Optional` type

• **type**? : *string*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:30](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L30)*

## Methods

###  addLayer

▸ **addLayer**(`map`: [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md)): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:65](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *any*

___

###  applyFilter

▸ **applyFilter**(`filter`: [LayerFilter](../classes/_cs_map_src_classes_layer_filter_.layerfilter.md)): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:73](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [LayerFilter](../classes/_cs_map_src_classes_layer_filter_.layerfilter.md) |

**Returns:** *any*

___

###  getBounds

▸ **getBounds**(): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:66](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L66)*

**Returns:** *any*

___

###  getFeatureType

▸ **getFeatureType**(): *[FeatureType](../classes/_cs_map_src_classes_feature_type_.featuretype.md) | undefined*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:80](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L80)*

**Returns:** *[FeatureType](../classes/_cs_map_src_classes_feature_type_.featuretype.md) | undefined*

___

### `Optional` getLayerActions

▸ **getLayerActions**(): *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:67](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L67)*

**Returns:** *[ILayerAction](_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  getPropertType

▸ **getPropertType**(`prop`: string): *[PropertyType](../classes/_cs_map_src_classes_property_type_.propertytype.md) | undefined*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:81](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | string |

**Returns:** *[PropertyType](../classes/_cs_map_src_classes_property_type_.propertytype.md) | undefined*

___

###  initFilter

▸ **initFilter**(`property`: string): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:72](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | string |

**Returns:** *any*

___

###  initLayer

▸ **initLayer**(`manager`: [MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:68](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`manager` | [MapDatasource](../classes/_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *any*

___

###  moveLayer

▸ **moveLayer**(`beforeId?`: string): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:69](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`beforeId?` | string |

**Returns:** *any*

___

###  removeLayer

▸ **removeLayer**(`map`: [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md)): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:70](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | [CsMap](../classes/_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *any*

___

###  setFilter

▸ **setFilter**(`filter`: any[]): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:71](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any[] |

**Returns:** *any*

___

###  setLegend

▸ **setLegend**(`property`: [PropertyDetails](../classes/_cs_map_src_components_feature_details_feature_details_.propertydetails.md) | [PropertyType](../classes/_cs_map_src_classes_property_type_.propertytype.md) | string, `refreshLayer`: boolean): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:74](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDetails](../classes/_cs_map_src_components_feature_details_feature_details_.propertydetails.md) &#124; [PropertyType](../classes/_cs_map_src_classes_property_type_.propertytype.md) &#124; string |
`refreshLayer` | boolean |

**Returns:** *any*

___

###  setOpacity

▸ **setOpacity**(`value`: number): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:75](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *any*

___

###  setPopupContent

▸ **setPopupContent**(`value`: string | function): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:76](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; function |

**Returns:** *any*

___

###  updateFilters

▸ **updateFilters**(): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:79](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L79)*

**Returns:** *any*

___

###  updateLayer

▸ **updateLayer**(): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:77](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L77)*

**Returns:** *any*

___

###  updateLegends

▸ **updateLegends**(): *any*

*Defined in [packages/cs-map/src/classes/imap-layer.ts:78](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/classes/imap-layer.ts#L78)*

**Returns:** *any*
