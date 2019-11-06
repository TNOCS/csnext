# Class: LayerSelection

## Hierarchy

* any

  ↳ **LayerSelection**

## Constructors

###  constructor

\+ **new LayerSelection**(): *[LayerSelection](_cs_map_src_components_layer_selection_layer_selection_.layerselection.md)*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:37](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L37)*

###  Groups

• **Groups**: *object*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:30](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L30)*

#### Type declaration:

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:30](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L30)*

• **filter**: *string* = ""

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:29](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L29)*

___

###  groupsexpanded

• **groupsexpanded**: *number[]* =  []

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:29](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L29)*

• **items**: *any[]* =  []

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:25](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L25)*

___

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:27](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L27)*

___

###  showMenu

• **showMenu**: *boolean* = false

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:25](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L25)*

• **tree**: *any[]* =  []

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:24](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L24)*

___

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:26](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L26)*

## Accessors

###  MapManager

• **get MapManager**(): *[MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) | undefined*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:28](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L28)*

### `Private` addLayerToGroup

▸ **addLayerToGroup**(`res`: object, `t`: string, `l`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:193](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L193)*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:24](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L24)*
`t` | string |
`l` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:23](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [MapDatasource](_cs_map_src_datasources_map_datasource_.mapdatasource.md) |

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:206](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L206)*

▸ **filterChanged**(`search`: string): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:193](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L193)*

###  groupsChanged

▸ **groupsChanged**(`v`: boolean[]): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:35](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | boolean[] |

**Returns:** *void*

___

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:250](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L250)*

**Parameters:**

Name | Type |
------ | ------ |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *[ILayerAction](../interfaces/_cs_map_src_classes_ilayer_action_.ilayeraction.md)[]*

___

###  layersChanged

▸ **layersChanged**(`d`: any): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L44)*
------ | ------ |
`d` | any |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L48)*

**Returns:** *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:35](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L35)*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:133](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  showLayerMenu
*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:170](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L170)*
**Parameters:**

Name | Type |
------ | ------ |
`e` | MouseEvent |
`layer` | [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md) |

**Returns:** *void*

___

###  toggleGroup

▸ **toggleGroup**(`group`: [ILayerGroup](../interfaces/_cs_map_src_components_layer_selection_layer_selection_.ilayergroup.md)): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:245](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L245)*
------ | ------ |
`group` | [ILayerGroup](../interfaces/_cs_map_src_components_layer_selection_layer_selection_.ilayergroup.md) |

**Returns:** *void*

___

###  toggleLayer

▸ **toggleLayer**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:181](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L181)*

**Parameters:**

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L48)*

___

###  toggleShowMore

▸ **toggleShowMore**(`layer`: [IMapLayer](../interfaces/_cs_map_src_classes_imap_layer_.imaplayer.md)): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:128](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L128)*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:133](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L133)*

**Returns:** *void*

___

###  updateGroups

▸ **updateGroups**(): *void*

*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:82](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L82)*

**Returns:** *void*
*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:146](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L146)*
*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:63](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L63)*
*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:181](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L181)*
*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:128](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L128)*
*Defined in [cs-map/src/components/layer-selection/layer-selection.ts:82](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/components/layer-selection/layer-selection.ts#L82)*
