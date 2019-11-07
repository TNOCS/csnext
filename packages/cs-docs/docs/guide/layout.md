# Layout

## Single
The Single layout provides a single page where you van place your panels/widgets. There is no grid.
```
{
    path: "/single",
    title: "Single",
    layout: Single.id
}
```
## Grid
The Grid layout lets you place multiple panels in a grid.
```
{
    path: "/grid",
    title: "Grid",
    layout: GridLayout.id
}
```
## CSS Grids
The CSS Grid Layout offers a grid-based layout system, with rows and columns
```ts
{
    title: 'CSS Grids',
    path: '/cssgrids',
    layout: CssGrid.id,
    options: {
        gap: '10px',
    } as CssGridDashboardOptions,
     widgets: [
        {
            component: HtmlWidget,
            data: 'widget 1',
            options: {
                class: 'widget-red',
                    columnStart: 1,
                    columnEnd: 2,
                    rowStart: 1,
                    rowEnd: 2
            } as CssGridWidgetOptions
        }
    ]
}
```
## CSS Grid Areas
The CSS Grid Areas offer a grid-based layout system, with rows and columns where you can specify the area/location
```ts
{
    title: 'CSS Grid Areas',
    path: '/cssgridsareas',
    layout: CssGrid.id,
    options: {
        template: 'default'
    } as CssGridDashboardOptions,
    widgets: [
        {
            component: HtmlWidget,
            data: 'widget 1',
            options: {
                class: 'widget-red',
                area: 'header'
            } as CssGridWidgetOptions
        }, {
            component: HtmlWidget,
            data: 'widget 2',
            options: {
                class: 'widget-yellow',
                area: 'left'
            } as CssGridWidgetOptions
        }
    ]
}
```
## Split panel
Using the split panel layout you can create multiple panels in the dashboard. These panels can be changed in size.
```ts
{
    id: "splitpanel",
    path: "/splitpanel",
    title: "Split Panel",
    layout: SplitPanel.id,
    options: {
        splitpanel: {
            direction: 'horizontal',
            elements: [
                {
                    size: 35,
                    widgetId: 'widget-1'
                },
                {
                    size: 65,
                    splitpanel: {
                        direction: 'vertical',
                        elements: [
                            {
                                size: 50,
                                widgetId: 'widget-2'
                            },
                            {
                                size: 50,
                                widgetId: 'widget-3'
                            }
                        ]
                    }
                }
            ]
        } as SplitPanelOptions
    } as IDashboardOptions,
}
```

## Drag Grid
The Drag Grid layout gives you the option to drag and drop panels inside a grid layout.
```ts
{
    id: "drag",
    path: "/drag",
    title: "Drag Grid",
    layout: DragLayout.id,
    defaultWidgetOptions: {
        elevation: 5,
        flat: false,
        backgroundColor: 'blue',
    },
    options: {
        DragEnabled: false
    } as DragLayoutOptions,
}
```
