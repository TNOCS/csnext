<template>
  <div
    v-if="graphSource && graphSource.graph"
    style="padding: 3px; height: 100% !important"
  >
    <v-container>
      <v-toolbar elevation="0">
        <v-text-field
          v-model="searchString"
          label="Search"
          single-line
        ></v-text-field>

        <!-- <v-select
          v-model="nodeFilters"
          item-text="title"
          item-value="id"
          :items="availableNodeTypes"
          label="Types"
          multiple
        >
          <template v-slot:prepend-item>
            <v-list-item ripple @click="toggle">
              <v-list-item-action>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Select / Deselect All</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item.title }}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ nodeFilters.length - 2 }} others)</span>
          </template>
        </v-select> -->
        <v-checkbox v-model="filterIncluded"></v-checkbox>
      </v-toolbar>
    </v-container>

    <div class="sidebar-simplebar" style="top: 60px">
      <v-virtual-scroll
        v-if="graphSource"
        :items="filteredElements"
        :item-height="60"
        clientHeight="100%"
      >
        <template v-slot="{ item }">
          <v-list-item @click="selectItem(item.item)">
            <v-list-item-avatar @click.stop="toggleInclude(item.item)">
              <v-avatar
                :color="getColor(item.item)"
                size="56"
                class="white--text"
              >
                <v-icon v-if="item.item._included">bookmark</v-icon>
                <!-- {{ item.initials }} -->
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                item.item.properties.name
              }}</v-list-item-title>
              <!-- {{ item.score }} -->
              <v-list-item-subtitle v-if="item.item._featureType">
                {{ item.item._featureType.title }}
                <!-- <span v-if="item.item._incomming">
                  <v-icon small>arrow_forward</v-icon>
                  {{ item.item._incomming.length}}
                </span>
                <span v-if="item.item._outgoing">
                  <v-icon small>arrow_back</v-icon>
                  {{ item.item._outgoing.length}}
                </span> -->
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-layout>
                <v-btn @click.stop="showInfo(item.item)" icon>
                  <v-icon color="darken-4">info</v-icon>
                </v-btn>
                <v-btn @click.stop="toggleInclude(item.item)" icon>
                  <v-icon color="darken-4">scatter_plot</v-icon>
                </v-btn>
              </v-layout>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </div>
  </div>
</template>

<style scoped>
.bookmark-element-active {
  background-color: blue;
}
</style>


<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { DocDatasource } from '../../';
import FuseResult from 'fuse.js';
import Fuse from 'fuse.js';
import { FeatureType, GraphElement } from '@csnext/cs-data';

@Component({
  name: 'graph-elements',
})
export default class GraphElements extends WidgetBase {
  public get graphSource(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public get filteredElements(): FuseResult<GraphElement>[] {
    let res: FuseResult<GraphElement>[] = [];
    if (this.graphSource && this.graphSource.graph && this.graphSource.fuse) {
      // if (!this.searchString) { this.searchString = ''; }
      if (!this.searchString) {
        res = this.graphSource
          .getClassElements(this.widget.data?.classFilter || 'node', true)
          .map((s) => {
            return { score: 0, item: s } as any;
          });
        // this.graphSource.fuse.search()
        // res = Object.values(this.graphSource.graph).filter(e => e.type === 'node').map(s => { return { score: 0, item: s} as any})
      } else {
        res = this.graphSource.fuse.search<GraphElement>(
          this.searchString
        ) as any;

        // }    ?
        // return Object.values(this.graphSource.graph).filter((f : GraphElement) => {
        //   return (
        //     f.type === "node" &&
        //     !f.isType &&
        //     f.classId &&
        //     (!this.filterIncluded || f._included) &&
        //     this.nodeFilters.includes(f.classId)
        //     // (this.searchString && this.searchString === "" ||
        //     //   f._search?.toLowerCase().includes(this.searchString.toLowerCase())
        //     //   )
        //   );
        // });
      }
    }
    return res; //.map(s => s.item);
  }

  public toggle() {
    if (this.nodeFilters.length > 0) {
      this.nodeFilters = [];
    } else {
      this.nodeFilters = this.availableNodeTypes.map((e) => e.type ?? '');
    }
  }

  public filterIncluded: boolean = false;

  public allSelected() {
    return this.nodeFilters.length === this.availableNodeTypes.length;
  }

  public someSelected() {
    return this.nodeFilters.length > 0 && !this.allSelected();
  }

  public get icon() {
    if (this.allSelected()) return 'mdi-close-box';
    if (this.someSelected()) return 'mdi-minus-box';
    return 'mdi-checkbox-blank-outline';
  }

  public nodeFilters: string[] = [];
  public searchString: string = '';

  constructor() {
    super();
  }

  public get availableNodeTypes(): FeatureType[] {
    if (this.graphSource?.featureTypes) {
      return Object.values(this.graphSource.featureTypes);
    }
    return [];
  }

  public includeItem(element: GraphElement) {
    if (!this.graphSource) {
      return;
    }
    this.graphSource.createKGView([element], 'default');
    // element._included = true;
    // this.graphSource!.bus.publish("filter", "_included", element);
    // this.graphSource?.selectElement(element);
  }

  public showInfo(element: GraphElement) {
    if (!this.graphSource) {
      return;
    }
    this.graphSource.openElement(element);
  }

  public selectItem(element: GraphElement) {
    // element._included = true;
    // this.graphSource!.bus.publish("filter", "_included", element);
    // this.graphSource?.selectElement(element, false);
  }

  public toggleInclude(element: GraphElement) {
    if (!this.graphSource) {
      return;
    }
    // this.graphSource.addElementToPreset(element, true, 'default');
    this.graphSource.createKGView([element], 'default');
    $cs.triggerNotification({
      title: `${element.properties!.name} added to graph`,
    });
    // element._included = !element._included;
    // this.graphSource.triggerUpdateGraph();
  }

  public getColor(element: GraphElement) {
    return GraphElement.getBackgroundColor(element);
  }

  public mounted() {
    this.contentLoaded();
  }

  public contentLoaded() {
    if (this.graphSource) {
      if (this.widget?.data?.nodeFilters) {
        this.nodeFilters = this.widget.data.nodeFilters;
      } else {
        this.nodeFilters = this.availableNodeTypes.map((e) => e.type ?? '');
      }
      setTimeout(() => {
        this.$forceUpdate();
      }, 200);
    }
  }
}
</script>
