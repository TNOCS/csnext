# Class: CsApp

## Hierarchy

* any

  ↳ **CsApp**

## Constructors

###  constructor

\+ **new CsApp**(): *[CsApp](_cs_client_src_components_cs_app_cs_app_.csapp.md)*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:81](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L81)*

**Returns:** *[CsApp](_cs_client_src_components_cs_app_cs_app_.csapp.md)*

## Properties

###  active

• **active**: *any* =  null

*Defined in [cs-client/src/components/cs-app/cs-app.ts:71](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L71)*

___

###  app

• **app**: *any* =  AppState.Instance

*Defined in [cs-client/src/components/cs-app/cs-app.ts:68](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L68)*

___

### `Private` busManager

• **busManager**: *any* =  new MessageBusManager()

*Defined in [cs-client/src/components/cs-app/cs-app.ts:81](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L81)*

___

###  footer

• **footer**: *[IFooterOptions](../interfaces/_cs_core_src_project_footer_options_.ifooteroptions.md)*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:74](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L74)*

___

###  isLoading

• **isLoading**: *boolean* = true

*Defined in [cs-client/src/components/cs-app/cs-app.ts:80](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L80)*

___

###  lastNotification

• **lastNotification**: *[INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)* =  { _visible: false } as INotification

*Defined in [cs-client/src/components/cs-app/cs-app.ts:77](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L77)*

___

###  leftSidebar

• **leftSidebar**: *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:72](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L72)*

___

###  rightSidebar

• **rightSidebar**: *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:73](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L73)*

___

###  settingsDialog

• **settingsDialog**: *boolean* = false

*Defined in [cs-client/src/components/cs-app/cs-app.ts:70](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L70)*

___

###  showNotifications

• **showNotifications**: *boolean* = false

*Defined in [cs-client/src/components/cs-app/cs-app.ts:78](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L78)*

___

###  unReadNotifications

• **unReadNotifications**: *[INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)[]* =  []

*Defined in [cs-client/src/components/cs-app/cs-app.ts:79](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L79)*

___

### `Static` LANGUAGE_SWITCH_ID

▪ **LANGUAGE_SWITCH_ID**: *string* = "switch_language"

*Defined in [cs-client/src/components/cs-app/cs-app.ts:66](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L66)*

___

### `Static` LOADING_MENU_ID

▪ **LOADING_MENU_ID**: *string* = "loading_menu"

*Defined in [cs-client/src/components/cs-app/cs-app.ts:67](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L67)*

## Methods

###  AddDashboardRoute

▸ **AddDashboardRoute**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:257](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L257)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  InitNavigation

▸ **InitNavigation**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:293](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L293)*

**Returns:** *void*

___

###  InitNotifications

▸ **InitNotifications**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:438](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L438)*

**Returns:** *void*

___

###  InitTheme

▸ **InitTheme**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:176](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L176)*

**Returns:** *void*

___

###  OpenSettings

▸ **OpenSettings**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:315](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L315)*

**Returns:** *void*

___

###  SelectDashboard

▸ **SelectDashboard**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:308](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L308)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  SelectNotification

▸ **SelectNotification**(`notification`: [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:401](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L401)*

**Parameters:**

Name | Type |
------ | ------ |
`notification` | [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md) |

**Returns:** *void*

___

###  UpdateFooter

▸ **UpdateFooter**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:347](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L347)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  UpdateNotifications

▸ **UpdateNotifications**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:410](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L410)*

Update list of unread notification

**Returns:** *void*

___

###  UpdateSideBars

▸ **UpdateSideBars**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:319](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L319)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  actionCallback

▸ **actionCallback**(`action`: string): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:362](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L362)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | string |

**Returns:** *void*

___

###  backButtonPressed

▸ **backButtonPressed**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:237](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L237)*

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:123](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L123)*

**Returns:** *void*

___

###  clickNotification

▸ **clickNotification**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:424](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L424)*

**Returns:** *void*

___

###  closeNotification

▸ **closeNotification**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:431](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L431)*

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:369](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L369)*

**Returns:** *void*

___

###  getAdjacentDashboard

▸ **getAdjacentDashboard**(`direction`: string, `active`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md), `dashboards?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)[]): *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:189](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L189)*

**Parameters:**

Name | Type |
------ | ------ |
`direction` | string |
`active` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |
`dashboards?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)[] |

**Returns:** *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:248](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L248)*

**Returns:** *void*

___

###  noticationsUpdated

▸ **noticationsUpdated**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:160](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L160)*

**Returns:** *void*

___

###  onDeviceReady

▸ **onDeviceReady**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:244](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L244)*

**Returns:** *void*

___

###  onResize

▸ **onResize**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:172](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L172)*

**Returns:** *void*

___

###  projectChanged

▸ **projectChanged**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:129](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L129)*

**Returns:** *void*

___

###  rightSidebarChanged

▸ **rightSidebarChanged**(`n`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:165](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  rightSidebarsChanged

▸ **rightSidebarsChanged**(`n`: any): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:142](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | any |

**Returns:** *void*

___

###  selectBreadCrumb

▸ **selectBreadCrumb**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:306](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L306)*

**Returns:** *void*

___

###  swipe

▸ **swipe**(`direction`: string): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:216](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L216)*

**Parameters:**

Name | Type |
------ | ------ |
`direction` | string |

**Returns:** *void*

___

###  themeChanged

▸ **themeChanged**(): *void*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:136](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L136)*

**Returns:** *void*

## Object literals

###  dialog

### ▪ **dialog**: *object*

*Defined in [cs-client/src/components/cs-app/cs-app.ts:75](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L75)*

###  visible

• **visible**: *boolean* = false

*Defined in [cs-client/src/components/cs-app/cs-app.ts:75](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/components/cs-app/cs-app.ts#L75)*
