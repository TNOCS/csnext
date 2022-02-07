<template>
 <div>
   <simplebar style="height: 90vh">
     <v-layout class="ma-2">
       <v-text-field
            label="Filter"
            placeholder="Filter"
          ></v-text-field>
           <v-select
          v-model="agentsFilter"
          :items="agents"
          :menu-props="{ maxHeight: '400' }"          
          item-text="properties.name"
          return-object
          multiple
          hint="Select agent(s)"
          persistent-hint
        ></v-select>
        <v-select
          v-model="actionsFilter"
          :items="actions"
          :menu-props="{ maxHeight: '400' }"          
          multiple
          hint="Select action(s)"
          persistent-hint
        ></v-select>
        
     </v-layout>
       <v-timeline
        align-top
        dense        
        fill-dot        
      >
        <v-timeline-item
          :color="item.color"          
          v-for="(item,i) in items" :key="i"
          :icon="item.icon"
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>{{item.timeString}}</strong><br/>
              {{item.dateString}}
            </v-col>
            <v-col>
              <strong><node-chip :node="item.element" :source="source"></node-chip></strong>
              <div class="text-caption">
                {{item.action}} by <span v-if="item.agent"><node-span :node="item.agent" :source="source"/></span>
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>

        
      </v-timeline>
   </simplebar>
 </div>
</template>

<style scoped>

</style>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";

import simplebar from "simplebar-vue";
// import { DocDatasource } from "@csnext/cs-graph";
import { DocDatasource} from "./../..";
import { NodeChip, NodeSpan } from "@csnext/cs-map";
import { GraphDatasource, GraphElement } from "@csnext/cs-data";
import Vue from "vue";
import moment from "moment";

export class TimelineItem {
  public element?: GraphElement;
  public agent?: GraphElement;
  public timeString?: string;
  public dateString?: string;
  public time?: number;
  public action?: string;
  public color?: string;
  public icon?: string;
}

@Component({
  components: { simplebar, NodeChip, NodeSpan },
})
export default class RecentList extends WidgetBase {
  
  public items: TimelineItem[] = [];
  public agents: GraphElement[] | null = null;
  public agentsFilter: GraphElement[] | null = [];
  public actions: string[] = ['created', 'updated', 'approved', 'suggested'];
  public actionsFilter: string[] | null = [];

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  @Watch('agentsFilter')
  @Watch('actionsFilter')
  private filterChanged() {
    this.updateTimeline();
  }


  public updateTimeline() { 
    if (!this.source?.graph) { return; }
    console.log('update timeline');
    
    let maxTime = new Date().getTime() - 100 * 60 * 60 * 24 * 1;
    let i = [] as TimelineItem[];
    const createItem = (time: number, action: string, element : GraphElement, agent) => {
      const m = moment(time);
      let include = true;
      if (this.agentsFilter && this.agentsFilter.length > 0 && !this.agentsFilter.includes(agent)) { include = false}
      if (this.actionsFilter && this.actionsFilter.length > 0 && !this.actionsFilter.includes(action)) { include = false}
      if (include) {
        i.push({
          element,
          action: action,
          agent,
          time,
          timeString: m.format("HH:mm"),
          dateString: m.format("MM-DD"),
          color: element?._featureType?.color,
          icon: element?._featureType?.icon
        });
      }
    }
    for (const item of Object.values(this.source.graph)) {
      if (item.properties?.created_time && item.properties.created_time < maxTime) {
        createItem(item.properties.created_time, 'created', item, item._elements?.created_by);        
      }
      
      if (item.properties?.approved_time) {
        createItem(item.properties.approved_time, 'approved', item, item._elements?.approved_by);        
      }

      if (item._elements?.updated_by && item.properties?.updated_time && (item.properties.updated_time !== item.properties.created_time ||  item.properties.updated_time !== item.properties.approved_time) && item.properties.updated_time < maxTime) {
        createItem(item.properties.updated_time, 'updated', item, item._elements?.updated_by);        
      }
    }
    
    i.sort((a, b) => (b.time! - a.time!) > 0 ? 1 : -1);
    Vue.set(this, 'items', i.slice(0,100) );

  }

  public contentLoaded() {
    if (!this.source?.graph) { return; }
    this.agents = this.source.getClassElements('agent', true);
    this.updateTimeline();
    this.busManager.subscribe(
      this.source!.events,
      GraphDatasource.GRAPH_EVENTS,
      (a: string, d: any) => {
        this.updateTimeline();
        this.$forceUpdate();
      }
    );
  }

  mounted() {
    this.updateTimeline();
    this.contentLoaded();
  }
}
</script>
