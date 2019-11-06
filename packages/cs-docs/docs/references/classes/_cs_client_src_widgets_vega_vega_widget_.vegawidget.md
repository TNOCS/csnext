# Class: VegaWidget

## Hierarchy

* any

  ↳ **VegaWidget**

## Properties

### `Private` `Optional` _id

• **_id**? : *string*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:23](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L23)*

___

### `Optional` data

• **data**? : *any*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:18](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L18)*

___

###  view

• **view**: *any*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:17](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L17)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:21](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L21)*

access the original widget from configuration

## Accessors

###  id

• **get id**(): *string*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:25](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L25)*

**Returns:** *string*

## Methods

###  contentChanged

▸ **contentChanged**(): *void*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:41](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L41)*

**Returns:** *void*

___

###  dataChanged

▸ **dataChanged**(): *void*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:36](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L36)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:45](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L45)*

**Returns:** *void*

___

### `Private` updateChart

▸ **updateChart**(): *void*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:49](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L49)*

**Returns:** *void*

___

### `Private` viewRender

▸ **viewRender**(`spec`: any): *void*

*Defined in [cs-client/src/widgets/vega/vega-widget.ts:72](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-client/src/widgets/vega/vega-widget.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | any |

**Returns:** *void*
