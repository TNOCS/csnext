# Interface: TableSchema

A Table Schema for this resource, compliant with the [Table Schema](/tableschema/)
specification.

## Hierarchy

* **TableSchema**

## Properties

###  fields

• **fields**: *[TableSchemaField](_cs_data_src_interfaces_tableschema_.tableschemafield.md)[]*

Defined in cs-data/src/interfaces/tableschema.ts:10

An `array` of Table Schema Field objects.

___

### `Optional` foreignKeys

• **foreignKeys**? : *[TableSchemaForeignKey](_cs_data_src_interfaces_tableschema_.tableschemaforeignkey.md)[]*

Defined in cs-data/src/interfaces/tableschema.ts:11

___

### `Optional` missingValues

• **missingValues**? : *string[]*

Defined in cs-data/src/interfaces/tableschema.ts:16

Values that when encountered in the source, should be considered as `null`, 'not
present', or 'blank' values.

___

### `Optional` primaryKey

• **primaryKey**? : *[PrimaryKey](../modules/_cs_data_src_interfaces_tableschema_.md#primarykey)*

Defined in cs-data/src/interfaces/tableschema.ts:21

A primary key is a field name or an array of field names, whose values `MUST` uniquely
identify each row in the table.
