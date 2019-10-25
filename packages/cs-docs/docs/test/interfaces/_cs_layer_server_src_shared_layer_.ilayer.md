# Interface: ILayer

## Hierarchy

* **ILayer**

## Properties

### `Optional` Visible

• **Visible**? : *boolean*

*Defined in [cs-layer-server/src/shared/layer.ts:25](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L25)*

toggle visibility of layer

___

###  color

• **color**: *string*

*Defined in [cs-layer-server/src/shared/layer.ts:11](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L11)*

___

###  description

• **description**: *string*

*Defined in [cs-layer-server/src/shared/layer.ts:12](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L12)*

___

### `Optional` extensions

• **extensions**? : *any[]*

*Defined in [cs-layer-server/src/shared/layer.ts:20](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L20)*

___

### `Optional` featureTypes

• **featureTypes**? : *object*

*Defined in [cs-layer-server/src/shared/layer.ts:36](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L36)*

#### Type declaration:

* \[ **key**: *string*\]: [FeatureType](../classes/_cs_layer_server_src_shared_feature_type_.featuretype.md)

___

### `Optional` filter

• **filter**? : *any*

*Defined in [cs-layer-server/src/shared/layer.ts:21](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L21)*

___

###  id

• **id**: *string*

*Defined in [cs-layer-server/src/shared/layer.ts:5](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L5)*

layer id

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Defined in [cs-layer-server/src/shared/layer.ts:22](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L22)*

___

### `Optional` isLive

• **isLive**? : *boolean*

*Defined in [cs-layer-server/src/shared/layer.ts:23](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L23)*

___

### `Optional` layout

• **layout**? : *SymbolLayout | FillLayout | LineLayout | CircleLayout*

*Defined in [cs-layer-server/src/shared/layer.ts:26](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L26)*

___

### `Optional` opacity

• **opacity**? : *number*

*Defined in [cs-layer-server/src/shared/layer.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L15)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Defined in [cs-layer-server/src/shared/layer.ts:37](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L37)*

___

### `Optional` paint

• **paint**? : *SymbolPaint | LinePaint | FillPaint | CirclePaint*

*Defined in [cs-layer-server/src/shared/layer.ts:31](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L31)*

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [cs-layer-server/src/shared/layer.ts:18](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L18)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Defined in [cs-layer-server/src/shared/layer.ts:14](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L14)*

___

### `Optional` source

• **source**? : *string | [LayerSource](../classes/_cs_layer_server_src_classes_layer_source_.layersource.md)*

*Defined in [cs-layer-server/src/shared/layer.ts:16](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L16)*

___

### `Optional` sourceType

• **sourceType**? : *string*

*Defined in [cs-layer-server/src/shared/layer.ts:10](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L10)*

___

### `Optional` style

• **style**? : *[LayerStyle](../classes/_cs_layer_server_src_classes_layer_style_.layerstyle.md)*

*Defined in [cs-layer-server/src/shared/layer.ts:19](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L19)*

___

###  tags

• **tags**: *string[]*

*Defined in [cs-layer-server/src/shared/layer.ts:9](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L9)*

list of tags, used for clustering in layer selection

___

###  title

• **title**: *string*

*Defined in [cs-layer-server/src/shared/layer.ts:7](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L7)*

layer as shown in interface

___

### `Optional` type

• **type**? : *string*

*Defined in [cs-layer-server/src/shared/layer.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/layer.ts#L17)*
