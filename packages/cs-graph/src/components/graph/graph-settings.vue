<template>
  <v-container v-if="source && source.activeGraphPreset">    
      <v-row>        
          <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="source.graphPresets"
          label="Preset"
          :value="source.activeGraphPreset"
          item-text="title"
          @change="applyPreset"
          return-object
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-layout>
          <v-btn text @click="savePreset()"><v-icon>save</v-icon></v-btn>
          <v-btn text @click="addPreset()"><v-icon>add</v-icon></v-btn>
          <v-btn text @click="deletePreset()"><v-icon>delete</v-icon></v-btn>
        </v-layout>
      </v-col>
    </v-row>
      
    <v-container fluid>
      <v-row>
        <v-col>
          <cs-form :data="source.activeGraphPreset" :formdef="formDef" class="pt-2 pa-3" @saved="updateGraph"></cs-form>

          <!-- <v-select :items="['circular', 'force']" v-model="source.activeGraphPreset.layout"></v-select> -->
          <!-- <v-slider v-model="source.activeGraphPreset.nodeStrength" min=0 max=2000></v-slider> -->
          
          <!-- {{ source.activeGraphPreset.nodeSize}} -->
          <!-- <v-slider label="node size" v-model="source.activeGraphPreset.nodeSize" min=0 max=200></v-slider> -->
        </v-col>
      </v-row>
      <!-- <v-row no-gutters>
        <v-col>
          <h3>{{$cs.Translate('NODES')}}</h3>
          <template v-for="(el, key, index) in source.typeStats"
            >
          
          <v-checkbox
            :color="getColor(el)"
            :key="index"
            v-if="el.elementCount > 0 "
            :label="`${el.type.title} - ${el.elementCount}`"            
            @change="filterChanged"
            hide-details>
          </v-checkbox>
          </template>        
        </v-col>
        <v-col>
          <h3>{{$cs.Translate('EDGES')}}</h3>
          <v-checkbox
            :color="getColor(el)"
            v-for="(el, key) in source.availableEdgeTypes"
            :key="key"
            :label="el.key"
            v-model="el._visible"
            @change="filterChanged"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row> -->
    </v-container>
      <!-- <v-switch v-model="settings.showDataModel" inset dense label="Data model tonen"></v-switch>     -->
    <!-- <v-switch v-model="settings.showInstance" inset dense label="Instances tonen"></v-switch>    
    <v-switch v-model="settings.showExternal" inset dense label="Externe links"></v-switch>
    <v-switch v-model="settings.autoFocus" inset dense label="Auto focus"></v-switch>
    <v-switch v-model="settings.showReliability" inset dense label="Toon betrouwbaarheid"></v-switch>
    <v-switch v-model="settings.filterTimeline" inset dense label="Tijdlijn filter"></v-switch>
    <v-switch v-model="settings.showAllOnMap" @change="source.updateLayer()" inset dense label="Show all on map"></v-switch> -->
    <!-- <v-switch v-model="settings.filterStep" inset dense label="Filter active step"></v-switch>
    
    <v-switch v-model="settings.showAllOnTimeline" inset dense label="Show all on timeline"></v-switch> -->
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { GraphElement, GraphPreset, GraphDatasource } from "@csnext/cs-data";
import { DocDatasource } from "@csnext/cs-graph";
import { IFormObject } from "@csnext/cs-core";

@Component({
  components: {}
})
export default class GraphSettings extends WidgetBase {
  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public deletePreset() {
    if (!this.source?.activeGraphPreset) { return; }
    this.source.deletePreset(this.source.activeGraphPreset);     
  }

  public addPreset() {
    
    $cs.triggerInputDialog('GRAPH_PRESET', 'GRAPH_PRESET_TITLE', 'preset').then(r => {
      if (!this.source) { return; }
      this.source.addGraphPreset({ ... new GraphPreset(), ...{ title: r }}, true);
    }).catch(e => {

    })
    
  }

  public updateGraph() {
    console.log('update graph');
    if (!this.source?.events) { return;}
    this.source.events.publish(GraphDatasource.PRESET_EVENTS, GraphDatasource.PRESET_CHANGED, this.source.activeGraphPreset);
  }

  public applyPreset(preset: GraphPreset) {
    if (!this.source) { return; }    
    this.source.applyGraphPreset(preset);    
    this.$forceUpdate();
  }

  public savePreset() {
      if (!this.source?.graphPresets) {return; }
      this.source.saveGraphPresets();
  }

  public getVisible(el: GraphElement) {
    return !el._hidden
  }

  public getColor(el: GraphElement): string {
    return GraphElement.getBackgroundColor(el);
  }

