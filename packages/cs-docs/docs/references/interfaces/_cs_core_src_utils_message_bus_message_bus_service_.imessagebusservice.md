# Interface: IMessageBusService

## Hierarchy

* **IMessageBusService**

## Implemented by

* [MessageBusService](../classes/_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)

## Properties

###  id

• **id**: *string*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:5](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L5)*

## Methods

###  publish

▸ **publish**(`topic`: string, `title`: string, `data?`: any): *void*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:6](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`title` | string |
`data?` | any |

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`topic`: string, `callback`: [IMessageBusCallback](_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md)): *[MessageBusHandle](../classes/_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:7](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`callback` | [IMessageBusCallback](_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md) |

**Returns:** *[MessageBusHandle](../classes/_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

___

###  unsubscribe

▸ **unsubscribe**(`handle`: [MessageBusHandle](../classes/_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)): *any*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:8](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [MessageBusHandle](../classes/_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) |

**Returns:** *any*
