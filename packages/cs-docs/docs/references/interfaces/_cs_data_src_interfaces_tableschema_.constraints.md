# Interface: Constraints

The following constraints are supported for `string` fields.

The following constraints are supported for `number` fields.

The following constraints are supported for `integer` fields.

The following constraints are supported for `date` fields.

The following constraints are supported for `time` fields.

The following constraints are supported for `datetime` fields.

The following constraints are supported for `year` fields.

The following constraints are supported for `yearmonth` fields.

The following constraints are supported for `boolean` fields.

The following constraints apply for `object` fields.

The following constraints are supported for `geopoint` fields.

The following constraints are supported for `geojson` fields.

The following constraints apply for `array` fields.

The following constraints are supported for `duration` fields.

The following constraints apply to `any` fields.

## Hierarchy

* **Constraints**

## Properties

### `Optional` enum

• **enum**? : *any[]*

Defined in cs-data/src/interfaces/tableschema.ts:236

___

### `Optional` maxLength

• **maxLength**? : *number*

Defined in cs-data/src/interfaces/tableschema.ts:240

An integer that specifies the maximum length of a value.

___

### `Optional` maximum

• **maximum**? : *[Imum](../modules/_cs_data_src_interfaces_tableschema_.md#imum)*

Defined in cs-data/src/interfaces/tableschema.ts:258

___

### `Optional` minLength

• **minLength**? : *number*

Defined in cs-data/src/interfaces/tableschema.ts:244

An integer that specifies the minimum length of a value.

___

### `Optional` minimum

• **minimum**? : *[Imum](../modules/_cs_data_src_interfaces_tableschema_.md#imum)*

Defined in cs-data/src/interfaces/tableschema.ts:259

___

### `Optional` pattern

• **pattern**? : *string*

Defined in cs-data/src/interfaces/tableschema.ts:249

A regular expression pattern to test each value of the property against, where a truthy
response indicates validity.

___

### `Optional` required

• **required**? : *boolean*

Defined in cs-data/src/interfaces/tableschema.ts:253

Indicates whether a property must have a value for each instance.

___

### `Optional` unique

• **unique**? : *boolean*

Defined in cs-data/src/interfaces/tableschema.ts:257

When `true`, each value for the property `MUST` be unique.
