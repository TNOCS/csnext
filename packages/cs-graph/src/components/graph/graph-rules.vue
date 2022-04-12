<template>
  <div v-if="preset" class="rule-line">
    
    <!-- <v-container > -->
      <v-switch inset v-model="editMode" label="edit mode" class="ml-3" />
      <v-layout id="new-rule-container" class="add-rule-button" >
      <v-overflow-btn
        :items="newTypes"
        v-if="editMode"
        segmented
        filled
        flat
        prepend-inner-icon="mdi-plus" 
        label="Add new rule"         
        auto-select-first             
        target="#new-rule-container"
      ></v-overflow-btn>
      </v-layout>
    <!-- </v-container> -->
    
    
    <!-- <v-layout class="rules-editor">
      <v-chip class="add-rule-button" @click.native.stop="addTypeRule()"
        ><v-icon left>mdi-plus</v-icon><cs-label label="ADD_TYPE"
      /></v-chip>
      <v-chip class="add-rule-button" @click.native.stop="addElementRule()"
        ><v-icon left>mdi-plus</v-icon><cs-label label="ADD_ELEMENT"
      /></v-chip>
      <v-chip class="add-rule-button" @click.native.stop="addDocumentRule()"
        ><v-icon left>mdi-file-document-outline</v-icon
        ><cs-label label="ADD_DOCUMENT"
      /></v-chip>
      <v-chip class="add-rule-button" @click.native.stop="addIndicatorRule()"
        ><v-icon left>mdi-calculator-variant</v-icon
        ><cs-label label="ADD_INDICATOR"
      /></v-chip>
      <v-chip class="add-rule-button" @click.native.stop="addWorkspaceRule()"
        ><v-icon left>mdi-view-dashboard</v-icon
        ><cs-label label="ADD_WORKSPACE"
      /></v-chip>
    </v-layout> -->
    <graph-rule-editor
      v-for="(rule, i) in preset.properties.graphLayout.nodeRules"
      :key="i"
      :source="source"
      :editMode="editMode"
      :preset="preset"
      :rule="rule"
    ></graph-rule-editor>
  </div>
</template>

<style scoped>
.add-rule-button {
  margin-right: 14px !important;
  margin-left: 14px !important;
}

.content-expansion-header {
  font-size: 24px;
  font-weight: 600;
}

.rules-editor {
  margin-bottom: 5px;
}



.rules-list {
  margin-left: 35px;
}
</style>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { CsToolbarMenus } from "@csnext/cs-client";
import GraphRuleFilter from "./graph-rule-filter.vue";
import GraphRuleEditor from "./graph-rule-editor.vue";
import { DocDatasource } from "../../";
import { GraphPreset } from "@csnext/cs-data";

@Component({
  components: { CsToolbarMenus, GraphRuleFilter, GraphRuleEditor },
})
export default class GraphRules extends Vue {
  @Prop()
  public source!: DocDatasource;

  @Prop()
  public preset!: GraphPreset;

  public editMode: boolean = false;

  public newTypes: any[] = [];

  public mounted() {
    this.newTypes = [
      {
        text: $cs.Translate("ADD_TYPE"),
        callback: () => {
          this.addTypeRule();
        },
      },
      {
        text: $cs.Translate("ADD_ELEMENT"),
        callback: () => {
          this.addElementRule();
        },
      },
      {
        text: $cs.Translate("ADD_DOCUMENT"),
        callback: () => {
          this.addDocumentRule();
        },
      },
      {
        text: $cs.Translate("ADD_INDICATOR"),
        callback: () => {
          this.addIndicatorRule();
        },
      },
      {
        text: $cs.Translate("ADD_WORKSPACE"),
        callback: () => {
          this.addWorkspaceRule();
        },
      },
    ];
  }

  public addIndicatorRule() {
    if (!this.preset?.properties?.graphLayout) {
      return;
    }

    if (!this.preset.properties.graphLayout.nodeRules) {
      this.preset.properties.graphLayout.nodeRules = [];
    }
    this.preset.properties.graphLayout.nodeRules.push({
      type: "INDICATOR",
      _editMode: true,
    });

    this.$forceUpdate();
  }

  public addDocumentRule() {
    if (!this.preset?.properties?.graphLayout) {
      return;
    }

    if (!this.preset.properties.graphLayout.nodeRules) {
      this.preset.properties.graphLayout.nodeRules = [];
    }
    this.preset.properties.graphLayout.nodeRules.push({
      type: "DOCUMENT",
      _editMode: true,
    });

    this.$forceUpdate();
  }

  public addWorkspaceRule() {
    if (!this.preset?.properties?.graphLayout) {
      return;
    }

    if (!this.preset.properties.graphLayout.nodeRules) {
      this.preset.properties.graphLayout.nodeRules = [];
    }
    this.preset.properties.graphLayout.nodeRules.push({
      type: "WORKSPACE",
      _editMode: true,
    });

    this.$forceUpdate();
  }

  public addElementRule() {
    if (!this.preset?.properties?.graphLayout) {
      return;
    }

    if (!this.preset.properties.graphLayout.nodeRules) {
      this.preset.properties.graphLayout.nodeRules = [];
    }
    this.preset.properties.graphLayout.nodeRules.push({
      type: "ELEMENT",
      _editMode: true,
    });

    this.$forceUpdate();
  }

  public addTypeRule() {
    if (!this.preset?.properties?.graphLayout) {
      return;
    }

    if (!this.preset.properties.graphLayout.nodeRules) {
      this.preset.properties.graphLayout.nodeRules = [];
    }
    this.preset.properties.graphLayout.nodeRules.push({
      type: "TYPE",
      _editMode: true,
    });

    this.$forceUpdate();
  }
}
</script>
