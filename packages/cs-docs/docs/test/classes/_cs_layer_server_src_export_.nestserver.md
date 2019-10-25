# Class: NestServer

## Hierarchy

* **NestServer**

## Properties

###  app

• **app**: *NestExpressApplication*

*Defined in [cs-layer-server/src/export.ts:41](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/export.ts#L41)*

___

### `Optional` config

• **config**? : *[ServerConfig](_cs_layer_server_src_export_.serverconfig.md)*

*Defined in [cs-layer-server/src/export.ts:43](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/export.ts#L43)*

___

###  swaggerConfig

• **swaggerConfig**: *SwaggerBaseConfig*

*Defined in [cs-layer-server/src/export.ts:42](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/export.ts#L42)*

## Methods

###  bootstrap

▸ **bootstrap**(`moduleType`: any, `title`: string, `host?`: string, `port?`: number, `external?`: string, `swaggerConfig?`: SwaggerBaseConfig): *Promise‹boolean›*

*Defined in [cs-layer-server/src/export.ts:45](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/export.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`moduleType` | any |
`title` | string |
`host?` | string |
`port?` | number |
`external?` | string |
`swaggerConfig?` | SwaggerBaseConfig |

**Returns:** *Promise‹boolean›*