  public get formDef(): IFormObject {

    const isLayout= (config: GraphPreset, layout: string | string[]) => {
      if (typeof layout === 'string') {
        return config.layout && config.layout === layout
        }
      
      return config.layout && layout.includes(config.layout)
    }

    return {                            
        hideTitle: true,
        isPanel: false,

        fields: [
          {
            title: 'TITLE',
            _key: 'title',
            type: 'string'            
          },
           {
            title: 'LAYOUT',
            _key: 'layout',
            type: 'selection',
            readonly: false,
            options: ['circular', 'radial', 'concentric', 'grid', 'mds', 'fruchterman', 'force', 'forceAtlas2', 'gForce', 'dagre']             
          },
          {
            title: 'ANIMATE',
            _key: 'animate',
            type: 'checkbox'
          },                 
          {
            title: 'NODE_SIZE',
            _key: 'nodeSize',
            type: 'slider',
            min: 10,
            max: 300
          },              
          {
            title: 'GRAVITY',
            _key: 'gravity',
            type: 'slider',
            min: 0,
            max: 10,
            step: 0.1,
            requirements: [ (v: GraphPreset)=> isLayout(v,'fruchterman')  ]   
          }, 
          {
            title: 'CLUSTERING',
            _key: 'clustering',
            type: 'checkbox',
            requirements: [ (v: GraphPreset)=> isLayout(v,'fruchterman')  ]   
          }, 
          {
            title: 'CLUSTER_GRAVITY',
            _key: 'clusterGravity',
            type: 'slider',
            min: 0,
            max: 20,
            step: 0.1,
            requirements: [ (v: GraphPreset)=> isLayout(v,'fruchterman'), (v: GraphPreset)=> v.clustering  ]   
          }, 
          {
            title: 'DIRECTION',
            _key: 'rankdir',
            type: 'selection',
            options: ['TB', 'BT', 'LR', 'RL'],
            requirements: [ (v: GraphPreset)=> isLayout(v,'dagre')  ]   
          },  
          {
            title: 'ALIGN',
            _key: 'align',
            type: 'selection',
            options: ['UL', 'UR', 'DL', 'DR'],
            requirements: [ (v: GraphPreset)=> isLayout(v,'dagre')  ]   
          },              
          
          {
            title: 'EDGE_STRENGTH',
            _key: 'edgeStrength',
            type: 'slider',
            min: 0.01,
            max: 1,
            step: 0.01,
            requirements: [ (v: GraphPreset) => isLayout(v,['force', 'gForce'])  ] 
          },
           {
            title: 'COLIDE_STRENGTH',
            _key: 'colideStrength',
            type: 'slider',
            min: 0.01,
            max: 1,
            step: 0.01,
            requirements: [ (v: GraphPreset) => isLayout(v,['force'])  ] 
          },
          {
            title: 'NODE_STRENGTH',
            _key: 'nodeStrength',
            type: 'slider',
            min: 1,
            max: 100,
            requirements: [ (v: GraphPreset) => isLayout(v,['force', 'gForce'])  ] 
          },
          {
            title: 'ALPHA',
            _key: 'alpha',
            type: 'slider',
            min: 0,
            default: 0.3,
            max: 1,
            step: 0.1,
            requirements: [ (v: GraphPreset) => isLayout(v,['force'])  ] 
          },
          {
            title: 'LINK_DISTANCE',
            _key: 'linkDistance',
            type: 'slider',
            min: 10,
            max: 500,
            requirements: [ (v: GraphPreset) => isLayout(v,['radial', 'mds', 'gForce', 'force'])  ] 
          },
          {
            title: 'UNIT_RADIUS',
            _key: 'unitRadius',
            type: 'slider',
            min: 10,
            max: 300,
            requirements: [ (v: GraphPreset)=> isLayout(v,'radial')  ] 
          },
          
          {
            title: 'RADIUS',
            _key: 'radius',
            type: 'slider',
            min: 10,
            max: 1000,
            requirements: [ (v: GraphPreset)=> isLayout(v,'circular')  ]
          },
          {
            title: 'FONT_SIZE',
            _key: 'globalFontSize',
            type: 'slider',
            min: 8,
            max: 24,
            default: 12
          },             

// linkDistance: 50, // Edge length
//           nodeStrength: 30,
//           edgeStrength: 0.1,
//           collideStrength: 0.8,
//           preventOverlap: false,
//           nodeSize: 30,
//           alpha: 0.3,
//           alphaDecay: 0.028,
//           alphaMin: 0.01,
//           forceSimulation: null,
          
        ]
    } as IFormObject;
}

  public updateTypes() {
    if (!this.source?.featureTypes || !this.source.graph) { return; }    
    
    // for (const element in ) {
      

      
    // }
  }

  public contentLoaded() {
    if (!this.source) { return; }
     
    this.busManager.subscribe(
        this.source!.events,
        GraphDatasource.PRESET_EVENTS, (a: string, d: GraphPreset) => {
            if (a === GraphDatasource.PRESET_ACTIVATED) {              
              this.$forceUpdate();
            }
        });
  }

  

  public filterChanged() {
    this.source!.bus.publish("filter", "changed");
  }

  constructor() {
    super();
  }
}
</script>
