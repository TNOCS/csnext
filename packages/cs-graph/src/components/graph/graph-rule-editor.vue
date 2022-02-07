<template>
  <div v-if="activePreset && rule" class="rule-line">
    <v-layout>
      <span class="rule-legend" :style="getRuleStyle(rule)">
        <v-icon dark class="rule-legend-icon" v-if="rule._featureType && rule._featureType.icon">{{rule._featureType.icon}}</v-icon>
      </span>      
      <div v-if="rule.type === 'TYPE' || rule.type === 'INCOMMING_TYPE'">
        <v-autocomplete
          @change="saveType()"
          v-if="rule && rule._editMode"
          v-model="rule.featureType"
          :items="availableTypes"
          item-text="title"
          item-value="type"
        ></v-autocomplete>
        <span v-else class="rule-type">{{ rule._featureType.title }}</span>
      </div>
      <div v-if="rule.type === 'ELEMENT'">
        <v-autocomplete
          @change="saveElement()"
          v-if="rule && rule._editMode"
          v-model="rule.elementId"
          :items="Object.values(source.graph)"
          item-text="properties.name"
          item-value="id"
        ></v-autocomplete>        
        <span class="rule-element-id" v-else>{{ rule._element.properties.name }}</span>
      </div>
      <div v-if="rule.type === 'RELATION' || rule.type === 'INCOMMING_RELATION'">
        <v-autocomplete
          @change="saveRelation()"
          v-if="rule._editMode"
          :items="availableRelations"
          v-model="rule.relationType"
          item-text="label"
          item-value="relation.type"
        ></v-autocomplete>
        <span v-else class="rule-type">{{ rule.relationType }} - {{ rule.objectType }}</span>
      </div>

      <div v-if="rule.type === 'PROPERTY_ELEMENT'">
        <span class="rule-type" v-if="rule.elementType"> {{ rule.elementType }}</span>
      </div>

      <v-spacer />

      <cs-toolbar-menus :menus="items"></cs-toolbar-menus>
      <v-btn icon @click="toggleRule(rule)"> <v-icon v-if="rule.disabled === true">mdi-eye-off-outline</v-icon><v-icon v-else>mdi-eye</v-icon></v-btn>
    </v-layout>
    <div v-if="rule.filter">
      <graph-rule-filter        
        :rule="rule"
        :parent="parent"
        :preset="activePreset"
        :source="source"        
      ></graph-rule-filter>
    </div>
    <div class="outgoing-rules-list" v-if="rule.outgoingRules">
      <div v-for="(outgoing, i) in rule.outgoingRules" :key="i">
        <graph-rule-editor :source="source" :activePreset="activePreset" :rule="outgoing" :parent="rule"></graph-rule-editor>
      </div>
    </div>    
  </div>
</template>

<style scoped>

