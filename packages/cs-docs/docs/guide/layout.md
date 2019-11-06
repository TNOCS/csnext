# Layout

## Single
```
{
    path: "/single",
    title: "Single",
    layout: Single.id,
    info: {
        title: 'Single',
        markdownUrl: 'https://raw.githubusercontent.com/RichardHovenkamp/csnext/cs-map-refactoring/packages/cs-docs/docs/guide/layout.md'
    },
    widgets: [
        {
            component: HtmlWidget,
            data: 'widget 1',
            options: {
                class: 'widget-red'
            }
        }
    ]
}
```
## Grid
```
{
    path: "/grid",
    title: "Grid",
    layout: GridLayout.id,
    info: {
        title: 'Grid',
        markdownUrl: 'https://raw.githubusercontent.com/RichardHovenkamp/csnext/cs-map-refactoring/packages/cs-docs/docs/guide/layout.md'
    },
    widgets: [
        {
            component: HtmlWidget,
            data: 'widget 1',
            options: {
                class: 'widget-red'
            }
        },
        {
            component: HtmlWidget,
            data: 'widget 2',
            options: {
                class: 'widget-orange'
            }
        },
        {
            component: HtmlWidget,
            data: 'widget 3',
            options: {
                class: 'widget-green'
            }
        }
    ]
}
```
## CSS Grids
```ts
{
    title: 'CSS Grids',
    path: '/cssgrids',
    layout: CssGrid.id,
    info: {
        title: 'CSS Grids',
        markdownUrl: 'https://raw.githubusercontent.com/RichardHovenkamp/csnext/cs-map-refactoring/packages/cs-docs/docs/references/classes/_cs_client_src_layout_css_grid_css_grid_.cssgrid.md'
    },
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
        }, {
            component: HtmlWidget,
            data: 'widget 2',
            options: {
                class: 'widget-blue',
                columnStart: 2,
                columnEnd: 5,
                rowStart: 0,
                rowEnd: 2
            } as CssGridWidgetOptions
        },
        {
            component: HtmlWidget,
            data: 'widget 3',
            options: {
                class: 'widget-blue',
                columnStart: 1,
                columnEnd: 5,
                rowStart: 2,
                rowEnd: 4
            } as CssGridWidgetOptions
        },
        {
            component: HtmlWidget,
            data: 'widget 3',
            options: {
                class: 'widget-blue',
                columnStart: 5,
                columnEnd: 12,
                rowStart: 1,
                rowEnd: 6
            } as CssGridWidgetOptions
        },
    ]
}
```
## CSS Grid Areas
```ts
{
    title: 'CSS Grid Areas',
    path: '/cssgridsareas',
    layout: CssGrid.id,
    info: {
        title: 'CSS Grids',
        markdownUrl: 'https://raw.githubusercontent.com/RichardHovenkamp/csnext/cs-map-refactoring/packages/cs-docs/docs/references/classes/_cs_client_src_layout_css_grid_css_grid_.cssgrid.md'
    },
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
        },
        {
            component: HtmlWidget,
            data: 'widget 3',
            options: {
                class: 'widget-blue',
                area: 'middle'
            } as CssGridWidgetOptions
        },
        {
            component: HtmlWidget,
            data: 'widget 4',
            options: {
                class: 'widget-green',
                area: 'right'
            } as CssGridWidgetOptions
        },
    ]
}
```
## Split panel
```ts
{
    id: "splitpanel",
    path: "/splitpanel",
    title: "Split Panel",
    layout: SplitPanel.id,
    info: {
        title: 'Splitpanel',
        markdownUrl: 'https://raw.githubusercontent.com/RichardHovenkamp/csnext/cs-map-refactoring/packages/cs-docs/docs/references/classes/_cs_split_panel_src_split_panel_.splitpanel.md'
    },
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
    widgets: [
        {
            component: HtmlWidget,
            id: 'widget-1',
            data: 'widget 1',
            options: {
                class: 'widget-red'
            }
        },
        {
            component: HtmlWidget,
            id: 'widget-2',
            data: 'widget 2',
            options: {
                class: 'widget-orange'
            }
        },
        {
            component: HtmlWidget,
            id: 'widget-3',
            data: 'widget 3',
            options: {
                class: 'widget-green'
            }
        }
    ]
}
```

## Drag Grid
```ts
{
    id: "drag",
    path: "/drag",
    title: "Drag Grid",
    layout: DragLayout.id,
    info: {
        title: 'Drag Grid',
        markdownUrl: 'https://raw.githubusercontent.com/RichardHovenkamp/csnext/cs-map-refactoring/packages/cs-docs/docs/references/classes/_cs_drag_grid_src_drag_layout_.draglayout.md'
    },
    defaultWidgetOptions: {
        elevation: 5,
        flat: false,
        backgroundColor: 'blue',
    },
    options: {
        DragEnabled: false
    } as DragLayoutOptions,
    widgets: [
        {
            id: 'widget1',
            component: HtmlWidget,
            data: 'widget 1',
            options: {
                elevation: 0,
                width: 6,
                card: {
                    title: 'test',
                    description: 'test',
                    backgroundImage: 'images/beach.jpg',
                }
            } as CardWidgetOptions
        },
        {
            id: 'widget2',
            component: HtmlWidget,
            data: 'widget 2',
            options: {
                height: 2
            }
        },
        {
            id: 'widget3',
            component: HtmlWidget,
            data: 'widget 3',
            options: {
                height: 2

            }
        },
        {
            component: HtmlWidget,
            data: 'widget 4',
            options: {
                height: 2

            }
        },
        {
            component: HtmlWidget,
            data: 'widget 5',
            options: {
                x: 6,
                y: 7,
                width: 4,
                height: 2,

            }
        }
    ]
}
```
