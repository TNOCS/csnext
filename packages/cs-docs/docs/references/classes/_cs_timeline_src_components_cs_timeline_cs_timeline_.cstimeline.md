# Class: CsTimeline

## Hierarchy

* any

  ↳ **CsTimeline**

## Properties

###  $refs

• **$refs**: *object*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:51](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L51)*

#### Type declaration:

* **timelineContainer**: *HTMLElement*

___

###  GROUP_VISIBILITY_ID

• **GROUP_VISIBILITY_ID**: *string* = "timeline-group-"

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:40](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L40)*

access the original widget from configuration

___

###  currentTime

• **currentTime**: *Date* =  new Date()

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:46](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L46)*

___

###  groups

• **groups**: *DataGroup[]* =  []

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:45](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L45)*

___

###  items

• **items**: *DataItem[]* =  []

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:44](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L44)*

___

### `Optional` logSource

• **logSource**? : *[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:48](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L48)*

___

###  smallView

• **smallView**: *boolean* = false

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:49](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L49)*

___

### `Optional` timeline

• **timeline**? : *Timeline*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:42](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L42)*

___

###  widget

• **widget**: *[IWidget](../interfaces/_cs_core_src_widget_widget_.iwidget.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:61](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L61)*

## Accessors

###  Time

• **get Time**(): *[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:55](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L55)*

**Returns:** *[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)*

___

###  WidgetOptions

• **get WidgetOptions**(): *[TimelineWidgetOptions](../interfaces/_cs_timeline_src_classes_timeline_widget_options_.timelinewidgetoptions.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:62](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L62)*

**Returns:** *[TimelineWidgetOptions](../interfaces/_cs_timeline_src_classes_timeline_widget_options_.timelinewidgetoptions.md)*

## Methods

### `Private` addGroup

▸ **addGroup**(`groupName`: string): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:332](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L332)*

**Parameters:**

Name | Type |
------ | ------ |
`groupName` | string |

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:70](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L70)*

**Returns:** *void*

___

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:322](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L322)*

**Returns:** *void*

___

### `Private` daysInMonth

▸ **daysInMonth**(`month`: any, `year`: any): *number*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:426](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L426)*

**Parameters:**

Name | Type |
------ | ------ |
`month` | any |
`year` | any |

**Returns:** *number*

___

###  fitAll

▸ **fitAll**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:205](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L205)*

**Returns:** *void*

___

### `Private` groupExists

▸ **groupExists**(`id`: string): *any*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:344](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L344)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *any*

___

### `Private` handleDoubleClick

▸ **handleDoubleClick**(`data`: any): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:379](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L379)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

### `Private` handleEventSelect

▸ **handleEventSelect**(`data`: any): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:383](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L383)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

### `Private` handleIncomingTimeEvent

▸ **handleIncomingTimeEvent**(`action`: string, `data`: any): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:450](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L450)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | string |
`data` | any |

**Returns:** *void*

___

### `Private` handleTimeChange

▸ **handleTimeChange**(`d`: object): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:367](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L367)*

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

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:373](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L373)*

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

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:404](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L404)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | TimelineEventPropertiesResult |

**Returns:** *void*

___

###  initLogSource

▸ **initLogSource**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:182](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L182)*

**Returns:** *void*

___

###  initTimeline

▸ **initTimeline**(): *Promise‹void›*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:95](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L95)*

**Returns:** *Promise‹void›*

___

###  initToolbar

▸ **initToolbar**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:217](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L217)*

**Returns:** *void*

___

### `Private` setDate

▸ **setDate**(`date`: Date): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:411](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L411)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *void*

___

###  setGroupVisibility

▸ **setGroupVisibility**(`group`: DataGroup, `value`: boolean): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:90](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L90)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`group` | DataGroup | - |
`value` | boolean | true |

**Returns:** *void*

___

### `Private` setTimelineEvents

▸ **setTimelineEvents**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:348](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L348)*

**Returns:** *void*

___

###  setWindow

▸ **setWindow**(`start`: Date, `end`: Date): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:211](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | Date |
`end` | Date |

**Returns:** *void*

___

###  toggleView

▸ **toggleView**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:85](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L85)*

**Returns:** *void*

___

###  update

▸ **update**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:78](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L78)*

**Returns:** *void*

___

### `Private` updateItems

▸ **updateItems**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:430](https://github.com/TNOCS/csnext/blob/dad76c19/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L430)*

**Returns:** *void*
