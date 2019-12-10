# Class: TypedEvent

## Hierarchy

* **TypedEvent**

## Implements

* [IBaseEvent](../interfaces/_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md)

## Properties

### `Private` _listeners

• **_listeners**: *any[]* =  []

*Defined in [packages/cs-core/src/utils/message-bus/typed-event.ts:11](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-core/src/utils/message-bus/typed-event.ts#L11)*

## Methods

###  add

▸ **add**(`listener`: function): *void*

*Defined in [packages/cs-core/src/utils/message-bus/typed-event.ts:13](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-core/src/utils/message-bus/typed-event.ts#L13)*

**Parameters:**

▪ **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  remove

▸ **remove**(`listener?`: function): *void*

*Defined in [packages/cs-core/src/utils/message-bus/typed-event.ts:19](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-core/src/utils/message-bus/typed-event.ts#L19)*

**Parameters:**

▪`Optional`  **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  trigger

▸ **trigger**(...`a`: any[]): *void*

*Implementation of [IBaseEvent](../interfaces/_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md)*

*Defined in [packages/cs-core/src/utils/message-bus/typed-event.ts:34](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-core/src/utils/message-bus/typed-event.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`...a` | any[] |

**Returns:** *void*
