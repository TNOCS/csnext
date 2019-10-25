# External module: "cs-layer-server/src/shared/mapbox-styles"

## Object literals

### `Const` CirclePaintForm

### ▪ **CirclePaintForm**: *object*

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:62](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L62)*

###  fields

• **fields**: *object | object | object | object | object[]* =  [
        {
            _key: 'circle-color',
            type: 'object',
            form: MapboxColorForm,
            title: 'color',
            group: 'circle-color'
        },
        {
            _key: 'circle-opacity',
            type: 'number',
            title: 'opacity',
            min: 0,
            max: 1,
            group: 'circle-opacity'
        },
        {
            _key: 'circle-radius',
            type: 'number',
            min: 0,
            defaultValue: 10,
            title: 'radius',
            group: 'circle-opacity'
        },
        {
            _key: 'circle-stroke-width',
            type: 'number',
            min: 0,
            defaultValue: 1,
            title: 'stroke width',
            group: 'circle-stroke'
        },
        {
            _key: 'circle-stroke-color',
            type: 'string',
            defaultValue: '#000000',
            title: 'stroke color',
            group: 'circle-stroke'
        },
        {
            _key: 'circle-stroke-opacity',
            type: 'number',
            min: 0,
            max: 1,
            defaultValue: 1,
            title: 'stroke opacity',
            group: 'circle-stroke'
        }
    ]

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:65](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L65)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:64](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L64)*

###  title

• **title**: *string* = "Circle Layout"

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:63](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L63)*

___

### `Const` LineLayoutForm

### ▪ **LineLayoutForm**: *object*

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:116](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L116)*

###  fields

• **fields**: *object[]* =  [
        {
            _key: 'line-cap',
            type: 'selection',
            title: 'cap',
            options: ['butt', 'round', 'square'],
            defaultValue: 'butt'
        },
        {
            _key: 'line-join',
            type: 'selection',
            title: 'join',
            options: ['bevel', 'round', 'miter'],
            defaultValue: 'miter'
        },
        {
            _key: 'visibility',
            type: 'selection',
            title: 'visibility',
            options: ['visible', 'none'],
            defaultValue: 'visible'
        }
    ]

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:119](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L119)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:118](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L118)*

###  title

• **title**: *string* = "Line Layout"

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:117](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L117)*

___

### `Const` LinePaintForm

### ▪ **LinePaintForm**: *object*

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:144](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L144)*

###  fields

• **fields**: *object | object | object[]* =  [
        {
            _key: 'line-color',
            type: 'string',
            title: 'color',
            group: 'line-color'
        },
        {
            _key: 'line-opacity',
            type: 'number',
            min: 0,
            max: 1,
            defaultValue: 1,
            title: 'opacity',
            group: 'line-color'
        },
        {
            _key: 'line-width',
            type: 'number',
            title: 'width',
            group: 'line-width'
        },
        {
            _key: 'line-blur',
            type: 'number',
            title: 'blur',
            min: 0,
            group: 'line-width'
        }
    ]

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:147](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L147)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:146](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L146)*

###  title

• **title**: *string* = "Line Paint"

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:145](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L145)*

___

### `Const` MapboxColorForm

### ▪ **MapboxColorForm**: *object*

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:44](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L44)*

###  fields

• **fields**: *object | object[]* =  [
        {
            _key: 'property',
            type: 'string',
            title: 'property'
        },
        {
            _key: 'stops',
            type: 'array',
            title: 'color',
            arrayType: MapboxStopForm
        }
    ]

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:47](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L47)*

###  isPanel

• **isPanel**: *boolean* = false

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:46](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L46)*

###  title

• **title**: *string* = "Color"

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:45](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L45)*

___

### `Const` MapboxStopForm

### ▪ **MapboxStopForm**: *object*

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:26](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L26)*

###  fields

