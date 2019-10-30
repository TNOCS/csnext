# Class: CsTimeline

## Hierarchy

* any

  ↳ **CsTimeline**

## Properties

###  $refs

• **$refs**: *object*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:50](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L50)*

#### Type declaration:

___

###  GROUP_VISIBILITY_ID

• **GROUP_VISIBILITY_ID**: *string* = "timeline-group-"

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:39](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L39)*

access the original widget from configuration

___

###  currentTime

• **currentTime**: *Date* =  new Date()

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:45](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L45)*

___

###  groups

• **groups**: *DataGroup[]* =  []

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:44](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L44)*

___

###  items

• **items**: *DataItem[]* =  []

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:43](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L43)*

___

### `Optional` logSource

• **logSource**? : *[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:47](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L47)*

___

###  smallView

• **smallView**: *boolean* = false

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:48](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L48)*

___

### `Optional` timeline

• **timeline**? : *Timeline*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:41](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L41)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:60](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L60)*

## Accessors

###  Time

• **get Time**(): *[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:54](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L54)*

**Returns:** *[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)*

___

###  WidgetOptions

• **get WidgetOptions**(): *[TimelineWidgetOptions](../interfaces/_cs_timeline_src_classes_timeline_widget_options_.timelinewidgetoptions.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:61](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L61)*

**Returns:** *[TimelineWidgetOptions](../interfaces/_cs_timeline_src_classes_timeline_widget_options_.timelinewidgetoptions.md)*

## Methods

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:69](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L69)*

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:306](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L306)*

**Returns:** *void*

___

###  fitAll

▸ **fitAll**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:204](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L204)*

**Returns:** *void*

___

###  initLogSource

▸ **initLogSource**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:181](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L181)*

**Returns:** *void*

___

###  initTimeline

▸ **initTimeline**(): *Promise‹void›*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:94](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L94)*

**Returns:** *Promise‹void›*

___

###  initToolbar

▸ **initToolbar**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:216](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L216)*

**Returns:** *void*

___

###  setGroupVisibility

▸ **setGroupVisibility**(`group`: DataGroup, `value`: boolean): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:89](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L89)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`group` | DataGroup | - |
`value` | boolean | true |

**Returns:** *void*

___

###  setWindow

▸ **setWindow**(`start`: Date, `end`: Date): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:210](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | Date |
`end` | Date |

**Returns:** *void*

___

###  toggleView

▸ **toggleView**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:84](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L84)*

**Returns:** *void*

___

###  update

▸ **update**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:77](https://github.com/TNOCS/csnext/blob/ec6e73e4/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L77)*

**Returns:** *void*
