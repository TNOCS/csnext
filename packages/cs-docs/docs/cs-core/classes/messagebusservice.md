# Class: MessageBusService

Simple message bus service, used for subscribing and unsubsubscribing to topics.

**`see`** [https://gist.github.com/floatingmonkey/3384419](https://gist.github.com/floatingmonkey/3384419)

## Hierarchy

* **MessageBusService**

## Implements

* [IMessageBusService](../interfaces/imessagebusservice.md)

## Constructors

###  constructor

\+ **new MessageBusService**(): *[MessageBusService](messagebusservice.md)*

*Defined in [utils/message-bus/message-bus-service.ts:17](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L17)*

**Returns:** *[MessageBusService](messagebusservice.md)*

## Properties

### `Private` cache

• **cache**: *object*

*Defined in [utils/message-bus/message-bus-service.ts:15](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L15)*

#### Type declaration:

* \[ **topic**: *string*\]: [IMessageBusCallback](../interfaces/imessagebuscallback.md)[]

___

### `Private` confirms

• **confirms**: *any[]* =  []

*Defined in [utils/message-bus/message-bus-service.ts:16](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L16)*

___

###  id

• **id**: *string*

*Implementation of [IMessageBusService](../interfaces/imessagebusservice.md).[id](../interfaces/imessagebusservice.md#id)*

*Defined in [utils/message-bus/message-bus-service.ts:17](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L17)*

## Methods

###  publish

▸ **publish**(`topic`: string, `title`: string, `data?`: any): *void*

*Implementation of [IMessageBusService](../interfaces/imessagebusservice.md)*

*Defined in [utils/message-bus/message-bus-service.ts:26](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L26)*

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

▸ **subscribe**(`topic`: string, `callback`: [IMessageBusCallback](../interfaces/imessagebuscallback.md)): *[MessageBusHandle](messagebushandle.md)*

*Implementation of [IMessageBusService](../interfaces/imessagebusservice.md)*

*Defined in [utils/message-bus/message-bus-service.ts:39](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L39)*

Subscribe to a topic

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`topic` | string | The desired topic of the message. |
`callback` | [IMessageBusCallback](../interfaces/imessagebuscallback.md) | The callback to call.  |

**Returns:** *[MessageBusHandle](messagebushandle.md)*

___

###  unsubscribe

▸ **unsubscribe**(`handle`: [MessageBusHandle](messagebushandle.md)): *void*

*Implementation of [IMessageBusService](../interfaces/imessagebusservice.md)*

*Defined in [utils/message-bus/message-bus-service.ts:53](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L53)*

Unsubscribe to a topic by providing its handle

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [MessageBusHandle](messagebushandle.md) |

**Returns:** *void*
