# Interface: DataResource

Data Resource.

## Hierarchy

* **DataResource**

## Properties

### `Optional` bytes

• **bytes**? : *number*

Defined in cs-data/src/interfaces/dataresource.ts:11

The size of this resource in bytes.

___

### `Optional` data

• **data**? : *any*

Defined in cs-data/src/interfaces/dataresource.ts:15

Inline data for this resource.

___

### `Optional` description

• **description**? : *string*

Defined in cs-data/src/interfaces/dataresource.ts:19

A text description. Markdown is encouraged.

___

### `Optional` encoding

• **encoding**? : *string*

Defined in cs-data/src/interfaces/dataresource.ts:23

The file encoding of this resource.

___

### `Optional` format

• **format**? : *string*

Defined in cs-data/src/interfaces/dataresource.ts:27

The file format of this resource.

___

### `Optional` hash

• **hash**? : *string*

Defined in cs-data/src/interfaces/dataresource.ts:32

The MD5 hash of this resource. Indicate other hashing algorithms with the
{algorithm}:{hash} format.

___

### `Optional` homepage

• **homepage**? : *string*

Defined in cs-data/src/interfaces/dataresource.ts:36

The home on the web that is related to this data package.

___

### `Optional` licenses

• **licenses**? : *[License](_cs_data_src_interfaces_dataresource_.license.md)[]*

Defined in cs-data/src/interfaces/dataresource.ts:40

The license(s) under which the resource is published.

___

### `Optional` mediatype

• **mediatype**? : *string*

Defined in cs-data/src/interfaces/dataresource.ts:45

The media type of this resource. Can be any valid media type listed with
[IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).

___

###  name

• **name**: *string*

Defined in cs-data/src/interfaces/dataresource.ts:49

An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.

___

### `Optional` path

• **path**? : *[Path](../modules/_cs_data_src_interfaces_dataresource_.md#path)*

Defined in cs-data/src/interfaces/dataresource.ts:54

A reference to the data for this resource, as either a path as a string, or an array of
paths as strings. of valid URIs.

___

### `Optional` profile

• **profile**? : *string*

Defined in cs-data/src/interfaces/dataresource.ts:58

The profile of this descriptor.

___

### `Optional` schema

• **schema**? : *[TableSchema](_cs_data_src_interfaces_tableschema_.tableschema.md)*

Defined in cs-data/src/interfaces/dataresource.ts:62

A schema for this resource.

___

### `Optional` sources

• **sources**? : *[Source](_cs_data_src_interfaces_dataresource_.source.md)[]*

Defined in cs-data/src/interfaces/dataresource.ts:66

The raw sources for this resource.

___

### `Optional` title

• **title**? : *string*

Defined in cs-data/src/interfaces/dataresource.ts:70

A human-readable title.
