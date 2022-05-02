import { IMenu, IWidget } from '@csnext/cs-core';
import { Component } from 'vue';
import { GraphElement} from '@csnext/cs-data';
export interface ITool {
    title: string;
    subtitle?: string;
    id: string;
    image?: string;
    icon?: string;
    component?: Component;
    disbled?: boolean;
    elementActions?: (element: GraphElement) => IMenu[] | undefined;
    documentActions?: (element: GraphElement) => IMenu[] | undefined;
    busy?: boolean;
    widget?: IWidget;
    action?: () => Promise<boolean>;
  }