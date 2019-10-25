# Class: CsForm

## Hierarchy

* any

  ↳ **CsForm**

## Properties

### `Optional` data

• **data**? : *[IFormObject](../interfaces/_cs_core_src_form_form_decorators_.iformobject.md)*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:42](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L42)*

___

### `Optional` field

• **field**? : *string*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:48](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L48)*

specify a single field to show, others are hidden

___

###  fieldGroups

• **fieldGroups**: *[FieldGroup](_cs_form_src_components_cs_form_cs_form_.fieldgroup.md)[]* =  []

*Defined in [cs-form/src/components/cs-form/cs-form.ts:40](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L40)*

___

### `Optional` formdef

• **formdef**? : *[IFormOptions](../interfaces/_cs_core_src_form_form_decorators_.iformoptions.md)*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:44](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L44)*

___

### `Optional` formkey

• **formkey**? : *string*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:43](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L43)*

___

###  initalized

• **initalized**: *boolean* = false

*Defined in [cs-form/src/components/cs-form/cs-form.ts:36](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L36)*

___

###  keys

• **keys**: *object*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:46](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L46)*

#### Type declaration:

* \[ **key**: *string*\]: [IFormObject](../interfaces/_cs_core_src_form_form_decorators_.iformobject.md)

___

###  minimize

• **minimize**: *boolean* = false

*Defined in [cs-form/src/components/cs-form/cs-form.ts:37](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L37)*

___

###  panel

• **panel**: *number[]* =  [0]

*Defined in [cs-form/src/components/cs-form/cs-form.ts:45](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L45)*

___

###  showFilterMenu

• **showFilterMenu**: *boolean* = false

*Defined in [cs-form/src/components/cs-form/cs-form.ts:39](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L39)*

___

###  showMenu

• **showMenu**: *boolean* = false

*Defined in [cs-form/src/components/cs-form/cs-form.ts:38](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L38)*

___

###  sortedFieldGroups

• **sortedFieldGroups**: *[FieldGroup](_cs_form_src_components_cs_form_cs_form_.fieldgroup.md)[]* =  []

*Defined in [cs-form/src/components/cs-form/cs-form.ts:41](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L41)*

___

###  timeline

• **timeline**: *any*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:35](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L35)*

access the original widget from configuration

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:77](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L77)*

## Accessors

###  Form

• **get Form**(): *[IFormOptions](../interfaces/_cs_core_src_form_form_decorators_.iformoptions.md)*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:236](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L236)*

**Returns:** *[IFormOptions](../interfaces/_cs_core_src_form_form_decorators_.iformoptions.md)*

___

###  Target

• **get Target**(): *any*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:232](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L232)*

**Returns:** *any*

___

###  formObject

• **get formObject**(): *[IFormObject](../interfaces/_cs_core_src_form_form_decorators_.iformobject.md) | undefined*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:54](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L54)*

**Returns:** *[IFormObject](../interfaces/_cs_core_src_form_form_decorators_.iformobject.md) | undefined*

• **set formObject**(`obj`: [IFormObject](../interfaces/_cs_core_src_form_form_decorators_.iformobject.md) | undefined): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:62](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | [IFormObject](../interfaces/_cs_core_src_form_form_decorators_.iformobject.md) &#124; undefined |

**Returns:** *void*

## Methods

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:246](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L246)*

**Returns:** *void*

___

###  closeForm

▸ **closeForm**(): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:92](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L92)*

**Returns:** *void*

___

###  fieldChanged

▸ **fieldChanged**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:193](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  fieldTriggered

▸ **fieldTriggered**(`field`: [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md)): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:187](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L187)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [IFormFieldOptions](../interfaces/_cs_core_src_form_form_decorators_.iformfieldoptions.md) |

**Returns:** *void*

___

###  init

▸ **init**(): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:252](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L252)*

**Returns:** *void*

___

###  initGroups

▸ **initGroups**(): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:98](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L98)*

**Returns:** *void*

___

###  isKeyValueList

▸ **isKeyValueList**(): *boolean*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:50](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L50)*

**Returns:** *boolean*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:257](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L257)*

**Returns:** *void*

___

###  saveForm

▸ **saveForm**(): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:79](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L79)*

**Returns:** *void*

___

###  sortFieldGroups

▸ **sortFieldGroups**(): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:212](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L212)*

**Returns:** *void*

___

###  updateAllGroupVisbility

▸ **updateAllGroupVisbility**(): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:224](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L224)*

**Returns:** *void*

___

###  updateGroupVisibility

▸ **updateGroupVisibility**(`group`: [FieldGroup](_cs_form_src_components_cs_form_cs_form_.fieldgroup.md)): *void*

*Defined in [cs-form/src/components/cs-form/cs-form.ts:197](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-form/src/components/cs-form/cs-form.ts#L197)*

**Parameters:**

Name | Type |
------ | ------ |
`group` | [FieldGroup](_cs_form_src_components_cs_form_cs_form_.fieldgroup.md) |

**Returns:** *void*
