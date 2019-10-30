# Class: AppStateBase

## Hierarchy

* **AppStateBase**

## Properties

### `Optional` activeDashboard

• **activeDashboard**? : *[IDashboard](../interfaces/_cs_core_src_dashboard_dashboard_.idashboard.md)*

*Defined in [cs-core/src/project/app-state-base.ts:26](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L26)*

Currently active dashboard

___

###  data

• **data**: *object*

*Defined in [cs-core/src/project/app-state-base.ts:28](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L28)*

#### Type declaration:

* \[ **id**: *string*\]: any

___

###  isInitialized

• **isInitialized**: *boolean* = false

*Defined in [cs-core/src/project/app-state-base.ts:13](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L13)*

True if the application has been initialized

___

###  notifications

• **notifications**: *[INotification](../interfaces/_cs_core_src_interactions_notification_.inotification.md)[]* =  []

*Defined in [cs-core/src/project/app-state-base.ts:24](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L24)*

list of past notifications

___

###  project

• **project**: *[IProject](../interfaces/_cs_core_src_project_project_.iproject.md)*

*Defined in [cs-core/src/project/app-state-base.ts:16](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L16)*

Project definition

## Accessors

###  bus

• **get bus**(): *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-core/src/project/app-state-base.ts:20](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L20)*

Event bus for publish/subscribe events in application

**Returns:** *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

## Methods

### `Abstract` OpenRightSidebarWidget

▸ **OpenRightSidebarWidget**(`widget`: [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md), `options?`: [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md)): *any*

*Defined in [cs-core/src/project/app-state-base.ts:32](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md) |
`options?` | [ISidebarOptions](../interfaces/_cs_core_src_project_sidebar_options_.isidebaroptions.md) |

**Returns:** *any*

## Object literals

###  windowSize

### ▪ **windowSize**: *object*

*Defined in [cs-core/src/project/app-state-base.ts:30](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L30)*

###  x

• **x**: *number* = 0

*Defined in [cs-core/src/project/app-state-base.ts:30](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L30)*

###  y

• **y**: *number* = 0

*Defined in [cs-core/src/project/app-state-base.ts:30](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-core/src/project/app-state-base.ts#L30)*
