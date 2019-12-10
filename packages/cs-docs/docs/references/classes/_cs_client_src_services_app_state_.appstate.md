# Class: AppState

AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance

## Hierarchy

* any

  ↳ **AppState**

## Constructors

### `Private` constructor

\+ **new AppState**(): *[AppState](_cs_client_src_services_app_state_.appstate.md)*

*Defined in [packages/cs-client/src/services/app-state.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L59)*

**Returns:** *[AppState](_cs_client_src_services_app_state_.appstate.md)*

## Properties

### `Optional` i18n

• **i18n**? : *VueI18n*

*Defined in [packages/cs-client/src/services/app-state.ts:55](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L55)*

Vue i18n instance

___

###  keyboard

• **keyboard**: *[KeyboardManager](_cs_client_src_services_keyboard_manager_.keyboardmanager.md)* =  new KeyboardManager()

*Defined in [packages/cs-client/src/services/app-state.ts:57](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L57)*

manages keyboard shortcuts

___

### `Protected` loaders

• **loaders**: *object*

*Defined in [packages/cs-client/src/services/app-state.ts:59](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L59)*

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  logger

• **logger**: *any* =  Logger.Instance

*Defined in [packages/cs-client/src/services/app-state.ts:51](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L51)*

Logger

___

### `Optional` projectManager

• **projectManager**? : *[ProjectManager](_cs_client_src_services_project_manager_.projectmanager.md)*

*Defined in [packages/cs-client/src/services/app-state.ts:49](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L49)*

Manages active project

___

### `Optional` router

• **router**? : *VueRouter*

*Defined in [packages/cs-client/src/services/app-state.ts:53](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L53)*

Vue router instance

___

### `Optional` socket

• **socket**? : *Socket*

*Defined in [packages/cs-client/src/services/app-state.ts:47](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L47)*

___

### `Static` DASHBOARD_CHANGED

▪ **DASHBOARD_CHANGED**: *string* = "dashboard-changed"

*Defined in [packages/cs-client/src/services/app-state.ts:34](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L34)*

___

### `Static` DASHBOARD_MAIN

▪ **DASHBOARD_MAIN**: *string* = "dashboard.main"

*Defined in [packages/cs-client/src/services/app-state.ts:33](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L33)*

___

### `Static` DIALOG

▪ **DIALOG**: *string* = "dialog"

*Defined in [packages/cs-client/src/services/app-state.ts:27](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L27)*

___

### `Static` DIALOG_ADDED

▪ **DIALOG_ADDED**: *string* = "dialog-added"

*Defined in [packages/cs-client/src/services/app-state.ts:28](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L28)*

___

### `Static` DIALOG_CLOSED

▪ **DIALOG_CLOSED**: *string* = "dialog-closed"

*Defined in [packages/cs-client/src/services/app-state.ts:29](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L29)*

___

### `Static` LOADERS

▪ **LOADERS**: *string* = "loaders"

*Defined in [packages/cs-client/src/services/app-state.ts:35](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L35)*

___

### `Static` NO

▪ **NO**: *string* = "NO"

*Defined in [packages/cs-client/src/services/app-state.ts:37](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L37)*

___

### `Static` RIGHTSIDEBAR

▪ **RIGHTSIDEBAR**: *string* = "rightsidebar"

*Defined in [packages/cs-client/src/services/app-state.ts:30](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L30)*

___

### `Static` RIGHTSIDEBAR_ADDED

▪ **RIGHTSIDEBAR_ADDED**: *string* = "rightsidebar-added"

*Defined in [packages/cs-client/src/services/app-state.ts:32](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L32)*

___

### `Static` RIGHTSIDEBAR_REMOVED

▪ **RIGHTSIDEBAR_REMOVED**: *string* = "rightsidebar-removed"

*Defined in [packages/cs-client/src/services/app-state.ts:31](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L31)*

___

### `Static` YES

▪ **YES**: *string* = "YES"

*Defined in [packages/cs-client/src/services/app-state.ts:36](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L36)*

___

### `Static` `Private` pInstance

▪ **pInstance**: *[AppState](_cs_client_src_services_app_state_.appstate.md)*

*Defined in [packages/cs-client/src/services/app-state.ts:40](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L40)*

used for singleton

## Accessors

###  VisibleSidebars

• **get VisibleSidebars**(): *object | undefined*

*Defined in [packages/cs-client/src/services/app-state.ts:200](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L200)*

**Returns:** *object | undefined*

___

### `Static` Instance

• **get Instance**(): *[AppState](_cs_client_src_services_app_state_.appstate.md)‹›*

*Defined in [packages/cs-client/src/services/app-state.ts:43](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L43)*

Get singleton instance of appstate

**Returns:** *[AppState](_cs_client_src_services_app_state_.appstate.md)‹›*

## Methods

###  AddLoader

▸ **AddLoader**(`id?`: string, `title?`: string): *string*

*Defined in [packages/cs-client/src/services/app-state.ts:162](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | string |
`title?` | string |

**Returns:** *string*

___

###  AddMenu

▸ **AddMenu**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:184](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  AddSidebar

▸ **AddSidebar**(`id`: string, `sidebar`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md), `dashboard?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:215](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L215)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`sidebar` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |
`dashboard?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  ClearNotifications

▸ **ClearNotifications**(): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:322](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L322)*

**Returns:** *void*

___

###  ClearRightSidebar

▸ **ClearRightSidebar**(): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:364](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L364)*

if rightsidebar exists, clear component and close

**Returns:** *void*

___

###  CloseDialog

▸ **CloseDialog**(): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:329](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L329)*

**Returns:** *void*

___

###  CloseInfo

▸ **CloseInfo**(): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:398](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L398)*

**Returns:** *void*

___

