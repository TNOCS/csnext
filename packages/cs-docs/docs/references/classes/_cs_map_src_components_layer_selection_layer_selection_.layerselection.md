# Class: LayerSelection

## Hierarchy

* any

  ↳ **LayerSelection**

## Properties

###  Groups

• **Groups**: *object*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:23](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L23)*

#### Type declaration:

* \[ **id**: *string*\]: [ILayerGroup](../interfaces/_cs_map_src_components_layer_selection_layer_group_.ilayergroup.md)

___

###  filter

• **filter**: *string* = ""

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:22](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L22)*

___

###  groupsexpanded

• **groupsexpanded**: *number[]* =  []

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:20](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L20)*

___

###  items

• **items**: *any[]* =  []

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:18](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L18)*

___

###  open

• **open**: *any[]* =  []

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:19](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L19)*

___

###  showMenu

• **showMenu**: *boolean* = false

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:21](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L21)*

___

###  tree

• **tree**: *any[]* =  []

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:17](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L17)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:16](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L16)*

## Accessors

###  MapManager

• **get MapManager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:175](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L175)*

**Returns:** *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

## Methods

### `Private` addLayerToGroup

▸ **addLayerToGroup**(`res`: object, `t`: string, `l`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:162](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | object |
`t` | string |
`l` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

### `Private` datasourceUpdated

▸ **datasourceUpdated**(`n`: [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md)): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:198](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L198)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

**Returns:** *void*

___

### `Private` filterChanged

▸ **filterChanged**(`search`: string): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:188](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`search` | string |

**Returns:** *void*

___

### `Private` groupsChanged

▸ **groupsChanged**(`v`: boolean[]): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:183](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L183)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | boolean[] |

**Returns:** *void*

___

###  layerMenu

▸ **layerMenu**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:139](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

### `Private` layersChanged

▸ **layersChanged**(`d`: any): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:193](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | any |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:25](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L25)*

**Returns:** *void*

___

###  setLayerOpacity

▸ **setLayerOpacity**(`value`: number, `layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:109](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  showLayerMenu

▸ **showLayerMenu**(`e`: MouseEvent, `layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:115](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | MouseEvent |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  toggleGroup

▸ **toggleGroup**(`group`: [ILayerGroup](../interfaces/_cs_map_src_components_layer_selection_layer_group_.ilayergroup.md)): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:40](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`group` | [ILayerGroup](../interfaces/_cs_map_src_components_layer_selection_layer_group_.ilayergroup.md) |

**Returns:** *void*

___

###  toggleLayer

▸ **toggleLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:150](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  toggleShowMore

▸ **toggleShowMore**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:104](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  updateGroups

▸ **updateGroups**(): *void*

*Defined in [packages/cs-map/src/components/layer-selection/layer-selection.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-map/src/components/layer-selection/layer-selection.ts#L59)*

**Returns:** *void*
