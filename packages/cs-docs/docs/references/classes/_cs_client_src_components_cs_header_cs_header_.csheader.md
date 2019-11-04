# Class: CsHeader

## Hierarchy

* any

  ↳ **CsHeader**

## Properties

###  allMenus

• **allMenus**: *[IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)[]* =  []

*Defined in [cs-client/src/components/cs-header/cs-header.ts:22](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L22)*

___

### `Private` busManager

• **busManager**: *[MessageBusManager](_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)* =  new MessageBusManager()

*Defined in [cs-client/src/components/cs-header/cs-header.ts:28](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L28)*

___

### `Optional` header

• **header**? : *[IHeaderOptions](../interfaces/_cs_core_src_project_header_options_.iheaderoptions.md)*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:24](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L24)*

___

### `Private` `Optional` languageSwitchMenu

• **languageSwitchMenu**? : *[IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:30](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L30)*

___

### `Optional` leftSidebar

• **leftSidebar**? : *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:25](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L25)*

___

### `Private` `Optional` loadingMenuIcon

• **loadingMenuIcon**? : *[IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:29](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L29)*

___

### `Optional` rightSidebar

• **rightSidebar**? : *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:26](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L26)*

## Methods

###  InitMenus

▸ **InitMenus**(): *void*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:32](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L32)*

**Returns:** *void*

___

###  activateMenu

▸ **activateMenu**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:102](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:108](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L108)*

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:113](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L113)*

**Returns:** *void*

___

###  openDashboard

▸ **openDashboard**(`dashboard`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:83](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  openRightSidebar

▸ **openRightSidebar**(`key`: string): *void*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:79](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *void*

___

###  toggleMenu

▸ **toggleMenu**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [cs-client/src/components/cs-header/cs-header.ts:96](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-client/src/components/cs-header/cs-header.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*
