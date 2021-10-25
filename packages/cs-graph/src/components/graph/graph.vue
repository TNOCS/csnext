<template>
  <div v-if="source" style="height: 100%">    
    <v-tabs
      v-model="tab"      
    >
      <v-tab
        v-for="(preset,pindx) in source.graphPresets"
        :value="tab"
        :key="pindx"
      >
        {{ preset.title }}
      </v-tab>
    </v-tabs>

    <v-btn @click="fitGraph()" icon>
        <v-icon>fit_screen</v-icon>
    </v-btn>

    <div id="kg-vis" style="height: 100%; width: 100%"></div>
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
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-if="item.items"
            v-for="(subItem, si) in item.items"
            :key="si"
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
import { Component, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { GraphDatasource, GraphObject, GraphElement,GraphPreset, PropertyValueType } from "@csnext/cs-data";
import dateFormat from "dateformat";
import { IMenu } from "@csnext/cs-core";
import G6, { Graph, NodeConfig, GraphData, Menu, LayoutConfig } from "@antv/g6";
import { guidGenerator } from "@csnext/cs-core";
import { DocDatasource } from "../..";
const debounce = require('lodash.debounce');

@Component({
  components: {},
})
export default class NetworkGraph extends WidgetBase {
  // public network?: Network;
  // public nodes = new DataSet([] as any);
  // public edges = new DataSet([] as any);
  public data?: GraphData;
  public visibleNodes: string[] = [];
  private forceLayout?: any;
  private showMenu = false;
  private x = 0;
  private y = 0;
  private tab: any = null;

  private graph?: Graph;
  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  @Watch('tab')
  tabChanged() {
    if (!this.source?.graphPresets) { return; }
    const activePreset = this.source.graphPresets[this.tab];
    if (activePreset) {
      this.source.applyGraphPreset(activePreset);
    }    
  }

  private settingsUpdatedDebounce = debounce(this.settingsUpdated, 200);
  private graphInitDebounce = debounce(()=>{ if (!this.source?.graph) { return; } this.initGraph(true); this.updateGraph(this.source.graph, true);} , 200);
  private viewportDebounce = debounce((graph: Graph)=>{ 
    if (!graph) { return; } 
      const zoom = graph.getZoom();
      const center = graph.getGraphCenterPoint();
      $cs.updateRouteQuery({'gz': zoom, 'gx': center!.x, 'gy': center!.y});       
  } , 1000);


  public contextMenuitems: any[] = [];

  // public resize() {
  //   console.log('resize');
  //   console.log(this.widget._size);
  //   if (this.graph) {
  //     this.graph.changeSize(this.widget._size.componentWidth, this.widget._size.componentHeight);
  //   }
  // }

  public getShortDate(date: Date) {
    if (date) {
      return dateFormat(date, "mmmm dS, yyyy");      
    }
  }
  settingsChanged() {
    this.settingsUpdatedDebounce();    
  }
  
  graphChanged() {    
    if (!this.graph || !this.source?.graph) { return; }
    console.log('graph changed');
    this.graph.updateLayout(this.getLayout());
    this.graph.layout();    
    this.initGraph(true) ; 
    this.updateGraph(this.source.graph, true);
    this.graph.render();
  }


  public settingsUpdated() {
    if (this.source && this.source.graph) {
      console.log("update settings");
    }
  }

  constructor() {
    super();
  }

  public resize() {
    if (!this.graph || !this.widget._size) { return; }
    this.graph.changeSize(this.widget._size.width, this.widget._size.height);
    this.graph.render();

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
    if (this.source?.base_url && e._featureType?.iconProperty && e.properties && e.properties.hasOwnProperty(e._featureType.iconProperty)) {
      return `${this.source.base_url}/files/image/?url=${e.properties[e._featureType.iconProperty]}`
    }
    if (e._featureType?.icon && this.source?.base_url) {
      return `${this.source.base_url}/files/image/?url=${e._featureType.icon}`;      
    }
    return null; //'images/Flag_of_Russia.svg';
  }

  private updateNode(e: GraphElement, force = false) {
    if (!e.id || !this.graph || !this.data || !this.data.nodes || !this.source || !this.source.activeGraphPreset?._visibleNodes) { return; }
      let existingIndex = this.data.nodes!.findIndex((n) => n.id === e.id);
      let existing : NodeConfig | undefined  = this.data.nodes[existingIndex]; // get(e.id);
      e._included = this.source.activeGraphPreset._visibleNodes.includes(e);
      if (force && existing && this.data.nodes) {        
        existing = undefined;
        this.data.nodes = this.data.nodes.filter(n => n.id !== e.id);
      }

      if (e._included) {

      let node = {
          id: e.id,
          label: this.fittingString(e._title!, 80, this.source.activeGraphPreset.globalFontSize ?? 12), // this.labelFormatter(e._title!, this.settings.labelMaxLength),
          // hidden: this.graphSource.getHidden(
          //   e,
          //   this.settings
          // ),
          cluster: e._featureType?.type,
          img: this.getElementImage(e),
          // element: e,
          size: this.source!.activeGraphPreset!.nodeSize,
          style: {
            fill: GraphElement.getBackgroundColor(e),
            fontFamily: "Roboto, sans-serif",
          },
          labelCfg: {            
            style: {
              fontSize: this.source.activeGraphPreset.globalFontSize ?? 12,
              fontFamily: "Roboto, sans-serif",
            },
          },
        } as any;

        e._group = GraphElement.getGroup(e);

      if (!existing) {        

        this.data?.nodes?.push(node);
        if (e._outgoing) {
          for (const outgoing of e._outgoing) {
            outgoing._included = this.source.activeGraphPreset._visibleNodes.includes(outgoing);
            if (outgoing.to) {            
              outgoing.to._included = this.source.activeGraphPreset._visibleNodes.includes(outgoing.to);
              if (!outgoing._included && outgoing?.to?._included) {
                this.updateEdge(outgoing);
              }
            }
          }
        }

        if (e._incomming) {
          for (const incomming of e._incomming) {
            incomming._included = this.source.activeGraphPreset._visibleNodes.includes(incomming);
            if (incomming.from) {            
              incomming.from._included = this.source.activeGraphPreset._visibleNodes.includes(incomming.from);
            if (!incomming._included && incomming?.from?._included) {
              this.updateEdge(incomming);
            }
            }
          }
        }
      }
          else {
            this.graph.update(node.id, node);
            this.data.nodes![existingIndex] = node;
          }
       
        
      } else if (existing && !e._included) {
        this.graph.remove(e.id);
      }
    
  }

  private updateEdge(e: GraphElement) {

    if (
      !this.data ||
      !this.graph ||      
      !this.source ||
      !this.source.activeGraphPreset ||
      !e.id ||
      (e.fromId && !this.visibleNodes.includes(e.fromId))
    ) {
      return;
    }

    let active = e._firstStep === this.source!.activeId;

    let existing = this.data.edges!.find((n) => n.id === e.id);

    // console.log("Adding edge");

    let edge = {
      id: e.id,
      source: e.fromId,
      target: e.toId,
      width: 3,
      labelCfg: {
        autoRotate: true,
        refY: 10,
        style: {
          fontSize: this.source.activeGraphPreset.globalFontSize
        }
      },
      hidden: this.source.getHidden(e, this.source.activeGraphPreset),
      label: this.fittingString(e.classId!, 80, this.source.activeGraphPreset.globalFontSize ?? 12),
      arrows: "to",
    } as any;



    if (!existing) {      
        this.data?.edges?.push(edge);        
    } else {      
      this.graph.remove(edge.id);      
    }
  }

  public fitGraph() {
      if (this.graph) {
          this.graph.fitView(20);
      }
  }

  private fittingString (str : string, maxWidth: number, fontSize: number) {
    let currentWidth = 0;
    let res = str;
    const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
    str.split('').forEach((letter : string, i : number) => {
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
  };

  public getLayout() {
    if (!this.source?.activeGraphPreset) { return; }
    if (!this.source.activeGraphPreset.layout) { this.source.activeGraphPreset.layout = 'force'; }
    let layout : LayoutConfig = { type: this.source.activeGraphPreset.layout, preventOverlap: true};
    switch (this.source.activeGraphPreset.layout) {
      case 'force': 
        layout = { ...layout, ...{
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
        }}
        break;
      case 'dagre': 
        layout = { ...layout, ...{
          rankdir: this.source.activeGraphPreset.rankdir ?? 'TB',
          align:this.source.activeGraphPreset.align ?? 'UL'

          // preventOverlap: true
        }}
        break;
      case 'forceAtlas2': 
        layout = { ...layout, ...{
          preventOverlap: true
        }}
        break;
      case 'circular': 
        layout = { ...layout, ...{
          radius: 400,
          startRadius: 10,
          endRadius: 100,
          clockwise: false,
          divisions: 5,
          ordering: 'degree',
          angleRatio: 1
        }}
        break;
      case 'grid':
        layout = { ...layout, ...{  
          sortBy: 'cluster'        
        }}
        break;
       case 'concentric':
         layout = { ...layout, ...{
          maxLevelDiff: 0.5,
          preventOverlap: true,

          sortBy: 'degree'
        }}
        break;
       case 'radial': 
        layout = { ...layout, ...{
          linkDistance: this.source.activeGraphPreset.linkDistance ?? 50,
          unitRadius: this.source.activeGraphPreset.unitRadius ?? 50,
          preventOverlap: true,
        }}
        break;
      case 'mds': 
        layout = { ...layout, ...{
          linkDistance: this.source.activeGraphPreset.linkDistance ?? 50          
        }}
        break;
      case 'fruchterman': 
        layout = { ...layout, ...{ 
          gravity: this.source.activeGraphPreset.gravity ?? 1,
          clustering: this.source.activeGraphPreset.clustering ?? false,
          clusterGravity: this.source.activeGraphPreset.clusterGravity ?? 10,
          speed: 2000,
          maxIteration: 100,
          tick: () => {
            // this.graph!.refreshPositions();
          }          
              } } 
        break;
    }
    return layout;
  }

  public updateGraph(graph: GraphObject, redraw = false) {
    if (!this.source || !this.graph) {
      return;
    }
    console.log("update graph");
    if (!this.data) {
      this.data = { nodes: [], edges: [] };
      this.graph.data(this.data);
    }
    for (const e of Object.values(graph).filter(n => n.type === "node" && n.id)) {
      this.updateNode(e, redraw);
    };         

    for (const node of this.data.nodes!) {
      const el = this.source.getElement(node.id.toString());
      if (!el || !GraphElement.getVisibility(el)) {
        // this.graph.remove(node.id);
        this.data.nodes = this.data.nodes?.filter((n) => n.id !== node.id);
        // this.nodes.remove(id);
      }
    }


    this.visibleNodes = this.data.nodes!.map((r) => r.id);

    for (const e of Object.values(graph)) {
      if (e.type === "edge") {
        if (e.fromId && e.toId) {
          this.updateEdge(e);
        }
      }
    }

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
      if (redraw) {
        this.graph.render();
      }
    }
  }

  private loaded = false;

  public contentLoaded() {
    // if (this.loaded) { return; }
    // this.loaded = true;

    setTimeout(()=>{

    
    console.log('content loaded');
    if (this.source?.graph) {
      this.initGraph(true);
    
      // this.tutorialSource.goToId(this.tutorialSource.activeId);
      this.updateGraph(this.source.graph, true);
      
      this.busManager.subscribe(
        this.source!.events,
        GraphDatasource.PRESET_EVENTS, (a: string, d: GraphPreset) => {
            if (!this.source?.graph) { return; }
            if (a === GraphDatasource.PRESET_CHANGED) {
              this.initGraph(true) ; 
              this.updateGraph(this.source.graph, true);              
            }
            if (a === GraphDatasource.PRESET_ACTIVATED) {              
              this.emptyGraph()
              this.tab = this.source.graphPresets.indexOf(d);
              this.initGraph();              
              this.$forceUpdate();
            }            
        });

      this.busManager.subscribe(
        this.source!.bus,
        GraphDatasource.GRAPH_EVENTS,
        (a: string, d: GraphElement) => {
          if (a === GraphDatasource.ELEMENT_UPDATED && this.graph && d) {
            if (d._included) {
              //  this.graph.render();
              this.updateGraph(this.source!.graph, false);
            }
          }
          if (a === GraphDatasource.GRAPH_UPDATED && this.graph) {
            if (d) {
              this.updateNode(d);
              if (d._outgoing && this.source?.availableEdgeTypes) {
                for (const outgoing of d._outgoing.filter(o => o.to)) {
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
                for (const incomming of d._incomming.filter(i => i.from)) {
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

            // this.network?.redraw();
          }
        }
      );
    }
    }, 100);
  }

  refreshDragedNodePosition(e: any) {
    const model = e.item.get("model");
    model.fx = e.x;
    model.fy = e.y;
  }

  private labelFormatter(text: string, minLength = 10) {
    if (text && text.split("").length > minLength)
      return `${text.substr(0, minLength)}...`;
    return text;
  }

  public updateContextMenu(a: any) {
    if (this.source && a.item?._cfg?.id) {
      const element = this.source.getElement(a.item._cfg.id);
      if (!element?._featureType?.properties) {
        return;
      }
      switch (element?.type) {
        case "node":
          const outgoingMenu = {
            title: "outgoing",
            active: true,
            icon: "visibility",
            action: () => {},
            items: [
              //   {
              //   title: 'all',
              //   action: ()=> {
              //     this.source?.addRelationsToGraph(element);
              //   }
              // }
            ] as any[],
          };
          const incommingMenu = {
            title: "incoming",
            active: true,
            icon: "visibility",
            action: () => {},
            items: [
              //   {
              //   title: 'all',
              //   action: ()=> {
              //     this.source?.addRelationsToGraph(element);
              //   }
              // }
            ] as any[],
          };
          const createMenu = {
            title: "create",
            active: false,
            icon: "add",
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
                  if (!type || !this.source) {
                    return;
                  }
                  let name = `new ${type.type}`;

                  name = await $cs.triggerInputDialog(
                    "Name",
                    "enter new name",
                    name
                  );

                  this.source
                    .addNewNode({
                      id: `${type.type}-${guidGenerator()}`,
                      properties: { name },
                      classId: type.type,
                    })
                    .then((e) => {
                      this.source?.addElementToGraph(e);
                      this.source?.selectElement(e);
                    })
                    .catch((e) => {
                      alert("error creating entity");
                    });
                },
              });
            }
          }

          if (element._incomming && element._incomming.length>0) {            
            for (const relation of element._incomming.filter(
              (i) => i.from && !i.from?._included
            )) {
              
                const items = incommingMenu.items.filter((r) => r.title === relation.from?.classId);
               if (items.length === 0) {
                // find prop
                let relationtitle = relation.from?.classId;
                
                incommingMenu.items.push({
                  title: relationtitle!,
                  action: () => {
                    if (relation?.classId) {
                      this.source?.addRelationsToGraph(
                        element,
                        relation.classId
                      );
                    }
                  },
                });
              }
            }
          }

          if (element._outgoing) {
            for (const relation of element._outgoing.filter(
              (i) => i.to && !i.to?._included
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
                    if (relation?.classId) {
                      this.source?.addRelationsToGraph(
                        element,
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
          this.contextMenuitems.push({
            title: "hide",
            icon: "visibility_off",
            action: () => {
              this.source?.removeElementFromGraph(element);
            },
          });
          this.contextMenuitems.push({
            title: "focus",
            icon: "adjust",
            action: () => {
              this.source?.createKGView([element]);
            },
          });
          break;
        case "edge":
          break;
      }

      this.x = a.clientX;
      this.y = a.clientY;

      this.showMenu = true;      
    }
  }

  public getNodeStyle() {    
    if (!this.source?.activeGraphPreset?.nodeSize)  { return {}}
    return {    
        // shape: "circle",
        type: 'main-node',
        size: [this.source!.activeGraphPreset!.nodeSize],        
        color: "#5B8FF9",
        clipCfg: {
          show: true,
          type: 'circle',
          r: this.source!.activeGraphPreset!.nodeSize / 2
        },
        style: {
          fill: "#9EC9FF",
          keepVisualSize: true,
          lineWidth: 3,
        },
        labelCfg: {
          position: "bottom",
          autoRotate: true,
          style: {
            fill: "#000",
            fontSize: this.source?.activeGraphPreset?.globalFontSize ?? 20,
          },
        },
      };
  }

  public registerChart() {
    if (!this.source?.graph || !this.widget?._size) { return; }
        const lightBlue = '#5b8ff9';
        const lightOrange = '#5ad8a6';
        G6.registerNode('main-node', {          
            update: undefined,
            afterDraw: (cfg: any, group: any) => {
                const radius = (cfg.size / 2) + 1; // node radius
                const element = this.source!.graph![cfg.id] as GraphElement;
                const shape = group.get('children')[0];                

                // const keyShape = group.get('children')[0];
                // const back = group.addShape('circle', {
                //   attrs: {
                //     r: radius, //cfg.clipCfg.r,
                //     x: 0,
                //     y: 0,
                //     stroke: 'black',
                //     lineWidth: 4,                    
                //     shadowOffsetY: 6,
                //     shadowColor: '#eee',
                //     shadowBlur: 10,
                //     opacity: 0.5,
                //   }
                // });
                // back.toBack();



                // if (element?._featureType?.iconProperty) {
                //   console.log(element.properties[element._featureType.iconProperty]);
                // group.addShape('image', {
                //         attrs: {
                //             x: -10,
                //             y: -radius + 8,
                //             img: 'images/Flag_of_Russia.svg' // 'http://commons.wikimedia.org/wiki/Special:FilePath/Russia%2087.74494E%2066.20034N.jpg' //element.properties[element._featureType.iconProperty],
                //         },
                //         // must be assigned in G6 3.3 and later versions. it can be any value you want
                //         name: 'image-shape',
                //     });
                
                // }
              
            //  group.addShape('text', {
            //         attrs: {
            //           x: 0, // 居中
            //           y: 0,
            //           textAlign: 'center',
            //           textBaseline: 'middle',
            //           text: '&&',

            //           fontStyle: 'bold',
            //         },
            //         name: 'text-shape',
            //       });     
                // if (!st || !this.graph) { return; }
            }
        }, 'circle');
        

    }

  public initGraph(reset = false) {

    console.log('init graph');
    
      if (!this.source || !this.source.activeGraphPreset) { return; }

    
    // var container = document.getElementById("kg-vis");
    if (this.graph && reset) {
      this.graph.destroy();
      this.graph = undefined;
    }
    if (!reset && this.graph) {
      return;
    }

    const contextMenu = new Menu({
      shouldBegin(evt) {
        if (evt && evt.target && evt.target.isCanvas && evt.target.isCanvas())
          return true;
        return false;
      },
    }); 
    
    this.registerChart();
    const dHeight = this.widget?._size?.componentHeight;
    const dWidth = this.widget?._size?.componentWidth;

    
    

    console.log(this.widget._size);

    this.graph = new G6.Graph({
      container: "kg-vis",
      width: dWidth, //(this as any).widget._size.width,
      linkCenter: true,
      plugins: [contextMenu],
      animate: this.source.activeGraphPreset.animate ?? false,
      height: dHeight, // (this as any).widget._size.height,
      layout: this.getLayout(),
   
      modes: {
        default: [
          "drag-node",
          // "drag-combo",
          // "collapse-expand-combo",
          // "click-add-node",
          "drag-canvas",
          "zoom-canvas",
          "click-select",
          "shortcuts-call",
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
          fill: "#fff",
          stroke: "#9EC9FF",
          padding: [2, 2, 2, 2],
          radius: 2,
        },
        // labelCfg: {
        //   style: {
        //      fontSize: this.source.activeGraphPreset.globalFontSize ?? 12
        //   }

        // },
        style: {
          stroke: "#e2e2e2",
          lineWidth: 3,
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z",
            fill: "#e2e2e2",
          },
        },
        // curveOffset: 200
      },
      defaultCombo: {
        type: "circle",
        // size: [50, 50], // Combo 的最小大小
        style: {
          lineWidth: 1,
        },
        labelCfg: {
          refY: 10,
          position: "top",
          style: {
            fontSize: 18,
          },
        },
      },
    });

    this.graph.on('viewportchange', (e: any) => {                
        this.viewportDebounce(this.graph);
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
    // this.graph.on("node:dragend", (e: any) => {
    //   e.item.get("model").fx = null;
    //   e.item.get("model").fy = null;      
    // });
    this.graph.on("node:contextmenu", (a: any) => {
      this.updateContextMenu(a);
    });
    this.graph.on("node:click", (e: any) => {
      if (e.item?._cfg?.id) {
        // find node
        const node = this.source?.getElement(e.item._cfg.id);
        if (node) {
          this.source!.selectElement(node);
        }
      }
    });    
  }

  emptyGraph() {
    console.log("empty graph");
    
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
    this.contentLoaded();

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

    this.busManager.subscribe(this.widget!.events, "size", (a, d) => {
      // if (this.network) {
      // this.network.redraw();
      // this.network.fit();
      // }
    });
  }
}
</script>
