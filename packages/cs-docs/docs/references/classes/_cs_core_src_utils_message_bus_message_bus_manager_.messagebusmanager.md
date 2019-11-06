# Class: MessageBusManager

Helper class to manage message bus subscriptions/handles. Is used by Widget and Dashboard managers

## Hierarchy

* **MessageBusManager**

## Properties

###  busHandlers

• **busHandlers**: *object*

*Defined in [cs-core/src/utils/message-bus/message-bus-manager.ts:5](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/message-bus/message-bus-manager.ts#L5)*

#### Type declaration:

* \[ **key**: *string*\]: object

* **bus**: *[IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md)*

* **handle**: *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

## Methods

###  start

▸ **start**(): *void*

*Defined in [cs-core/src/utils/message-bus/message-bus-manager.ts:12](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/message-bus/message-bus-manager.ts#L12)*

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Defined in [cs-core/src/utils/message-bus/message-bus-manager.ts:16](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/message-bus/message-bus-manager.ts#L16)*

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`bus`: [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md) | undefined, `topic`: string, `callback`: [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md), `id?`: string): *void*

*Defined in [cs-core/src/utils/message-bus/message-bus-manager.ts:28](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/message-bus/message-bus-manager.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`bus` | [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md) &#124; undefined |
`topic` | string |
`callback` | [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md) |
`id?` | string |

**Returns:** *void*
