# Class: CsAgenda

## Hierarchy

* any

  ↳ **CsAgenda**

## Properties

###  $refs

• **$refs**: *object*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:30](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L30)*

___

###  GROUP_VISIBILITY_ID

• **GROUP_VISIBILITY_ID**: *string* = "timeline-group-"

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:36](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L36)*

___

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:36](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L36)*

___

###  focus

• **focus**: *string* = "2019-01-01"

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:48](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L48)*

• **logSource**? : *[LogDataSource](_cs_client_src_datasources_log_log_datasource_.logdatasource.md)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:28](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L28)*

access the original widget from configuration

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:39](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L39)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:50](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L50)*

___

###  selectedEvent

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:28](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L28)*

___

###  selectedOpen

• **selectedOpen**: *boolean* = false

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:51](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L51)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:50](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L50)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:47](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L47)*

___

###  today

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:49](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L49)*

###  type

• **type**: *string* = "month"

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:40](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L40)*

___

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:51](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L51)*

## Accessors

###  TimeDatasource

• **get TimeDatasource**(): *[TimeDataSource](_cs_core_src_datasources_time_datasource_.timedatasource.md)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:47](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L47)*

###  WidgetOptions

• **get WidgetOptions**(): *[TimelineWidgetOptions](../interfaces/_cs_timeline_src_classes_timeline_widget_options_.timelinewidgetoptions.md)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:146](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L146)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:38](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L38)*

▸ **beforeMount**(): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:198](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L198)*

**Returns:** *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:40](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L40)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:53](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:145](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L145)*

###  getEventColor

▸ **getEventColor**(`event`: any): *string*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:158](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L158)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:139](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L139)*

**Returns:** *string*

___

###  getEvents

▸ **getEvents**(): *any[]*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:146](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L146)*

### `Private` handleIncomingTimeEvent

▸ **handleIncomingTimeEvent**(`action`: string, `data`: any): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:246](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L246)*

**Parameters:**

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:198](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L198)*
**Returns:** *void*

___

###  initLogSource

▸ **initLogSource**(): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:208](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L208)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:53](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L53)*
###  monthFormatter

▸ **monthFormatter**(): *Function*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:90](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L90)*

**Returns:** *Function*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:271](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L271)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:158](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L158)*
###  next

▸ **next**(): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:167](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L167)*

**Returns:** *void*

___

###  nth

▸ **nth**(`d`: any): *string*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:191](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L191)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:96](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L96)*
`d` | any |

**Returns:** *string*

___

###  prev

▸ **prev**(): *void*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:246](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L246)*
___

###  setToday

▸ **setToday**(): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:161](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L161)*

**Returns:** *void*

___

###  showEvent

▸ **showEvent**(`__namedParameters`: object): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:208](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L208)*

Name | Type |
------ | ------ |
`event` | any |
`nativeEvent` | any |

**Returns:** *void*

___
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:90](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L90)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:60](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L60)*

**Returns:** *string*

___

###  update

▸ **update**(): *Promise‹void›*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:271](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L271)*
___

### `Private` updateItems

▸ **updateItems**(): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:225](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L225)*

**Returns:** *void*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:167](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L167)*
▸ **updateRange**(`__namedParameters`: object): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:186](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L186)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:191](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L191)*

___

###  viewDay

▸ **viewDay**(`__namedParameters`: object): *void*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:154](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L154)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:164](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L164)*

###  typeToLabel

### ▪ **typeToLabel**: *object*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:41](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L41)*

###  4day

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:161](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L161)*

• **day**: *string* = "Day"

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L44)*

###  month

• **month**: *string* = "Month"

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:170](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L170)*

*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:43](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L43)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:60](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L60)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:204](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L204)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:225](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L225)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:186](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L186)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:154](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L154)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:41](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L41)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:45](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L45)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:44](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L44)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:42](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L42)*
*Defined in [cs-timeline/src/components/cs-agenda/cs-agenda.ts:43](https://github.com/TNOCS/csnext/blob/99cbd46d/packages/cs-timeline/src/components/cs-agenda/cs-agenda.ts#L43)*
