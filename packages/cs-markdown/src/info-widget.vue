<template>
  <div v-if="tabs">
    <v-tabs v-model="tab" class="elevation-2">
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="i in tabs" :key="i.title" :href="`#tab-${i.title}`">
        {{ $cs.Translate(i.title) }}
      </v-tab>
    </v-tabs>
    <simplebar class="full-height pa-2">
      <v-tabs-items v-model="tab" class="full-height">
        <v-tab-item v-for="i in tabs" :key="i.title" :value="'tab-' + i.title" class="full-height">
          <div class="full-height-tab mb-4">
            <cs-markdown :data="i.mdContent"></cs-markdown>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </simplebar>
  </div>
  <simplebar v-else class="full-height pa-2">
    <cs-markdown :data="mdContent"></cs-markdown>
  </simplebar>
</template>

<style scoped>
.md-body table {
  border-collapse: collapse;
  margin: 0px 4px;
}

.md-body table th,
.md-body table td {
  border: 1px solid grey;
  padding: 2px 4px;
}

.events-header-image {
  position: absolute;
  width: 100%;
}

.events-header-title {
  font-size: 40px;
  font-weight: 700;
  position: absolute;
  color: white;
  margin: 20px;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { AppState, WidgetBase } from '@csnext/cs-client';
import simplebar from 'simplebar-vue';
import { IDashboard, IDatasource, IMessageBusCallback, Info } from '@csnext/cs-core';
import axios from 'axios';
import { CsMarkdown } from './index';

@Component({
  components: { simplebar, CsMarkdown },
})
export default class InfoWidget extends WidgetBase {
  private mdContent: string = '';
  private tabs: Info[] | null = null;
  private tab: string | null = null;

  private async createDashboard() {
    const d: IDashboard | undefined = this.$cs.activeDashboard;
    if (d?.info) {
      if (d.info.tabs) {
        this.tabs = d.info.tabs;
        for (const tab of d.info.tabs) {
          if (tab.markdownUrl) {
            tab.mdContent = await this.getAndProcessMarkdown(tab.markdownUrl, tab.markdownUrl);
          }
        }
      } else {
        this.tabs = null;
        if (d.info.markdownUrl) {
          this.mdContent = await this.getAndProcessMarkdown(d.info.markdownUrl, d.info.markdownUrl);
        }
      }
    }
    this.$forceUpdate();
  }

  private async getAndProcessMarkdown(fileUrl: string, markdownUrl: string): Promise<string> {
    try {
      let u = await axios.get<string>(fileUrl);
      if (u && u.data) {
        const processedData = u.data.replace(/(!\[.*?\]\()(.+?)(\))/g, (wholeData: string, a: string, b: string, c: string) => {
          return `${a}${markdownUrl}/${b}${c}`;
        });        
        return processedData;
      } else {
        return '';        
      }
    } catch (e) {
      return '';
    }
  }

  private dashboardUpdated: IMessageBusCallback = (title: string, data: any) => {
    if (title === 'init') {
      this.createDashboard();
    }
  };

  mounted() {
    this.createDashboard();
    this.busManager.subscribe(this.$cs.bus, AppState.DASHBOARD_MAIN, this.dashboardUpdated);
  }
}
</script>
