# Class: CsSidebar

## Hierarchy

* any

  ↳ **CsSidebar**

## Properties

###  app

• **app**: *any* =  AppState.Instance

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:15](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L15)*

___

### `Private` `Optional` dashboardChangedHandle

• **dashboardChangedHandle**? : *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:19](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L19)*

___

###  menu

• **menu**: *boolean* = false

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:16](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L16)*

___

### `Optional` sideBar

• **sideBar**? : *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:18](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L18)*

## Accessors

###  sidebarWidth

• **get sidebarWidth**(): *string*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:62](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L62)*

**Returns:** *string*

## Methods

###  SelectDashboard

▸ **SelectDashboard**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:52](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:83](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L83)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:72](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L72)*

**Returns:** *void*

___

### `Private` setBorderWidth

▸ **setBorderWidth**(): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:89](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L89)*

**Returns:** *void*

___

### `Private` setEvents

▸ **setEvents**(): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:101](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L101)*

**Returns:** *void*

___

###  setResize

▸ **setResize**(`enabled`: true): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:37](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | true |

**Returns:** *void*

___

###  sideBarChanged

▸ **sideBarChanged**(`n`: any, `o`: any): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:22](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | any |
`o` | any |

**Returns:** *void*

___

###  toggleMini

▸ **toggleMini**(): *void*

*Defined in [cs-client/src/components/cs-sidebar/cs-sidebar.ts:47](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-sidebar/cs-sidebar.ts#L47)*

**Returns:** *void*
