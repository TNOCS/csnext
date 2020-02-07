# Class: Loader

## Hierarchy

* **Loader**

## Constructors

###  constructor

\+ **new Loader**(`bus?`: [MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)): *[Loader](_cs_core_src_utils_loader_.loader.md)*

Defined in cs-core/src/utils/loader.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`bus?` | [MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md) |

**Returns:** *[Loader](_cs_core_src_utils_loader_.loader.md)*

## Properties

### `Private` `Optional` bus

• **bus**? : *[MessageBusService](_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

Defined in cs-core/src/utils/loader.ts:12

___

### `Protected` loaders

• **loaders**: *object*

Defined in cs-core/src/utils/loader.ts:10

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  loading

• **loading**: *boolean* = false

Defined in cs-core/src/utils/loader.ts:8

___

### `Static` LOADERS

▪ **LOADERS**: *string* = "loaders"

Defined in cs-core/src/utils/loader.ts:6

___

### `Static` LOADER_UPDATED

▪ **LOADER_UPDATED**: *string* = "updated"

Defined in cs-core/src/utils/loader.ts:7

## Methods

###  addLoader

▸ **addLoader**(`id?`: string, `title?`: string): *string*

Defined in cs-core/src/utils/loader.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`id?` | string |
`title?` | string |

**Returns:** *string*

___

###  getLoaders

▸ **getLoaders**(): *object*

Defined in cs-core/src/utils/loader.ts:38

**Returns:** *object*

* \[ **key**: *string*\]: string

___

###  removeLoader

▸ **removeLoader**(`id`: string): *void*

Defined in cs-core/src/utils/loader.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*
