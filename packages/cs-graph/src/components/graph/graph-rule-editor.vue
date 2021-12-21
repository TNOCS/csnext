<template>
  <div v-if="activePreset && rule" class="rule-line" >
    <v-layout>
      <span class="rule-legend" :style="getRuleStyle(rule)">
        <!-- <v-icon dark class="rule-legend-icon" v-if="rule._featureType && rule._featureType.icon">{{rule._featureType.icon}}</v-icon> -->
      </span>
      <div v-if="rule.type === 'TYPE'">        
        <v-select
          @change="saveType()"
          v-if="rule._editMode"
          v-model="rule.featureType"
          :items="availableTypes"
          item-text="title"          
          item-value="type"
        ></v-select>        
        <span v-else class="rule-type">{{ rule._featureType.title }}</span>
      </div>
      <div v-if="rule.type === 'ELEMENT'">
          <span class="rule-element-id" v-if="rule._element">{{ rule._element.properties.name }}</span>
      </div>
      <div v-if="rule.type === 'RELATION'">
        <v-select
          @change="saveRelation()"
          v-if="rule._editMode"
          :items="availableRelations"
          v-model="rule.relationType"
          item-text="label"          
          item-value="relation.type"
        ></v-select>
        <span v-else class="rule-type" >{{ rule.relationType }}</span>        
      </div>
      <div v-if="rule.type === 'PROPERTY_ELEMENT'">
        <span class="rule-type" v-if="rule.elementType"> {{ rule.elementType }}</span>
      </div>
      
      <v-spacer />
     
          <cs-toolbar-menus :menus="items"></cs-toolbar-menus>
      <v-btn icon @click="toggleRule(rule)">
        <v-icon v-if="rule.disabled === true">mdi-eye-off-outline</v-icon><v-icon v-else>mdi-eye</v-icon></v-btn
      >
    </v-layout>
    <div class="outgoing-rules-list" v-if="rule.outgoingRules">
      <div v-for="(outgoing, i) in rule.outgoingRules"            :key="i">
        <graph-rule-editor            
            :source="source"
            :activePreset="activePreset"
            :rule="outgoing"
            :parent="rule"
          ></graph-rule-editor>
        </div>
      </div>
  </div>
</template>

<style scoped>

.rule-line{
  margin: 6px;
}
.rule-type {
  font-size: 22px;
}

.v-expansion-panel-header {
  padding: 4px !important;
}

.rule-element-id {
  font-size: 22px;
}

.outgoing-rules-list {
  margin-left: 15px;
  margin-right: 5px;
}

.rule-legend {
  border-radius: 5px;
  margin-top: 5px;
  margin-right: 4px;
  width: 20px;
  height: 20px;
}

.rule-legend-icon {
  font-size: 14px;
    
    margin-left: 2px;
    
    margin-bottom: 5px;
}
</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { DocDatasource } from '../..';
import Vue from 'vue';
import { FeatureType, GraphPreset, IGraphFilter, NodeRule, PropertyType } from '@csnext/cs-data';
import { IMenu } from '@csnext/cs-core';
import { CsToolbarMenus } from '@csnext/cs-client'

@Component({
  components: { CsToolbarMenus }
})
export default class GraphRuleEditor extends Vue {
  @Prop()
  public source!: DocDatasource;

  @Prop()
  public activePreset!: GraphPreset;

  @Prop()
  public rule!: NodeRule;

  @Prop()
  public parent!: NodeRule;

  public availableRelations? : PropertyType[] | null = null;
  public availableTypes?: FeatureType[] | null = null;

  private hover? : null | boolean = false;

  public getRuleStyle(rule: NodeRule) : any { 
    return { 
      'background-color' : rule._featureType?.color ?? 'gray'
    }
  }

  public items : IMenu[] = [        
      ]

  public async addElement(rule: NodeRule) {
    if (rule._featureType) {
      const element = await this.source.createEntity(rule._featureType, true);    
    }
  }

  public toggleRule(rule: NodeRule) {
    rule.disabled = !rule.disabled;
    this.$forceUpdate();
    this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, rule);
  }

  public saveType() {
    if (this.rule.featureType) {
      this.rule._editMode = false;
      this.rule._featureType = this.source.getFeatureTypeById(this.rule.featureType);
      this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, this.rule);
    }
  }

  public saveRelation() {
    this.rule._editMode = false;
    this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, this.rule);

  }

  public updateTypes() {
    if (!this.source?.featureTypes || !this.source.graph) {
      return;
    }
  }

  public removeRule() {
    if (this.parent?.outgoingRules) {
      this.parent.outgoingRules = this.parent.outgoingRules.filter(r => r !== this.rule);      
    } else if (this.activePreset?.properties?.nodeRules) {
      this.activePreset.properties.nodeRules = this.activePreset.properties.nodeRules.filter(r => r !== this.rule);
    }
    this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, this.rule);
    this.$forceUpdate();
  }

  public createOutgoingTypeRule() {
    if (!this.rule.outgoingRules) {
      this.rule.outgoingRules = [];      
    }    
    this.rule.outgoingRules.push({
      type: 'TYPE',
      _editMode: true
    })
    this.$forceUpdate();
  }

  public createOutgoingRelationRule() {
    // make sure outgoingRules exist
    if (!this.rule.outgoingRules) {
      this.rule.outgoingRules = [];      
    }    
    this.rule.outgoingRules.push({
      type: 'RELATION',
      _editMode: true
    })
    this.$forceUpdate();
  }

  mounted() {
    if (this.rule.type) {      
      this.items.push({
        title: 'PROPERTY_FILTER',
        type: 'icon',
        toolTip: 'TOOLTIP_ADD_PROPERTY_FILTER',
        icon: 'mdi-filter-plus',
        action: (m) => {
          alert('property filter')
        }
      })
    }
    this.items.push({
        title: 'ADD_OUTGOING_RELATION_RULE',
        type: 'icon',
        toolTip: 'TOOLTIP_ADD_OUTGOING_RELATION_RULE',
        icon: 'mdi-note-plus-outline',
        action: (m) => {          
          this.createOutgoingRelationRule();
        }
      })

    this.items.push({
        title: 'ADD_OUTGOING_TYPE_RULE',
        type: 'icon',
        toolTip: 'TOOLTIP_ADD_OUTGOING_RELATION_RULE',
        icon: 'mdi-note-plus-outline',
        action: (m) => {          
          this.createOutgoingTypeRule();
        }
      })

    this.items.push({
        title: 'REMOVE_RULE',
        type: 'icon',
        toolTip: 'TOOLTIP_REMOVE_RULE',
        icon: 'mdi-delete',
        action: (m) => {          
          this.removeRule();
        }
      })

    switch (this.rule?.type) {
      case 'TYPE':
        if (this.source.featureTypes) {
          this.availableTypes = Object.values(this.source.featureTypes);
        }
        break;
      case 'RELATION':
        if (this.parent?._featureType?.properties) {
          this.availableRelations = this.parent._featureType.properties.filter(r => r.type === 'relation');
        }
        break;
    }

  
  }

  constructor() {
    super();
  }
}
</script>
