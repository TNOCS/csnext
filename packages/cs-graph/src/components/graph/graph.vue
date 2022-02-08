<template>
  <div v-if="source" style="position: aboslute; left: 0; right: 0; top: 0; bottom: 0">
    <!-- <span v-if="activePreset._visibleNodes">{{activePreset._visibleNodes.length}}</span> -->
    <!-- <v-tabs v-if="showTabs" v-model="tab">
      <v-tab
        v-for="(preset, pindx) in source.graphPresets"
        :value="tab"
        :key="pindx"
      >
        {{ preset.title }}
      </v-tab>
    </v-tabs> -->
    <!-- <div id="kg-vis" class="graph-canvas"></div> -->

    <draggable @add="onDrop" :disabled="!dropEnabled" :sort="false" :options="dropOptions" class="landing-area">
      <div id="kg-vis" class="graph-canvas"></div>
    </draggable>

    <cs-widget v-if="options.showInfoWidget && $cs.activeInfoWidget" class="graph-info-widget" :widget="$cs.activeInfoWidget"></cs-widget>

    <v-toolbar flat class="graph-menu" v-if="activePreset">
      <v-layout id="dropdown-example-2" class="graph-toolbar-menu">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed fab icon outlined v-bind="attrs" v-on="on" raised>
              <v-icon v-if="activePreset.properties.editor_mode === 'EDIT'">mdi-pencil</v-icon>
              <v-icon v-if="activePreset.properties.editor_mode === 'VIEW'">mdi-eye</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="setEditorMode('EDIT')">
              <v-icon>mdi-pencil</v-icon>
              <v-list-item-title>Edit Mode</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setEditorMode('VIEW')">
              <v-icon>mdi-eye</v-icon>
              <v-list-item-title>View Mode</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <v-text-field
            filled
            rounded
      
            dense
            class="graph-search"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field> -->
        <v-layout v-if="activePreset && activePreset._stats" class="drag-types-container">
          <!-- <v-menu v-model="pinMenu" :close-on-content-click="false" :nudge-width="200" offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-pin</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text @click="pinMenu = false"> Cancel </v-btn>
                <v-btn color="primary" text @click="pinMenu = false"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu> -->
          <draggable v-model="activePreset._stats" @start="dropEnabled = true" @end="dropEnabled = false" :options="availableItems" :sort="false">
            <v-chip
              @click="toggleFeatureType(id)"
              v-for="(stat, id) of activePreset._stats"
              :key="id"
              label
              :data-classId="stat._featureType.type"
              :data-source="graph"
              :color="stat.color"
              class="ml-2 drag-type"
              :outlined="stat.hide"
            >
              <v-icon v-if="stat.pinned" left>mdi-pin-outline</v-icon>
              <v-icon v-if="stat._featureType.icon" left>{{ stat._featureType.icon }}</v-icon>
              {{ stat._featureType.title }}
              <v-avatar right dark class="darken-4">
                {{ stat.count }}
              </v-avatar>
            </v-chip>
          </draggable>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn text>
          <v-icon>mdi-selection</v-icon>
          <span v-if="activePreset._selectedElements && activePreset._selectedElements.length > 0">{{ activePreset._selectedElements.length }}</span>
        </v-btn>
        <v-btn @click="fitGraph()" icon>
          <v-icon>mdi-fit-to-screen</v-icon>
        </v-btn>
        <v-btn v-if="activePreset.elementsEnabled" @click="emptyGraph()" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn @click="openSettings()" icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <v-btn @click="save()" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn @click="refresh()" icon>
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <!-- <v-btn @click="openEditor()" icon>
          <v-icon>mdi-format-list-bulleted-type</v-icon>
        </v-btn> -->
        <!-- <v-overflow-btn      
      :items="featureTypes"
      label="Overflow Btn w/ segmented"
      segmented
      target="#dropdown-example-2"
    ></v-overflow-btn> -->

        <!-- <v-text-field
            label="Outlined"
            placeholder="Placeholder"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
          ></v-text-field> -->
        <!-- <span v-if="activePreset">{{ activePreset.id }} - </span> -->
      </v-layout>
    </v-toolbar>

    <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute :close-on-content-click="false" open-on-hover offset-y>
      <v-list>
        <v-list-group v-for="(item, i) in contextMenuitems" :key="i" v-model="item.active" :prepend-icon="item.icon" no-action @click="item.action">
          <template v-slot:appendIcon>
            <span v-if="item.items && item.items.length > 0">{{ item.items.length }}</span>
            <span v-else></span>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-if="item.items" v-for="(subItem, si) in item.items" :key="si" :prepend-icon="subItem.icon" @click="subItem.action">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped>
.graph-info-widget {
  position: absolute;
  bottom: 5px;
  left: calc(50% - 250px);
  width: 500px;
  min-height: 50px;
  max-height: 100px;
}

.left-right-template {
  position: relative;
  /* display: grid; */
  /* background: red;
  grid-template-columns: 50% 50%;
  grid-template-areas: 'left right'; */
}
.graph-focus-date {
  position: absolute;
  top: 50px;
  left: 10px;
  font-size: 24px;
}

.graph-toolbar-menu {
  align-items: center;
}

.graph-menu {
  position: absolute;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: gray;

  left: 0;
  right: 0;
  top: 0;
}

.graph-search {
  max-width: 200px;
}

.graph-canvas {
  /* background-color: green !important; */
  position: absolute;
  grid-area: 'left';
  left: 10px;
  right: 0;
  bottom: 0;
  top: 80px;
}

.type-hide {
  font-weight: 600;
}

.hide-type {
  opacity: 0.5;
}

.vis-network {
  outline: none !important;
}

.drag-type {
  cursor: crosshair;
}

.g6-component-contextmenu {
  position: absolute;
  z-index: 2;
  list-style-type: none;
  background-color: #363b40;
  border-radius: 6px;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.85);
  width: fit-content;
  transition: opacity 0.2s;
  text-align: center;
  padding: 0px 20px 0px 20px;
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
  border: 0px;
}
.g6-component-contextmenu ul {
  padding-left: 0px;
  margin: 0;
}
.g6-component-contextmenu li {
  cursor: pointer;
  list-style-type: none;
  list-style: none;
  margin-left: 0;
  line-height: 38px;
}
.g6-component-contextmenu li:hover {
  color: #aaaaaa;
}
</style>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';

import {
  GraphDatasource,
  GraphObject,
  GraphElement,
  GraphPreset,
  PropertyValueType,
  IGraphNodeDefinition,
  IGraphFilter,
  FilterGraphElement,
  GraphLayout,
} from '@csnext/cs-data';
import { IMenu } from '@csnext/cs-core';
import G6, { Graph, NodeConfig, GraphData, Menu, LayoutConfig } from '@antv/g6';
import { guidGenerator } from '@csnext/cs-core';

import Vue from 'vue';
import debounce from 'lodash/debounce';
import { GraphWidgetOptions } from './graph-widget-options';
import { DefaultElementCard, DocDatasource, GraphShape, mdiFont } from '../..';
import GraphSettings from './graph-settings.vue';
import draggable from 'vuedraggable';

// import { GraphWidgetOptions, DefaultElementCard, DocDatasource, mdiFont, GraphSettings, GraphShape } from '@csnext/cs-graph';

@Component({
  components: {
    draggable,
  },
})
export default class NetworkGraph extends WidgetBase {
  public data: GraphData = { nodes: [], edges: [] };
  private showTabs = true;
  private showMenu = false;
  private x = 0;
  private y = 0;
  private tab: any = null;
  public pinMenu = false;
  public activePreset?: FilterGraphElement | null = null;
  public dragInitialized = false;

