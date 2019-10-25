# Class: AppState

AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance

## Hierarchy

* any

  ↳ **AppState**

## Properties

### `Optional` i18n

• **i18n**? : *VueI18n*

*Defined in [cs-client/src/services/app-state.ts:55](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L55)*

Vue i18n instance

___

###  keyboard

• **keyboard**: *[KeyboardManager](_cs_client_src_services_keyboard_manager_.keyboardmanager.md)* =  new KeyboardManager()

*Defined in [cs-client/src/services/app-state.ts:57](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L57)*

manages keyboard shortcuts

___

### `Protected` loaders

• **loaders**: *object*

*Defined in [cs-client/src/services/app-state.ts:59](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L59)*

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  logger

• **logger**: *any* =  Logger.Instance

*Defined in [cs-client/src/services/app-state.ts:51](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L51)*

Logger

___

### `Optional` projectManager

• **projectManager**? : *[ProjectManager](_cs_client_src_services_project_manager_.projectmanager.md)*

*Defined in [cs-client/src/services/app-state.ts:49](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L49)*

Manages active project

___

### `Optional` router

• **router**? : *VueRouter*

*Defined in [cs-client/src/services/app-state.ts:53](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L53)*

Vue router instance

___

### `Optional` socket

• **socket**? : *Socket*

*Defined in [cs-client/src/services/app-state.ts:47](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L47)*

___

### `Static` DASHBOARD_CHANGED

▪ **DASHBOARD_CHANGED**: *string* = "dashboard-changed"

*Defined in [cs-client/src/services/app-state.ts:34](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L34)*

___

### `Static` DASHBOARD_MAIN

▪ **DASHBOARD_MAIN**: *string* = "dashboard.main"

*Defined in [cs-client/src/services/app-state.ts:33](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L33)*

___

### `Static` DIALOG

▪ **DIALOG**: *string* = "dialog"

*Defined in [cs-client/src/services/app-state.ts:28](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L28)*

___

### `Static` DIALOG_ADDED

▪ **DIALOG_ADDED**: *string* = "dialog-added"

*Defined in [cs-client/src/services/app-state.ts:29](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L29)*

___

### `Static` LOADERS

▪ **LOADERS**: *string* = "loaders"

*Defined in [cs-client/src/services/app-state.ts:35](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L35)*

___

### `Static` NO

▪ **NO**: *string* = "NO"

*Defined in [cs-client/src/services/app-state.ts:37](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L37)*

___

### `Static` RIGHTSIDEBAR

▪ **RIGHTSIDEBAR**: *string* = "rightsidebar"

*Defined in [cs-client/src/services/app-state.ts:30](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L30)*

___

### `Static` RIGHTSIDEBAR_ADDED

▪ **RIGHTSIDEBAR_ADDED**: *string* = "rightsidebar-added"

*Defined in [cs-client/src/services/app-state.ts:32](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L32)*

___

### `Static` RIGHTSIDEBAR_REMOVED

▪ **RIGHTSIDEBAR_REMOVED**: *string* = "rightsidebar-removed"

*Defined in [cs-client/src/services/app-state.ts:31](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L31)*

___

### `Static` YES

▪ **YES**: *string* = "YES"

*Defined in [cs-client/src/services/app-state.ts:36](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L36)*

## Accessors

### `Static` Instance

• **get Instance**(): *[AppState](_cs_client_src_services_app_state_.appstate.md)*

*Defined in [cs-client/src/services/app-state.ts:43](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L43)*

Get singleton instance of appstate

**Returns:** *[AppState](_cs_client_src_services_app_state_.appstate.md)*

## Methods

###  AddLoader

▸ **AddLoader**(`id?`: string, `title?`: string): *string*