• **fields**: *object[]* =  [
        {
            _index: 0,
            type: 'number',
            title: 'value',
            group: 'stop'
        },
        {
            _index: 1,
            type: 'string',
            title: 'color',
            group: 'stop'
        }
    ]

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:28](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L28)*

###  title

• **title**: *string* = "Stop"

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:27](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L27)*

___

### `Const` SymbolLayoutForm

### ▪ **SymbolLayoutForm**: *object*

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:179](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L179)*

###  fields

• **fields**: *object | object | object | object | object[]* =  [
        {
            _key: 'icon-allow-overlap',
            type: 'checkbox',
            title: 'icon allow overlap',
            group: 'overlap'
        },
        {
            _key: 'text-allow-overlap',
            type: 'checkbox',
            title: 'text allow overlap',
            group: 'overlap'
        },
        {
            _key: 'icon-ignore-placement',
            type: 'checkbox',
            title: 'icon ignore placement',
            group: 'placement'
        },
        {
            _key: 'text-ignore-placement',
            type: 'checkbox',
            title: 'text ignore placement',
            group: 'placement'
        },
        {
            _key: 'icon-rotation-alignment',
            type: 'selection',
            title: 'icon rotation alignment',
            options: ['auto', 'map', 'viewport'],
            defaultValue: 'auto'
        },
        {
            _key: 'icon-size',
            type: 'number',
            title: 'icon size',
            group: 'icon'
        },
        {
            _key: 'icon-optional',
            type: 'checkbox',
            title: 'icon optional',
            group: 'icon'
        },
        {
            _key: 'icon-text-fit',
            type: 'selection',
            title: 'icon text fit',
            options: ['none', 'width', 'height', 'both'],
            defaultValue: 'none',
            group: 'text'
        },
        {
            _key: 'text-size',
            type: 'number',
            title: 'text size',
            group: 'text-size'
        },
        {
            _key: 'text-max-width',
            type: 'number',
            title: 'text max width',
            group: 'text-size',
            defaultValue: 10
        },
        {
            _key: 'text-line-height',
            type: 'number',
            title: 'text line height',
            defaultValue: 1.2,
            group: 'text-size'
        },
        {
            _key: 'icon-rotate',
            type: 'number',
            title: 'icon rotate',
            group: 'icon-padding'
        },
        {
            _key: 'icon-padding',
            type: 'number',
            title: 'icon padding',
            group: 'icon-padding'
        },
        {
            _key: 'icon-anchor',
            type: 'selection',
            title: 'icon anchor',
            options: [
                'center',
                'left',
                'right',
                'top',
                'bottom',
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right'
            ],
            group: 'icon-padding'
        }
    ]

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:182](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L182)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:181](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L181)*

###  title

• **title**: *string* = "Symbol Layout"

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:180](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L180)*

___

### `Const` SymbolPaintForm

### ▪ **SymbolPaintForm**: *object*

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:286](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L286)*

###  fields

• **fields**: *object | object[]* =  [
        {
            _key: 'icon-color',
            type: 'string',
            defaultValue: '#000000',
            title: 'icon color',
            group: 'color'
        },
        {
            _key: 'icon-opacity',
            type: 'number',
            title: 'icon opacity',
            group: 'color'
        },
        {
            _key: 'icon-halo-color',
            type: 'string',
            title: 'icon halo color',
            group: 'halo'
        },
        {
            _key: 'icon-halo-width',
            type: 'number',
            title: 'icon halo width',
            group: 'halo'
        },
        {
            _key: 'text-color',
            type: 'string',
            title: 'text color',
            defaultValue: '#000000',
            group: 'color'
        },
        {
            _key: 'text-opacity',
            type: 'number',
            title: 'text opacity',
            group: 'text'
        }
    ]

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:289](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L289)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:288](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L288)*

###  title

• **title**: *string* = "Symbol Paint"

*Defined in [cs-layer-server/src/shared/mapbox-styles.ts:287](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-layer-server/src/shared/mapbox-styles.ts#L287)*
