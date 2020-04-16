# Interface: DataPackage

Data Package is a simple specification for data access and delivery.

## Hierarchy

* **DataPackage**

## Properties

### `Optional` contributors

• **contributors**? : *[Contributor](../modules/_cs_data_src_interfaces_datapackage_.md#contributor)[]*

Defined in cs-data/src/interfaces/datapackage.ts:11

The contributors to this descriptor.

___

### `Optional` created

• **created**? : *Date*

Defined in cs-data/src/interfaces/datapackage.ts:15

The datetime on which this descriptor was created.

___

### `Optional` description

• **description**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:19

A text description. Markdown is encouraged.

___

### `Optional` homepage

• **homepage**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:23

The home on the web that is related to this data package.

___

### `Optional` id

• **id**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:28

A property reserved for globally unique identifiers. Examples of identifiers that are
unique include UUIDs and DOIs.

___

### `Optional` image

• **image**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:32

A image to represent this package.

___

### `Optional` insights

• **insights**? : *[Insight](_cs_data_src_interfaces_insight_.insight.md)[]*

Defined in cs-data/src/interfaces/datapackage.ts:62

___

### `Optional` keywords

• **keywords**? : *string[]*

Defined in cs-data/src/interfaces/datapackage.ts:36

A list of keywords that describe this package.

___

### `Optional` licenses

• **licenses**? : *[DataPackageLicense](_cs_data_src_interfaces_datapackage_.datapackagelicense.md)[]*

Defined in cs-data/src/interfaces/datapackage.ts:40

The license(s) under which this package is published.

___

### `Optional` name

• **name**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:44

An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.

___

### `Optional` profile

• **profile**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:48

The profile of this descriptor.

___

###  resources

• **resources**: *[DataResource](_cs_data_src_interfaces_datapackage_.dataresource.md)[]*

Defined in cs-data/src/interfaces/datapackage.ts:53

An `array` of Data Resource objects, each compliant with the [Data
Resource](/data-resource/) specification.

___

### `Optional` sources

• **sources**? : *[DataPackageSource](_cs_data_src_interfaces_datapackage_.datapackagesource.md)[]*

Defined in cs-data/src/interfaces/datapackage.ts:57

The raw sources for this resource.

___

### `Optional` title

• **title**? : *string*

Defined in cs-data/src/interfaces/datapackage.ts:61

A human-readable title.
