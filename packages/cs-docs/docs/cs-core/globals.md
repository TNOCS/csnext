# @csnext/cs-core

## Type aliases

###  ILanguageString

Ƭ **ILanguageString**: *string | [ILanguageObject](interfaces/ilanguageobject.md)*

*Defined in [project/language-options.ts:1](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/project/language-options.ts#L1)*

___

###  IListener

Ƭ **IListener**: *function*

*Defined in [utils/typed-event/typed-event.ts:4](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/typed-event/typed-event.ts#L4)*

Listen for events of Type T

#### Type declaration:

▸ (`event`: T): *any*

**Parameters:**

Name | Type |
------ | ------ |
`event` | T |

## Functions

###  Form

▸ **Form**(`options`: [IFormOptions](interfaces/iformoptions.md)): *decorator*

*Defined in [form/form-decorators.ts:82](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/form/form-decorators.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IFormOptions](interfaces/iformoptions.md) |

**Returns:** *decorator*

___

###  FormField

▸ **FormField**(`options`: [IFormFieldOptions](interfaces/iformfieldoptions.md)): *any*

*Defined in [form/form-decorators.ts:100](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/form/form-decorators.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IFormFieldOptions](interfaces/iformfieldoptions.md) |

**Returns:** *any*

___

###  FormUnionFields

▸ **FormUnionFields**(`options`: [IFormUnionFieldOptions](interfaces/iformunionfieldoptions.md)): *decorator*

*Defined in [form/form-decorators.ts:117](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/form/form-decorators.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IFormUnionFieldOptions](interfaces/iformunionfieldoptions.md) |

**Returns:** *decorator*

___

###  guidGenerator

▸ **guidGenerator**(): *string*

*Defined in [utils/guid.ts:1](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/guid.ts#L1)*

**Returns:** *string*

___

###  idGenerator

▸ **idGenerator**(): *string*

*Defined in [utils/guid.ts:9](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/guid.ts#L9)*

**Returns:** *string*

___

###  isFunction

▸ **isFunction**(`functionToCheck`: any): *boolean*

*Defined in [utils/function.ts:1](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/function.ts#L1)*

**Parameters:**

Name | Type |
------ | ------ |
`functionToCheck` | any |

**Returns:** *boolean*

___

###  numberGenerator

▸ **numberGenerator**(): *number*

*Defined in [utils/guid.ts:17](https://github.com/TNOCS/csnext/blob/b9521f0/packages/cs-core/src/utils/guid.ts#L17)*

**Returns:** *number*