*Defined in [cs-client/src/services/app-state.ts:162](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | string |
`title?` | string |

**Returns:** *string*

___

###  AddMenu

▸ **AddMenu**(`menu`: [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:184](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`menu` | [IMenu](../interfaces/_cs_core_src_interactions_menu_.imenu.md) |

**Returns:** *void*

___

###  AddSidebar

▸ **AddSidebar**(`id`: string, `sidebar`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:200](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L200)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`sidebar` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  ClearNotifications

▸ **ClearNotifications**(): *void*

*Defined in [cs-client/src/services/app-state.ts:297](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L297)*

**Returns:** *void*

___

###  ClearRightSidebar

▸ **ClearRightSidebar**(): *void*

*Defined in [cs-client/src/services/app-state.ts:335](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L335)*

if rightsidebar exists, clear component and close

**Returns:** *void*

___

###  CloseInfo

▸ **CloseInfo**(): *void*

*Defined in [cs-client/src/services/app-state.ts:369](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L369)*

**Returns:** *void*

___

###  CloseRightSidebar

▸ **CloseRightSidebar**(): *boolean*

*Defined in [cs-client/src/services/app-state.ts:351](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L351)*

**Returns:** *boolean*

___

###  CloseRightSidebarKey

▸ **CloseRightSidebarKey**(`id`: string): *boolean*

*Defined in [cs-client/src/services/app-state.ts:360](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L360)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *boolean*

___

###  CloseRightSidebarWidget

▸ **CloseRightSidebarWidget**(`id`: string): *boolean*

*Defined in [cs-client/src/services/app-state.ts:375](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L375)*

If a rightsidebar exists, it will remove a specific widget

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *boolean*

___

###  GetLoaders

▸ **GetLoaders**(): *object*

*Defined in [cs-client/src/services/app-state.ts:180](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L180)*

**Returns:** *object*

* \[ **key**: *string*\]: string

___

###  OpenInfo

▸ **OpenInfo**(`options`: [InfoOptions](_cs_core_src_dashboard_dashboard_options_.infooptions.md) | string): *void*

*Defined in [cs-client/src/services/app-state.ts:261](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [InfoOptions](_cs_core_src_dashboard_dashboard_options_.infooptions.md) &#124; string |

**Returns:** *void*

___

###  OpenRightSidebar

▸ **OpenRightSidebar**(`dashboard?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:411](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L411)*

**Parameters:**

Name | Type |
------ | ------ |
`dashboard?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *void*

___

###  OpenRightSidebarKey

▸ **OpenRightSidebarKey**(`key`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:396](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L396)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *void*

___

###  OpenRightSidebarWidget

▸ **OpenRightSidebarWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `options?`: [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md), `key`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:433](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L433)*

If a rightsidebar exists, it will replaces all rightsidebar content with this specific widget

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) | - |
`options?` | [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md) | - |
`key` | string | "default" |

**Returns:** *void*

___

###  RemoveLoader

▸ **RemoveLoader**(`id`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:172](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*

___

###  RemoveMenu

▸ **RemoveMenu**(`menuId`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:192](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`menuId` | string |

**Returns:** *void*

___

###  RemoveSidebar

▸ **RemoveSidebar**(`id`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:214](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*

___

###  ToggleRightSidebar

▸ **ToggleRightSidebar**(`key?`: string): *void*

*Defined in [cs-client/src/services/app-state.ts:418](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L418)*

**Parameters:**

Name | Type |
------ | ------ |
`key?` | string |

**Returns:** *void*

___

###  ToggleRightSidebarWidget

▸ **ToggleRightSidebarWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `options?`: [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:461](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L461)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |
`options?` | [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md) |

**Returns:** *void*

___

###  Translate

▸ **Translate**(`textKey`: string, `values?`: object): *string*

*Defined in [cs-client/src/services/app-state.ts:467](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L467)*

**Parameters:**

Name | Type |
------ | ------ |
`textKey` | string |
`values?` | object |

**Returns:** *string*

___

###  TriggerDialog

▸ **TriggerDialog**(`dialog`: [IDialog](../interfaces/_cs_core_src_interactions_dialog_.idialog.md)): *Promise‹string›*

*Defined in [cs-client/src/services/app-state.ts:304](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L304)*

**Parameters:**

Name | Type |
------ | ------ |
`dialog` | [IDialog](../interfaces/_cs_core_src_interactions_dialog_.idialog.md) |

**Returns:** *Promise‹string›*

___

###  TriggerNotification

▸ **TriggerNotification**(`notification`: [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:274](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L274)*

Triggers notification

**Parameters:**

Name | Type |
------ | ------ |
`notification` | [INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md) |

**Returns:** *void*

___

###  TriggerQuestionDialog

▸ **TriggerQuestionDialog**(`title`: string, `text`: string, `actions`: string[]): *Promise‹string›*

*Defined in [cs-client/src/services/app-state.ts:327](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L327)*

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

*Defined in [cs-client/src/services/app-state.ts:315](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L315)*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`text` | string |

**Returns:** *Promise‹string›*

___

###  UpdateBreadCrumbs

▸ **UpdateBreadCrumbs**(`d?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md), `main`: boolean): *void*

*Defined in [cs-client/src/services/app-state.ts:221](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L221)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`d?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) | - |
`main` | boolean | true |

**Returns:** *void*

___

###  findWidget

▸ **findWidget**(`id`: string, `dashboard?`: [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)): *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) | undefined*

*Defined in [cs-client/src/services/app-state.ts:475](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L475)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`dashboard?` | [IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md) |

**Returns:** *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) | undefined*

___

###  init

▸ **init**(`project`: [IProject](../interfaces/_cs_core_src_project_project_.iproject.md)): *void*

*Defined in [cs-client/src/services/app-state.ts:86](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L86)*

Initialize the project state, dashboard managers and data summaries handlers

**Parameters:**

Name | Type |
------ | ------ |
`project` | [IProject](../interfaces/_cs_core_src_project_project_.iproject.md) |

**Returns:** *void*

___

###  initSocket

▸ **initSocket**(): *void*

*Defined in [cs-client/src/services/app-state.ts:65](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L65)*

**Returns:** *void*

___

###  loadDatasource

▸ **loadDatasource**<**T**>(`source`: [IDatasource](../interfaces/_cs_core_src_datasources_datasource_.idatasource.md) | string): *Promise‹T›*

*Defined in [cs-client/src/services/app-state.ts:254](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L254)*

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

*Defined in [cs-client/src/services/app-state.ts:242](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/app-state.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`value` | any |

**Returns:** *void*
