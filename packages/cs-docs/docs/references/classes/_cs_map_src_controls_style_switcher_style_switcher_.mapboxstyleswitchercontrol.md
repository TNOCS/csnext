# Class: MapboxStyleSwitcherControl

## Hierarchy

* **MapboxStyleSwitcherControl**

## Implements

* IControl

## Constructors

###  constructor

\+ **new MapboxStyleSwitcherControl**(`styles`: [MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition)[], `mapControl`: [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md)): *[MapboxStyleSwitcherControl](_cs_map_src_controls_style_switcher_style_switcher_.mapboxstyleswitchercontrol.md)*

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:26](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L26)*
------ | ------ |
`styles` | [MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition)[] |
`mapControl` | [CsMap](_cs_map_src_components_cs_map_cs_map_.csmap.md) |

**Returns:** *[MapboxStyleSwitcherControl](_cs_map_src_controls_style_switcher_style_switcher_.mapboxstyleswitchercontrol.md)*

## Properties

### `Private` controlContainer

• **controlContainer**: *HTMLElement | undefined*

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:26](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L26)*

___

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:26](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L26)*

___

###  styles

• **styles**: *[MapboxStyleDefinition](../modules/_cs_map_src_controls_style_switcher_style_switcher_.md#mapboxstyledefinition)[]*

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:29](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L29)*

▪ **DEFAULT_STYLE**: *"Streets"* = "Streets"

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:16](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L16)*

___

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:29](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L29)*
        { id: "light", title: "Light", uri:"mapbox://styles/mapbox/light-v9"},
        { id: "outdoors", title: "Outdoors", uri:"mapbox://styles/mapbox/outdoors-v10"},
        { id: "satellite",title: "Satellite", uri:"mapbox://styles/mapbox/satellite-streets-v10"},
        { id: "streets", title: "Streets", uri:"mapbox://styles/mapbox/streets-v10"}
    ]

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:17](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L17)*
*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:16](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L16)*
▸ **getDefaultPosition**(): *string*

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:34](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L34)*

**Returns:** *string*

___

###  onAdd

▸ **onAdd**(`map`: MapboxMap): *HTMLElement*

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:40](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L40)*

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:17](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L17)*

**Returns:** *HTMLElement*

___

###  onRemove

*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:34](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L34)*
*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:40](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L40)*
*Defined in [cs-map/src/controls/style-switcher/style-switcher.ts:95](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-map/src/controls/style-switcher/style-switcher.ts#L95)*
