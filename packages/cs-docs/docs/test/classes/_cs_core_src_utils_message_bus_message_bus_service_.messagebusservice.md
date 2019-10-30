# Class: MessageBusService

Simple message bus service, used for subscribing and unsubsubscribing to topics.

**`see`** [https://gist.github.com/floatingmonkey/3384419](https://gist.github.com/floatingmonkey/3384419)

## Hierarchy

* **MessageBusService**

## Implements

* [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md)

## Constructors

###  constructor

\+ **new MessageBusService**(): *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:17](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L17)*

**Returns:** *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

## Properties

### `Private` cache

• **cache**: *object*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:15](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L15)*

#### Type declaration:

* \[ **topic**: *string*\]: [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md)[]

___

### `Private` confirms

• **confirms**: *any[]* =  []

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:16](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L16)*

___

###  id

• **id**: *string*

*Implementation of [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md).[id](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md#id)*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:17](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L17)*

## Methods

###  publish

▸ **publish**(`topic`: string, `title`: string, `data?`: any): *void*

*Implementation of [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md)*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:26](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L26)*

Publish to a topic

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`title` | string |
`data?` | any |

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`topic`: string, `callback`: [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md)): *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

*Implementation of [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md)*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:39](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L39)*

Subscribe to a topic

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`topic` | string | The desired topic of the message. |
`callback` | [IMessageBusCallback](../interfaces/_cs_core_src_utils_message_bus_message_bus_handle_.imessagebuscallback.md) | The callback to call.  |

**Returns:** *[MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)*

___

###  unsubscribe

▸ **unsubscribe**(`handle`: [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md)): *void*

*Implementation of [IMessageBusService](../interfaces/_cs_core_src_utils_message_bus_message_bus_service_.imessagebusservice.md)*

*Defined in [cs-core/src/utils/message-bus/message-bus-service.ts:53](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L53)*

Unsubscribe to a topic by providing its handle

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [MessageBusHandle](_cs_core_src_utils_message_bus_message_bus_handle_.messagebushandle.md) |

**Returns:** *void*
