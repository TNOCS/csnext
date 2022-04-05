import { IWidget } from '@csnext/cs-core';
import { Component } from 'vue';

export interface ITool {
    title: string;
    subtitle?: string;
    id: string;
    image?: string;
    icon?: string;
    component?: Component;
    disbled?: boolean;
  
    busy?: boolean;
    widget?: IWidget;
    action?: () => Promise<boolean>;
  }