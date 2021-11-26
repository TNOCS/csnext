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
      >
        <v-timeline-item
          :color="item.color"
          small
          v-for="(item,i) in items" :key="i"
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>{{item.timeString}}</strong><br/>
              {{item.dateString}}
            </v-col>
            <v-col>
              <strong><node-link v-if="item.element" :node="item.element" :source="source"/></strong>
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
import { NodeLink, NodeSpan } from "@csnext/cs-map";
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
}

@Component({
  components: { simplebar, NodeLink, NodeSpan },
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
    const createItem = (time: number, action: string, element, agent) => {
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
          color: 'blue'
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

      if (item.properties?.updated_time && (item.properties.updated_time !== item.properties.created_time ||  item.properties.updated_time !== item.properties.approved_time) && item.properties.created_time < maxTime) {
        createItem(item.properties.updated_time, 'updated', item, item._elements?.updated_by);        
      }
    }
    
    i.sort((a, b) => b.time! - a.time!);
    Vue.set(this, 'items', i.slice(0,100) );

  }

  public contentLoaded() {
    if (!this.source?.graph) { return; }
    this.agents = this.source.getClassElements('agent');
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
  }
}
</script>
