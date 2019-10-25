# Class: CsLogList

## Hierarchy

* any

  ↳ **CsLogList**

## Properties

###  log

• **log**: *[LogManager](_cs_client_src_datasources_log_log_manager_.logmanager.md)* =  new LogManager()

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:18](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L18)*

___

###  reverseOrder

• **reverseOrder**: *boolean* = false

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:20](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L20)*

___

###  subTitleTemplate

• **subTitleTemplate**: *Handlebars.TemplateDelegate‹any›*

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:17](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L17)*

___

###  titleTemplate

• **titleTemplate**: *Handlebars.TemplateDelegate‹any›*

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:16](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L16)*

## Accessors

###  WidgetOptions

• **get WidgetOptions**(): *[LogListOptions](_cs_log_src_classes_log_list_options_.loglistoptions.md)*

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:29](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L29)*

**Returns:** *[LogListOptions](_cs_log_src_classes_log_list_options_.loglistoptions.md)*

## Methods

###  InitLog

▸ **InitLog**(): *void*

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:59](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L59)*

load all log sources as specified in widget options

**Returns:** *void*

___

###  beforeDestroy

▸ **beforeDestroy**(): *void*

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:85](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L85)*

**Returns:** *void*

___

###  beforeMount

▸ **beforeMount**(): *void*

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:79](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L79)*

**Returns:** *void*

___

###  mounted

▸ **mounted**(): *void*

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:91](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L91)*

**Returns:** *void*

___

###  openDetails

▸ **openDetails**(`item`: [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md)): *void*

*Defined in [cs-log/src/components/cs-log-list/cs-log-list.ts:47](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cs-log/src/components/cs-log-list/cs-log-list.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [ILogItem](../interfaces/_cs_client_src_datasources_log_log_item_.ilogitem.md) |

**Returns:** *void*
