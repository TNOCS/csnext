# External module: "cs-map/src/classes/layer-style"

## Object literals

### `Const` CirclePaintForm

### ▪ **CirclePaintForm**: *object*

*Defined in [cs-map/src/classes/layer-style.ts:68](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L68)*

###  fields

• **fields**: *object | object | object | object | object[]* =  [
        {
            _key: 'circle-color',
            type: 'string',            
            title: 'color',
            group: 'circle-color'
        },
        {
            _key: 'circle-opacity',
            type: 'number',
            title: 'opacity',
            min: 0,
            max: 1,
            group: 'circle-color'
        },
        {
            _key: 'circle-radius',
            type: 'number',
            min: 0,
            defaultValue: 10,
            title: 'radius',
            group: 'circle-color'
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
            defaultValue: "#000000",
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

*Defined in [cs-map/src/classes/layer-style.ts:71](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L71)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-map/src/classes/layer-style.ts:70](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L70)*

###  title

• **title**: *string* = "Circle Layout"

*Defined in [cs-map/src/classes/layer-style.ts:69](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L69)*

___

### `Const` FillPaintForm

### ▪ **FillPaintForm**: *object*

*Defined in [cs-map/src/classes/layer-style.ts:187](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L187)*

###  fields

• **fields**: *object | object[]* =  [
        {
            _key: 'fill-color',
            type: 'string',
            title: 'color',
            group: 'fill-color'
        },
        {
            _key: 'fill-opacity',
            type: 'number',
            min: 0,
            max: 1,
            defaultValue: 1,
            title: 'opacity',
            group: 'fill-color'
        },
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
            group: 'line-color'
        }        
    ]

*Defined in [cs-map/src/classes/layer-style.ts:190](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L190)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-map/src/classes/layer-style.ts:189](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L189)*

###  title

• **title**: *string* = "Fill Paint"

*Defined in [cs-map/src/classes/layer-style.ts:188](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L188)*

___

### `Const` LineLayoutForm

### ▪ **LineLayoutForm**: *object*

*Defined in [cs-map/src/classes/layer-style.ts:122](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L122)*

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

*Defined in [cs-map/src/classes/layer-style.ts:125](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L125)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-map/src/classes/layer-style.ts:124](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L124)*

###  title

• **title**: *string* = "Line Layout"

*Defined in [cs-map/src/classes/layer-style.ts:123](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L123)*

___

### `Const` LinePaintForm

### ▪ **LinePaintForm**: *object*

*Defined in [cs-map/src/classes/layer-style.ts:151](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L151)*

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

*Defined in [cs-map/src/classes/layer-style.ts:154](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L154)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-map/src/classes/layer-style.ts:153](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L153)*

###  title

• **title**: *string* = "Line Paint"

*Defined in [cs-map/src/classes/layer-style.ts:152](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L152)*

___

### `Const` MapboxColorForm

### ▪ **MapboxColorForm**: *object*

*Defined in [cs-map/src/classes/layer-style.ts:50](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L50)*

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

*Defined in [cs-map/src/classes/layer-style.ts:53](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L53)*

###  isPanel

• **isPanel**: *boolean* = false

*Defined in [cs-map/src/classes/layer-style.ts:52](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L52)*

###  title

• **title**: *string* = "Color"

*Defined in [cs-map/src/classes/layer-style.ts:51](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L51)*

___

### `Const` MapboxStopForm

### ▪ **MapboxStopForm**: *object*

*Defined in [cs-map/src/classes/layer-style.ts:32](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L32)*

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

*Defined in [cs-map/src/classes/layer-style.ts:34](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L34)*

###  title

• **title**: *string* = "Stop"

*Defined in [cs-map/src/classes/layer-style.ts:33](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L33)*

___

### `Const` SymbolLayoutForm

### ▪ **SymbolLayoutForm**: *object*

*Defined in [cs-map/src/classes/layer-style.ts:230](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L230)*

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

*Defined in [cs-map/src/classes/layer-style.ts:233](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L233)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-map/src/classes/layer-style.ts:232](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L232)*

###  title

• **title**: *string* = "Symbol Layout"

*Defined in [cs-map/src/classes/layer-style.ts:231](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L231)*

___

### `Const` SymbolPaintForm

### ▪ **SymbolPaintForm**: *object*

*Defined in [cs-map/src/classes/layer-style.ts:337](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L337)*

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

*Defined in [cs-map/src/classes/layer-style.ts:340](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L340)*

###  isPanel

• **isPanel**: *boolean* = true

*Defined in [cs-map/src/classes/layer-style.ts:339](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L339)*

###  title

• **title**: *string* = "Symbol Paint"

*Defined in [cs-map/src/classes/layer-style.ts:338](https://github.com/TNOCS/csnext/blob/38d1409e/packages/cs-map/src/classes/layer-style.ts#L338)*
