# Interface: DataResource

Data Resource.

## Hierarchy

* **DataResource**

## Properties

### `Optional` bytes

• **bytes**? : *number*

Defined in cs-data/src/interfaces/datapackage.ts:123

The size of this resource in bytes.

___

### `Optional` data

• **data**? : *[DataSource](../classes/_cs_data_src_classes_data_source_.datasource.md)*

Defined in cs-data/src/interfaces/datapackage.ts:127

Inline data for this resource.

___

### `Optional` description

• **description**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:131

A text description. Markdown is encouraged.

___

### `Optional` encoding

• **encoding**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:135

The file encoding of this resource.

___

### `Optional` format

• **format**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:139

The file format of this resource.

___

### `Optional` hash

• **hash**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:144

The MD5 hash of this resource. Indicate other hashing algorithms with the
{algorithm}:{hash} format.

___

### `Optional` homepage

• **homepage**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:148

The home on the web that is related to this data package.

___

### `Optional` licenses

• **licenses**? : *[DataResourceLicense](_cs_data_src_interfaces_datapackage_.dataresourcelicense.md)[]*

Defined in cs-data/src/interfaces/datapackage.ts:152

The license(s) under which the resource is published.

___

### `Optional` mediatype

• **mediatype**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:157

The media type of this resource. Can be any valid media type listed with
[IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).

___

###  name

• **name**: *string*

Defined in cs-data/src/interfaces/datapackage.ts:161

An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.

___

### `Optional` organisation

• **organisation**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:188

Organisation provinding the data

___

### `Optional` path

• **path**? : *[Path](../modules/_cs_data_src_interfaces_datapackage_.md#path)*

Defined in cs-data/src/interfaces/datapackage.ts:166

A reference to the data for this resource, as either a path as a string, or an array of
paths as strings. of valid URIs.

___

### `Optional` profile

• **profile**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:170

The profile of this descriptor.

___

### `Optional` schema

• **schema**? : *[TableSchema](_cs_data_src_interfaces_tableschema_.tableschema.md)*

Defined in cs-data/src/interfaces/datapackage.ts:174

A schema for this resource.

___

### `Optional` sources

• **sources**? : *[DataResourceSource](_cs_data_src_interfaces_datapackage_.dataresourcesource.md)[]*

Defined in cs-data/src/interfaces/datapackage.ts:180

The raw sources for this resource.

___

### `Optional` style

• **style**? : *any*

Defined in cs-data/src/interfaces/datapackage.ts:176

___

### `Optional` title

• **title**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:184

A human-readable title.