  public dropEnabled = false;
  // private featureTypes?: string[] | null = null;

  private graph?: Graph;
  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  @Watch('tab')
  tabChanged() {}

  private settingsUpdatedDebounce = debounce(this.settingsUpdated, 200);
  private viewportDebounce = debounce((graph: Graph) => {
    if (!graph) {
      return;
    }
    // graph.getViewPortCenterPoint();
    const zoom = graph.getZoom();
    const center = graph.getGraphCenterPoint();
    const p = graph.getPointByCanvas(0, 0);
    console.log(p);

    console.log(zoom);
    $cs.updateRouteQuery({ gz: zoom, gx: center!.x, gy: center!.y });
  }, 1000);

  public toggleFeatureType(id: string) {
    if (!this.activePreset?._stats || !this.source?.graph) {
      return;
    }
    if (this.activePreset._stats.hasOwnProperty(id)) {
      this.activePreset._stats[id].hide = !this.activePreset._stats[id].hide;
      this.updateGraph(this.source.graph, true);
      this.$forceUpdate();
    }
  }

  public dropOptions = {
    group: 'items',
    enabled: false,
  };

  public availableItems = {
    group: {
      name: 'items',
      pull: 'clone',
      put: false,
    },
    sort: false,
  };

  public openSettings() {
    $cs.openRightSidebarWidget(
      {
        component: GraphSettings,
        datasource: this.source!.id,
        data: {
          preset: this.activePreset?.id,
        },
        options: {
          title: 'Settings',
        },
      },
      { open: true },
      'graphsettings'
    );
  }

  public contextMenuitems: any[] = [];

  settingsChanged() {
    this.settingsUpdatedDebounce();
  }

  public setEditorMode(mode: string) {
    if (this.activePreset?.properties) {
      Vue.set(this.activePreset!.properties!, 'editor_mode', mode);
    }
  }

  graphChanged() {
    if (!this.graph || !this.source?.graph) {
      return;
    }
    console.log('graph changed');
    this.graph.updateLayout(this.getLayout());
    this.graph.layout();
    this.initGraph(true);
    this.updateGraph(this.source.graph, true);
    this.graph.render();
  }

  public settingsUpdated() {
    if (this.source && this.source.graph) {
      console.log('update settings');
    }
  }

  constructor() {
    super();
  }

  public updateMenu(menu: IMenu) {
    if (this.widget.options) {
      if (!this.widget.options.menus) {
        this.widget.options.menus = [];
      }
      if (this.widget.options.menus.findIndex((m) => m.id === menu.id) === -1) {
        this.widget.options.menus.push(menu);
      }
    }
  }

  // private getElementImage(e: GraphElement) {
  //   if (
  //     this.source?.base_url &&
  //     e._featureType?.iconProperty &&
  //     e.properties &&
  //     e.properties.hasOwnProperty(e._featureType.iconProperty)
  //   ) {
  //     return `${this.source.base_url}/files/image/?url=${
  //       e.properties[e._featureType.iconProperty]
  //     }`;
  //   }
  //   if (e._featureType?.icon && this.source?.base_url) {
  //     return `${this.source.base_url}/files/image/?url=${e._featureType.icon}`;
  //   }
  //   return null; //'images/Flag_of_Russia.svg';
  // }

  private getNodeColor(e: GraphElement) {
    if (e.classId === 'indicator') {
      switch (e.properties?.assessment) {
        case 1:
          return '#1a9641';
        case 2:
          return '#a6d96a';
        case 3:
          return '#ffffbf';
        case 4:
          return '#fdae61';
        case 5:
          return '#d7191c';
        default:
          return '#c0c2c0';
      }
    }
    return GraphElement.getBackgroundColor(e);
  }

  private updateNode(e: GraphElement, force = false) {
    if (!e.id || !e.classId || !this.graph || !this.data || !this.data.nodes || !this.source || !this.activePreset?._visibleNodes) {
      return;
    }
    let gnd: IGraphNodeDefinition = {};
    // find position
    if (this.activePreset.properties?.graphLayout?.nodes && this.activePreset.properties.graphLayout.nodes.hasOwnProperty(e.id)) {
      gnd = this.activePreset.properties.graphLayout.nodes[e.id];
    }
    let existingIndex = this.data.nodes!.findIndex((n) => n.id === e.id);
    let existing: NodeConfig | undefined = this.data.nodes[existingIndex];
    let stats = this.activePreset!._stats![e.classId];
    // get(e.id);
    const included = this.activePreset._visibleNodes.includes(e) && !stats?.hide;
    if (force && existing && this.data.nodes) {
      existing = undefined;
      this.data.nodes = this.data.nodes.filter((n) => n.id !== e.id);
    }

    let graphShapeAttr: string | undefined = undefined;
    let graphShape: GraphShape | undefined = undefined;

    if (!this.activePreset?.properties?.graphLayout?.disableCustomNodes && e._featureType?.attributes!['graph:node'] && this.source?.graphShapeDefinitions?.nodes) {
      graphShapeAttr = e._featureType?.attributes!['graph:node'];
      graphShape = this.source.graphShapeDefinitions.nodes.find((s) => s.name === graphShapeAttr);
    }

    if (included && e.properties?.name) {
      let nodewidth = this.activePreset.properties?.graphLayout?.nodeSize ?? 50;
      if (e.properties?.nodegraphlayout === 'modelRect') {
        nodewidth = 200;
      }

      const icon = e._featureType?.icon ?? '';

      let node = {
        id: e.id,
        label:
          this.activePreset?.properties?.graphLayout?.hideNodeLabel || graphShape?.hideLabel
            ? undefined
            : this.fittingString(e.properties?.name, 80, this.activePreset.properties?.graphLayout?.globalFontSize ?? 12), // this.labelFormatter(e._title!, this.settings.labelMaxLength),
        // hidden: this.graphSource.getHidden(
        //   e,
        //   this.settings
        // ),
        //   cluster: e._featureType?.type,
        //   img: this.getElementImage(e),
        // element: e,
        size: nodewidth,
        x: gnd?.x,
        y: gnd?.y,
        iconText: icon,
        width: nodewidth,
        color: this.getNodeColor(e),
        height: 30,
        // icon: {
        //   show: true,
        // },
        type: e.properties?.graphLayout?.nodegraphlayout ?? graphShapeAttr ?? 'main-node',
        style: {
          fill: this.getNodeColor(e), // GraphElement.getBackgroundColor(e),
          fontFamily: 'Roboto, sans-serif',
        },
        labelCfg: {
          style: {
            fontSize: this.activePreset.properties?.graphLayout?.globalFontSize ?? 12,
            fontFamily: 'Roboto, sans-serif',
          },
        },
      } as any;

      e._group = GraphElement.getGroup(e);

      if (!existing) {
        this.data?.nodes?.push(node);
        if (e._elements) {
          for (const el of Object.values(e._elements)) {
            const checkElementLink = (el) => {
              const toElement = this.activePreset!._visibleNodes!.includes(el);
              if (toElement) {
                console.log('create link ' + el.id);
              }
            };
            if (Array.isArray(el)) {
              for (const l of el) {
                checkElementLink(l);
              }
            } else {
              checkElementLink(el);
            }
          }
        }
        if (e._outgoing) {
          for (const outgoing of e._outgoing) {
            const outIncluded = this.activePreset._visibleNodes.includes(outgoing);
            if (outgoing.to) {
              const toIncluded = this.activePreset._visibleNodes.includes(outgoing.to);
              if (!outIncluded && toIncluded) {
                this.updateEdge(outgoing);
              }
            }
          }
        }

        if (e._incomming) {
          for (const incomming of e._incomming) {
            const inIncluded = this.activePreset._visibleNodes.includes(incomming);
            if (incomming.from) {
              const fromIncluded = this.activePreset._visibleNodes.includes(incomming.from);
              if (!inIncluded && fromIncluded) {
                this.updateEdge(incomming);
              }
            }
          }
        }
      } else {
        this.graph.update(node.id, node);
        this.data.nodes![existingIndex] = node;
      }
    } else if (existing && !included) {
      this.graph.remove(e.id);
    }
  }

