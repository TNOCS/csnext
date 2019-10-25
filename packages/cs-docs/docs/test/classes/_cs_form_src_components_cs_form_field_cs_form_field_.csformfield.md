# Class: CsFormField

## Hierarchy

* any

  ↳ **CsFormField**

## Properties

###  dateFormatted

• **dateFormatted**: *string* =  this.formatDate(new Date().toISOString().substr(0, 10))

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:29](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L29)*

___

###  dateMenu

• **dateMenu**: *boolean* = false

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:30](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L30)*

___

### `Optional` datestring

• **datestring**? : *string*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:28](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L28)*

___

### `Optional` field

• **field**? : *[IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:27](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L27)*

___

### `Optional` target

• **target**? : *object*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:26](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L26)*

access the original widget from configuration

___

###  timeMenu

• **timeMenu**: *boolean* = false

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:31](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L31)*

## Accessors

###  DateValue

• **get DateValue**(): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:76](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L76)*

**Returns:** *string | undefined*

• **set DateValue**(`v`: string | undefined): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:84](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string &#124; undefined |

**Returns:** *void*

___

###  TimeValue

• **get TimeValue**(): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:96](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L96)*

**Returns:** *string | undefined*

• **set TimeValue**(`v`: string | undefined): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:104](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string &#124; undefined |

**Returns:** *void*

## Methods

###  addKeyObject

▸ **addKeyObject**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:188](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  changed

▸ **changed**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:50](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  deleteKeyFromObject

▸ **deleteKeyFromObject**(`key`: string, `field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:145](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  fieldOptions

▸ **fieldOptions**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *any*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:164](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *any*

___

###  fieldUpdated

▸ **fieldUpdated**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:160](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  formatDate

▸ **formatDate**(`date`: any): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:128](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | any |

**Returns:** *string | undefined*

___

###  formattedDate

▸ **formattedDate**(`date`: number): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:116](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | number |

**Returns:** *string | undefined*

___

###  formattedTime

▸ **formattedTime**(`date`: number): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:122](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | number |

**Returns:** *string | undefined*

___

###  genColor

▸ **genColor**(`i`: number): *any*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:62](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`i` | number |

**Returns:** *any*

___

###  gettanggal

▸ **gettanggal**(`str`: number): *string*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:68](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | number |

**Returns:** *string*

___

###  keyObjectChange

▸ **keyObjectChange**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md), `oldValue`: string, `newValue`: string): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:214](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |
`oldValue` | string |
`newValue` | string |

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:239](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L239)*

**Returns:** *void*

___

###  parseDate

▸ **parseDate**(`date`: any): *string*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:134](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | any |

**Returns:** *string*

___

###  triggerClick

▸ **triggerClick**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:55](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  triggered

▸ **triggered**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:53](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  updateKey

▸ **updateKey**(`key`: string, `field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:172](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*
