<template>
  <div v-if="preset && rule" class="rule-line">
    <v-layout>
    <v-container v-if="rule.filter.hasObjectProperties && rule._featureType">
      <v-row v-for="(op, opi) in rule.filter.hasObjectProperties" :key="opi">
        <template v-if="isEditing">
          <v-col cols="1">
            <v-btn @click="removeProperty(opi)" icon><v-icon>mdi-delete</v-icon></v-btn>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :items="rule._featureType.properties"
              v-model="op.property"
              item-text="label"
              item-value="key"
              outlined
              dense
              @change="updateFilterProperty()"
              label="property"></v-autocomplete> 
            </v-col><v-col cols="3">
              <v-autocomplete
              :items="['>', '<', '==', '>=', '<=', '!=', 'set', 'not set']"
              v-model="op.operator"
              @change="updateFilterProperty()"
              label="compare"
              outlined
              dense></v-autocomplete>
              </v-col><v-col cols="4">
              <v-text-field
              outlined
              v-if="['>', '<', '==', '>=', '<=', '!='].includes(op.operator)"
              dense
              @change="updateFilterProperty()"
              label="value"
              v-model="op.value"></v-text-field>              
              </v-col>

        </template>
        <template v-else>
          <v-col cols="4">{{op._property.label}}</v-col><v-col cols="2">{{op.operator}}</v-col><v-col cols="4" v-if="['>', '<', '==', '>=', '<=', '!='].includes(op.operator)">{{op.value}}</v-col>
        </template>
        
      </v-row>
      <v-row v-if="isEditing">
        <v-col cols="12"><v-btn @click="addProperty()">add property</v-btn></v-col>

      </v-row>
    </v-container>
    <v-spacer />
    <cs-toolbar-menus :menus="menuItems"></cs-toolbar-menus>
    </v-layout>
  </div>
</template>

<style scoped>
.rule-line {
  margin-left: 6px;
  margin-top: 5px;
}

</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { DocDatasource } from '../..';
import Vue from 'vue';
import { FeatureType, GraphFilter, GraphPreset, GraphPropertyFilter, IGraphFilter, NodeRule, PropertyType } from '@csnext/cs-data';
import { IMenu } from '@csnext/cs-core';
import { CsToolbarMenus } from '@csnext/cs-client';

@Component({
  components: { CsToolbarMenus },
})
export default class GraphRuleEditor extends Vue {
  @Prop()
  public source!: DocDatasource;

  @Prop()
  public preset!: GraphPreset;

  @Prop()
  public rule!: NodeRule;

  @Prop()
  public parent!: NodeRule;

  public menuItems: IMenu[] = [];

  public isEditing: boolean | null = false;

  public removeFilter() {
    if (this.rule?.filter) {
      this.rule.filter = undefined;
      // this.source.updateRules(this.preset, this.rule);
    }    
  }

  public updateFilterProperty() {
    this.updateProperties(true);    
    // this.source.updateRules(this.preset, this.rule);
  }

  public removeProperty(index: number) {
    if (this.source && this.rule?.filter?.hasObjectProperties) {
      this.rule.filter.hasObjectProperties.splice(index, 1);
      // this.source.updateRules(this.preset, this.rule);
    }
  }

  public addProperty() {
    if (this.source && this.rule?.filter) {
      if (!this.rule.filter.hasObjectProperties) {
        this.rule.filter.hasObjectProperties = [];
      }
      this.rule.filter.hasObjectProperties.push({} as GraphPropertyFilter);
      this.$forceUpdate();
    }
  }

  public updateProperties(force = false) {
    if (this.source && this.rule?.filter?.hasObjectProperties && this.rule._featureType) {
      for (const propFilter of this.rule.filter.hasObjectProperties) {
        if (propFilter.property && (!propFilter._property || force) && this.rule._featureType.propertyMap && this.rule._featureType.propertyMap.hasOwnProperty(propFilter.property)) {
          propFilter._property = this.rule._featureType.propertyMap[propFilter.property]
        }
      }
    }
  }

  public updateMenu() {
    this.menuItems = [];
    if (this.isEditing) {
      
      this.menuItems.push({
      title: 'UPDATE_FILTER',
      type: 'icon',
      toolTip: 'UPDATE_FILTER',
      icon: 'mdi-check',
      action: (m) => {
        this.isEditing = false;
        this.updateMenu();
      },
    });

    } else {
this.menuItems.push({
      title: 'EDIT_FILTER',
      type: 'icon',
      toolTip: 'TOOLTIP_EDIT_FILTER',
      icon: 'mdi-pencil',
      action: (m) => {
        this.isEditing = true;
        this.updateMenu();
      },
    });
    }
    

     this.menuItems.push({
      title: 'REMOVE_FILTER',
      type: 'icon',
      toolTip: 'TOOLTIP_REMOVE_RULE',
      icon: 'mdi-delete',
      action: (m) => {
        this.removeFilter();
      },
    });
  }

  beforeMount() {
    this.updateProperties();
    this.updateMenu();
  }

  mounted() {
    
    
    
  }

  constructor() {
    super();
  }
}
</script>
