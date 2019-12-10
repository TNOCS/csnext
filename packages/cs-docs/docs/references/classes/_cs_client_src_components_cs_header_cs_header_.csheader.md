# Class: CsHeader

## Hierarchy

* any

  ↳ **CsHeader**

## Properties

###  allMenus

• **allMenus**: *[IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)[]* =  []

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:22](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L22)*

___

### `Private` busManager

• **busManager**: *[MessageBusManager](_cs_core_src_utils_message_bus_message_bus_manager_.messagebusmanager.md)* =  new MessageBusManager()

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:28](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L28)*

___

### `Optional` header

• **header**? : *[IHeaderOptions](../interfaces/_cs_core_src_project_header_options_.iheaderoptions.md)*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:24](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L24)*

___

### `Private` `Optional` languageSwitchMenu

• **languageSwitchMenu**? : *[IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:30](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L30)*

___

### `Optional` leftSidebar

• **leftSidebar**? : *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:25](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L25)*

___

### `Private` `Optional` loadingMenuIcon

• **loadingMenuIcon**? : *[IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:29](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L29)*

___

### `Optional` rightSidebar

• **rightSidebar**? : *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:26](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L26)*

___

### `Private` visibleSidebars

• **visibleSidebars**: *object | undefined*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:31](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L31)*

## Methods

###  InitMenus

▸ **InitMenus**(): *void*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:39](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L39)*

**Returns:** *void*

___

###  activateMenu

▸ **activateMenu**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:109](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:115](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L115)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:120](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L120)*

**Returns:** *void*

___

###  openDashboard

▸ **openDashboard**(`dashboard`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:90](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  openRightSidebar

▸ **openRightSidebar**(`key`: string): *void*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:86](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *void*

___

###  toggleMenu

▸ **toggleMenu**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:103](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  updateVisibleSidebars

▸ **updateVisibleSidebars**(): *void*

*Defined in [packages/cs-client/src/components/cs-header/cs-header.ts:35](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-header/cs-header.ts#L35)*

**Returns:** *void*
