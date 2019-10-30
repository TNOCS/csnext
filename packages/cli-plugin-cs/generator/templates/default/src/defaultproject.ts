
import {  IProject,  IMenu, INotification} from '@csnext/cs-core';
import { HtmlWidget, AppState } from '@csnext/cs-client';
import './assets/example.css'

export const project: IProject = {
  header: {
    title: 'Test project',
    breadcrumbs: false,
    dense: false,
  },
  navigation: {
    style: 'tabs',
  },
  leftSidebar: {
    open: false,
    mini: false,
    clipped: true,
    permanent: false,
    temporary: true,
    dashboard: {
      widgets: [{ component: HtmlWidget, data: 'left sidebar' }],
    },
  },
  theme: {
    dark: false,
    colors: {
      primary: '#3eaf7c',
      secondary: '#e5e9ea',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107',
      menu: '#000',
    },
  },
  rightSidebar: {
    open: false,
    right: true,
    clipped: false,
    temporary: false,
    dashboard: {
      widgets: [{ component: HtmlWidget, data: 'right sidebar' }],
    },
  },
  menus: [
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
  ],
    dashboards: [
      {
        title: 'Grid',
        icon: 'assignment',
        path: '/',
        layout: 'grid',
        widgets: [ { component: HtmlWidget, options: { class: 'widget-1'}, data: 'welcome'}]
      },
    ]
    //   <%_ if (options.csPlugins.indexOf('drag-grid')!==-1) { _%>
    //     ,{
    //       title: 'Drag Grid',
    //       icon: 'assignment',
    //       path: '/dragGrid',
    //       layout: 'drag-grid',          
    //       options: <IMuuriOptions>{ DragEnabled: true, gap: 5},
    //       widgets: [{ component: HtmlWidget, data: 'widget 1', options: <WidgetOptions>{ width: 3, height: 3}}]
    //     }        
    //     <%_ } _%>        
    
  };