# Interface: TableSchemaField

The field contains strings, that is, sequences of characters.

The field contains numbers of any kind including decimals.

The field contains integers - that is whole numbers.

The field contains temporal date values.

The field contains temporal time values.

The field contains temporal datetime values.

A calendar year, being an integer with 4 digits. Equivalent to [gYear in XML
Schema](https://www.w3.org/TR/xmlschema-2/#gYear)

A calendar year month, being an integer with 1 or 2 digits. Equivalent to [gYearMonth in
XML Schema](https://www.w3.org/TR/xmlschema-2/#gYearMonth)

The field contains boolean (true/false) data.

The field contains data which can be parsed as a valid JSON object.

The field contains data describing a geographic point.

The field contains a JSON object according to GeoJSON or TopoJSON

The field contains data which can be parsed as a valid JSON array.

The field contains a duration of time.

Any value is accepted, including values that are not captured by the
type/format/constraint requirements of the specification.

## Hierarchy

* **TableSchemaField**

## Properties

### `Optional` bareNumber

• **bareNumber**? : *boolean*

Defined in cs-data/src/interfaces/tableschema.ts:189

a boolean field with a default of `true`. If `true` the physical contents of this field
must follow the formatting constraints already set out. If `false` the contents of this
field may contain leading and/or trailing non-numeric characters (which implementors MUST
therefore strip). The purpose of `bareNumber` is to allow publishers to publish numeric
data that contains trailing characters such as percentages e.g. `95%` or leading
characters such as currencies e.g. `€95` or `EUR 95`. Note that it is entirely up to
implementors what, if anything, they do with stripped text.

___

### `Optional` constraints

• **constraints**? : *[Constraints](_cs_data_src_interfaces_tableschema_.constraints.md)*

Defined in cs-data/src/interfaces/tableschema.ts:90

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

___

### `Optional` decimalChar

• **decimalChar**? : *string*

Defined in cs-data/src/interfaces/tableschema.ts:194

A string whose value is used to represent a decimal point within the number. The default
value is `.`.

___

### `Optional` decimals

• **decimals**? : *Number*

Defined in cs-data/src/interfaces/tableschema.ts:143

number of decimals

___

### `Optional` description

• **description**? : *string*

Defined in cs-data/src/interfaces/tableschema.ts:94

A text description. Markdown is encouraged.

___

### `Optional` falseValues

• **falseValues**? : *string[]*

Defined in cs-data/src/interfaces/tableschema.ts:200

___

### `Optional` format

• **format**? : *any*

Defined in cs-data/src/interfaces/tableschema.ts:123

The format keyword options for `string` are `default`, `email`, `uri`, `binary`, and
`uuid`.

There are no format keyword options for `number`: only `default` is allowed.

There are no format keyword options for `integer`: only `default` is allowed.

The format keyword options for `date` are `default`, `any`, and `{PATTERN}`.

The format keyword options for `time` are `default`, `any`, and `{PATTERN}`.

The format keyword options for `datetime` are `default`, `any`, and `{PATTERN}`.

There are no format keyword options for `year`: only `default` is allowed.

There are no format keyword options for `yearmonth`: only `default` is allowed.

There are no format keyword options for `object`: only `default` is allowed.

The format keyword options for `geopoint` are `default`,`array`, and `object`.

The format keyword options for `geojson` are `default` and `topojson`.

There are no format keyword options for `array`: only `default` is allowed.

There are no format keyword options for `duration`: only `default` is allowed.

___

### `Optional` group

• **group**? : *string*

Defined in cs-data/src/interfaces/tableschema.ts:147

A human-readable group name

___

### `Optional` groupChar

• **groupChar**? : *string*

Defined in cs-data/src/interfaces/tableschema.ts:199

A string whose value is used to group digits within the number. The default value is
`null`. A common value is `,` e.g. '100,000'.

___

###  name

• **name**: *string*

Defined in cs-data/src/interfaces/tableschema.ts:127

A name for this field.

___

### `Optional` rdfType

• **rdfType**? : *string*

Defined in cs-data/src/interfaces/tableschema.ts:131

The RDF type for this field.

___

### `Optional` title

• **title**? : *string*

Defined in cs-data/src/interfaces/tableschema.ts:135

A human-readable title.

___

### `Optional` trueValues

• **trueValues**? : *string[]*

Defined in cs-data/src/interfaces/tableschema.ts:201

___

### `Optional` type

• **type**? : *[Type](../enums/_cs_data_src_interfaces_tableschema_.type.md)*

Defined in cs-data/src/interfaces/tableschema.ts:179

The type keyword, which `MUST` be a value of `string`.

The type keyword, which `MUST` be a value of `number`.

The type keyword, which `MUST` be a value of `integer`.

The type keyword, which `MUST` be a value of `date`.

The type keyword, which `MUST` be a value of `time`.

The type keyword, which `MUST` be a value of `datetime`.

The type keyword, which `MUST` be a value of `year`.

The type keyword, which `MUST` be a value of `yearmonth`.

The type keyword, which `MUST` be a value of `boolean`.

The type keyword, which `MUST` be a value of `object`.

The type keyword, which `MUST` be a value of `geopoint`.

The type keyword, which `MUST` be a value of `geojson`.

The type keyword, which `MUST` be a value of `array`.

The type keyword, which `MUST` be a value of `duration`.

The type keyword, which `MUST` be a value of `any`.

___

### `Optional` unit

• **unit**? : *string*

Defined in cs-data/src/interfaces/tableschema.ts:139

 Unit field
