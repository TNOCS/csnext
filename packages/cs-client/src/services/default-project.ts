import { IProject } from '@csnext/cs-core';

export const DefaultProject: IProject = {
  header: {
    title: 'Project Name',
    breadcrumbs: false,
    dense: false
  },
  navigation: {
    style: 'tabs'
  },
  leftSidebar: {
    open: false,
    mini: false,
    clipped: true,
    permanent: false,
    temporary: false
  },
  datasources: {},
  theme: {
    dark: false,
    colors: {
      primary: '#F44336',
      secondary: '#E57373',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107',
      menu: '#000'
    }
  },
  // footer: {
  //   visible: false,
  //   dashboard: {
  //     widgets: []
  //   }
  // },
  rightSidebar: {
    open: false,
    right: true,
    clipped: true,
    temporary: false,
    width: 350,
    sidebars: {}
  },
  menus: [],
  dashboards: []
};
