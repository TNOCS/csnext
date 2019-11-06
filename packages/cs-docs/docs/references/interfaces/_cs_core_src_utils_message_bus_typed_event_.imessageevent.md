# Interface: IMessageEvent

## Hierarchy

* [IBaseEvent](_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md)

  ↳ **IMessageEvent**

## Methods

###  add

▸ **add**(`listener`: function): *void*

*Overrides [IBaseEvent](_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md).[add](_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md#add)*

*Defined in [cs-core/src/utils/message-bus/typed-event.ts:48](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-core/src/utils/message-bus/typed-event.ts#L48)*

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

*Overrides [IBaseEvent](_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md).[remove](_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md#remove)*

*Defined in [cs-core/src/utils/message-bus/typed-event.ts:49](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-core/src/utils/message-bus/typed-event.ts#L49)*

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

*Overrides [IBaseEvent](_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md).[trigger](_cs_core_src_utils_message_bus_typed_event_.ibaseevent.md#trigger)*

*Defined in [cs-core/src/utils/message-bus/typed-event.ts:50](https://github.com/RichardHovenkamp/csnext/blob/872f0bfe/packages/cs-core/src/utils/message-bus/typed-event.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*
