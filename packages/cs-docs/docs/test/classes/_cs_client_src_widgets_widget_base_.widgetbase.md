# Class: WidgetBase

## Hierarchy

* any

  ↳ **WidgetBase**

  ↳ [HtmlWidget](_cs_client_src_widgets_html_widget_html_widget_.htmlwidget.md)

  ↳ [ImageWidget](_cs_client_src_widgets_image_widget_.imagewidget.md)

## Constructors

###  constructor

\+ **new WidgetBase**(): *[WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md)*

*Defined in [cs-client/src/widgets/widget-base.ts:16](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-client/src/widgets/widget-base.ts#L16)*

**Returns:** *[WidgetBase](_cs_client_src_widgets_widget_base_.widgetbase.md)*

## Properties

###  busManager

• **busManager**: *any* =  new MessageBusManager()

*Defined in [cs-client/src/widgets/widget-base.ts:16](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-client/src/widgets/widget-base.ts#L16)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-client/src/widgets/widget-base.ts:15](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-client/src/widgets/widget-base.ts#L15)*

access the original widget from configuration

## Methods

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-client/src/widgets/widget-base.ts:33](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-client/src/widgets/widget-base.ts#L33)*

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-client/src/widgets/widget-base.ts:26](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-client/src/widgets/widget-base.ts#L26)*

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`bus`: [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md) | undefined, `topic`: string, `callback`: [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md), `id?`: string): *void*

*Defined in [cs-client/src/widgets/widget-base.ts:22](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-client/src/widgets/widget-base.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`bus` | [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md) &#124; undefined |
`topic` | string |
`callback` | [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md) |
`id?` | string |

**Returns:** *void*