###  CloseRightSidebar

▸ **CloseRightSidebar**(): *boolean*

*Defined in [packages/cs-client/src/services/app-state.ts:380](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L380)*

**Returns:** *boolean*

___

###  CloseRightSidebarKey

▸ **CloseRightSidebarKey**(`id`: string): *boolean*

*Defined in [packages/cs-client/src/services/app-state.ts:389](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L389)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *boolean*

___

###  CloseRightSidebarWidget

▸ **CloseRightSidebarWidget**(`id`: string): *boolean*

*Defined in [packages/cs-client/src/services/app-state.ts:404](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L404)*

If a rightsidebar exists, it will remove a specific widget

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *boolean*

___

###  GetLoaders

▸ **GetLoaders**(): *object*

*Defined in [packages/cs-client/src/services/app-state.ts:180](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L180)*

**Returns:** *object*

* \[ **key**: *string*\]: string

___

###  OpenInfo

▸ **OpenInfo**(`options`: [InfoOptions](_cs_core_src_dashboard_dashboard_options_.infooptions.md) | string): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:285](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L285)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [InfoOptions](_cs_core_src_dashboard_dashboard_options_.infooptions.md) &#124; string |

**Returns:** *void*

___

###  OpenRightSidebar

▸ **OpenRightSidebar**(`dashboard?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:437](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L437)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  OpenRightSidebarKey

▸ **OpenRightSidebarKey**(`key`: string): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:425](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L425)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *void*

___

###  OpenRightSidebarWidget

▸ **OpenRightSidebarWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `options?`: [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md), `key`: string, `replace`: boolean): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:461](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L461)*

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

###  RemoveLoader

▸ **RemoveLoader**(`id`: string): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:172](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*

___

###  RemoveMenu

▸ **RemoveMenu**(`menuId`: string): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:192](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`menuId` | string |

**Returns:** *void*

___

###  RemoveSidebar

▸ **RemoveSidebar**(`id`: string): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:238](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L238)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*

___

###  ToggleRightSidebar

▸ **ToggleRightSidebar**(`key?`: string): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:444](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L444)*

**Parameters:**

Name | Type |
------ | ------ |
`key?` | string |

**Returns:** *void*

___

###  ToggleRightSidebarWidget

▸ **ToggleRightSidebarWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `options?`: [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:494](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L494)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |
`options?` | [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md) |

**Returns:** *void*

___

###  Translate

▸ **Translate**(`textKey`: string, `values?`: object): *string*

*Defined in [packages/cs-client/src/services/app-state.ts:500](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L500)*

**Parameters:**

Name | Type |
------ | ------ |
`textKey` | string |
`values?` | object |

**Returns:** *string*

___

###  TriggerDialog

▸ **TriggerDialog**(`dialog`: [IDialog](../interfaces/_cs_core_src_interactions_dialog_.idialog.md)): *Promise‹string›*

*Defined in [packages/cs-client/src/services/app-state.ts:333](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L333)*

**Parameters:**

Name | Type |
------ | ------ |
`dialog` | [IDialog](../interfaces/_cs_core_src_interactions_dialog_.idialog.md) |

**Returns:** *Promise‹string›*

___

###  TriggerNotification

▸ **TriggerNotification**(`notification`: [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:298](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L298)*

Triggers notification

**Parameters:**

Name | Type |
------ | ------ |
`notification` | [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md) |

**Returns:** *void*

___

###  TriggerQuestionDialog

▸ **TriggerQuestionDialog**(`title`: string, `text`: string, `actions`: string[]): *Promise‹string›*

*Defined in [packages/cs-client/src/services/app-state.ts:356](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L356)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`text` | string |
`actions` | string[] |

**Returns:** *Promise‹string›*

___

###  TriggerYesNoQuestionDialog

▸ **TriggerYesNoQuestionDialog**(`title`: string, `text`: string): *Promise‹string›*

*Defined in [packages/cs-client/src/services/app-state.ts:344](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L344)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`text` | string |

**Returns:** *Promise‹string›*

___

###  UpdateBreadCrumbs

▸ **UpdateBreadCrumbs**(`d?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md), `main`: boolean): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:245](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L245)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`d?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) | - |
`main` | boolean | true |

**Returns:** *void*

___

###  findWidget

▸ **findWidget**(`id`: string, `dashboard?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) | undefined*

*Defined in [packages/cs-client/src/services/app-state.ts:508](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L508)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`dashboard?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) | undefined*

___

###  init

▸ **init**(`project`: [IProject](../interfaces/_cs_core_src_project_project_.iproject.md)): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:86](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L86)*

Initialize the project state, dashboard managers and data summaries handlers

**Parameters:**

Name | Type |
------ | ------ |
`project` | [IProject](../interfaces/_cs_core_src_project_project_.iproject.md) |

**Returns:** *void*

___

###  initSocket

▸ **initSocket**(): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:65](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L65)*

**Returns:** *void*

___

### `Private` initializeDashboards

▸ **initializeDashboards**(`dashboards`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)[]): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:530](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L530)*

initializes given dashboards

**Parameters:**

Name | Type |
------ | ------ |
`dashboards` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)[] |

**Returns:** *void*

___

###  loadDatasource

▸ **loadDatasource**<**T**>(`source`: [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md) | string): *Promise‹T›*

*Defined in [packages/cs-client/src/services/app-state.ts:278](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L278)*

loads specific datasource in memory. Returns selected datasource as a promise

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`source` | [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md) &#124; string |

**Returns:** *Promise‹T›*

___

###  updateDatasource

▸ **updateDatasource**(`id`: string, `value`: any): *void*

*Defined in [packages/cs-client/src/services/app-state.ts:266](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-client/src/services/app-state.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`value` | any |

**Returns:** *void*
