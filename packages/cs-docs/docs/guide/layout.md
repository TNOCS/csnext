# Layout

## Single
```
{
    path: "/single",
    title: "Single",
    layout: Single.id
}
```
## Grid
```
{
    path: "/grid",
    title: "Grid",
    layout: GridLayout.id
}
```
## CSS Grids
```ts
{
    title: 'CSS Grids',
    path: '/cssgrids',
    layout: CssGrid.id,
    options: {
        gap: '10px',
    } as CssGridDashboardOptions,
}
```
## CSS Grid Areas
```ts
{
    title: 'CSS Grid Areas',
    path: '/cssgridsareas',
    layout: CssGrid.id,
    options: {
        template: 'default'
    } as CssGridDashboardOptions,
}
```
## Split panel
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
