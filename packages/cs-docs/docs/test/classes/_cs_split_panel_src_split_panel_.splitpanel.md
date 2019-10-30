# Class: SplitPanel

## Hierarchy

* any

  ↳ **SplitPanel**

## Constructors

###  constructor

\+ **new SplitPanel**(): *[SplitPanel](_cs_split_panel_src_split_panel_.splitpanel.md)*

*Defined in [cs-split-panel/src/split-panel.ts:85](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L85)*

**Returns:** *[SplitPanel](_cs_split_panel_src_split_panel_.splitpanel.md)*

## Properties

###  $refs

• **$refs**: *object*

*Defined in [cs-split-panel/src/split-panel.ts:43](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L43)*

#### Type declaration:

___

###  dashboard

• **dashboard**: *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-split-panel/src/split-panel.ts:39](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L39)*

___

### `Optional` presetMenu

• **presetMenu**? : *[IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)*

*Defined in [cs-split-panel/src/split-panel.ts:41](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L41)*

___

### `Optional` splitOptions

• **splitOptions**? : *[SplitPanelOptions](_cs_split_panel_src_split_panel_options_.splitpaneloptions.md)*

*Defined in [cs-split-panel/src/split-panel.ts:47](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L47)*

___

### `Static` id

▪ **id**: *string* = "split-panel"

*Defined in [cs-split-panel/src/split-panel.ts:37](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L37)*

## Accessors

###  options

• **get options**(): *[SplitPanelDashboardOptions](_cs_split_panel_src_split_panel_dashboard_options_.splitpaneldashboardoptions.md) | undefined*

*Defined in [cs-split-panel/src/split-panel.ts:71](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L71)*

**Returns:** *[SplitPanelDashboardOptions](_cs_split_panel_src_split_panel_dashboard_options_.splitpaneldashboardoptions.md) | undefined*

• **set options**(`value`: [SplitPanelDashboardOptions](_cs_split_panel_src_split_panel_dashboard_options_.splitpaneldashboardoptions.md) | undefined): *void*

*Defined in [cs-split-panel/src/split-panel.ts:83](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SplitPanelDashboardOptions](_cs_split_panel_src_split_panel_dashboard_options_.splitpaneldashboardoptions.md) &#124; undefined |

**Returns:** *void*

## Methods

###  created

▸ **created**(): *void*

*Defined in [cs-split-panel/src/split-panel.ts:91](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L91)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-split-panel/src/split-panel.ts:109](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L109)*

**Returns:** *void*

___

###  selectStepper

▸ **selectStepper**(`index`: number, `splitPanel`: [SplitPanelOptions](_cs_split_panel_src_split_panel_options_.splitpaneloptions.md), `key`: string): *void*

*Defined in [cs-split-panel/src/split-panel.ts:49](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-split-panel/src/split-panel.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |
`splitPanel` | [SplitPanelOptions](_cs_split_panel_src_split_panel_options_.splitpaneloptions.md) |
`key` | string |

**Returns:** *void*
