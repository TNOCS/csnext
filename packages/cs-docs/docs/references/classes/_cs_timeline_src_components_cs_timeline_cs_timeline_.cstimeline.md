# Class: CsTimeline

## Hierarchy

* any

  ↳ **CsTimeline**

## Properties

###  $refs

• **$refs**: *object*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:50](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L50)*

___

###  GROUP_VISIBILITY_ID

• **GROUP_VISIBILITY_ID**: *string* = "timeline-group-"

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:39](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L39)*

access the original widget from configuration

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:39](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L39)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L45)*

___

###  groups

• **groups**: *DataGroup[]* =  []

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L45)*

• **items**: *DataItem[]* =  []

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:43](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L43)*

___

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L44)*

___

###  smallView

• **smallView**: *boolean* = false

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:43](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L43)*

• **timeline**? : *Timeline*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:41](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L41)*

___

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:47](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L47)*

## Accessors

###  Time

• **get Time**(): *[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L48)*

###  WidgetOptions

• **get WidgetOptions**(): *[TimelineWidgetOptions](../interfaces/_cs_timeline_src_classes_timeline_widget_options_.timelinewidgetoptions.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:61](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L61)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:41](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L41)*

▸ **addGroup**(`groupName`: string): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:320](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L320)*

**Parameters:**

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:60](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L60)*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:54](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L54)*

###  contentLoaded

▸ **contentLoaded**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:306](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L306)*

**Returns:** *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:61](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L61)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:409](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L409)*

**Parameters:**

Name | Type |
------ | ------ |
`month` | any |
`year` | any |
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:320](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L320)*
###  fitAll

▸ **fitAll**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:204](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L204)*

**Returns:** *void*

___

### `Private` groupExists

▸ **groupExists**(`id`: string): *any*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:332](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L332)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:69](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L69)*
`id` | string |

**Returns:** *any*

___

### `Private` handleEventSelect

▸ **handleEventSelect**(`data`: any): *void*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:306](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L306)*
Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

### `Private` handleIncomingTimeEvent
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:409](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L409)*
**Parameters:**

Name | Type |
------ | ------ |
`action` | string |
`data` | any |

**Returns:** *void*

___

### `Private` handleTimeChange

▸ **handleTimeChange**(`d`: object): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:354](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L354)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:204](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L204)*
Name | Type |
------ | ------ |
`id` | string |
`time` | Date |

**Returns:** *void*

___

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:332](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L332)*

**Parameters:**

▪ **d**: *object*

Name | Type |
------ | ------ |
`id` | string |
`time` | Date |

**Returns:** *void*

___

### `Private` handleTimelineClick
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:366](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L366)*
**Parameters:**

Name | Type |
------ | ------ |
`data` | TimelineEventPropertiesResult |

**Returns:** *void*

___

###  initLogSource

▸ **initLogSource**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:181](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L181)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:433](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L433)*
###  initTimeline

▸ **initTimeline**(): *Promise‹void›*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:94](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L94)*

**Returns:** *Promise‹void›*

___

###  initToolbar

▸ **initToolbar**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:216](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L216)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:354](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L354)*

▸ **setDate**(`date`: Date): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:394](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L394)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *void*

___

###  setGroupVisibility

▸ **setGroupVisibility**(`group`: DataGroup, `value`: boolean): *void*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:360](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L360)*
Name | Type | Default |
------ | ------ | ------ |
`group` | DataGroup | - |
`value` | boolean | true |

**Returns:** *void*

___

### `Private` setTimelineEvents

▸ **setTimelineEvents**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:336](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L336)*

**Returns:** *void*

___
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:387](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L387)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:210](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | Date |
`end` | Date |

**Returns:** *void*

___

###  toggleView

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:181](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L181)*

___

###  update

▸ **update**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:77](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L77)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:94](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L94)*

▸ **updateItems**(): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:413](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L413)*

**Returns:** *void*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:216](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L216)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:394](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L394)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:89](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L89)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:336](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L336)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:210](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L210)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:84](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L84)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:77](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L77)*
*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:413](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L413)*