  private updateEdge(e: GraphElement) {
    if (!this.data || !this.graph || !this.source || !this.activePreset || !e.id) {
      return;
    }

    let existing = this.data.edges!.find((n) => n.id === e.id);

    // console.log("Adding edge");
    const label = e._featureType?.title ?? e.classId;

    if (!existing) {
      let edge = {
        id: e.id,
        source: e.fromId,
        target: e.toId,
        type: e._featureType?.attributes!['graph:edge'] ?? 'default',
        style: {
          endArrow: {
            path: G6.Arrow.triangle(),
          },
          lineWidth: 6,
        },
        labelCfg: {
          autoRotate: true,
          // refY: 10,
          style: {
            autoRotate: true,
            // fill: '#1890ff',
            // background: {
            //   fill: '#ffffff',
            //   stroke: '#9EC9FF',
            //   padding: [2, 2, 2, 2],
            //   radius: 2,
            // },
            fontSize: this.activePreset.properties?.graphLayout?.globalFontSize,
          },
        },
        hidden: this.source.getHidden(e, this.activePreset),
        title: label,
        label: this.activePreset?.properties?.graphLayout?.hideEdgeLabel
          ? undefined
          : this.fittingString(label ?? '', 80, this.activePreset?.properties?.graphLayout?.globalFontSize ?? 12),
        arrows: 'to',
      } as any;
      this.data?.edges?.push(edge);
    }

    // if (!existing) {

    // } else {
    //   console.log('remove ' + edge.id);
    //   this.graph.remove(edge.id);
    // }
  }

  public fitGraph() {
    if (this.graph) {
      this.graph.fitView(20);
    }
  }

  private fittingString(str: string, maxWidth: number, fontSize: number) {
    let currentWidth = 0;
    let res = str;
    const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
    str.split('').forEach((letter: string, i: number) => {
      if (currentWidth > maxWidth) return;
      if (pattern.test(letter)) {
        // Chinese charactors
        currentWidth += fontSize;
      } else {
        // get the width of single letter according to the fontSize
        currentWidth += G6.Util.getLetterWidth(letter, fontSize);
      }
      if (currentWidth > maxWidth) {
        res = `${str.substr(0, i)}\n${str.substr(i)}`;
      }
    });
    return res;
  }

  public getLayout() {
    if (!this.activePreset) {
      return;
    }
    const preventOverlap = true;
    if (!this.activePreset.properties) {
      this.activePreset.properties = {};
    }
    if (!this.activePreset.properties.graphLayout) {
      this.activePreset.properties.graphLayout = {};
    }
    if (!this.activePreset.properties!.graphLayout!.layout) {
      this.activePreset.properties!.graphLayout.layout = 'force';
    }
    let layout: LayoutConfig = {
      type: this.activePreset.properties?.graphLayout.layout,
      preventOverlap,
    };
    switch (this.activePreset.properties.graphLayout.layout) {
      case 'manual':
        break;
      case 'force':
        layout = {
          ...layout,
          ...{
            type: 'force',
            gravity: this.activePreset.properties.graphLayout.gravity ?? 10,
            preventOverlap,
            speed: this.activePreset.properties.graphLayout.speed ?? 25,
            nodeStrength: this.activePreset.properties.graphLayout.nodeStrength ?? 100,
            nodeSpacing: this.activePreset.properties.graphLayout.nodeSpacing ?? 150,
            clustering: this.activePreset.properties.graphLayout.clustering ?? false,
            collideStrength: this.activePreset?.properties?.graphLayout.collideStrength ?? 0.1,
            workerEnabled: false,
            linkDistance: this.activePreset?.properties?.graphLayout.linkDistance ?? 150,
          },
          // ...{
          //   linkDistance: 50, // Edge length
          //   nodeStrength: 30,
          //   edgeStrength: 0.1,
          //   collideStrength: 0.8,
          //   preventOverlap: false,
          //   nodeSize: 30,
          //   alpha: 0.3,
          //   alphaDecay: 0.028,
          //   alphaMin: 0.01,
          //   forceSimulation: null,
          // },
        };
        break;
      case 'dagre':
        layout = {
          ...layout,
          ...{
            rankdir: this.activePreset.properties.graphLayout.rankdir ?? 'TB',
            align: this.activePreset.properties.graphLayout.align ?? 'UL',
            preventOverlap,
          },
        };
        break;
      case 'forceAtlas2':
        layout = {
          ...layout,
          ...{
            preventOverlap,
            kr: this.activePreset.properties.graphLayout.kr ?? 10,
          },
        };
        break;
      case 'gForce':
        layout = {
          ...layout,
          ...{
            // preventOverlap,
            linkDistance: this.activePreset.properties.graphLayout.linkDistance ?? 1,
            // maxIteration: this.activePreset.properties.graphLayout.maxIteration ?? 500,
            // nodeStrength: this.activePreset.properties.graphLayout.nodeStrength ?? 1000,
            // edgeStrength: this.activePreset.properties.graphLayout.edgeStrength ?? 200,
            // gpuEnabled: true,
            // workerEnabled: true,
            type: 'gForce',
            gpuEnabled: true,
            animate: false,
            maxIteration: 500,
            gatherDiscrete: true,
            // descreteGravity: 200,
            // linkDistanceFunc: (e) => {
            //   if (e.source === '0') return 10;
            //   return 10;
            // },
            getMass: (d: any) => {
              if (d.id === '0') return 100;
              return 1;
            },

            // linkDistance: (e) => {
            //   if (e.source === '0') return 100;
            //   return 1;
            // },
          },
        };
        break;
      case 'circular':
        layout = {
          ...layout,
          ...{
            radius: 400,
            startRadius: 10,
            endRadius: 100,
            clockwise: false,
            divisions: 5,
            ordering: 'degree',
            angleRatio: 1,
          },
        };
        break;
      case 'grid':
        layout = {
          ...layout,
          ...{
            sortBy: 'cluster',
          },
        };
        break;
      case 'concentric':
        layout = {
          ...layout,
          ...{
            maxLevelDiff: 0.5,
            preventOverlap,

            sortBy: 'degree',
          },
        };
        break;
      case 'radial':
        layout = {
          ...layout,
          ...{
            linkDistance: this.activePreset.properties.graphLayout.linkDistance ?? 50,
            unitRadius: this.activePreset.properties.graphLayout.unitRadius ?? 50,
            preventOverlap,
          },
        };
        break;
      case 'mds':
        layout = {
          ...layout,
          ...{
            linkDistance: this.activePreset.properties.graphLayout.linkDistance ?? 50,
          },
        };
        break;
      case 'fruchterman':
        layout = {
          ...layout,
          ...{
            gravity: this.activePreset.properties.graphLayout.gravity ?? 1,
            clustering: this.activePreset.properties.graphLayout.clustering ?? false,
            clusterGravity: this.activePreset.properties.graphLayout.clusterGravity ?? 10,
            speed: this.activePreset.properties.graphLayout.speed ?? 5,
            // maxIteration: 1000,
            tick: () => {
              this.graph!.refreshPositions();
            },
          },
        };
        break;
    }
    return layout;
  }

