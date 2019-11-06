# Class: EventEmitter <**T**>

Typed EventEmitter, passes through events as they happen.
You will not get events from before you start listening

**`see`** https://basarat.gitbooks.io/typescript/docs/tips/typed-event.html

Usage:
const onFoo = new EventEmitter<Foo>();
const onBar = new EventEmitter<Bar>();

// Emit:
onFoo.emit(foo);
onBar.emit(bar);

// Listen:
onFoo.on((foo)=>console.log(foo));
onBar.on((bar)=>console.log(bar));

## Type parameters

▪ **T**

## Hierarchy

* **EventEmitter**

## Properties

### `Private` listeners

• **listeners**: *Array‹[IListener](../modules/_cs_core_src_utils_typed_event_typed_event_.md#ilistener)‹T››* =  []

*Defined in [cs-core/src/utils/typed-event/typed-event.ts:29](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/typed-event/typed-event.ts#L29)*

___

### `Private` listenersOncer

• **listenersOncer**: *Array‹[IListener](../modules/_cs_core_src_utils_typed_event_typed_event_.md#ilistener)‹T››* =  []

*Defined in [cs-core/src/utils/typed-event/typed-event.ts:30](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/typed-event/typed-event.ts#L30)*

## Methods

###  emit

▸ **emit**(`event`: T): *void*

*Defined in [cs-core/src/utils/typed-event/typed-event.ts:48](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/typed-event/typed-event.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | T |

**Returns:** *void*

___

###  off

▸ **off**(`listener`: [IListener](../modules/_cs_core_src_utils_typed_event_typed_event_.md#ilistener)‹T›): *void*

*Defined in [cs-core/src/utils/typed-event/typed-event.ts:43](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/typed-event/typed-event.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`listener` | [IListener](../modules/_cs_core_src_utils_typed_event_typed_event_.md#ilistener)‹T› |

**Returns:** *void*

___

###  on

▸ **on**(`listener`: [IListener](../modules/_cs_core_src_utils_typed_event_typed_event_.md#ilistener)‹T›): *[IDisposable](../interfaces/_cs_core_src_utils_typed_event_typed_event_.idisposable.md)*

*Defined in [cs-core/src/utils/typed-event/typed-event.ts:32](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/typed-event/typed-event.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`listener` | [IListener](../modules/_cs_core_src_utils_typed_event_typed_event_.md#ilistener)‹T› |

**Returns:** *[IDisposable](../interfaces/_cs_core_src_utils_typed_event_typed_event_.idisposable.md)*

___

###  once

▸ **once**(`listener`: [IListener](../modules/_cs_core_src_utils_typed_event_typed_event_.md#ilistener)‹T›): *void*

*Defined in [cs-core/src/utils/typed-event/typed-event.ts:39](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/typed-event/typed-event.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`listener` | [IListener](../modules/_cs_core_src_utils_typed_event_typed_event_.md#ilistener)‹T› |

**Returns:** *void*

___

###  pipe

▸ **pipe**(`te`: [EventEmitter](_cs_core_src_utils_typed_event_typed_event_.eventemitter.md)‹T›): *[IDisposable](../interfaces/_cs_core_src_utils_typed_event_typed_event_.idisposable.md)*

*Defined in [cs-core/src/utils/typed-event/typed-event.ts:57](https://github.com/RichardHovenkamp/csnext/blob/6deb7f51/packages/cs-core/src/utils/typed-event/typed-event.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`te` | [EventEmitter](_cs_core_src_utils_typed_event_typed_event_.eventemitter.md)‹T› |

**Returns:** *[IDisposable](../interfaces/_cs_core_src_utils_typed_event_typed_event_.idisposable.md)*