.quick-add-menu {
  background-color: red;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.rule-line {
  margin-left: 6px;
  margin-top: 5px;
}
.rule-type {
  font-size: 22px;
}

.v-expansion-panel-header {
  padding-left: 4px !important;
  padding-top: 4px !important;
}

.rule-element-id {
  font-size: 22px;
}

.outgoing-rules-list {
  margin-left: 15px;
  /* margin-right: 5px; */
}

.rule-legend {
  border-radius: 5px;
  margin-top: 5px;
  margin-right: 4px;
  width: 25px;
  height: 25px;
}

.rule-legend-icon {
  font-size: 19px;

  margin-left: 2px;
  margin-bottom: 3px;
}
</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { DocDatasource } from '../..';
import Vue from 'vue';
import { FeatureType, GraphPreset, GraphFilter, NodeRule, PropertyType, GraphPropertyFilter } from '@csnext/cs-data';
import { IMenu } from '@csnext/cs-core';
import { CsToolbarMenus } from '@csnext/cs-client';
import GraphRuleFilter from './graph-rule-filter.vue';

@Component({
  components: { CsToolbarMenus, GraphRuleFilter },
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

  public availableRelations?: PropertyType[] | null = null;
  public availableTypes?: FeatureType[] | null = null;
  

  private hover?: null | boolean = false;

  public getRuleStyle(rule: NodeRule): any {
    return {
      'background-color': rule._featureType?.color ?? 'gray',
    };
  }

  public items: IMenu[] = [];

  public async addElement(rule: NodeRule) {
    if (rule._featureType) {
      const element = await this.source.createEntity(rule._featureType, true);
    }
  }

  public toggleRule(rule: NodeRule) {
    rule.disabled = !rule.disabled;
    this.source.updateRules(this.activePreset, rule);
    this.$forceUpdate();
    // this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, rule);
  }

  public saveType() {
    if (this.rule.featureType) {
      this.rule._editMode = false;
      this.rule._featureType = this.source.getFeatureTypeById(this.rule.featureType);
      // this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, this.rule);
      this.source.updateRules(this.activePreset, this.rule);
      this.$forceUpdate();
    }
  }

    public saveElement() {
    if (this.rule.elementId) {
      this.rule._editMode = false;
      this.rule._element = this.source.getElement(this.rule.elementId);
      // this.rule._featureType = this.source.getFeatureTypeById(this.rule.featureType);
      // this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, this.rule);
      this.source.updateRules(this.activePreset, this.rule);
      this.$forceUpdate();
    }
  }

  public saveRelation() {
    this.rule._editMode = false;
    this.source.updateRules(this.activePreset, this.rule);
    this.$forceUpdate();
    // this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, this.rule);
  }

  public updateTypes() {
    if (!this.source?.featureTypes || !this.source.graph) {
      return;
    }
  }

  public removeRule() {
    if (this.parent?.outgoingRules) {
      this.parent.outgoingRules = this.parent.outgoingRules.filter((r) => r !== this.rule);
    }

    if (this.activePreset?.properties?.graphLayout?.nodeRules) {
      this.activePreset.properties.graphLayout.nodeRules = this.activePreset.properties.graphLayout.nodeRules.filter((r) => r !== this.rule);
    }
    this.source.updateRules(this.activePreset, this.rule);
    // this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, this.rule);
    this.$forceUpdate();
  }

  public createIncommingTypeRule() {
    if (!this.rule.outgoingRules) {
      this.rule.outgoingRules = [];
    }
    this.rule.outgoingRules.push({
      type: 'INCOMMING_TYPE',
      _editMode: true,
    });
    this.$forceUpdate();
  }

  public createOutgoingTypeRule() {
    if (!this.rule.outgoingRules) {
      this.rule.outgoingRules = [];
    }
    this.rule.outgoingRules.push({
      type: 'TYPE',
      _editMode: true,
    });
    this.$forceUpdate();
  }

  public createOutgoingRelationRule() {
    // make sure outgoingRules exist
    if (!this.rule.outgoingRules) {
      this.rule.outgoingRules = [];
    }
    this.rule.outgoingRules.push({
      type: 'RELATION',
      _editMode: true,
    });
    this.$forceUpdate();
  }

  public createIncommingRelationRule() {
    // make sure outgoingRules exist
    if (!this.rule.outgoingRules) {
      this.rule.outgoingRules = [];
    }
    this.rule.outgoingRules.push({
      type: 'INCOMMING_RELATION',
      _editMode: true,
    });
    this.$forceUpdate();
  }

  public addFilter() {
    if (!this.rule.featureType) { return; }
    if (!this.rule.filter) { Vue.set(this.rule, 'filter', { hasObjectProperties: []}); };
    this.rule.filter!.hasObjectProperties!.push({
      property: 'population',
          operator: '>',
          value: 100000
    } as GraphPropertyFilter);    
      
      this.source.updateRules(this.activePreset, this.rule);
        
    this.$forceUpdate();
  }

  private updateMenu() {
    if (this.rule._featureType) {
      this.items.push({
        title: 'PROPERTY_FILTER',
        type: 'icon',
        toolTip: 'TOOLTIP_ADD_PROPERTY_FILTER',
        icon: 'mdi-filter-plus',
        action: (m) => {
          this.addFilter();
          // this.updateMenu();
        },
      });
    }
    // this.items.push({
    //     title: 'EDIT_STYLE',
    //     type: 'icon',
    //     toolTip: 'TOOLTIP_EDIT_STYLE',
    //     icon: 'mdi-palette',
    //     action: (m) => {
    //       this.editStyle();
    //     },
    //   });
    this.items.push({
      title: 'ADD_OUTGOING_RELATION_RULE',
      type: 'icon',
      toolTip: 'TOOLTIP_ADD_OUTGOING_RELATION_RULE',
      icon: 'mdi-file-tree',
      items: [
        {
          title: 'ADD_OUTGOING_TYPE_RULE',
          type: 'icon',
          toolTip: 'TOOLTIP_ADD_OUTGOING_RELATION_RULE',
          icon: 'mdi-note-plus-outline',
          action: (m) => {
            this.createOutgoingTypeRule();
          },
        },
        {
          title: 'ADD_INCOMMING_TYPE_RULE',
          type: 'icon',
          toolTip: 'TOOLTIP_ADD_INCOMMING_RELATION_RULE',
          icon: 'mdi-note-plus-outline',
          action: (m) => {
            this.createIncommingTypeRule();
          },
        },

        {
          title: 'ADD_OUTGOING_RELATION_RULE',
          type: 'icon',
          toolTip: 'TOOLTIP_ADD_OUTGOING_RELATION_RULE',
          icon: 'mdi-note-plus-outline',
          action: (m) => {
            this.createOutgoingRelationRule();
          },
        },
        {
          title: 'ADD_INCOMMING_RELATION_RULE',
          type: 'icon',
          toolTip: 'TOOLTIP_ADD_INCOMMING_RELATION_RULE',
          icon: 'mdi-note-plus-outline',
          action: (m) => {
            this.createIncommingRelationRule();
          },
        },
      ],
    });

    this.items.push({
      title: 'REMOVE_RULE',
      type: 'icon',
      toolTip: 'TOOLTIP_REMOVE_RULE',
      icon: 'mdi-delete',
      action: (m) => {
        this.removeRule();
      },
    });

    switch (this.rule?.type) {
      case 'INCOMMING_TYPE':
      case 'TYPE':
        if (this.source.featureTypes) {
          this.availableTypes = Object.values(this.source.featureTypes).filter((t) => !t.isEdge && t.title);          
        }
        break;
      case 'RELATION':
        if (this.parent?._featureType?.properties) {
          this.availableRelations = this.parent._featureType.properties.filter((r) => r.type === 'relation');
        }
        break;
      case 'INCOMMING_RELATION':        
        const inc: PropertyType[] = [];
        for (const ft in this.source.featureTypes) {
          if (Object.prototype.hasOwnProperty.call(this.source.featureTypes, ft)) {
            const t = this.source.featureTypes[ft];
            if (t.properties) {
              const rel = t.properties.filter((r) => r.type === 'relation' && r.relation?.objectType === this.parent?._featureType?.type);
              if (rel && rel.length > 0) {
                for (const r of rel) {
                  inc.push(r);
                }
              }
            }
          }
        }

        this.availableRelations = inc;
        break;
    }

  }

  mounted() {
    this.updateMenu()
    
  }

  public editStyle() {
    alert('edit style')
  }

  constructor() {
    super();
  }
}
</script>
