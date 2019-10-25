# Class: KeyboardManager

## Hierarchy

* **KeyboardManager**

## Methods

###  init

▸ **init**(): *void*

*Defined in [cs-client/src/services/keyboard-manager.ts:7](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/keyboard-manager.ts#L7)*

**Returns:** *void*

___

###  register

▸ **register**(`shortcut`: [KeyboardShortcut](_cs_core_src_utils_keyboard_shortcut_.keyboardshortcut.md)): *void*

*Defined in [cs-client/src/services/keyboard-manager.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/keyboard-manager.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`shortcut` | [KeyboardShortcut](_cs_core_src_utils_keyboard_shortcut_.keyboardshortcut.md) |

**Returns:** *void*

___

###  registerShortcut

▸ **registerShortcut**(`id`: string, `code`: string, `callback`: Function, `alt?`: boolean, `shift?`: boolean, `ctrl?`: boolean): *void*

*Defined in [cs-client/src/services/keyboard-manager.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-client/src/services/keyboard-manager.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`code` | string |
`callback` | Function |
`alt?` | boolean |
`shift?` | boolean |
`ctrl?` | boolean |

**Returns:** *void*
