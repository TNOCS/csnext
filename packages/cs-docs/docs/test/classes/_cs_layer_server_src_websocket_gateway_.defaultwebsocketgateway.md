# Class: DefaultWebSocketGateway

## Hierarchy

* **DefaultWebSocketGateway**

## Implements

* any
* any
* any

## Constructors

###  constructor

\+ **new DefaultWebSocketGateway**(): *[DefaultWebSocketGateway](_cs_layer_server_src_websocket_gateway_.defaultwebsocketgateway.md)*

*Defined in [cs-layer-server/src/websocket-gateway.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/websocket-gateway.ts#L15)*

**Returns:** *[DefaultWebSocketGateway](_cs_layer_server_src_websocket_gateway_.defaultwebsocketgateway.md)*

## Properties

###  server

• **server**: *any*

*Defined in [cs-layer-server/src/websocket-gateway.ts:20](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/websocket-gateway.ts#L20)*

___

###  wsClients

• **wsClients**: *Client[]* =  []

*Defined in [cs-layer-server/src/websocket-gateway.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/websocket-gateway.ts#L21)*

## Methods

###  afterInit

▸ **afterInit**(): *void*

*Defined in [cs-layer-server/src/websocket-gateway.ts:22](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/websocket-gateway.ts#L22)*

**Returns:** *void*

___

###  handleConnection

▸ **handleConnection**(`client`: Client): *void*

*Defined in [cs-layer-server/src/websocket-gateway.ts:27](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/websocket-gateway.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |

**Returns:** *void*

___

###  handleDisconnect

▸ **handleDisconnect**(`client`: any): *void*

*Defined in [cs-layer-server/src/websocket-gateway.ts:32](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/websocket-gateway.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`client` | any |

**Returns:** *void*

___

###  onChgEvent

▸ **onChgEvent**(`client`: any, `payload`: any): *void*

*Defined in [cs-layer-server/src/websocket-gateway.ts:49](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/websocket-gateway.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`client` | any |
`payload` | any |

**Returns:** *void*
