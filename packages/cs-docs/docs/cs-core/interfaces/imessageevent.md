# Interface: IMessageEvent

## Hierarchy

* [IBaseEvent](ibaseevent.md)

  ↳ **IMessageEvent**

## Methods

###  add

▸ **add**(`listener`: function): *void*

*Overrides [IBaseEvent](ibaseevent.md).[add](ibaseevent.md#add)*

*Defined in [utils/message-bus/typed-event.ts:48](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L48)*

**Parameters:**

▪ **listener**: *function*

▸ (`message`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  remove

▸ **remove**(`listener`: function): *void*

*Overrides [IBaseEvent](ibaseevent.md).[remove](ibaseevent.md#remove)*

*Defined in [utils/message-bus/typed-event.ts:49](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L49)*

**Parameters:**

▪ **listener**: *function*

▸ (`message`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  trigger

▸ **trigger**(`message`: string): *void*

*Overrides [IBaseEvent](ibaseevent.md).[trigger](ibaseevent.md#trigger)*

*Defined in [utils/message-bus/typed-event.ts:50](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/typed-event.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*
