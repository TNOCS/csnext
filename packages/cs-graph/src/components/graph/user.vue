<template>
  <v-container>
    <v-select
      :items="availableUsers"
      item-value="id"
      item-text="properties.name"
      v-model="activeUser"
      label="Active User"
    ></v-select>
    <!-- {{ source.activeUser.properties}} -->
    <!-- <v-btn @click="openKG()">open KG</v-btn> -->
    <v-switch v-model="$cs.project.theme.dark" inset :label="$cs.Translate('DARK_MODE')"></v-switch>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';

import { GraphElement } from '@csnext/cs-data';
import { DocDatasource } from '../..';

@Component({
  components: {}
})
export default class User extends WidgetBase {
  public get activeUser(): string | undefined {
    return this.source?.activeUser?.id ?? undefined;
  }

  public set activeUser(userId: string | undefined) {
    if (!this.source || !userId) {
      return;
    }
    const user = this.source.graph[userId];
    if (user) {
      this.source.setActiveUser(user);
      this.$forceUpdate();
    }
  }

  public get availableUsers(): GraphElement[] | undefined {
    return this.source?.getClassElements('agent', true, {
      hasObjectProperties: [{ property: 'agent_type', operator: '==', value: 'person' }]
    });
  }

  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  constructor() {
    super();
  }

  public contentLoaded() {}

  mounted() {}
}
</script>
