<template>
  <div
    v-if="source"
    style="position: aboslute; left: 0; right: 0; top: 0; bottom: 0"
  >
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
    <div id="kg-vis" class="graph-canvas"></div>
    <v-toolbar flat outlined class="graph-menu" v-if="activePreset">
      <v-layout id="dropdown-example-2" class="graph-toolbar-menu">
       
        <!-- <v-text-field
            filled
            rounded
      
            dense
            class="graph-search"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field> -->
        <v-layout v-if="activePreset && activePreset._stats">
          <v-chip
            @click="toggleFeatureType(id)"
            v-for="(stat, id) of activePreset._stats"
            :key="id"
            :color="stat.color"
            class="ml-2"
            :outlined="stat.hide"
          >
           
            <v-icon v-if="stat._featureType.icon" left>{{
              stat._featureType.icon
            }}</v-icon>
            {{ stat._featureType.title }}
             <v-avatar right dark class="darken-4">
              {{ stat.count }}
            </v-avatar>
          </v-chip>
        </v-layout>
        <v-spacer></v-spacer>
         <v-btn @click="fitGraph()" icon>
          <v-icon>mdi-fit-to-screen</v-icon>
        </v-btn>
        <v-btn v-if="activePreset.elementsEnabled" @click="emptyGraph()" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn @click="openSettings()" icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
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

    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      :close-on-content-click="false"
      open-on-hover
      offset-y
    >
      <v-list>
        <v-list-group
          v-for="(item, i) in contextMenuitems"
          :key="i"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
          @click="item.action"
        >
          <template v-slot:appendIcon>
            <span v-if="item.items && item.items.length > 0">{{
              item.items.length
            }}</span>
            <span v-else></span>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-if="item.items"
            v-for="(subItem, si) in item.items"
            :key="si"
            :prepend-icon="subItem.icon"
            @click="subItem.action"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-menu>

    <!-- <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in contextMenuitems"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!-- <div v-if="source.activeGraphPreset && source.activeGraphPreset.filterTimeline" class="graph-focus-date">
      {{ getShortDate(source.activeGraphPreset.focusDate) }}
    </div> -->
  </div>
</template>

<style scoped>
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
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
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
  FeatureType,
  NodeRule,
} from '@csnext/cs-data';
import { IMenu } from '@csnext/cs-core';
import G6, { Graph, NodeConfig, GraphData, Menu, LayoutConfig } from '@antv/g6';
import { guidGenerator } from '@csnext/cs-core';
import { GraphWidgetOptions } from './graph-widget-options';
import { DefaultElementCard, DocDatasource, mdiFont } from '../..';
import GraphSettings from './graph-settings.vue';
import debounce from 'lodash/debounce';
import Vue, { VNode, CreateElement } from 'vue'

@Component({
  components: {},
})
export default class NetworkGraph extends WidgetBase {
  public data?: GraphData;
  private showTabs = true;
  public visibleNodes: string[] = [];
  private showMenu = false;
  private x = 0;
  private y = 0;
  private tab: any = null;
  public activePreset?: GraphPreset | null = null;
  private featureTypes?: string[] | null = null;

  private graph?: Graph;
  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  @Watch('tab')
  tabChanged() {
    if (!this.source?.graphPresets) {
      return;
    }
  }

