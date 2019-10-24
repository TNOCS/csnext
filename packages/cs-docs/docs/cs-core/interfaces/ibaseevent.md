# Interface: IBaseEvent

## Hierarchy

* **IBaseEvent**

  ↳ [IMessageEvent](imessageevent.md)

## Implemented by

* [TypedEvent](../classes/typedevent.md)

## Methods

###  add

▸ **add**(`listener`: function): *void*

*Defined in [utils/message-bus/typed-event.ts:3](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L3)*

**Parameters:**

▪ **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  remove

▸ **remove**(`listener`: function): *void*

*Defined in [utils/message-bus/typed-event.ts:4](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L4)*

**Parameters:**

▪ **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  trigger

▸ **trigger**(...`a`: any[]): *void*

*Defined in [utils/message-bus/typed-event.ts:5](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`...a` | any[] |

**Returns:** *void*
