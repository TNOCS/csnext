# Class: CsSidebar

## Hierarchy

* any

  ↳ **CsSidebar**

## Properties

###  app

• **app**: *any* =  AppState.Instance

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:15](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L15)*

___

### `Private` `Optional` dashboardChangedHandle

• **dashboardChangedHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:19](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L19)*

___

###  menu

• **menu**: *boolean* = false

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:16](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L16)*

___

### `Optional` sideBar

• **sideBar**? : *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:18](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L18)*

## Methods

###  SelectDashboard

▸ **SelectDashboard**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:41](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:56](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L56)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:48](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L48)*

**Returns:** *void*

___

###  sideBarChanged

▸ **sideBarChanged**(`n`: any, `o`: any): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:22](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | any |
`o` | any |

**Returns:** *void*

___

###  toggleMini

▸ **toggleMini**(): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:36](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L36)*

**Returns:** *void*
