<template>
  <div>
    <div id="kg-vis" style="height: 100%; width: 100%"></div>
    <div class="vis-settings">
      <v-checkbox v-model="showBaseNode" :label="$cs.Translate('SHOW_BASENODE')"></v-checkbox>
      <v-checkbox v-model="showBaseTypes" :label="$cs.Translate('SHOW_BASETYPES')"></v-checkbox>
      <v-checkbox v-model="showRelationTypes" :label="$cs.Translate('SHOW_RELATION_LABELS')"></v-checkbox>
      <v-checkbox v-model="showRelations" :label="$cs.Translate('SHOW_RELATIONS')"></v-checkbox>
    </div>
  </div>
</template>

<style>
.vis-settings {
  top: 0;
  right: 0;
  position: absolute;
}
</style>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { DocDatasource } from '../../datasources/doc-datasource';
import { IMenu } from '@csnext/cs-core';

import simplebar from 'simplebar-vue';

import G6, { Graph, GraphData } from '@antv/g6';
import { FeatureType, RelationType } from '@csnext/cs-data';

@Component({
  components: { simplebar },
})
export default class ClassViewer extends WidgetBase {
  private graph?: Graph;
  public data?: GraphData;
  private forceLayout?: any;

  public showBaseNode = false;
  public showRelations = true;
  public showRelationTypes = true;
  public showBaseTypes = false;

  @Watch('showBaseNode')
  @Watch('showRelationTypes')
  @Watch('showBaseTypes')
  @Watch('showRelations')
  updateBaseTypes() {
    this.updateGraph();
  }

  @Watch('graphSource.dataModelFilter')
  public filterChanged() {    
    if (this.data?.nodes) {
      this.data.nodes.forEach((n) => {
        if (n?.style && this.graphSource!.dataModelFilter!.length > 0) {
          
        if (          
          n.label &&
          n.label.toString().toLowerCase().indexOf(this.graphSource!.dataModelFilter!.toLowerCase()) > -1
        ) {
          n.style.stroke = 'red';
          n.style.fillOpacity = 1;
          n.style.strokeOpacity = 1;
        } else {
          n.style.stroke = 'black';
          n.style.fillOpacity = 0.25;
          n.style.strokeOpacity = 0.25;
        }      

      } else {
        n.style!.stroke = 'black';
        n.style!.fillOpacity = 1;
        n.style!.strokeOpacity = 1;

      }}
      );
    }
    if (this.graph) {
      this.graph.refresh();
    }
  }