  private settingsUpdatedDebounce = debounce(this.settingsUpdated, 200);
  private graphInitDebounce = debounce(() => {
    if (!this.source?.graph) {
      return;
    }
    this.initGraph(true);
    this.updateGraph(this.source.graph, true);
  }, 200);
  private viewportDebounce = debounce((graph: Graph) => {
    if (!graph) {
      return;
    }
    const zoom = graph.getZoom();
    const center = graph.getGraphCenterPoint();
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

  private getElementImage(e: GraphElement) {
    if (
      this.source?.base_url &&
      e._featureType?.iconProperty &&
      e.properties &&
      e.properties.hasOwnProperty(e._featureType.iconProperty)
    ) {
      return `${this.source.base_url}/files/image/?url=${
        e.properties[e._featureType.iconProperty]
      }`;
    }
    if (e._featureType?.icon && this.source?.base_url) {
      return `${this.source.base_url}/files/image/?url=${e._featureType.icon}`;
    }
    return null; //'images/Flag_of_Russia.svg';
  }

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
    if (
      !e.id ||
      !e.classId ||
      !this.graph ||
      !this.data ||
      !this.data.nodes ||
      !this.source ||
      !this.activePreset?._visibleNodes
    ) {
      return;
    }
    let gnd: IGraphNodeDefinition = {};
    // find position
    if (
      this.activePreset.nodes &&
      this.activePreset.nodes.hasOwnProperty(e.id)
    ) {
      gnd = this.activePreset.nodes[e.id];
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

    if (included && e.properties?.name) {
      let nodewidth = this.activePreset.nodeSize ?? 50;
      if (e.properties?.nodegraphlayout === 'modelRect') {
        nodewidth = 200;
      }

      const icon = e._featureType?.icon ?? '';

      let node = {
        id: e.id,
        label: this.activePreset?.hideNodeLabel
          ? undefined
          : this.fittingString(
              e.properties?.name,
              80,
              this.activePreset.globalFontSize ?? 12
            ), // this.labelFormatter(e._title!, this.settings.labelMaxLength),
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
        type:
          e.properties?.nodegraphlayout ??
          e._featureType?.attributes!['graph:node'] ??
          'main-node',
        style: {
          fill: this.getNodeColor(e), // GraphElement.getBackgroundColor(e),
          fontFamily: 'Roboto, sans-serif',
        },
        labelCfg: {
          style: {
            fontSize: this.activePreset.globalFontSize ?? 12,
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
            const outIncluded =
              this.activePreset._visibleNodes.includes(outgoing);
            if (outgoing.to) {
              const toIncluded = this.activePreset._visibleNodes.includes(
                outgoing.to
              );
              if (!outIncluded && toIncluded) {
                this.updateEdge(outgoing);
              }
            }
          }
        }

        if (e._incomming) {
          for (const incomming of e._incomming) {
            const inIncluded =
              this.activePreset._visibleNodes.includes(incomming);
            if (incomming.from) {
              const fromIncluded = this.activePreset._visibleNodes.includes(
                incomming.from
              );
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
    if (
      !this.data ||
      !this.graph ||
      !this.source ||
      !this.activePreset ||
      !e.id
    ) {
      return;
    }

    let active = e._firstStep === this.source!.activeId;

    let existing = this.data.edges!.find((n) => n.id === e.id);

    // console.log("Adding edge");
    const label = e._featureType?.title ?? e.classId;

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
          fontSize: this.activePreset.globalFontSize,
        },
      },
      hidden: this.source.getHidden(e, this.activePreset),
      title: label,
      label: this.activePreset?.hideNodeLabel
        ? undefined
        : this.fittingString(
            label ?? '',
            80,
            this.activePreset?.globalFontSize ?? 12
          ),
      arrows: 'to',
    } as any;

    if (!existing) {
      this.data?.edges?.push(edge);
    } else {
      console.log('remove ' + edge.id);
      this.graph.remove(edge.id);
    }
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
    if (!this.activePreset.layout) {
      this.activePreset.layout = 'force';
    }
    let layout: LayoutConfig = {
      type: this.activePreset.layout,
      preventOverlap: true,
    };
    switch (this.activePreset.layout) {
      case 'manual':
        break;
      case 'force':
        layout = {
          ...layout,
          ...{
            linkDistance: 50, // Edge length
            nodeStrength: 30,
            edgeStrength: 0.1,
            collideStrength: 0.8,
            preventOverlap: false,
            nodeSize: 30,
            alpha: 0.3,
            alphaDecay: 0.028,
            alphaMin: 0.01,
            forceSimulation: null,
          },
        };
        break;
      case 'dagre':
        layout = {
          ...layout,
          ...{
            rankdir: this.activePreset.rankdir ?? 'TB',
            align: this.activePreset.align ?? 'UL',
            preventOverlap: true,
          },
        };
        break;
      case 'forceAtlas2':
        layout = {
          ...layout,
          ...{
            preventOverlap: true,
            kr: this.activePreset.kr ?? 10,
          },
        };
        break;
      case 'gForce':
        layout = {
          ...layout,
          ...{
            // preventOverlap: true,
            linkDistance: this.activePreset.linkDistance ?? 1,
            // maxIteration: this.activePreset.maxIteration ?? 500,
            // nodeStrength: this.activePreset.nodeStrength ?? 1000,
            // edgeStrength: this.activePreset.edgeStrength ?? 200,
            // gpuEnabled: true,
            // workerEnabled: true,
            type: 'gForce',
            gpuEnabled: true,
            animate: false,
            maxIteration: 200,
            gatherDiscrete: true,
            descreteGravity: 200,
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
            preventOverlap: true,

            sortBy: 'degree',
          },
        };
        break;
      case 'radial':
        layout = {
          ...layout,
          ...{
            linkDistance: this.activePreset.linkDistance ?? 50,
            unitRadius: this.activePreset.unitRadius ?? 50,
            preventOverlap: true,
          },
        };
        break;
      case 'mds':
        layout = {
          ...layout,
          ...{
            linkDistance: this.activePreset.linkDistance ?? 50,
          },
        };
        break;
      case 'fruchterman':
        layout = {
          ...layout,
          ...{
            gravity: this.activePreset.gravity ?? 1,
            clustering: this.activePreset.clustering ?? false,
            clusterGravity: this.activePreset.clusterGravity ?? 10,
            speed: this.activePreset.speed ?? 5,
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

  public updateRules(rules: NodeRule[], element?: GraphElement) {
    if (!this.source || !rules || rules.length === 0) {
      return;
    }

    // const nodes: any[] = [];

    // const addElement = (el: GraphElement) => {
    //   if (!this.activePreset!._visibleNodes!.includes(el)) {
    //     this.addElement(el);
    //     // this.activePreset!._visibleNodes.push(el);
    //     // nodes.push(el);
    //   }
    // };

    // this.activePreset._visibleNodes = [];
    // this.data = { nodes: [], edges: [] };
    for (const rule of rules) {
      switch (rule.type) {
        case 'TYPE':
          if (rule.featureType && !rule._featureType) {
            rule._featureType = this.source.getFeatureTypeById(
              rule.featureType
            );
          }
          if (rule._featureType && rule.featureType && !rule.disabled) {
            const elements = this.source.getClassElements(
              rule.featureType,
              true
            );
            if (elements) {
              for (const el of elements) {
                this.addElement(el);
                if (rule.outgoingRules) {
                  this.updateRules(rule.outgoingRules, el);
                }
              }
            }
          }
          break;
        case 'RELATION':
          if (rule.relationType && !rule.disabled) {
            if (element?._outgoing) {
              for (const o of element._outgoing) {
                if (o.classId === rule.relationType && o.to) {
                  this.addElement(o.to);
                }
              }
            }
          }
          break;
        case 'ELEMENT':
          if (rule.elementId && !rule.disabled) {
            rule._element = this.source.getElement(rule.elementId);
            if (rule._element) {
              if (!this.activePreset!._visibleNodes!.includes(rule._element)) {
                this.addElement(rule._element);
              }
              if (rule.outgoingRules) {
                this.updateRules(rule.outgoingRules, rule._element);
              }
            }
          }
          break;
        case 'PROPERTY_ELEMENT':
          if (element?._elements && rule.elementType && !rule.disabled) {
            if (element._elements.hasOwnProperty(rule.elementType)) {
              const ees = Array.isArray(element._elements[rule.elementType])
                ? element._elements[rule.elementType]
                : [element._elements[rule.elementType]];
              for (const ee of ees as GraphElement[]) {
                this.addElement(ee);
              }
            }
          }
          break;
      }
    }
    // this.activePreset!._visibleNodes = [...this.activePreset!._visibleNodes, ...nodes];
    // const toBeDeleted = this.activePreset._visibleNodes.filter(n => nodes.includes(n));
  }

  public addElement(e: GraphElement) {
    if (!this.activePreset || !e.classId || !e._featureType) { return; }
    if (!this.activePreset._stats) { this.activePreset._stats = {}}
    if (!this.activePreset!._visibleNodes!.includes(e)) {
      this.activePreset!._visibleNodes!.push(e);
      if (!this.activePreset!._stats.hasOwnProperty(e.classId)) {
        this.activePreset._stats[e.classId] = {
          _featureType: e._featureType,
          count: 0,
          hide: false,
          color: GraphElement.getBackgroundColor(e)
        };
      }
      this.activePreset._stats[e.classId].count! += 1;
    }
  }

  public emptyStats() {
    if (!this.activePreset) {
      return;
    }
    if (this.activePreset._stats) {
      for (const stat of Object.values(this.activePreset._stats)) {
        stat.count = 0;
      }
    } else {
      this.activePreset._stats = {};
    }
  }

  public updateGraph(graph: GraphObject, redraw = false) {
    if (!this.source || !this.graph || !this.activePreset) {
      return;
    }
    console.log('update graph');
    if (!this.data) {
      this.data = { nodes: [], edges: [] };
      this.graph.data(this.data);
    }

    if (!this.activePreset._visibleNodes) {
      this.activePreset._visibleNodes = [];
      this.emptyStats();
    }

    // get visible nodes from rules
    if (this.activePreset?.nodeRules) {
      this.activePreset._visibleNodes = [];
      this.emptyStats();
      this.updateRules(this.activePreset.nodeRules);
    }

    // check for visible nodes in node list
    if (this.activePreset.nodes) {
      for (const nid of Object.keys(this.activePreset.nodes)) {
        if (
          this.activePreset._visibleNodes.findIndex((n) => n.id === nid) === -1
        ) {
          const e = this.source.getElement(nid);
          if (e) {
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
          if (
            this.activePreset._visibleNodes.findIndex(
              (n) => n.id === outgoing?.toId
            ) !== -1
          ) {
            this.updateEdge(outgoing);
          }
        }
      }
    }

    // .filter(
    //   (n) => n.type === 'node' && n.id
    // )
    if (this.data.nodes) {
      for (const node of this.data.nodes) {
        if (
          this.activePreset._visibleNodes.findIndex((n) => n.id === node.id) ===
          -1
        ) {
          this.data.nodes = this.data.nodes.filter((f) => f.id !== node.id!);
        }
        // const el = this.source.getElement(node.id.toString());

        // if (!el || !GraphElement.getVisibility(el)) {
        // this.graph.remove(node.id);
        // this.data.nodes = this.data.nodes?.filter((n) => n.id !== node.id);
        // this.nodes.remove(id);
        // }
      }
    }

    // this.visibleNodes = this.data.nodes!.map((r) => r.id);

    // for (const e of Object.values(graph)) {
    //   if (e.type === 'edge') {
    //     if (e.fromId && e.toId) {
    //       this.updateEdge(e);
    //     }
    //   }
    // }

    for (const edge of this.data.edges!) {
      if (edge?.id) {
        const el = this.source.getElement(edge.id!.toString());
        if (!el) {
          this.graph.remove(edge.id!);
        }
      }
    }

    if (this.graph) {
      this.graph.data(this.data);

      this.graph.render();
    }
  }

  private loaded = false;

   public updateGraphLayout() {
    if (!this.graph) { return; }
    this.graph.updateLayout(this.getLayout());
    // this.graph.layout = this.getLayout();
    // console.log(this.graph.getDefaultCfg());
    console.log(this.graph);
    // this.graph.layout();
    // this.graph.render();
    // this.graph.refresh();
  }

  public contentLoaded() {
    if (this.loaded) {
      return;
    }
    this.loaded = true;

    if (!this.source?.featureTypes) {
      return;
    }

    this.featureTypes = Object.values(this.source.featureTypes)
      .filter((ft) => ft.type)
      .map((ft) => ft.type) as string[];

    this.registerShapes();
    this.registerBehaviors();
    this.initPreset();

    setTimeout(() => {
      console.log('content loaded');
      if (this.source?.graph) {
        this.initGraph(false);

        // this.tutorialSource.goToId(this.tutorialSource.activeId);
        this.updateGraph(this.source.graph, true);

        this.busManager.subscribe(
          this.source!.events,
          IGraphFilter.GRAPH_FILTER,
          (a: string, d: any) => {
            this.updateGraph(this.source!.graph!, false);
          }
        );

        this.busManager.subscribe(
          this.source!.events,
          GraphDatasource.PRESET_EVENTS,
          (a: string, d: GraphPreset) => {
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
                this.updateGraphLayout();
                // this.initGraph(true);
                // this.updateGraph(this.source.graph, true);
                // this.graph.refresh();
              }
              if (a === GraphDatasource.PRESET_ACTIVATED) {
                this.emptyGraph();
                this.tab = this.source.graphPresets.indexOf(d);
                this.initGraph();
                this.$forceUpdate();
              }
            }
          }
        );

        this.busManager.subscribe(
          this.source!.events,
          GraphDatasource.GRAPH_EVENTS,
          (a: string, d: GraphElement) => {
            if (!this.activePreset) {
              return;
            }
            if (a === GraphDatasource.ELEMENT_ADDED && this.graph) {
              this.updateGraph(this.source!.graph, false);
            }
            if (a === GraphDatasource.ELEMENT_REMOVED && this.graph) {
              if (
                d.id &&
                this.activePreset?.nodes &&
                this.activePreset.nodes.hasOwnProperty(d.id)
              ) {
                delete this.activePreset.nodes[d.id];
                this.activePreset._visibleNodes =
                  this.activePreset._visibleNodes.filter((n) => n !== d);
                this.updateGraph(this.source!.graph, false);
              }
            }
            if (
              a === GraphDatasource.ELEMENT_UPDATED &&
              this.graph &&
              d &&
              this.activePreset?._visibleNodes
            ) {
              if (this.activePreset._visibleNodes.includes(d)) {
                //  this.graph.render();
                this.updateGraph(this.source!.graph, false);
              }
            }
            if (a === GraphDatasource.GRAPH_UPDATED && this.graph) {
              if (d) {
                this.updateNode(d);
                if (d._outgoing && this.source?.availableEdgeTypes) {
                  for (const outgoing of d._outgoing.filter((o) => o.to)) {
                    if (
                      outgoing.classId &&
                      this.source.availableEdgeTypes.hasOwnProperty(
                        outgoing.classId
                      ) &&
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
                      this.source.availableEdgeTypes.hasOwnProperty(
                        incomming.classId
                      ) &&
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
          }
        );
      }
    }, 100);
  }

  public refresh() {
    if (this.source && this.options?.preset) {
      if (typeof this.options.preset === 'string') {
        this.activePreset = this.source.getGraphPreset(
          this.options.preset
        ) as GraphPreset;
      } else {
        this.activePreset = this.options.preset;
      }
      this.initGraph(true);
      // this.$forceUpdate();
      this.updateGraph(this.source!.graph, true);
      // this.graph.data(this.data);
      // this.graph.render();
    }
  }

  refreshDragedNodePosition(e: any) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }

  private labelFormatter(text: string, minLength = 10) {
    if (text && text.split('').length > minLength)
      return `${text.substr(0, minLength)}...`;
    return text;
  }

  public updateContextMenu(a: any) {
    console.log('update context menu');
    if (this.source && a.item?._cfg?.id) {
      const element = this.source.getElement(a.item._cfg.id);
      if (!element?._featureType?.properties) {
        return;
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
          for (const props of element._featureType?.properties) {
            if (
              props.type === PropertyValueType.relation &&
              props.relation?.type &&
              props.relation?.objectType
            ) {
              createMenu.items.push({
                title: props.label || props.relation.type,
                action: async () => {
                  const type = this.source?.findObservation(
                    props.relation?.objectType!
                  );
                  if (!type || !this.source || !this.activePreset?.id) {
                    return;
                  }
                  let name = `new ${type.type}`;

                  name = await $cs.triggerInputDialog(
                    'Name',
                    'enter new name',
                    name
                  );

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

          if (
            this.activePreset?._visibleNodes &&
            element._incomming &&
            element._incomming.length > 0
          ) {
            for (const relation of element._incomming.filter(
              (i) =>
                i.from && !this.activePreset!._visibleNodes.includes(i.from)
            )) {
              const items = incommingMenu.items.filter(
                (r) => r.title === relation.from?.classId
              );
              if (items.length === 0) {
                // find prop
                let relationtitle = relation.from?.classId;

                incommingMenu.items.push({
                  title: relationtitle!,
                  action: () => {
                    if (element && this.activePreset?.id && relation?.classId) {
                      this.source?.addRelationsToPreset(
                        element,
                        this.activePreset.id,
                        relation.classId
                      );
                    }
                  },
                });
              }
            }
          }

          if (element?._outgoing && this.activePreset?._visibleNodes) {
            for (const relation of element._outgoing.filter(
              (i) => i.to && !this.activePreset!._visibleNodes!.includes(i.to)
            )) {
              if (
                outgoingMenu.items.findIndex(
                  (r) => r.title === relation.to?.classId
                ) === -1
              ) {
                // find prop
                let relationtitle = relation.to?.classId;
                outgoingMenu.items.push({
                  title: relationtitle!,
                  action: () => {
                    if (element && this.activePreset?.id && relation?.classId) {
                      this.source?.addRelationsToPreset(
                        element,
                        this.activePreset.id,
                        relation.classId
                      );
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
            title: 'hide',
            icon: 'mdi-eye-of',
            action: () => {
              if (element && this.activePreset?.id) {
                this.source!.removeElementFromPreset(
                  element,
                  this.activePreset.id
                );
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
          break;
        case 'edge':
          break;
      }

      this.x = a.clientX;
      this.y = a.clientY;

      this.showMenu = true;
    } else {
        if (this.activePreset!.elementsEnabled && this.source?.featureTypes) {
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
                this.source!.addElementToPreset(
                  newNode,
                  this.activePreset!.id!,
                  true,
                  { x: this.x, y: this.y }
                );
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
    if (!this.activePreset?.nodeSize) {
      return {};
    }

    return {
      // shape: "donut",
      type: 'main-node',
      // type: "donut",
      size: this.source!.activeGraphPreset!.nodeSize,
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
          fontSize: this.activePreset?.globalFontSize ?? 20,
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
    if (this.source?.graphShapeDefinitions) {
      this.source.graphShapeDefinitions.edges.push({
        name: 'default',
        shape: {},
        extendType: 'line',
      });

      this.source.graphShapeDefinitions.edges.push({
        name: 'weighted-indicator-relation',
        shape: {
          afterDraw(cfg: any, group: any) {
            const shape = group.get('children')[0];

            // const useOpacity = this.followedGoal ?? this.followedAction;

            const fromPoint = shape.getPoint(0.65);
            const fromColor = '#222';

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
          const e = this.source!.getElement(cfg.id);
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
    if (!this.source || !this.options?.preset) { return; }
    
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

  public initGraph(reset = false) {
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
        if (evt && evt.target && evt.target.isCanvas && evt.target.isCanvas())
          return true;
        return false;
      },
    });

    this.registerChart();
    const dHeight = this.widget?._size?.componentHeight;
    const dWidth = this.widget?._size?.componentWidth;

    console.log(this.widget._size);

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
        `
      return app.$el as HTMLDivElement;
      }
    
    }
    return '';
  },
  itemTypes: ['node']
});

    this.graph = new G6.Graph({
      container: 'kg-vis',
      width: dWidth, //(this as any).widget._size.width,
      linkCenter: false,
      plugins: [contextMenu, tooltip],
      animate: this.activePreset?.animate ?? false,
      height: dHeight, // (this as any).widget._size.height,
      layout: this.getLayout(),
      // renderer: 'svg',

      modes: {
        default: [
          'drag-node',
          // "drag-combo",
          // "collapse-expand-combo",
          'click-add-node',
          'drag-canvas',
          'zoom-canvas',
          'click-select',
          'shortcuts-call',
          
                                                                                
                        
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

    this.graph.on('viewportchange', (e: any) => {
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
      if (!elementId || !this.source || !this.activePreset?.nodes) {
        return;
      }
      const element = this.source.getElement(elementId);
      const node = this.activePreset.nodes[elementId];
      if (!element || !node) {
        return;
      }
      node.x = e.x;
      node.y = e.y;
    });
    this.graph.on('contextmenu', (a: any) => {
      this.updateContextMenu(a);
    });
    this.graph.on('onClick', (e: any) => {
      debugger;
    });
    this.graph.on('click', (e: any) => {
      if (e.item?._cfg?.model?.id) {
        // find node
        const node = this.source?.getElement(e.item._cfg.model.id);
        if (node) {
          this.source!.openElement(node);
        }
      }
    });
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

  mounted() {
    if (this.source?.graph) {
      this.updateGraph(this.source.graph);
    }
    // this.updateMenu({
    //   id: "clear",
    //   type: "icon",
    //   icon: "delete",
    //   action: (m) => {
    //     this.emptyGraph();
    //   },
    // });
    // this.updateMenu({
    //   id: "refresh",
    //   type: "icon",
    //   icon: "refresh",
    //   action: (m) => {
    //     this.updateGraph(this.source!.graph);
    //   },
    // });
  }
}
</script>
