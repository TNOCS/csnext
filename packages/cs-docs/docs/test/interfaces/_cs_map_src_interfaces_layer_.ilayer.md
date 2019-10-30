# Interface: ILayer

## Hierarchy

* **ILayer**

## Properties

### `Optional` Visible

• **Visible**? : *boolean*

*Defined in [cs-map/src/interfaces/layer.ts:26](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L26)*

toggle visibility of layer

___

###  color

• **color**: *string*

*Defined in [cs-map/src/interfaces/layer.ts:11](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L11)*

___

###  description

• **description**: *string*

*Defined in [cs-map/src/interfaces/layer.ts:12](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L12)*

___

### `Optional` extensions

• **extensions**? : *[ILayerExtensionType](_cs_map_src_classes_ilayer_extension_.ilayerextensiontype.md)[]*

*Defined in [cs-map/src/interfaces/layer.ts:19](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L19)*

___

### `Optional` externalUrl

• **externalUrl**? : *string*

*Defined in [cs-map/src/interfaces/layer.ts:22](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L22)*

___

### `Optional` featureTypes

• **featureTypes**? : *object*

*Defined in [cs-map/src/interfaces/layer.ts:29](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L29)*

#### Type declaration:

* \[ **key**: *string*\]: [FeatureType](../classes/_cs_map_src_classes_feature_type_.featuretype.md)

___

### `Optional` filter

• **filter**? : *any*

*Defined in [cs-map/src/interfaces/layer.ts:20](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L20)*

___

###  id

• **id**: *string*

*Defined in [cs-map/src/interfaces/layer.ts:5](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L5)*

layer id

___

### `Optional` isEditable

• **isEditable**? : *boolean*

*Defined in [cs-map/src/interfaces/layer.ts:23](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L23)*

___

### `Optional` isLive

• **isLive**? : *boolean*

*Defined in [cs-map/src/interfaces/layer.ts:24](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L24)*

___

### `Optional` layout

• **layout**? : *SymbolLayout | FillLayout | LineLayout | CircleLayout*

*Defined in [cs-map/src/interfaces/layer.ts:27](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L27)*

___

### `Optional` opacity

• **opacity**? : *number*

*Defined in [cs-map/src/interfaces/layer.ts:14](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L14)*

___

### `Optional` openFeatureDetails

• **openFeatureDetails**? : *boolean*

*Defined in [cs-map/src/interfaces/layer.ts:30](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L30)*

___

### `Optional` paint

• **paint**? : *SymbolPaint | LinePaint | FillPaint | CirclePaint*

*Defined in [cs-map/src/interfaces/layer.ts:28](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L28)*

___

### `Optional` parentId

• **parentId**? : *string*

*Defined in [cs-map/src/interfaces/layer.ts:17](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L17)*

___

### `Optional` popupContent

• **popupContent**? : *string | Function | undefined*

*Defined in [cs-map/src/interfaces/layer.ts:13](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L13)*

___

### `Optional` source

• **source**? : *string | [LayerSource](../classes/_cs_map_src_classes_layer_source_.layersource.md)*

*Defined in [cs-map/src/interfaces/layer.ts:15](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L15)*

___

### `Optional` sourceType

• **sourceType**? : *string*

*Defined in [cs-map/src/interfaces/layer.ts:10](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L10)*

___

### `Optional` style

• **style**? : *[LayerStyle](../classes/_cs_map_src_classes_layer_style_.layerstyle.md)*

*Defined in [cs-map/src/interfaces/layer.ts:18](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L18)*

___

###  tags

• **tags**: *string[]*

*Defined in [cs-map/src/interfaces/layer.ts:9](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L9)*

list of tags, used for clustering in layer selection

___

###  title

• **title**: *string*

*Defined in [cs-map/src/interfaces/layer.ts:7](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L7)*

layer as shown in interface

___

### `Optional` type

• **type**? : *string*

*Defined in [cs-map/src/interfaces/layer.ts:16](https://github.com/RichardHovenkamp/csnext/blob/d817caa/packages/cs-map/src/interfaces/layer.ts#L16)*
