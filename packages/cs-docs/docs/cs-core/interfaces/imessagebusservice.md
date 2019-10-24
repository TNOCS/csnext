# Interface: IMessageBusService

## Hierarchy

* **IMessageBusService**

## Implemented by

* [MessageBusService](../classes/messagebusservice.md)

## Properties

###  id

• **id**: *string*

*Defined in [utils/message-bus/message-bus-service.ts:5](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L5)*

## Methods

###  publish

▸ **publish**(`topic`: string, `title`: string, `data?`: any): *void*

*Defined in [utils/message-bus/message-bus-service.ts:6](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`title` | string |
`data?` | any |

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`topic`: string, `callback`: [IMessageBusCallback](imessagebuscallback.md)): *[MessageBusHandle](../classes/messagebushandle.md)*

*Defined in [utils/message-bus/message-bus-service.ts:7](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`callback` | [IMessageBusCallback](imessagebuscallback.md) |

**Returns:** *[MessageBusHandle](../classes/messagebushandle.md)*

___

###  unsubscribe

▸ **unsubscribe**(`handle`: [MessageBusHandle](../classes/messagebushandle.md)): *any*

*Defined in [utils/message-bus/message-bus-service.ts:8](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/message-bus/message-bus-service.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [MessageBusHandle](../classes/messagebushandle.md) |

**Returns:** *any*
