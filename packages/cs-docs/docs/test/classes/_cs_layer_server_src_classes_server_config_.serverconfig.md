# Class: ServerConfig

Server Configuration File

## Hierarchy

* **ServerConfig**

## Constructors

###  constructor

\+ **new ServerConfig**(`init?`: [ServerConfig](_cs_layer_server_src_classes_server_config_.serverconfig.md)): *[ServerConfig](_cs_layer_server_src_classes_server_config_.serverconfig.md)*

*Defined in [cs-layer-server/src/classes/server-config.ts:18](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/server-config.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`init?` | [ServerConfig](_cs_layer_server_src_classes_server_config_.serverconfig.md) |

**Returns:** *[ServerConfig](_cs_layer_server_src_classes_server_config_.serverconfig.md)*

## Properties

### `Optional` connections

• **connections**? : *object*

*Defined in [cs-layer-server/src/classes/server-config.ts:7](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/server-config.ts#L7)*

list of connections

#### Type declaration:

* \[ **key**: *string*\]: [Connection](_cs_layer_server_src_classes_source_plugin_.connection.md)

___

### `Optional` importPath

• **importPath**? : *string*

*Defined in [cs-layer-server/src/classes/server-config.ts:18](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/server-config.ts#L18)*

relative import folder for layers

___

###  layers

• **layers**: *[LayerDefinition](_cs_layer_server_src_classes_layer_definition_.layerdefinition.md)[]* =  []

*Defined in [cs-layer-server/src/classes/server-config.ts:10](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/server-config.ts#L10)*

List of available layers

___

### `Optional` serverPath

• **serverPath**? : *string*

*Defined in [cs-layer-server/src/classes/server-config.ts:14](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/server-config.ts#L14)*

root folder for this server config

___

### `Optional` serverUrl

• **serverUrl**? : *string*

*Defined in [cs-layer-server/src/classes/server-config.ts:12](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/server-config.ts#L12)*

public url of server endpoint

___

### `Optional` sourcePath

• **sourcePath**? : *string*

*Defined in [cs-layer-server/src/classes/server-config.ts:16](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/classes/server-config.ts#L16)*

relative root folder for sources
