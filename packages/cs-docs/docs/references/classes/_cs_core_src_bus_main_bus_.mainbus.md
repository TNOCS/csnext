# Class: MainBus

## Hierarchy

* **MainBus**

## Properties

### `Static` `Private` pEvents

▪ **pEvents**: *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-core/src/bus/main-bus.ts:5](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-core/src/bus/main-bus.ts#L5)*

___

### `Static` `Private` pInstance

▪ **pInstance**: *[MainBus](_cs_core_src_bus_main_bus_.mainbus.md)*

*Defined in [cs-core/src/bus/main-bus.ts:4](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-core/src/bus/main-bus.ts#L4)*

used for singleton

## Accessors

### `Static` Instance

• **get Instance**(): *[MainBus](_cs_core_src_bus_main_bus_.mainbus.md)*

*Defined in [cs-core/src/bus/main-bus.ts:7](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-core/src/bus/main-bus.ts#L7)*

Get singleton instance of appstate

**Returns:** *[MainBus](_cs_core_src_bus_main_bus_.mainbus.md)*

___

### `Static` events

• **get events**(): *any*

*Defined in [cs-core/src/bus/main-bus.ts:12](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-core/src/bus/main-bus.ts#L12)*

Event bus for publish/subscribe events in application

**Returns:** *any*
