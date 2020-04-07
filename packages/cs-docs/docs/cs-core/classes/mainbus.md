# Class: MainBus

## Hierarchy

* **MainBus**

## Properties

### `Static` `Private` pEvents

▪ **pEvents**: *[MessageBusService](messagebusservice.md)*

*Defined in [bus/main-bus.ts:5](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/bus/main-bus.ts#L5)*

___

### `Static` `Private` pInstance

▪ **pInstance**: *[MainBus](mainbus.md)*

*Defined in [bus/main-bus.ts:4](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/bus/main-bus.ts#L4)*

used for singleton

## Accessors

### `Static` Instance

• **get Instance**(): *[MainBus](mainbus.md)*

*Defined in [bus/main-bus.ts:7](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/bus/main-bus.ts#L7)*

Get singleton instance of appstate

**Returns:** *[MainBus](mainbus.md)*

___

### `Static` events

• **get events**(): *[MessageBusService](messagebusservice.md)*

*Defined in [bus/main-bus.ts:12](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/bus/main-bus.ts#L12)*

Event bus for publish/subscribe events in application

**Returns:** *[MessageBusService](messagebusservice.md)*
