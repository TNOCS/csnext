# Interface: ITimelineDataSource

## Hierarchy

* any

  ↳ **ITimelineDataSource**

## Properties

###  events

• **events**: *[MessageBusService](../classes/_cs_core_src_utils_message_bus_message_bus_service_.messagebusservice.md)*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:23](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L23)*

___

###  timelineItems

• **timelineItems**: *DataItem[]*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:24](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L24)*

## Methods

###  addItem

▸ **addItem**(`item`: DataItem): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:25](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DataItem |

**Returns:** *void*

___

###  removeItem

▸ **removeItem**(`item`: DataItem): *void*

*Defined in [cs-timeline/src/components/cs-timeline/cs-timeline.ts:26](https://github.com/RichardHovenkamp/csnext/blob/40018c3a/packages/cs-timeline/src/components/cs-timeline/cs-timeline.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DataItem |

**Returns:** *void*
