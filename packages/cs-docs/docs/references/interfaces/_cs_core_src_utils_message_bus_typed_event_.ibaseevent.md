# Interface: IBaseEvent

## Hierarchy

* **IBaseEvent**

  ↳ [IMessageEvent](_cs_core_src_utils_message_bus_typed_event_.imessageevent.md)

## Implemented by

* [TypedEvent](../classes/_cs_core_src_utils_message_bus_typed_event_.typedevent.md)

## Methods

###  add

▸ **add**(`listener`: function): *void*

*Defined in [cs-core/src/utils/message-bus/typed-event.ts:3](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-core/src/utils/message-bus/typed-event.ts#L3)*

**Parameters:**

▪ **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  remove

▸ **remove**(`listener`: function): *void*

*Defined in [cs-core/src/utils/message-bus/typed-event.ts:4](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-core/src/utils/message-bus/typed-event.ts#L4)*

**Parameters:**

▪ **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  trigger

▸ **trigger**(...`a`: any[]): *void*

*Defined in [cs-core/src/utils/message-bus/typed-event.ts:5](https://github.com/TNOCS/csnext/blob/40018c3a/packages/cs-core/src/utils/message-bus/typed-event.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`...a` | any[] |

**Returns:** *void*
