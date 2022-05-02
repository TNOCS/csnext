<template>
  <div>
    <cs-widget v-for="widget in dashboard.widgets" :key="widget.id" :widget="widget"></cs-widget>
  </div>
</template>

<script lang="ts">
import { LayoutComponent } from './../layout-component';
import Component from 'vue-class-component';
import { IDashboard, guidGenerator } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import { Prop } from 'vue-property-decorator';

@Component({  
} as any)
export default class GridLayout extends LayoutComponent {
  public static id = 'grid';
  @Prop({ default: null })
  public dashboard?: IDashboard;
}

LayoutManager.addLayoutManager(GridLayout);

export function GridDashboard(definition?: IDashboard): IDashboard {
  if (definition) {
    return { ...{ id: guidGenerator(), layout: GridLayout.id, options: {} }, ...definition };
  } else {
    return {};
  }
}
</script>

<style lang="css" scoped></style>
