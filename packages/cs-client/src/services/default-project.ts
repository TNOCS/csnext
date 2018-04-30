import { IProject } from '@csnext/cs-core';

export const DefaultProject: IProject = {
  header: {
    title: 'Test project',
    logo: './images/logo.png',
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
    temporary: true,
    dashboard: {
      widgets: []
    }
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
  rightSidebar: {
    open: false,
    right: true,
    clipped: false,
    temporary: false,
    dashboard: {
      widgets: []
    }
  },
  menus: [],
  dashboards: []
};
