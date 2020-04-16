# Class: AppState

AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance

## Hierarchy

* any

  ↳ **AppState**

## Constructors

### `Private` constructor

\+ **new AppState**(): *[AppState](_cs_client_src_services_app_state_.appstate.md)*

*Defined in [cs-client/src/services/app-state.ts:63](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L63)*

**Returns:** *[AppState](_cs_client_src_services_app_state_.appstate.md)*

## Properties

###  dashboardManager

• **dashboardManager**: *[DashboardManager](_cs_client_src_services_dashboard_manager_.dashboardmanager.md)*

*Defined in [cs-client/src/services/app-state.ts:50](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L50)*

___

###  datasourceManager

• **datasourceManager**: *[DatasourceManager](_cs_client_src_services_datasource_manager_.datasourcemanager.md)*

*Defined in [cs-client/src/services/app-state.ts:48](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L48)*

___

### `Optional` i18n

• **i18n**? : *VueI18n*

*Defined in [cs-client/src/services/app-state.ts:61](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L61)*

Vue i18n instance

___

###  keyboard

• **keyboard**: *[KeyboardManager](_cs_client_src_services_keyboard_manager_.keyboardmanager.md)* =  new KeyboardManager()

*Defined in [cs-client/src/services/app-state.ts:63](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L63)*

manages keyboard shortcuts

___

###  layoutManager

• **layoutManager**: *[LayoutManager](_cs_client_src_services_layout_manager_.layoutmanager.md)*

*Defined in [cs-client/src/services/app-state.ts:49](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L49)*

___

###  loader

• **loader**: *[Loader](_cs_core_src_utils_loader_.loader.md)*

*Defined in [cs-client/src/services/app-state.ts:51](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L51)*

___

###  logger

• **logger**: *any* =  Logger.Instance

*Defined in [cs-client/src/services/app-state.ts:57](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L57)*

Logger

___

### `Optional` router

• **router**? : *VueRouter*

*Defined in [cs-client/src/services/app-state.ts:59](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L59)*

Vue router instance

___

### `Optional` socket

• **socket**? : *Socket*

*Defined in [cs-client/src/services/app-state.ts:53](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L53)*

___

### `Static` APP_STATE

▪ **APP_STATE**: *string* = "app-state"

*Defined in [cs-client/src/services/app-state.ts:36](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L36)*

___

### `Static` DASHBOARD_CHANGED

▪ **DASHBOARD_CHANGED**: *string* = "dashboard-changed"

*Defined in [cs-client/src/services/app-state.ts:35](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L35)*

___

### `Static` DASHBOARD_MAIN

▪ **DASHBOARD_MAIN**: *string* = "dashboard.main"

*Defined in [cs-client/src/services/app-state.ts:34](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L34)*

___

### `Static` DIALOG

▪ **DIALOG**: *string* = "dialog"

*Defined in [cs-client/src/services/app-state.ts:28](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L28)*

___

### `Static` DIALOG_ADDED

▪ **DIALOG_ADDED**: *string* = "dialog-added"

*Defined in [cs-client/src/services/app-state.ts:29](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L29)*

___

### `Static` DIALOG_CLOSED

▪ **DIALOG_CLOSED**: *string* = "dialog-closed"

*Defined in [cs-client/src/services/app-state.ts:30](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L30)*

___

### `Static` NO

▪ **NO**: *string* = "NO"

*Defined in [cs-client/src/services/app-state.ts:38](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L38)*

___

### `Static` RIGHTSIDEBAR

▪ **RIGHTSIDEBAR**: *string* = "rightsidebar"

*Defined in [cs-client/src/services/app-state.ts:31](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L31)*

___

### `Static` RIGHTSIDEBAR_ADDED

▪ **RIGHTSIDEBAR_ADDED**: *string* = "rightsidebar-added"

*Defined in [cs-client/src/services/app-state.ts:33](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L33)*

___

### `Static` RIGHTSIDEBAR_REMOVED

▪ **RIGHTSIDEBAR_REMOVED**: *string* = "rightsidebar-removed"

*Defined in [cs-client/src/services/app-state.ts:32](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L32)*

___

### `Static` YES

▪ **YES**: *string* = "YES"

