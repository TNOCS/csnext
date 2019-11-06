# Class: CsFormField

## Hierarchy

* any

  ↳ **CsFormField**

## Properties

###  dateFormatted

• **dateFormatted**: *string* =  this.formatDate(new Date().toISOString().substr(0, 10))

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:28](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L28)*

___

###  dateMenu

• **dateMenu**: *boolean* = false

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:29](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L29)*

___

### `Optional` datestring

• **datestring**? : *string*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:27](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L27)*

___

### `Optional` field

• **field**? : *[IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:26](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L26)*

___

### `Private` fieldUpdatedDebounce

• **fieldUpdatedDebounce**: *any* =  debounce(this.fieldUpdated, 200)

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:32](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L32)*

___

### `Optional` target

• **target**? : *object*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:25](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L25)*

access the original widget from configuration

___

###  timeMenu

• **timeMenu**: *boolean* = false

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:30](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L30)*

## Accessors

###  DateValue

• **get DateValue**(): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:75](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L75)*

**Returns:** *string | undefined*

• **set DateValue**(`v`: string | undefined): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:83](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string &#124; undefined |

**Returns:** *void*

___

###  TimeValue

• **get TimeValue**(): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:95](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L95)*

**Returns:** *string | undefined*

• **set TimeValue**(`v`: string | undefined): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:103](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string &#124; undefined |

**Returns:** *void*

## Methods

###  addKeyObject

▸ **addKeyObject**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:197](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L197)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  changed

▸ **changed**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:49](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  deleteKeyFromObject

▸ **deleteKeyFromObject**(`key`: string, `field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:144](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  fieldError

▸ **fieldError**(`error`: boolean): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:175](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | boolean |

**Returns:** *void*

___

###  fieldInput

▸ **fieldInput**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:248](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L248)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  fieldOptions

▸ **fieldOptions**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *any*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:167](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *any*

___

###  fieldUpdated

▸ **fieldUpdated**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:159](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  formatDate

▸ **formatDate**(`date`: any): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:127](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | any |

**Returns:** *string | undefined*

___

###  formattedDate

▸ **formattedDate**(`date`: number): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:115](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | number |

**Returns:** *string | undefined*

___

###  formattedTime

▸ **formattedTime**(`date`: number): *string | undefined*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:121](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | number |

**Returns:** *string | undefined*

___

###  genColor

▸ **genColor**(`i`: number): *any*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:61](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`i` | number |

**Returns:** *any*

___

###  gettanggal

▸ **gettanggal**(`str`: number): *string*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:67](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | number |

**Returns:** *string*

___

###  keyObjectChange

▸ **keyObjectChange**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md), `oldValue`: string, `newValue`: string): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:223](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |
`oldValue` | string |
`newValue` | string |

**Returns:** *void*

___

###  parseDate

▸ **parseDate**(`date`: any): *string*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:133](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | any |

**Returns:** *string*

___

###  triggerClick

▸ **triggerClick**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:54](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  triggered

▸ **triggered**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:52](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  updateKey

▸ **updateKey**(`key`: string, `field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:181](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

## Object literals

### `Private` rules

### ▪ **rules**: *object*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:34](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L34)*

###  required

▸ **required**(`val`: any): *any*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:35](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | any |

**Returns:** *any*

###  valueMax

▸ **valueMax**(`val`: any): *any*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:41](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | any |

**Returns:** *any*

###  valueMin

▸ **valueMin**(`val`: any): *any*

*Defined in [cs-form/src/components/cs-form-field/cs-form-field.ts:36](https://github.com/RichardHovenkamp/csnext/blob/0e0b9b29/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | any |

**Returns:** *any*
