# Class: HtmlWidget

## Hierarchy

  ↳ [WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md)

  ↳ **HtmlWidget**

## Constructors

###  constructor

\+ **new HtmlWidget**(): *[HtmlWidget](_cs_client_src_widgets_html_widget_html_widget_.htmlwidget.md)*

*Inherited from [WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md).[constructor](_cs_client_src_widgets_widget_base_.widgetbase.md#constructor)*

*Defined in [cs-client/src/widgets/widget-base.ts:16](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/widgets/widget-base.ts#L16)*

**Returns:** *[HtmlWidget](_cs_client_src_widgets_html_widget_html_widget_.htmlwidget.md)*

## Properties

###  busManager

• **busManager**: *any* =  new MessageBusManager()

*Inherited from [WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md).[busManager](_cs_client_src_widgets_widget_base_.widgetbase.md#busmanager)*

*Defined in [cs-client/src/widgets/widget-base.ts:16](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/widgets/widget-base.ts#L16)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Inherited from [WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md).[widget](_cs_client_src_widgets_widget_base_.widgetbase.md#widget)*

*Defined in [cs-client/src/widgets/widget-base.ts:15](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/widgets/widget-base.ts#L15)*

access the original widget from configuration

## Methods

###  addMenuItem

▸ **addMenuItem**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Inherited from [WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md).[addMenuItem](_cs_client_src_widgets_widget_base_.widgetbase.md#addmenuitem)*

*Defined in [cs-client/src/widgets/widget-base.ts:37](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/widgets/widget-base.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Inherited from [WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md).[beforeDestroy](_cs_client_src_widgets_widget_base_.widgetbase.md#beforedestroy)*

*Defined in [cs-client/src/widgets/widget-base.ts:33](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/widgets/widget-base.ts#L33)*

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Inherited from [WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md).[beforeMount](_cs_client_src_widgets_widget_base_.widgetbase.md#beforemount)*

*Defined in [cs-client/src/widgets/widget-base.ts:26](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/widgets/widget-base.ts#L26)*

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`bus`: [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md) | undefined, `topic`: string, `callback`: [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md), `id?`: string): *void*

*Inherited from [WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md).[subscribe](_cs_client_src_widgets_widget_base_.widgetbase.md#subscribe)*

*Defined in [cs-client/src/widgets/widget-base.ts:22](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-client/src/widgets/widget-base.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`bus` | [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md) &#124; undefined |
`topic` | string |
`callback` | [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md) |
`id?` | string |

**Returns:** *void*
