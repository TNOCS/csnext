# Class: CsFormField

## Hierarchy

* any

  ↳ **CsFormField**

## Properties

###  dateFormatted

• **dateFormatted**: *string* =  this.formatDate(new Date().toISOString().substr(0, 10))

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:28](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L28)*

___

###  dateMenu

• **dateMenu**: *boolean* = false

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:29](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L29)*

___

### `Optional` datestring

• **datestring**? : *string*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:27](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L27)*

___

### `Optional` field

• **field**? : *[IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:26](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L26)*

___

### `Private` fieldUpdatedDebounce

• **fieldUpdatedDebounce**: *any* =  debounce(this.fieldUpdated, 200)

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:32](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L32)*

___

### `Optional` target

• **target**? : *object*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:25](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L25)*

access the original widget from configuration

___

###  timeMenu

• **timeMenu**: *boolean* = false

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:30](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L30)*

## Accessors

###  DateValue

• **get DateValue**(): *string | undefined*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:94](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L94)*

**Returns:** *string | undefined*

• **set DateValue**(`v`: string | undefined): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:102](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string &#124; undefined |

**Returns:** *void*

___

###  TimeValue

• **get TimeValue**(): *string | undefined*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:114](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L114)*

**Returns:** *string | undefined*

• **set TimeValue**(`v`: string | undefined): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:122](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | string &#124; undefined |

**Returns:** *void*

___

###  selectedObject

• **get selectedObject**(): *any | undefined*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:61](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L61)*

**Returns:** *any | undefined*

• **set selectedObject**(`s`: any): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:68](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | any |

**Returns:** *void*

## Methods

###  addKeyObject

▸ **addKeyObject**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:216](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L216)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  changed

▸ **changed**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:49](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  deleteKeyFromObject

▸ **deleteKeyFromObject**(`key`: string, `field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:163](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  fieldError

▸ **fieldError**(`error`: boolean): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:194](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | boolean |

**Returns:** *void*

___

###  fieldInput

▸ **fieldInput**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:267](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L267)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  fieldOptions

▸ **fieldOptions**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *any*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:186](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *any*

___

###  fieldUpdated

▸ **fieldUpdated**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:178](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  formatDate

▸ **formatDate**(`date`: string): *string | undefined*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:146](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | string |

**Returns:** *string | undefined*

___

###  formattedDate

▸ **formattedDate**(`date`: number): *string | undefined*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:134](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | number |

**Returns:** *string | undefined*

___

###  formattedTime

▸ **formattedTime**(`date`: number): *string | undefined*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:140](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | number |

**Returns:** *string | undefined*

___

###  genColor

▸ **genColor**(`i`: number): *any*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:80](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`i` | number |

**Returns:** *any*

___

### `Private` getComponent

▸ **getComponent**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *any*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:74](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *any*

___

###  keyObjectChange

▸ **keyObjectChange**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md), `oldValue`: string, `newValue`: string): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:242](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L242)*

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

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:152](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | any |

**Returns:** *string*

___

###  triggerClick

▸ **triggerClick**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:54](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  triggered

▸ **triggered**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:52](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  updateKey

▸ **updateKey**(`key`: string, `field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:200](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L200)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

## Object literals

### `Private` rules

### ▪ **rules**: *object*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:34](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L34)*

###  required

▸ **required**(`val`: any): *any*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:35](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | any |

**Returns:** *any*

###  valueMax

▸ **valueMax**(`val`: any): *any*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:41](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | any |

**Returns:** *any*

###  valueMin

▸ **valueMin**(`val`: any): *any*

*Defined in [packages/cs-form/src/components/cs-form-field/cs-form-field.ts:36](https://github.com/TNOCS/csnext/blob/34474da7/packages/cs-form/src/components/cs-form-field/cs-form-field.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | any |

**Returns:** *any*