*Defined in [cs-client/src/services/app-state.ts:37](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L37)*

___

### `Static` `Private` pInstance

▪ **pInstance**: *[AppState](_cs_client_src_services_app_state_.appstate.md)*

*Defined in [cs-client/src/services/app-state.ts:41](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L41)*

used for singleton

## Accessors

###  isMobile

• **get isMobile**(): *boolean*

*Defined in [cs-client/src/services/app-state.ts:97](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L97)*

**Returns:** *boolean*

___

###  visibleSidebars

• **get visibleSidebars**(): *object | undefined*

*Defined in [cs-client/src/services/app-state.ts:210](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L210)*

**Returns:** *object | undefined*

___

### `Static` Instance

• **get Instance**(): *[AppState](_cs_client_src_services_app_state_.appstate.md)‹›*

*Defined in [cs-client/src/services/app-state.ts:44](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L44)*

Get singleton instance of appstate

**Returns:** *[AppState](_cs_client_src_services_app_state_.appstate.md)‹›*

## Methods

###  Translate

▸ **Translate**(`textKey`: string, `values?`: object): *string*

*Defined in [cs-client/src/services/app-state.ts:506](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L506)*

**Parameters:**

Name | Type |
------ | ------ |
`textKey` | string |
`values?` | object |

**Returns:** *string*

___

###  addDashboard

