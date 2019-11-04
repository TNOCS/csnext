# Class: TypedEvent

## Hierarchy

* **TypedEvent**

## Implements

* [IBaseEvent](../interfaces/ibaseevent.md)

## Properties

### `Private` _listeners

• **_listeners**: *any[]* =  []

*Defined in [utils/message-bus/typed-event.ts:11](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L11)*

## Methods

###  add

▸ **add**(`listener`: function): *void*

*Defined in [utils/message-bus/typed-event.ts:13](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L13)*

**Parameters:**

▪ **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  remove

▸ **remove**(`listener?`: undefined | function): *void*

*Defined in [utils/message-bus/typed-event.ts:19](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`listener?` | undefined &#124; function |

**Returns:** *void*

___

###  trigger

▸ **trigger**(...`a`: any[]): *void*

*Implementation of [IBaseEvent](../interfaces/ibaseevent.md)*

*Defined in [utils/message-bus/typed-event.ts:34](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`...a` | any[] |

**Returns:** *void*
