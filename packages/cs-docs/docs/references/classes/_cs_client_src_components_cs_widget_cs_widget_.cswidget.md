# Class: CsWidget

## Hierarchy

* any

  ↳ **CsWidget**

## Constructors

###  constructor

\+ **new CsWidget**(): *[CsWidget](_cs_client_src_components_cs_widget_cs_widget_.cswidget.md)*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:61](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L61)*

**Returns:** *[CsWidget](_cs_client_src_components_cs_widget_cs_widget_.cswidget.md)*

## Properties

###  $refs

• **$refs**: *object*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:53](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L53)*

#### Type declaration:

* **component**: *[Vue](../interfaces/_cs_client_src_index_._vue_types_vue_.vue.md)*

* **widget**: *[Vue](../interfaces/_cs_client_src_index_._vue_types_vue_.vue.md)*

___

### `Private` `Optional` _options

• **_options**? : *[WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md)*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:58](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L58)*

___

### `Private` `Optional` activeWidget

• **activeWidget**? : *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L59)*

___

###  app

• **app**: *any* =  AppState.Instance

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:51](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L51)*

___

### `Private` `Optional` dsHandle

• **dsHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:61](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L61)*

___

### `Private` loadingDataSource

• **loadingDataSource**: *boolean* = false

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:48](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L48)*

___

###  mouseOver

• **mouseOver**: *boolean* = false

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:50](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L50)*

___

### `Optional` widget

• **widget**? : *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:49](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L49)*

## Accessors

###  options

• **get options**(): *[WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md)*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:29](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L29)*

**Returns:** *[WidgetOptions](_cs_core_src_widget_widget_options_.widgetoptions.md)*

___

###  widgetBorder

• **get widgetBorder**(): *string | undefined*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:42](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L42)*

**Returns:** *string | undefined*

## Methods

###  addMenuItem

▸ **addMenuItem**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:109](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:314](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L314)*

**Returns:** *void*

___

### `Private` checkWidgetContent

▸ **checkWidgetContent**(): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:216](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L216)*

**Returns:** *void*

___

###  checkWidgetId

▸ **checkWidgetId**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:124](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:244](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L244)*

**Returns:** *void*

___

###  getComponent

▸ **getComponent**(): *any*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:68](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L68)*

**Returns:** *any*

___

###  initWidget

▸ **initWidget**(): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:134](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L134)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:320](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L320)*

**Returns:** *void*

___

###  mouseEnter

▸ **mouseEnter**(): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:340](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L340)*

**Returns:** *void*

___

###  mouseLeave

▸ **mouseLeave**(): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:344](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L344)*

**Returns:** *void*

___

###  onResize

▸ **onResize**(): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:93](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L93)*

**Returns:** *void*

___

###  setActiveWidget

▸ **setActiveWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:130](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |

**Returns:** *void*

___

###  setWidgetContent

▸ **setWidgetContent**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `content`: any): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:235](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L235)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |
`content` | any |

**Returns:** *void*

___

###  triggerMenuAction

▸ **triggerMenuAction**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:334](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L334)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  updateSize

▸ **updateSize**(`trigger`: boolean): *void*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:76](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L76)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`trigger` | boolean | true |

**Returns:** *void*

___

###  widgetStyles

▸ **widgetStyles**(): *any*

*Defined in [packages/cs-client/src/components/cs-widget/cs-widget.ts:97](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-widget/cs-widget.ts#L97)*

**Returns:** *any*
