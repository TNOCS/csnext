# Class: AppStateBase

## Hierarchy

* **AppStateBase**

## Properties

### `Optional` activeDashboard

• **activeDashboard**? : *[IDashboard](../interfaces/idashboard.md)*

*Defined in [project/app-state-base.ts:26](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L26)*

Currently active dashboard

___

###  data

• **data**: *object*

*Defined in [project/app-state-base.ts:28](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L28)*

#### Type declaration:

* \[ **id**: *string*\]: any

___

###  isInitialized

• **isInitialized**: *boolean* = false

*Defined in [project/app-state-base.ts:13](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L13)*

True if the application has been initialized

___

###  notifications

• **notifications**: *[INotification](../interfaces/inotification.md)[]* =  []

*Defined in [project/app-state-base.ts:24](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L24)*

list of past notifications

___

###  project

• **project**: *[IProject](../interfaces/iproject.md)*

*Defined in [project/app-state-base.ts:16](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L16)*

Project definition

## Accessors

###  bus

• **get bus**(): *[MessageBusService](messagebusservice.md)*

*Defined in [project/app-state-base.ts:20](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L20)*

Event bus for publish/subscribe events in application

**Returns:** *[MessageBusService](messagebusservice.md)*

## Methods

### `Abstract` OpenRightSidebarWidget

▸ **OpenRightSidebarWidget**(`widget`: [IWidget](../interfaces/iwidget.md), `options?`: [ISidebarOptions](../interfaces/isidebaroptions.md)): *any*

*Defined in [project/app-state-base.ts:32](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`widget` | [IWidget](../interfaces/iwidget.md) |
`options?` | [ISidebarOptions](../interfaces/isidebaroptions.md) |

**Returns:** *any*

## Object literals

###  windowSize

### ▪ **windowSize**: *object*

*Defined in [project/app-state-base.ts:30](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L30)*

###  x

• **x**: *number* = 0

*Defined in [project/app-state-base.ts:30](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L30)*

###  y

• **y**: *number* = 0

*Defined in [project/app-state-base.ts:30](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/app-state-base.ts#L30)*
