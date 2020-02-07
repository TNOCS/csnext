# Class: CsWidget

## Hierarchy

* any

  ↳ **CsWidget**

## Constructors

###  constructor

\+ **new CsWidget**(): *[CsWidget](_cs_client_src_components_cs_widget_cs_widget_.cswidget.md)*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:42](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L42)*

**Returns:** *[CsWidget](_cs_client_src_components_cs_widget_cs_widget_.cswidget.md)*

## Properties

###  $refs

• **$refs**: *object*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:31](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L31)*

#### Type declaration:

* **component**: *[Vue](../interfaces/_cs_client_src_index_._vue_types_vue_.vue.md)*

* **widget**: *[Vue](../interfaces/_cs_client_src_index_._vue_types_vue_.vue.md)*

___

### `Private` `Optional` _options

• **_options**? : *[WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md)*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:39](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L39)*

___

### `Private` `Optional` activeWidget

• **activeWidget**? : *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:40](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L40)*

___

###  app

• **app**: *any* =  AppState.Instance

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:35](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L35)*

___

### `Private` `Optional` dsHandle

• **dsHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:41](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L41)*

___

### `Private` loadingDataSource

• **loadingDataSource**: *boolean* = false

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:42](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L42)*

___

###  mouseOver

• **mouseOver**: *boolean* = false

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:36](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L36)*

___

### `Optional` widget

• **widget**? : *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:37](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L37)*

## Accessors

###  options

• **get options**(): *[WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md)*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:57](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L57)*

**Returns:** *[WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md)*

___

###  widgetBorder

• **get widgetBorder**(): *string | undefined*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:71](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L71)*

**Returns:** *string | undefined*

## Methods

###  addMenuItem

▸ **addMenuItem**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:82](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:97](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L97)*

**Returns:** *void*

___

### `Private` checkWidgetContent

▸ **checkWidgetContent**(): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:346](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L346)*

**Returns:** *void*

___

###  checkWidgetId

▸ **checkWidgetId**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:103](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:109](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L109)*

**Returns:** *void*

___

###  getComponent

▸ **getComponent**(): *any*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:178](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L178)*

**Returns:** *any*

___

###  initWidget

▸ **initWidget**(): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:186](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L186)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:268](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L268)*

**Returns:** *void*

___

###  mouseEnter

▸ **mouseEnter**(): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:282](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L282)*

**Returns:** *void*

___

###  mouseLeave

▸ **mouseLeave**(): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:286](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L286)*

**Returns:** *void*

___

###  onResize

▸ **onResize**(): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:290](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L290)*

**Returns:** *void*

___

###  setActiveWidget

▸ **setActiveWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:294](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L294)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *void*

___

###  setWidgetContent

▸ **setWidgetContent**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `content`: any): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:298](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L298)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |
`content` | any |

**Returns:** *void*

___

###  triggerMenuAction

▸ **triggerMenuAction**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:307](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L307)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  updateSize

▸ **updateSize**(`trigger`: boolean): *void*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:313](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L313)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`trigger` | boolean | true |

**Returns:** *void*

___

###  widgetStyles

▸ **widgetStyles**(): *any*

*Defined in [cs-client/src/components/cs-widget/cs-widget.ts:330](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-widget/cs-widget.ts#L330)*

**Returns:** *any*
