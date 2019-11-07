# Class: CsTimeline

## Hierarchy

* any

  ↳ **CsTimeline**

## Properties

###  $refs

• **$refs**: *object*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:50](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L50)*

#### Type declaration:

* **timelineContainer**: *HTMLElement*

___

###  GROUP_VISIBILITY_ID

• **GROUP_VISIBILITY_ID**: *string* = "timeline-group-"

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:39](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L39)*

access the original widget from configuration

___

###  currentTime

• **currentTime**: *Date* =  new Date()

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:45](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L45)*

___

###  groups

• **groups**: *DataGroup[]* =  []

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:44](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L44)*

___

###  items

• **items**: *DataItem[]* =  []

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:43](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L43)*

___

### `Optional` logSource

• **logSource**? : *[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:47](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L47)*

___

###  smallView

• **smallView**: *boolean* = false

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:48](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L48)*

___

### `Optional` timeline

• **timeline**? : *Timeline*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:41](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L41)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:60](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L60)*

## Accessors

###  Time

• **get Time**(): *[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:54](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L54)*

**Returns:** *[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)*

___

###  WidgetOptions

• **get WidgetOptions**(): *[TimelineWidgetOptions](../interfaces/_cs_timeline_src_classes_timeline_widget_options_.timelinewidgetoptions.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:61](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L61)*

**Returns:** *[TimelineWidgetOptions](../interfaces/_cs_timeline_src_classes_timeline_widget_options_.timelinewidgetoptions.md)*

## Methods

### `Private` addGroup

▸ **addGroup**(`groupName`: string): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:320](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L320)*

**Parameters:**

Name | Type |
------ | ------ |
`groupName` | string |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:69](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L69)*

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:306](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L306)*

**Returns:** *void*

___

### `Private` daysInMonth

▸ **daysInMonth**(`month`: any, `year`: any): *number*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:414](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L414)*

**Parameters:**

Name | Type |
------ | ------ |
`month` | any |
`year` | any |

**Returns:** *number*

___

###  fitAll

▸ **fitAll**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:204](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L204)*

**Returns:** *void*

___

### `Private` groupExists

▸ **groupExists**(`id`: string): *any*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:332](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L332)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *any*

___

### `Private` handleDoubleClick

▸ **handleDoubleClick**(`data`: any): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:367](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L367)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

### `Private` handleEventSelect

▸ **handleEventSelect**(`data`: any): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:371](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L371)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

### `Private` handleIncomingTimeEvent

▸ **handleIncomingTimeEvent**(`action`: string, `data`: any): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:438](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L438)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | string |
`data` | any |

**Returns:** *void*

___

### `Private` handleTimeChange

▸ **handleTimeChange**(`d`: object): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:355](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L355)*

**Parameters:**

▪ **d**: *object*

Name | Type |
------ | ------ |
`id` | string |
`time` | Date |

**Returns:** *void*

___

### `Private` handleTimeChanged

▸ **handleTimeChanged**(`d`: object): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:361](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L361)*

**Parameters:**

▪ **d**: *object*

Name | Type |
------ | ------ |
`id` | string |
`time` | Date |

**Returns:** *void*

___

### `Private` handleTimelineClick

▸ **handleTimelineClick**(`data`: TimelineEventPropertiesResult): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:392](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L392)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | TimelineEventPropertiesResult |

**Returns:** *void*

___

###  initLogSource

▸ **initLogSource**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:181](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L181)*

**Returns:** *void*

___

###  initTimeline

▸ **initTimeline**(): *Promise‹void›*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:94](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L94)*

**Returns:** *Promise‹void›*

___

###  initToolbar

▸ **initToolbar**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:216](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L216)*

**Returns:** *void*

___

### `Private` setDate

▸ **setDate**(`date`: Date): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:399](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L399)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *void*

___

###  setGroupVisibility

▸ **setGroupVisibility**(`group`: DataGroup, `value`: boolean): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:89](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L89)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`group` | DataGroup | - |
`value` | boolean | true |

**Returns:** *void*

___

### `Private` setTimelineEvents

▸ **setTimelineEvents**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:336](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L336)*

**Returns:** *void*

___

###  setWindow

▸ **setWindow**(`start`: Date, `end`: Date): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:210](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | Date |
`end` | Date |

**Returns:** *void*

___

###  toggleView

▸ **toggleView**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:84](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L84)*

**Returns:** *void*

___

###  update

▸ **update**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:77](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L77)*

**Returns:** *void*

___

### `Private` updateItems

▸ **updateItems**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:418](https://github.com/RichardHovenkamp/csnext/blob/c891e154/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L418)*

**Returns:** *void*
