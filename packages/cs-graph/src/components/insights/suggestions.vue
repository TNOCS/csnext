<template>
  <div v-if="source">
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>{{ $cs.Translate('INSIGHTS') }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-tabs background-color="primary" dark v-model="tab" class="elevation-2" icons-and-text>
      <v-tab href="#tab-TOOLS">{{ $cs.Translate('TOOLS') }}<v-icon>mdi-tools</v-icon></v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="margin-bottom: 200px">
      <v-tab-item value="tab-TOOLS">
        <div>
          <div v-if="source.tools.length > 0">
            <v-card class="ma-4" v-for="(tool, i) in source.tools" :key="i" :disabled="tool.disabled">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title>{{ tool.title }}</v-card-title>
                  <v-card-subtitle v-if="tool.subtitle">{{ tool.subtitle }}</v-card-subtitle>
                  <v-card-actions><v-btn outlined rounded :disabled="tool.busy" @click="startTool(tool)">run</v-btn> </v-card-actions>
                </div>
                <v-avatar class="ma-3" size="50" tile v-if="tool.image">
                  <v-img :src="tool.image"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </div>
          <div v-else>No tools available</div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style scoped>
.rel-value {
  font-size: 18px;
  font-weight: 600;
  max-width: 300px;
}

.rel-keyword {
  font-size: 16px;
  width: 100px;
  font-weight: 400;
}

.insight-button {
  width: 100%;
  margin-bottom: 5px;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';

import simplebar from 'simplebar-vue';
import { DocDatasource, ITool } from '../../';
import { NodeLink } from '@csnext/cs-map';

@Component({
  components: { simplebar, NodeLink },
})
export default class Suggestions extends WidgetBase {
  public tab = 'TOOLS';

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }
  public async startTool(tool: ITool) {
    if (tool.action && typeof tool.action === 'function') {
      try {
        tool.busy = true;
        tool.busy = false;
      } catch (e) {}
    }
  }

  public contentLoaded() {}

  mounted() {}
}
</script>
