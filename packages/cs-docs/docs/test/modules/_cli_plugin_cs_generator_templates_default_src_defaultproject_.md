# External module: "cli-plugin-cs/generator/templates/default/src/defaultproject"

## Object literals

### `Const` project

### ▪ **project**: *object*

*Defined in [cli-plugin-cs/generator/templates/default/src/defaultproject.ts:6](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cli-plugin-cs/generator/templates/default/src/defaultproject.ts#L6)*

###  dashboards

• **dashboards**: *object[]* =  [
      {
        title: 'Grid',
        icon: 'assignment',
        path: '/',
        layout: 'grid',
        widgets: [ { component: MdWidget, options: { class: 'widget-1'}, data: 'welcome'}]
      },
    ]

*Defined in [cli-plugin-cs/generator/templates/default/src/defaultproject.ts:82](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cli-plugin-cs/generator/templates/default/src/defaultproject.ts#L82)*

###  menus

• **menus**: *object[]* =  [
    {
      id: 'addmenu',
      icon: 'add',
      title: 'add chart',
      enabled: true,
      items: [
        {
          id: 'adddashboard',
          icon: 'note_add',
          title: 'add dashboard',
          enabled: true,
          visible: true,
          action: () => {
            AppState.Instance.TriggerNotification({
              title: 'Add new dashboard',
            });
          },
        },
        {
          id: 'addchart',
          icon: 'note_add',
          title: 'add chart',
          enabled: true,
          visible: true,
          action: () => {
            AppState.Instance.TriggerNotification({
              title: 'Add new chart',
            });
          },
        },
      ],
      visible: true
    },
  ]

*Defined in [cli-plugin-cs/generator/templates/default/src/defaultproject.ts:47](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cli-plugin-cs/generator/templates/default/src/defaultproject.ts#L47)*

▪ **header**: *object*

*Defined in [cli-plugin-cs/generator/templates/default/src/defaultproject.ts:7](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cli-plugin-cs/generator/templates/default/src/defaultproject.ts#L7)*

* **breadcrumbs**: *boolean* = false

* **dense**: *boolean* = false

* **title**: *string* = "Test project"

▪ **leftSidebar**: *object*

*Defined in [cli-plugin-cs/generator/templates/default/src/defaultproject.ts:15](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cli-plugin-cs/generator/templates/default/src/defaultproject.ts#L15)*

* **clipped**: *boolean* = true

* **mini**: *boolean* = false

* **open**: *boolean* = false

* **permanent**: *boolean* = false

* **temporary**: *boolean* = true

* **dashboard**: *object*

  * **widgets**: *object[]* =  [{ component: MdWidget, data: 'left sidebar' }]

▪ **navigation**: *object*

*Defined in [cli-plugin-cs/generator/templates/default/src/defaultproject.ts:12](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cli-plugin-cs/generator/templates/default/src/defaultproject.ts#L12)*

* **style**: *string* = "tabs"

▪ **rightSidebar**: *object*

*Defined in [cli-plugin-cs/generator/templates/default/src/defaultproject.ts:38](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cli-plugin-cs/generator/templates/default/src/defaultproject.ts#L38)*

* **clipped**: *boolean* = false

* **open**: *boolean* = false

* **right**: *boolean* = true

* **temporary**: *boolean* = false

* **dashboard**: *object*

  * **widgets**: *object[]* =  [{ component: MdWidget, data: 'right sidebar' }]

▪ **theme**: *object*

*Defined in [cli-plugin-cs/generator/templates/default/src/defaultproject.ts:25](https://github.com/RichardHovenkamp/csnext/blob/eefa977/packages/cli-plugin-cs/generator/templates/default/src/defaultproject.ts#L25)*

* **dark**: *boolean* = false

* **colors**: *object*

  * **accent**: *string* = "#82B1FF"

  * **error**: *string* = "#FF5252"

  * **info**: *string* = "#2196F3"

  * **menu**: *string* = "#000"

  * **primary**: *string* = "#3eaf7c"

  * **secondary**: *string* = "#e5e9ea"

  * **success**: *string* = "#4CAF50"

  * **warning**: *string* = "#FFC107"
