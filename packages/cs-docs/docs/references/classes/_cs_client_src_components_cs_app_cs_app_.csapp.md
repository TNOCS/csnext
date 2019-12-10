# Class: CsApp

## Hierarchy

* any

  ↳ **CsApp**

## Constructors

###  constructor

\+ **new CsApp**(): *[CsApp](_cs_client_src_components_cs_app_cs_app_.csapp.md)*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:84](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L84)*

**Returns:** *[CsApp](_cs_client_src_components_cs_app_cs_app_.csapp.md)*

## Properties

###  active

• **active**: *any* =  null

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:74](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L74)*

___

###  app

• **app**: *any* =  AppState.Instance

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:71](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L71)*

___

### `Private` busManager

• **busManager**: *any* =  new MessageBusManager()

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:84](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L84)*

___

###  footer

• **footer**: *[IFooterOptions](../interfaces/_cs_core_src_project_footer_options_.ifooteroptions.md)*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:77](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L77)*

___

###  isLoading

• **isLoading**: *boolean* = true

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:83](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L83)*

___

###  lastNotification

• **lastNotification**: *[INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)* =  { _visible: false } as INotification

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:80](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L80)*

___

###  leftSidebar

• **leftSidebar**: *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:75](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L75)*

___

###  rightSidebar

• **rightSidebar**: *[ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:76](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L76)*

___

###  settingsDialog

• **settingsDialog**: *boolean* = false

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:73](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L73)*

___

###  showNotifications

• **showNotifications**: *boolean* = false

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:81](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L81)*

___

###  unReadNotifications

• **unReadNotifications**: *[INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)[]* =  []

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:82](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L82)*

___

### `Static` LANGUAGE_SWITCH_ID

▪ **LANGUAGE_SWITCH_ID**: *string* = "switch_language"

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:69](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L69)*

___

### `Static` LOADING_MENU_ID

▪ **LOADING_MENU_ID**: *string* = "loading_menu"

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:70](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L70)*

## Methods

###  AddDashboardRoute

▸ **AddDashboardRoute**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:245](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L245)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  InitNavigation

▸ **InitNavigation**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:281](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L281)*

**Returns:** *void*

___

###  InitNotifications

▸ **InitNotifications**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:426](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L426)*

**Returns:** *void*

___

###  InitTheme

▸ **InitTheme**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:178](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L178)*

**Returns:** *void*

___

###  OpenSettings

▸ **OpenSettings**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:303](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L303)*

**Returns:** *void*

___

###  SelectDashboard

▸ **SelectDashboard**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:296](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L296)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  SelectNotification

▸ **SelectNotification**(`notification`: [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:389](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L389)*

**Parameters:**

Name | Type |
------ | ------ |
`notification` | [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md) |

**Returns:** *void*

___

###  UpdateFooter

▸ **UpdateFooter**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:335](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L335)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  UpdateNotifications

▸ **UpdateNotifications**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:398](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L398)*

Update list of unread notification

**Returns:** *void*

___

###  UpdateSideBars

▸ **UpdateSideBars**(`d`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:307](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L307)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  actionCallback

▸ **actionCallback**(`action`: string): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:350](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L350)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | string |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:126](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L126)*

**Returns:** *void*

___

###  clickNotification

▸ **clickNotification**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:412](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L412)*

**Returns:** *void*

___

###  closeNotification

▸ **closeNotification**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:419](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L419)*

**Returns:** *void*

___

###  created

▸ **created**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:357](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L357)*

**Returns:** *void*

___

###  getAdjacentDashboard

▸ **getAdjacentDashboard**(`direction`: string, `active`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md), `dashboards?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)[]): *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:192](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L192)*

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

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:240](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L240)*

**Returns:** *void*

___

###  noticationsUpdated

▸ **noticationsUpdated**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:162](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L162)*

**Returns:** *void*

___

###  onResize

▸ **onResize**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:174](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L174)*

**Returns:** *void*

___

###  projectChanged

▸ **projectChanged**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:131](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L131)*

**Returns:** *void*

___

###  rightSidebarChanged

▸ **rightSidebarChanged**(`n`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:167](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  rightSidebarsChanged

▸ **rightSidebarsChanged**(`n`: any, `o`: any): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:144](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | any |
`o` | any |

**Returns:** *void*

___

###  selectBreadCrumb

▸ **selectBreadCrumb**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:294](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L294)*

**Returns:** *void*

___

###  swipe

▸ **swipe**(`direction`: string): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:219](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L219)*

**Parameters:**

Name | Type |
------ | ------ |
`direction` | string |

**Returns:** *void*

___

###  themeChanged

▸ **themeChanged**(): *void*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:138](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L138)*

**Returns:** *void*

## Object literals

###  dialog

### ▪ **dialog**: *object*

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:78](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L78)*

###  visible

• **visible**: *boolean* = false

*Defined in [packages/cs-client/src/components/cs-app/cs-app.ts:78](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/components/cs-app/cs-app.ts#L78)*