▸ **addDashboard**(`dashboard`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-client/src/services/app-state.ts:176](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

___

###  addDatasource

▸ **addDatasource**<**T**>(`datasource`: [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md)): *T*

*Defined in [cs-client/src/services/app-state.ts:183](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L183)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`datasource` | [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md) |

**Returns:** *T*

___

###  addMenu

▸ **addMenu**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:190](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  addSidebar

▸ **addSidebar**(`id`: string, `sidebar`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md), `dashboard?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:225](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L225)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`sidebar` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |
`dashboard?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  clearNotifications

▸ **clearNotifications**(): *void*

*Defined in [cs-client/src/services/app-state.ts:328](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L328)*

**Returns:** *void*

___

###  clearRightSidebar

▸ **clearRightSidebar**(): *void*

*Defined in [cs-client/src/services/app-state.ts:370](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L370)*

if rightsidebar exists, clear component and close

**Returns:** *void*

___

###  closeDialog

▸ **closeDialog**(): *void*

*Defined in [cs-client/src/services/app-state.ts:335](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L335)*

**Returns:** *void*

___

###  closeInfo

▸ **closeInfo**(): *void*

*Defined in [cs-client/src/services/app-state.ts:404](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L404)*

**Returns:** *void*

___

###  closeRightSidebar

▸ **closeRightSidebar**(): *boolean*

*Defined in [cs-client/src/services/app-state.ts:386](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L386)*

**Returns:** *boolean*

___

###  closeRightSidebarKey

▸ **closeRightSidebarKey**(`id`: string): *boolean*

*Defined in [cs-client/src/services/app-state.ts:395](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L395)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *boolean*

___

###  closeRightSidebarWidget

▸ **closeRightSidebarWidget**(`id`: string): *boolean*

*Defined in [cs-client/src/services/app-state.ts:410](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L410)*

If a rightsidebar exists, it will remove a specific widget

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *boolean*

___

###  findWidget

▸ **findWidget**(`id`: string, `dashboard?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) | undefined*

*Defined in [cs-client/src/services/app-state.ts:514](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L514)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`dashboard?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) | undefined*

___

###  init

▸ **init**(`project`: [IProject](../interfaces/_cs_core_src_project_project_.iproject.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:109](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L109)*

Initialize the project state, dashboard managers and data summaries handlers

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`project` | [IProject](../interfaces/_cs_core_src_project_project_.iproject.md) |  {} |

**Returns:** *void*

___

###  initApp

▸ **initApp**(`element`: string, `project?`: [IProject](../interfaces/_cs_core_src_project_project_.iproject.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:101](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L101)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`element` | string | "#app" |
`project?` | [IProject](../interfaces/_cs_core_src_project_project_.iproject.md) | - |

**Returns:** *void*

___

###  initSocket

▸ **initSocket**(): *void*

*Defined in [cs-client/src/services/app-state.ts:77](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L77)*

**Returns:** *void*

___

### `Private` initializeDashboards

▸ **initializeDashboards**(`dashboards`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)[]): *void*

*Defined in [cs-client/src/services/app-state.ts:536](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L536)*

initializes given dashboards

**Parameters:**

Name | Type |
------ | ------ |
`dashboards` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)[] |

**Returns:** *void*

___

###  loadDatasource

▸ **loadDatasource**<**T**>(`source`: [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md) | string): *Promise‹T›*

*Defined in [cs-client/src/services/app-state.ts:284](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L284)*

loads specific datasource in memory. Returns selected datasource as a promise

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`source` | [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md) &#124; string |

**Returns:** *Promise‹T›*

___

###  openInfo

▸ **openInfo**(`options`: [InfoOptions](_cs_core_src_dashboard_dashboard_options_.infooptions.md) | string): *void*

*Defined in [cs-client/src/services/app-state.ts:291](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L291)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [InfoOptions](_cs_core_src_dashboard_dashboard_options_.infooptions.md) &#124; string |

**Returns:** *void*

___

###  openRightSidebar

▸ **openRightSidebar**(`dashboard?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:443](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L443)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  openRightSidebarKey

▸ **openRightSidebarKey**(`key`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:431](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L431)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *void*

___

###  openRightSidebarWidget

▸ **openRightSidebarWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `options?`: [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md), `key`: string, `replace`: boolean): *void*

*Defined in [cs-client/src/services/app-state.ts:467](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L467)*

If a rightsidebar exists, it will replaces all rightsidebar content with this specific widget

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) | - |
`options?` | [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md) | - |
`key` | string | "default" |
`replace` | boolean | true |

**Returns:** *void*

___

###  removeMenu

▸ **removeMenu**(`menuId`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:202](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`menuId` | string |

**Returns:** *void*

___

###  removeSidebar

▸ **removeSidebar**(`id`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:248](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L248)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*

___

###  toggleRightSidebar

▸ **toggleRightSidebar**(`key?`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:450](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L450)*

**Parameters:**

Name | Type |
------ | ------ |
`key?` | string |

**Returns:** *void*

___

###  toggleRightSidebarWidget

▸ **toggleRightSidebarWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `options?`: [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:500](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L500)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |
`options?` | [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md) |

**Returns:** *void*

___

###  triggerDialog

▸ **triggerDialog**(`dialog`: [IDialog](../interfaces/_cs_core_src_interactions_dialog_.idialog.md)): *Promise‹string›*

*Defined in [cs-client/src/services/app-state.ts:339](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L339)*

**Parameters:**

Name | Type |
------ | ------ |
`dialog` | [IDialog](../interfaces/_cs_core_src_interactions_dialog_.idialog.md) |

**Returns:** *Promise‹string›*

___

###  triggerNotification

▸ **triggerNotification**(`notification`: [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:304](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L304)*

Triggers notification

**Parameters:**

Name | Type |
------ | ------ |
`notification` | [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md) |

**Returns:** *void*

___

###  triggerQuestionDialog

▸ **triggerQuestionDialog**(`title`: string, `text`: string, `actions`: string[]): *Promise‹string›*

*Defined in [cs-client/src/services/app-state.ts:362](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L362)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`text` | string |
`actions` | string[] |

**Returns:** *Promise‹string›*

___

###  triggerYesNoQuestionDialog

▸ **triggerYesNoQuestionDialog**(`title`: string, `text`: string): *Promise‹string›*

*Defined in [cs-client/src/services/app-state.ts:350](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L350)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`text` | string |

**Returns:** *Promise‹string›*

___

###  updateBreadCrumbs

▸ **updateBreadCrumbs**(`d?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md), `main`: boolean): *void*

*Defined in [cs-client/src/services/app-state.ts:255](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L255)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`d?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) | - |
`main` | boolean | true |

**Returns:** *void*

___

###  updateDatasource

▸ **updateDatasource**(`id`: string, `value`: any): *Promise‹never›*

*Defined in [cs-client/src/services/app-state.ts:276](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-client/src/services/app-state.ts#L276)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`value` | any |

**Returns:** *Promise‹never›*