  public addElement(e: GraphElement): boolean {
    if (!this.activePreset || !e.classId || !e._featureType) {
      return false;
    }
    if (!this.activePreset._stats) {
      this.activePreset._stats = {};
    }
    if (!this.activePreset!._visibleNodes!.includes(e)) {
      this.activePreset!._visibleNodes!.push(e);
      if (!this.activePreset!._stats.hasOwnProperty(e.classId)) {
        this.activePreset._stats[e.classId] = {
          _featureType: e._featureType,
          count: 0,
          hide: false,
          color: GraphElement.getBackgroundColor(e),
        };
      }
      this.activePreset._stats[e.classId].count! += 1;
      return true;
    }
    return false;
  }

  public emptyStats() {
    if (!this.activePreset || !this.source) {
      return;
    }
    if (!this.activePreset._stats) {
      this.activePreset._stats = {};
    }

    if (this.activePreset.properties?.graphLayout?.pinnedFeatureTypes) {
      for (const ft of this.activePreset.properties.graphLayout.pinnedFeatureTypes) {
        if (!this.activePreset._stats!.hasOwnProperty(ft)) {
          const f = this.source.getFeatureTypeById(ft);
          this.activePreset._stats![ft] = {
            count: 0,
            hide: false,
            pinned: true,
            color: f?.color ?? 'gray',
            _featureType: f,
          };
        }
      }
    }
    if (this.activePreset._stats) {
      for (const stat of Object.values(this.activePreset._stats)) {
        stat.count = 0;
      }
    } else {
    }
  }

  public updateGraph(graph: GraphObject, redraw = false) {
    if (!this.source || !this.graph || !this.activePreset) {
      return;
    }
    console.log('update graph');
    if (!this.data || redraw) {
      this.data = { nodes: [], edges: [] };
      this.graph.data(this.data);
    }

    if (!this.activePreset._visibleNodes) {
      this.activePreset._visibleNodes = [];
      this.emptyStats();
    }

    // get visible nodes from rules
    if (this.activePreset?.properties?.graphLayout?.nodeRules) {
      this.activePreset._visibleNodes = [];
      this.emptyStats();
      this.source.applyGraphPresetRules(this.activePreset, this.activePreset.properties.graphLayout.nodeRules);

      // this.updateRules(this.activePreset.properties.graphLayout.nodeRules);
    }

    // check for visible nodes in node list
    if (this.activePreset.properties?.graphLayout?.nodes) {
      for (const nid of Object.keys(this.activePreset.properties?.graphLayout.nodes)) {
        const node = this.activePreset.properties.graphLayout.nodes[nid];
        if (!node.preset && this.activePreset._visibleNodes.findIndex((n) => n.id === nid) === -1) {
          const e = this.source.getElement(nid);
          if (e) {
            node._element = e;
            this.addElement(e);
          }
        }
      }
    }

    for (const e of this.activePreset._visibleNodes) {
      this.updateNode(e, redraw);
    }

    for (const e of this.activePreset._visibleNodes) {
      if (e._outgoing) {
        for (const outgoing of e._outgoing) {
          if (this.activePreset._visibleNodes.findIndex((n) => n.id === outgoing?.toId) !== -1) {
            this.updateEdge(outgoing);
          }
        }
      }
    }

    if (this.data.nodes) {
      for (const node of this.data.nodes) {
        if (this.activePreset._visibleNodes.findIndex((n) => n.id === node.id) === -1) {
          this.data.nodes = this.data.nodes.filter((f) => f.id !== node.id!);
        }
      }
    }

    if (this.data.edges && this.source?.graph) {
      this.data.edges = this.data.edges.filter((e) => e.id !== undefined && this.source!.graph!.hasOwnProperty(e.id!.toString()));
    }

    if (this.graph) {
      this.graph.data(this.data);
      this.graph.refresh();
      this.graph.render();
      this.graph.paint();
    }
  }

  private loaded = false;

  public updateGraphLayout() {
    if (!this.graph) {
      return;
    }
    this.initGraph(true);
    console.log(this.graph);
  }

  public contentLoaded() {
    if (this.loaded) {
      return;
    }

    this.busManager.subscribe(this.source!.events, GraphDatasource.GRAPH_EVENTS, (a) => {
      if (a === GraphDatasource.GRAPH_LOADED) {
        this.contentLoaded();
      }
    });

    if (!this.source?.featureTypes) {
      return;
    }

    this.loaded = true;

    this.registerShapes();
    this.registerBehaviors();
    this.initPreset();
    // this.initDragging();

    setTimeout(() => {
      console.log('content loaded');
      if (this.source?.graph) {
        this.initGraph(false);

        this.updateGraph(this.source.graph, true);

        this.$forceUpdate();

        this.busManager.subscribe(this.source!.events, IGraphFilter.GRAPH_FILTER, () => {
          this.updateGraph(this.source!.graph!, false);
        });

        this.busManager.subscribe(this.source!.events, GraphDatasource.PRESET_EVENTS, (a: string, d: GraphPreset) => {
          if (!this.source?.graph) {
            return;
          }
          if (d.id === this.activePreset?.id) {
            if (a === GraphDatasource.PRESET_CHANGED) {
              this.activePreset = d;
              this.initGraph(true);
              this.updateGraph(this.source.graph, true);
            }
            if (a === GraphDatasource.PRESET_LAYOUT_CHANGED) {
              // this.updateGraphLayout();
              this.initGraph(true);
              this.updateGraph(this.source.graph, true);
              this.resize();
              // this.graph.refresh();
            }
            if (a === GraphDatasource.PRESET_ACTIVATED) {
              this.emptyGraph();
              // this.tab = this.source.graphPresets.indexOf(d);
              this.initGraph();
              this.$forceUpdate();
            }
          }
        });

        this.busManager.subscribe(this.source!.events, GraphDatasource.GRAPH_EVENTS, (a: string, d: GraphElement) => {
          if (!this.activePreset || !this.graph) {
            return;
          }
          if (a === GraphDatasource.ELEMENT_ADDED) {
            this.updateGraph(this.source!.graph, false);
          }
          if (a === GraphDatasource.ELEMENT_REMOVED) {
            if (d.id && this.activePreset?.properties?.graphLayout?.nodes && this.activePreset.properties.graphLayout.nodes.hasOwnProperty(d.id)) {
              delete this.activePreset.properties.graphLayout.nodes[d.id];
              this.activePreset._visibleNodes = this.activePreset._visibleNodes.filter((n) => n !== d);
              this.updateGraph(this.source!.graph, false);
            }
          }
          if (a === GraphDatasource.EDGE_REMOVED) {
            this.updateGraph(this.source!.graph, true);
          }
          if (a === GraphDatasource.ELEMENT_UPDATED && d && this.activePreset?._visibleNodes) {
            if (this.activePreset._visibleNodes.includes(d)) {
              //  this.graph.render();
              this.updateGraph(this.source!.graph, false);
            }
          }
          if (a === GraphDatasource.GRAPH_UPDATED) {
            if (d) {
              this.updateNode(d);
              if (d._outgoing && this.source?.availableEdgeTypes) {
                for (const outgoing of d._outgoing.filter((o) => o.to)) {
                  if (
                    outgoing.classId &&
                    this.source.availableEdgeTypes.hasOwnProperty(outgoing.classId) &&
                    this.source.availableEdgeTypes[outgoing.classId]._visible
                  ) {
                    if (outgoing.to) {
                      this.updateNode(outgoing.to);
                      this.updateEdge(outgoing);
                    }
                  }
                }
              }
              if (d._incomming && this.source?.availableEdgeTypes) {
                for (const incomming of d._incomming.filter((i) => i.from)) {
                  if (
                    incomming.classId &&
                    this.source.availableEdgeTypes.hasOwnProperty(incomming.classId) &&
                    this.source.availableEdgeTypes[incomming.classId]._visible
                  ) {
                    if (incomming.from) {
                      this.updateNode(incomming.from);
                      this.updateEdge(incomming);
                    }
                  }
                }
              }
            } else {
              this.updateGraph(this.source!.graph);
            }
            this.graph.data(this.data);
            this.graph.render();
            this.graph.paint();

            // this.network?.redraw();
          }
        });
      }
    }, 100);
  }