  public get graphSource(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  private updateNode(e: FeatureType) {
    if (e.type && this.graph && this.data && this.graphSource && (this.showBaseNode || e.type !== 'node')) {
      let existing = this.data.nodes!.find((n) => n.id === e.type); // get(e.id);
      let active = true;

      let node = {
        id: e.type,
        classId: e.type,
        label: this.fittingString(e.title!, 50, 10),
        title: e.title,
        hidden: false,
        style: {
          // fill: 'white',
          fill: e.attributes!.color,
        },
        font: {
          color: active ? '#ffffff' : '#aaaaaa',
          background: active ? '#000000' : '#ffffff',
        },
        // color: GraphElement.getBackgroundColor(e, active),
        shadow: active,
      } as any;

      if (!existing) {
        this.data?.nodes?.push(node);
      }
    }
  }

  private updateRelation(e: RelationType, obs: FeatureType) {
    if (!this.data || !this.showRelations || !this.graph || !this.graphSource || !e.type || !obs.type || !e.objectType) {
      return;
    }
    let id = e.type + '-' + obs.type + '-' + e.objectType;
    let type = this.graphSource?.findObservation(e.type);
    let title = type?.title ?? e.type;
    let existing = this.data.edges!.find((n) => n.id === id);
    if (!existing) {
      let edge = {
        id: id,
        classId: e.type,
        source: obs.type,
        target: e.objectType,
        width: 3,
        style: {
          endArrow: {
            path: G6.Arrow.triangle(),
          },
        },
        label: this.showRelationTypes ? title : undefined,
        arrows: 'to',
      } as any;
      this.data?.edges?.push(edge);
    }
  }

  private updateBaseType(from: RelationType, obs: FeatureType) {
    if (!this.showBaseTypes || !this.data || !this.graph || !this.graphSource || !from.type || !obs.type) {
      return;
    }
    let id = from.type + '-' + obs.type;
    let existing = this.data.edges!.find((n) => n.id === id);
    if (!existing) {
      let edge = {
        id: id,
        source: from.type,
        target: obs.type,
        width: 3,
        label: this.showRelationTypes ? 'type' : undefined,
        arrows: 'to',
        style: { endArrow: true, lineDash: [2, 2] },
      } as any;
      this.data?.edges?.push(edge);
    }
  }

  private fittingString(str: string, maxWidth: number, fontSize: number) {
    let currentWidth = 0;
    let res = str;
    const pattern = new RegExp('[ ]+'); // distinguish the Chinese charactors and letters
    str.split('').forEach((letter, i) => {
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

  public updateGraph() {
    if (!this.graphSource?.featureTypes || !this.graph) {
      return;
    }
    // if (!this.data) {
    this.data = { nodes: [], edges: [] };
    // this.graph.data(this.data);
    // }
    for (const e of Object.values(this.graphSource.featureTypes)) {
      if (e.type && !e.isEdge) {
        this.updateNode(e);
        // if (e.class) {
        // this.updateEdge({
        //   source: e.id,
        //   target: e.class.id,
        //   label: "is",
        // } as any);
        // }
      }
    }

    for (const e of Object.values(this.graphSource.featureTypes)) {
      if (e._baseTypes) {
        for (const base of e._baseTypes) {
          this.updateBaseType(e, base);
        }
      }
    }

    for (const e of Object.values(this.graphSource.featureTypes)) {
      if (e.properties) {
        for (const prop in e.properties) {
          if (Object.prototype.hasOwnProperty.call(e.properties, prop)) {
            const element = e.properties[prop];
            if (element.relation && element._originalType === e.type) {
              this.updateRelation(element.relation, e);
            }
          }
        }
      }
    }

    // this.visibleNodes = this.data.nodes!.map((r) => r.id);

    // for (const edge of this.data.edges!) {
    //   if (edge?.id) {
    //     const el = this.graphSource.getElement(edge.id!.toString());
    //     if (!el) {
    //       this.graph.remove(edge.id!);
    //     }
    //   }
    // }

    if (this.graph) {
      this.graph.data(this.data);
      this.graph.render();

      // this.network.setOptions({
      //   physics: { stabilization: { iterations: 200 } },
      // });
      // this.network.stabilize(0.1);
      // this.network.fit();
    }
  }

  refreshDragedNodePosition(e: any) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }

  public initGraph() {
    // var container = document.getElementById("kg-vis");
    if (this.graph) {
      return;
    }

    this.graph = new G6.Graph({
      container: 'kg-vis',
      width: 1200, //(this as any).widget._size.width,
      // linkCenter: true,
      height: 1200, // (this as any).widget._size.height,
      layout: {
        type: 'force',
        gravity: 10,
        preventOverlap: true,
        speed: 25,
        nodeStrength: 100,
        nodeSpacing: 150,
        nodeSize: 15,
        clustering: false,
        collideStrength: 0.1,
        workerEnabled: false,
        linkDistance: 150,
        center: [500, 500],
      },
      modes: {
        default: [
          'drag-node',
          // "drag-combo",
          // "collapse-expand-combo",
          // "click-add-node",
          'drag-canvas',
          'activate-relations',
          'zoom-canvas',
          'click-select',
          // {
          //   type: "edge-tooltip",
          //   formatText: (model: {[key: string]: any}) => {
          //     if (model?.classId) {
          //       let type = this.graphSource?.findObservation(model.classId);
          //       if (type) {
          //         return type.title;
          //       }
          //     }
          //     return 'not defined';
          //   },
          //   offset: 30,
          // },
        ],
        // addEdge: ["click-add-edge", "click-select"],
      },
      defaultNode: {
        shape: 'circle',
        size: [75],
        color: '#5B8FF9',
        style: {
          fill: '#9EC9FF',
          keepVisualSize: true,
          lineWidth: 3,
        },
        labelCfg: {
          position: 'center',
          autoRotate: true,
          style: {
            fill: '#000',
            fontSize: 12,
            fontFamily: 'Roboto, sans-serif',
          },
        },
      },
      defaultEdge: {
        style: {
          endArrow: true,
          stroke: 'black',
          lineWidth: 1,
        },
        labelCfg: {
          autoRotate: true,
          style: {
            fontSize: 10,
            // strokeWidth: 2,
            background: {
              fill: '#ffffff',
              fontFamily: 'Roboto, sans-serif',
              padding: [2, 2, 2, 2],
              radius: 2,
            },
          },
        },

        // curveOffset: 200
      },
      defaultCombo: {
        type: 'rect',
        size: [50, 50], // Combo 的最小大小
        style: {
          lineWidth: 1,
        },
        labelCfg: {
          refY: 10,
          position: 'top',
          style: {
            fontSize: 10,
          },
        },
      },
    });

    this.forceLayout = this.graph.get('layoutController').layoutMethod;
    this.graph.on('node:dragstart', (e: any) => {
      this.graph!.layout();
      // this.forceLayout.execute();
      this.refreshDragedNodePosition(e);
    });
    this.graph.on('node:drag', (e: any) => {
      if (this.forceLayout) {
        this.forceLayout.execute();
      }
      this.refreshDragedNodePosition(e);
      console.log('drag');
    });
    this.graph.on('node:dragend', (e: any) => {
      e.item.get('model').fx = null;
      e.item.get('model').fy = null;
      // this.refreshDragedNodePosition(e);
    });
    this.graph.on('click', (e: any) => {
      if (e.item?._cfg?.model?.classId) {
        let type = this.graphSource?.findObservation(e.item._cfg.model.classId);
        if (type) {
          this.graphSource?.openFeatureTypeEditor(type);
        }
      }
    });
  }

  public contentLoaded() {
    if (this.graphSource) {
      // this.tutorialSource.goToId(this.tutorialSource.activeId);
      this.updateGraph();
      if (this.graphSource.events) {
        this.busManager.subscribe(this.graphSource.events, DocDatasource.FEATURE_TYPES, (a: string, b: FeatureType) => {
          if (a === DocDatasource.FEATURE_TYPE_SELECTED && this.graph && b?.type && !b.isEdge) {
            this.graph.focusItem(b.type, true);
          }
        });
      }
    }
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

  mounted() {
    this.initGraph();
    this.contentLoaded();
  }
}
</script>