  public refresh() {
    if (!this.options || !this.source) {
      return;
    }

    if (!this.options.preset) {
      this.options.preset = this.source.activeDocument as unknown as GraphPreset;
    }
    if (this.source && this.options?.preset) {
      if (typeof this.options.preset === 'string') {
        this.activePreset = this.source.getGraphPreset(this.options.preset) as GraphPreset;
      } else {
        this.activePreset = this.options.preset;
      }
      this.initGraph(true);
      // this.$forceUpdate();
      this.updateGraph(this.source!.graph, true);
      this.resize();
      // this.graph.data(this.data);
      // this.graph.render();
    }
  }

  refreshDragedNodePosition(e: any) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }

  public updateContextMenu(a: any) {
    console.log('update context menu');
    if (this.source && a.item?._cfg?.id) {
      this.contextMenuitems = [];
      const element = this.source.getElement(a.item._cfg.id);
      if (!element) { return; }
      if (!element.properties) {
        element.properties = {};
      }

      switch (element?.type) {
        case 'node':
          const outgoingMenu = {
            title: 'outgoing',
            active: true,
            icon: 'mdi-arrow-right',
            action: () => {},
            items: [
              //   {
              //   title: 'all',
              //   action: ()=> {
              //     this.source?.addRelationsToPreset(element);
              //   }
              // }
            ] as any[],
          };
          const incommingMenu = {
            title: 'incoming',
            active: true,
            icon: 'mdi-arrow-left',
            action: () => {},
            items: [
              //   {
              //   title: 'all',
              //   action: ()=> {
              //     this.source?.addRelationsToPreset(element);
              //   }
              // }
            ] as any[],
          };
          const linkMenu = {
            title: 'link',
            active: false,
            icon: 'mdi-plus',
            action: () => {},
            items: [] as any[],
          };

          const createMenu = {
            title: 'create',
            active: false,
            icon: 'mdi-plus',
            action: () => {},
            items: [] as any[],
          };
          if (element._featureType?.properties) {
            for (const props of element._featureType.properties) {
              if (props.type === PropertyValueType.relation && props.relation?.type && props.relation?.objectType) {
                linkMenu.items.push({
                  title: props.label || props.relation.type,
                  action: async () => {
                    alert(props.label);
                  },
                });
                createMenu.items.push({
                  title: props.label || props.relation.type,
                  action: async () => {
                    const type = this.source?.findObservation(props.relation?.objectType!);
                    if (!type || !this.source || !this.activePreset?.id) {
                      return;
                    }
                    let name = `new ${type.type}`;

                    name = await $cs.triggerInputDialog('Name', 'enter new name', name);

                    const newNode = await this.source.addNewNode({
                      id: `${type.type}-${guidGenerator()}`,
                      properties: { name },
                      classId: type.type,
                    });
                    if (newNode?.id && element.id && props?.relation?.type) {
                      await this.source.addEdge({
                        classId: props.relation.type,
                        fromId: element.id,
                        toId: newNode.id,
                      } as GraphElement);
                      this.source.createKGView([newNode], this.activePreset.id);
                    }
                  },
                });
              }
            }
          }

          if (this.activePreset?._visibleNodes && element._incomming && element._incomming.length > 0) {
            for (const relation of element._incomming.filter((i) => i.from && !this.activePreset!._visibleNodes.includes(i.from))) {
              const items = incommingMenu.items.filter((r) => r.title === relation.from?.classId);
              if (items.length === 0) {
                // find prop
                let relationtitle = relation.from?.classId;

                incommingMenu.items.push({
                  title: relationtitle!,
                  action: () => {
                    if (element && this.activePreset?.id && relation?.classId) {
                      this.source?.addRelationsToPreset(element, this.activePreset.id, relation.classId);
                    }
                  },
                });
              }
            }
          }

          if (element?._outgoing && this.activePreset?._visibleNodes) {
            for (const relation of element._outgoing.filter((i) => i.to && !this.activePreset!._visibleNodes!.includes(i.to))) {
              if (outgoingMenu.items.findIndex((r) => r.title === relation.to?.classId) === -1) {
                // find prop
                let relationtitle = relation.to?.classId;
                outgoingMenu.items.push({
                  title: relationtitle!,
                  action: () => {
                    if (element && this.activePreset?.id && relation?.classId) {                      
                      this.source?.addRelationsToPreset(element, this.activePreset.id, relation.classId);
                    }
                  },
                });
              }
            }
          }
          this.contextMenuitems = [];
          if (outgoingMenu.items.length > 0) {
            this.contextMenuitems.push(outgoingMenu);
          }
          if (incommingMenu.items.length > 0) {
            this.contextMenuitems.push(incommingMenu);
          }
          if (createMenu.items.length > 0) {
            this.contextMenuitems.push(createMenu);
          }
          if (linkMenu.items.length > 0) {
            this.contextMenuitems.push(linkMenu);
          }
          this.contextMenuitems.push({
            title: 'delete',
            icon: 'mdi-delete',
            action: () => {
              if (element && this.activePreset?.id) {
                this.source!.removeNode(element)
                  .then((r) => {
                    this.updateGraph(this.source!.graph!);
                  })
                  .catch((e) => {});
              }
            },
          });
          this.contextMenuitems.push({
            title: 'hide',
            icon: 'mdi-eye-off',
            action: () => {
              if (element && this.activePreset?.id) {
                this.source!.removeElementFromPreset(element, this.activePreset.id);
              }
            },
          });
          this.contextMenuitems.push({
            title: 'focus',
            icon: 'mdi-image-filter-center-focus',
            action: () => {
              this.emptyGraph();
              this.source?.createKGView([element]);
            },
          });
          this.contextMenuitems.push({
            title: 'edit',
            icon: 'mdi-pencil',
            action: () => {
              this.source!.startEditElement(element);
            },
          });
          break;
        case 'edge':
          this.contextMenuitems.push({
            title: 'delete',
            icon: 'mdi-delete',
            action: () => {
              if (element && this.activePreset?.id) {
                this.source!.removeEdge(element)
                  .then((r) => {
                    this.updateGraph(this.source!.graph!);
                  })
                  .catch((e) => {});
              }
            },
          });
          if (element._featureType) {
            this.contextMenuitems.push({
              title: 'edit',
              icon: 'mdi-pencil',
              action: () => {
                this.source!.startEditElement(element);
              },
            });
          }
          break;
      }

      this.x = a.clientX;
      this.y = a.clientY;

      this.showMenu = true;
    } else {
      if (this.activePreset!.properties?.graphLayout?.elementsEnabled && this.source?.featureTypes) {
        const addMenu = {
          title: 'add',
          active: true,
          icon: 'mdi-plus',
          action: () => {},
          items: [] as any[],
        };
        for (const ft of Object.values(this.source.featureTypes)) {
          addMenu.items.push({
            title: ft.title,
            icon: ft.icon,
            action: async () => {
              const newNode = await this.source!.addNewNode({
                id: `${ft.type}-${guidGenerator()}`,
                properties: { name: 'new ' + ft.title },
                classId: ft.type,
              });
              if (newNode) {
                this.source!.addElementToPreset(newNode, this.activePreset!.id!, true, { x: this.x, y: this.y });
                this.updateGraph(this.source!.graph);
              }
            },
          });
        }

        this.x = a.clientX;
        this.y = a.clientY;
        this.contextMenuitems = [addMenu];
        this.showMenu = true;
      }
    }
  }

  public getNodeStyle() {
    if (!this.activePreset?.properties?.graphLayout?.nodeSize) {
      return {};
    }

    return {
      // shape: "donut",
      type: 'main-node',
      // type: "donut",
      size: this.source?.activeGraphPreset?.properties?.graphLayout?.nodeSize || 30,
      // size: [120, 40],
      // clipCfg: {
      //   show: true,
      //   type: 'circle',
      //   r: this.source!.activeGraphPreset!.nodeSize / 2
      // },
      style: {
        fill: '#9EC9FF',
        keepVisualSize: true,
        lineWidth: 3,
      },
      labelCfg: {
        position: 'bottom',
        autoRotate: true,
        style: {
          fill: '#000',
          fontSize: this.activePreset?.properties?.graphLayout.globalFontSize ?? 20,
        },
      },
    };
  }

  public registerBehaviors() {
    //   G6.registerBehavior('click-add-node', {
    //     getEvents() {return { 'canvas:click': 'onClick'} },
    //     onClick(ev: any) {
    //   const self = this;
    //   const node = ev.item;
    //   const graph = self.graph;
    //   // The position where the mouse clicks
    //   const point = { x: ev.x, y: ev.y };
    //   const model = node.getModel();
    //   if (self.addingEdge && self.edge) {
    //     graph.updateItem(self.edge, {
    //       target: model.id,
    //     });
    //     self.edge = null;
    //     self.addingEdge = false;
    //   } else {
    //     // Add anew edge, the end node is the current node user clicks
    //     self.edge = graph.addItem('edge', {
    //       source: model.id,
    //       target: model.id,
    //     });
    //     self.addingEdge = true;
    //   }
    // },
    //   });
  }

  public registerShapes() {
    if (!this.source) {
      return;
    }
    if (this.source?.graphShapeDefinitions) {
      this.source.graphShapeDefinitions.edges.push({
        name: 'default',
        shape: {},
        extendType: 'line',
      });

      // this.source.graphShapeDefinitions.edges.push({
      //   name: 'dialog-relation',
      //   shape: {
      //     afterDraw: (cfg: any, group: any) => {
      //       const children = group.get('children');
      //       if (this.source && cfg.id && children && children.length > 0) {
      //         const shape = children[0];
      //         const element = this.source.graph[cfg.id]!;
      //         if (element) {
      //           // console.log(element?.id)

      //           // const useOpacity = this.followedGoal ?? this.followedAction;

      //           const fromPoint = shape.getPoint(0.65);

      //           group.addShape('circle', {
      //             attrs: {
      //               r: 15,
      //               stroke: '#333',
      //               fill: '#ffffff',
      //               x: fromPoint.x,
      //               y: fromPoint.y,
      //               action: 'toggleCondition',
      //             },
      //           });

      //           let icon = '';
      //           switch (element.properties?.relation_type) {
      //             case 'increases':
      //               icon = '+';
      //               break;
      //             case 'decreases':
      //               icon = '-';
      //               break;
      //           }

      //           group.addShape('text', {
      //             attrs: {
      //               text: icon,
      //               fontSize: 26,
      //               fontWeight: 600,
      //               textAlign: 'center',
      //               textBaseline: 'middle',
      //               fill: '#000000',
      //               x: fromPoint.x,
      //               y: fromPoint.y + 2,
      //               action: 'toggleCondition',
      //             },
      //           });
      //         }
      //       }
      //     },
      //     update: undefined,
      //   },
      //   actions: {
      //     toggleCondition: (element: GraphElement, source: DocDatasource) => {
      //       source.selectElement(element, false);
      //       if (element.properties) {
      //         element.properties['relation_type'] =
      //           element.properties?.relation_type && element.properties['relation_type'] === 'increases' ? 'decreases' : 'increases';
      //       }

      //       return Promise.resolve(true);
      //     },
      //   },
      //   extendType: 'line',
      // });

      this.source.graphShapeDefinitions.edges.push({
        name: 'weighted-indicator-relation',
        shape: {
          afterDraw(cfg: any, group: any) {
            const children = group.get('children');
            if (children && children.length > 0) {
              const shape = children[0];

              // const useOpacity = this.followedGoal ?? this.followedAction;

              const fromPoint = shape.getPoint(0.65);

              group.addShape('circle', {
                attrs: {
                  r: 10,
                  stroke: '#333',
                  fill: '#ffffff',
                  x: fromPoint.x,
                  y: fromPoint.y,
                  action: 'toggleCondition',
                },
              });

              group.addShape('text', {
                attrs: {
                  text: '+',
                  fontSize: 22,
                  fontWeight: 600,
                  textAlign: 'center',
                  textBaseline: 'middle',
                  fill: '#000000',
                  x: fromPoint.x,
                  y: fromPoint.y + 1,
                },
              });
            }
          },
          update: undefined,
        },
        extendType: 'line',
      });

      for (const nd of this.source.graphShapeDefinitions.nodes) {
        G6.registerNode(nd.name, nd.shape, nd.extendType);
      }

      for (const ed of this.source.graphShapeDefinitions.edges) {
        G6.registerEdge(ed.name, ed.shape, ed.extendType);
      }
    }
  }

  public getMDIFont(icon: string) {
    icon = `.${icon}`;
    if (mdiFont.hasOwnProperty(icon)) {
      const c = parseInt(mdiFont[icon].replace('\\', ''), 16);
      return String.fromCodePoint(c);
    }
    return '';
  }

  public registerChart() {
    if (!this.source?.graph || !this.widget?._size) {
      return;
    }

    G6.registerNode(
      'main-node',
      {
        // update: undefined,
        afterDraw: (cfg: any, group: any) => {
          // if (e) {
          //   if (e._outgoing && e._outgoing.length > 0) {
          //     group.addShape('circle', {
          //     attrs: {
          //       r: 10,
          //       stroke: '#333',
          //       fill: '#ffffff',
          //       x: 0,
          //       y: (cfg.size / 2) + 5,
          //       action: 'toggleCondition',
          //     },
          //   });
          //   }

          // }
          if (cfg.iconText) {
            group.addShape('text', {
              attrs: {
                x: 0, // 居中
                y: 0,
                fill: 'rgba(255,255,255,1)',
                fontSize: 22,
                textAlign: 'center',
                textBaseline: 'middle',
                fontFamily: 'Material Design Icons',
                text: this.getMDIFont(cfg.iconText),
              },
              name: 'icon-shape',
              draggable: true,
            });
          }

          return group;
        },
        //     update: undefined;
        //     const icon = group.addShape('text', {
        // attrs: {
        //   x: 0,
        //   y: 0,
        //   textAlign: 'center',
        //   textBaseline: 'middle',
        //   fontSize: 20,
        //   fontFamily: 'Roboto, sans-serif',
        //   text: 'test'

        // must be assigned in G6 3.3 and later versions. it can be any value you want
      },
      'circle'
    );
  }

  public get options(): GraphWidgetOptions {
    return this.widget.options ?? {};
  }

  public initPreset() {
    if (!this.source || !this.options) {
      return;
    }

    if (!this.options?.preset && this.source.activeDocument) {
      this.options.preset = this.source.activeDocument as unknown as GraphPreset;
      if (!this.options.preset.properties!.graphLayout) {
        this.options.preset.properties!.graphLayout = { layout: 'force', nodeRules: [{ type: 'DOCUMENT', elementId: this.source.activeDocument.id }] };
      }
    }

    if (!this.options.preset) {
      return;
    }

    this.showTabs = false;
    if (typeof this.options.preset === 'string') {
      this.activePreset = this.source.getGraphPreset(this.options.preset);
      if (!this.activePreset) {
        this.activePreset = new GraphPreset(this.source);
        this.activePreset.id = this.options.preset;
      }
    } else {
      this.activePreset = {
        ...new GraphPreset(this.source),
        ...this.options.preset,
      };
    }

    if (!this.activePreset._stats) {
      this.activePreset._stats = {};
    }
    // this.activePreset = this.options.preset;
    // if (!this.activePreset.id) { this.activePreset.id = guidGenerator()}
    // this.source.addGraphPreset(this.activePreset, true);
    // this.activePreset = this.source.graphPresets.find(p => p.id);
  }

  public async initGraph(reset = false) {
    console.log('init graph');
    

    // if (!this.activePreset) {
    //     if (typeof this.options.preset === 'string') {
    //       this.activePreset = this.source.graphPresets.find(p => p.title === this.options.preset);
    //       if (!this.activePreset) {
    //         this.activePreset = new GraphPreset(this.source);
    //         this.activePreset.id = this.options.preset;
    //       }
    //     } else {
    //       this.activePreset = { ...new GraphPreset(this.source), ...this.options.preset };

    //     }
    //   // this.source.addGraphPreset(this.activePreset);
    // }
    // if (this.activePreset) { this.source.applyGraphPreset(this.activePreset); }
    // if (this.activePreset && this.activePreset !== this.source.activeGraphPreset) {
    //   this.source.applyGraphPreset(this.activePreset)
    // }

    if (!this.activePreset && this.source?.activeGraphPreset) {
      this.activePreset = this.source.activeGraphPreset;
    }

    if (!this.activePreset) {
      return;
    }

    if (!this.activePreset.properties) {
      this.activePreset.properties = {};
    }
    if (!this.activePreset.properties.editor_mode) {
      this.activePreset.properties.editor_mode = 'EDIT';
    }

    if (!this.activePreset.properties.graphLayout) {
      this.activePreset.properties.graphLayout = new GraphLayout();
    }

    if (!this.activePreset.properties.graphLayout.nodeRules) {
      this.activePreset.properties.graphLayout.nodeRules = [];
    }

    // if (!this.activePreset) {
    //   this.activePreset =
    // }

    // var container = document.getElementById("kg-vis");
    if (this.graph && reset) {
      this.graph.destroy();
      this.graph = undefined;
    }
    if (!reset && this.graph) {
      return;
    }

    const contextMenu = new Menu({
      shouldBegin(evt: any) {
        if (evt && evt.target && evt.target.isCanvas && evt.target.isCanvas()) return true;
        return false;
      },
    });

    this.registerChart();
    const dHeight = 1024 ?? this.widget?._size?.componentHeight;
    const dWidth = 1024 ?? this.widget?._size?.componentWidth;

    const tooltip = new G6.Tooltip({
      offsetX: 10,
      offsetY: 20,
      getContent: (e: any) => {
        if (e.item?._cfg?.id) {
          const element = this.source!.getElement(e.item._cfg.id);

          if (element) {
            const app = new DefaultElementCard();

            (app as any).source = this.source;
            (app as any).element = element;

            let popupContainer = document.createElement('span');
            app.$mount(popupContainer);

            const outDiv = document.createElement('div');
            // Vue.render(outDiv, element)
            outDiv.style.width = '180px';
            outDiv.innerHTML = `
        ${element.properties!.name}
        `;
            return app.$el as HTMLDivElement;
          }
        }
        return '';
      },
      itemTypes: ['node'],
    });

    this.graph = new G6.Graph({
      container: 'kg-vis',
      width: dWidth, //(this as any).widget._size.width,
      linkCenter: false,
      plugins: [contextMenu],
      animate: this.activePreset?.properties?.graphLayout?.animate ?? false,
      height: dHeight, // (this as any).widget._size.height,
      layout: this.getLayout(),
      autoPaint: true,
      // renderer: 'svg',

      modes: {
        default: [
          'drag-node',
          // "drag-combo",
          // "collapse-expand-combo",
          {
            type: 'drag-canvas',
            enableOptimize: true,
          },
          { type: 'zoom-canvas', enableOptimize: true },
          'shortcuts-call',
          {
            type: 'create-edge',
            key: 'alt', // undefined by default, options: 'shift', 'control', 'ctrl', 'meta', 'alt'
          },
          {
            type: 'click-select',
            shouldBegin: (e) => {
              if ((e.target as any).attrs?.hasOwnProperty('action')) {
                return false;
              }
              return true;
            },
          },

          // {
          //   type: "edge-tooltip",
          //   formatText: (model) => {
          //     if (model.node) {
          //     }
          //     return "Geen informatie nog beschikbaar";
          //   },
          //   offset: 30,
          // },
        ],

        // addEdge: ["click-add-edge", "click-select"],
      },
      defaultNode: this.getNodeStyle(),
      defaultEdge: {
        autoRotate: true,
        background: {
          fill: '#fff',
          stroke: '#9EC9FF',
        },
      },
      defaultCombo: {
        type: 'circle',
        // size: [50, 50], // Combo 的最小大小
        style: {
          lineWidth: 1,
        },
        labelCfg: {
          refY: 10,
          position: 'top',
          style: {
            fontSize: 18,
          },
        },
      },
    });

    this.graph.on('keyup', (e) => {
      // console.log('key up')

      if (this.source?.graph && e.key === 'Delete' && this.activePreset?._selectedElements && this.activePreset.properties?.graphLayout?.nodes) {
        for (const el of this.activePreset._selectedElements) {
          if (this.activePreset.properties.graphLayout.nodes.hasOwnProperty(el)) {
            delete this.activePreset.properties.graphLayout.nodes[el];
          }
        }
        this.activePreset._selectedElements = [];
        this.activePreset._visibleNodes = [];
        this.initGraph(true);
        this.updateGraph(this.source.graph, true);
        this.resize();
        this.$forceUpdate();
      }
      // console.log(e);
    });

    this.graph.on('nodeselectchange', (e: any) => {
      console.log(e.selectedItems, e.select);
      const sel: any[] = [];
      // if (this.activePreset && e.selectedItems?.nodes) {
      //   for (const node of e.selectedItems?.nodes) {
      //     if (node._cfg?.id) {
      //       sel.push(node._cfg.id);
      //     }
      //   }

      //   this.activePreset._selectedElements = sel;
      //   this.$forceUpdate();
      // }
    });

    this.graph.on('aftercreateedge', async (e: any) => {
      if (!this.source) {
        return;
      }
      console.log(e);

      const sourceId = e.edge?._cfg?.source?._cfg?.id;
      const targetId = e.edge?._cfg?.target?._cfg?.id;
      if (sourceId && targetId) {
        const source = this.source.getElement(sourceId);
        const target = this.source.getElement(targetId);
        if (source?._featureType && target?._featureType) {
          // find potential classId
          
          let classId = 'LINKED_TO';
          const rel = source._featureType.properties!.find(r => r.type! === 'relation' && r?.relation?.objectType && target?._featureType?._inheritedTypes && target._featureType._inheritedTypes.includes(r.relation.objectType));
          classId = rel?.relation?.type || classId;
          

          classId = this.activePreset?.properties?.graphLayout?.defaultEdgeType || classId;
          classId = source._featureType?.attributes?.graph_link_property || classId 
          await this.source.addNewEdge({
            fromId: sourceId,
            toId: targetId,
            classId,
            properties: {},
          });
          this.updateGraph(this.source!.graph, false);
          this.$forceUpdate();
        }
      }

      //   const edges = this.graph.save().edges;
      //   G6.Util.processParallelEdges(edges);
      //   this.graph.getEdges().forEach((edge, i) => {
      //     this.graph.updateItem(edge, {
      //       curveOffset: edges[i].curveOffset,
      //       curvePosition: edges[i].curvePosition,
      //     });
      //   });
    });

    this.graph.on('viewportchange', () => {
      if (this.graph) {
        this.viewportDebounce(this.graph);
      }
    });

    // this.forceLayout = this.graph.get("layoutController").layoutMethod;
    // this.graph.on("node:dragstart", (e: any) => {
    //   this.graph!.layout();
    //   this.refreshDragedNodePosition(e);
    // });
    // this.graph.on("node:drag", (e: any) => {
    //   if (this.forceLayout) {
    //     this.forceLayout.execute();
    //   }
    //   this.refreshDragedNodePosition(e);
    // });
    this.graph.on('node:dragend', (e: any) => {
      const elementId = e.item?._cfg?.id;

      if (
        !elementId ||
        !this.source ||
        !this.activePreset?.properties?.graphLayout ||
        !this.activePreset.properties.graphLayout.layout ||
        this.activePreset.properties.graphLayout.layout !== 'manual'
      ) {
        return;
      }

      if (!this.activePreset.properties.graphLayout.nodes) {
        this.activePreset.properties.graphLayout.nodes = {};
      }

      const element = this.source.getElement(elementId);
      const node = this.activePreset.properties.graphLayout.nodes[elementId];
      if (!element) {
        return;
      }

      if (!node) {
        this.activePreset.properties.graphLayout.nodes[elementId] = { x: e.x, y: e.y, _element: element, preset: true };
      } else {
        node.x = e.x;
        node.y = e.y;
      }
    });
    this.graph.on('contextmenu', (a: any) => {
      this.updateContextMenu(a);
    });
    this.graph.on('edge:click', async (evt: any) => {
      try {
        if (this.source?.graphShapeDefinitions?.edges && evt.item?._cfg?.currentShape) {
          const element = this.source.graph[evt.item!._cfg!.id];
          let clicked = false;
          if (this.source.graphShapeDefinitions?.edges) {
            const shape = this.source.graphShapeDefinitions.edges.find((e) => e.name === evt.item._cfg.currentShape);

            if (shape && evt.target?.attrs?.action) {
              const act = evt.target.attrs.action;
              if (shape.actions && shape.actions.hasOwnProperty(act)) {
                clicked = true;
                await shape.actions[act](element, this.source);
                this.graph!.refreshItem(evt.item);
              }
            }
          }
          if (!clicked) {
            // this.source!.selectElement(element, this.options.openElementDetails);
          }
        }
      } catch (e) {}
    });
    this.graph.on('node:click', async (evt: any) => {
      if (evt.item?._cfg?.model?.id) {
        const element = this.source?.getElement(evt.item._cfg.model.id);
        if (this.source?.graphShapeDefinitions?.nodes) {
          const shape = this.source.graphShapeDefinitions.nodes.find((e) => e.name === evt.item._cfg.currentShape);
          // find node

          if (shape && evt.target?.attrs?.action) {
            const act = evt.target.attrs.action;
            if (element && shape.actions && shape.actions.hasOwnProperty(act)) {
              await shape.actions[act]!(element, this.source!);
              this.graph!.refreshItem(evt.item);
            }
          }
        }
        if (element) {
          this.source!.selectElement(element, this.options.openElementDetails);
        }
      }
    });

    // this.restoreCanvas();
  }

  public save() {
    if (this.source && this.activePreset) {
      this.source.saveNode(this.activePreset);
    }
  }

  public resize() {
    if (!this.graph || !this.widget._size) {
      return;
    }
    console.log('resize');
    this.graph.changeSize(this.widget._size.width, this.widget._size.height);
    // this.graph.render();
  }

  emptyGraph() {
    console.log('empty graph');

    if (this.source && this.graph) {
      this.source.emptyGraph(true);
      // for (const el of Object.values(this.source.graph).filter(
      //   (e) => e._included
      // )) {
      //   el._included = false;
      // }
      // this.data = { nodes: [], edges: [], combos: [] };
      // this.graph.data(this.data);
      // this.updateGraph(this.source.graph, true);
      // this.updateGraph(this.source!.graph);
      // this.graph?.render();
    }
  }

  public async onDrop(e: any, d: any, s: any) {
    // console.log(e);
    const originalEvent = e.originalEvent;
    const clientPos = { x: originalEvent.clientX, y: originalEvent.clientY };
    console.log(e, clientPos);
    let pos = this.graph!.getPointByClient(clientPos.x, clientPos.y);
    const classId = e.item?.dataset?.classid;

    if (classId && this.graph && this.source) {
      const ft = this.source.getFeatureTypeById(classId);
      if (ft?.type) {
        const newNode = await this.source.addNewNode({
          id: `${ft.type}-${guidGenerator()}`,
          properties: { classId, name: ft.title },
          classId: ft.type,
        });

        if (newNode?.id && this.activePreset?.properties?.graphLayout) {
          if (!this.activePreset.properties.graphLayout.nodes) {
            this.activePreset.properties.graphLayout.nodes = {};
          }
          this.activePreset.properties.graphLayout.nodes[newNode.id] = {
            x: pos.x,
            y: pos.y,
          };

          this.addElement(newNode);
          this.updateGraph(this.source!.graph);
          this.source.selectElement(newNode, this.options.openElementDetails);
          this.$forceUpdate();
        }
      }
    }
  }

  beforeDestroy() {
    this.dragInitialized = false;
    this.busManager.stop();
  }

  getQueryNumber(v: string, defaultValue?: number): number | undefined {
    const sv = $cs.getRouteQuery(v);
    if (sv) {
      return parseFloat(sv);
    }
    return defaultValue;
  }

  restoreCanvas() {
    if (!this.graph) {
      return;
    }
    console.log('restore canvas');
    const z = this.getQueryNumber('gz', 1);
    const x = this.getQueryNumber('gx');
    const y = this.getQueryNumber('gy');

    if (z && x && y) {
      console.log(`zoom to ${z}`);
      Vue.nextTick(() => {
        this.graph!.zoom(z);

        const p = this.graph!.getPointByCanvas(0, 0);
        console.log(p);
        this.graph!.moveTo(x, y);
      });

      //   this.graph.zoom(z, { x: x, y: y });
      // this.graph.translate(parseFloat(x) / parseFloat(zoom), parseFloat(y) / parseFloat(zoom))
    }
  }

  mounted() {
    if (this.source?.graph) {
      this.contentLoaded();
    }
  }
}
</script>
