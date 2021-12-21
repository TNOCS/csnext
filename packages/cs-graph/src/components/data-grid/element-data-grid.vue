<template>
  <div v-if="featureType" class="data-grid-component">
    <div class="data-grid-title"><span v-if="featureType.icon"><v-icon>{{featureType.icon}}</v-icon></span>{{ options.title }}</div>
    <v-layout class="ma-2">
      <v-btn-toggle dense v-model="options.defaultView" mandatory v-if="!options.hideViewSwitch">
        <v-btn value="table">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn value="cards">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>

        <v-btn v-if="options.calendarOptions" value="calendar">
          <v-icon>mdi-calendar</v-icon>
        </v-btn>

        <v-btn v-if="options.parentProperty" value="tree">
          <v-icon>mdi-file-tree</v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-menu offset-y v-if="options.canAdd && classTypes.length > 1">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            class="ml-2"
            elevation="0"
            v-on="on"
            @keydown.native.alt.78="addEntity(classTypes[0])"
          >
            <v-icon>mdi-plus</v-icon>
            {{ $cs.Translate('NEW_ITEM') }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in classTypes" :key="index" @click="addEntity(item)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        @keydown.native.alt.78="addEntity(classTypes[0])"
        @click="addEntity(classTypes[0])"
        v-else-if="options.canAdd"
        color="primary"
        class="ml-2"
        elevation="0"
      >
        <v-icon>mdi-plus</v-icon>

        {{ $cs.Translate('NEW_ITEM') }}
      </v-btn>
      <v-btn v-if="options.defaultView == 'tree' && options.relationToggle" class="ml-2" @click="linkAll()" elevation="0">
        <v-icon>mdi-checkbox-multiple-marked-circle-outline</v-icon>
        {{ $cs.Translate('LINK_ALL') }}
      </v-btn>
      <v-btn v-if="options.defaultView == 'tree' && options.relationToggle" class="ml-2" @click="unLinkAll()" elevation="0">
        <v-icon>mdi-checkbox-multiple-blank-circle-outline</v-icon>
        {{ $cs.Translate('UNLINK_ALL') }}
      </v-btn>
      <v-btn v-if="options.defaultView == 'tree'" class="ml-2" @click="expandTree()" elevation="0">
        <v-icon>mdi-chevron-up</v-icon>
        {{ $cs.Translate('EXPAND_ALL') }}
      </v-btn>
      <v-btn v-if="options.defaultView == 'tree'" class="ml-2" @click="collapseTree()" elevation="0">
        <v-icon>mdi-chevron-down</v-icon>
        {{ $cs.Translate('COLLAPSE_ALL') }}
      </v-btn>

      <!-- <v-menu offset-y v-if="options.defaultView !== 'calendar'">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" class="ml-2" elevation="0" v-on="on">
            <v-icon>sort</v-icon>
            {{ sort.label }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in sortOptions"
            :key="index"
            @click="setSort(item)"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- <v-menu offset-y v-if="options.defaultView === 0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" class="ma-2" v-on="on">
            <v-icon>sort</v-icon>
            group
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in groupOptions"
            :key="index"
            @click="setGroup(item)"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click="updateEntities(true)"><v-icon>refresh</v-icon></v-btn> -->
      <!-- <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" class="ma-2" v-on="on">
          <v-icon class="mr-2">table_chart</v-icon>
          {{ $cs.Translate('HEADERS') }}          
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in selectedHeaders"
          :key="index"
          @click="setSort(item)"
        >
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    </v-layout>

    <template v-if="options.defaultView === 'table'">
      <div style="display: flex; flex-direction: row; height: 100%">
        <ag-grid-vue
          class="table-grid"
          :class="{
            'ag-theme-alpine-dark': $cs.project.theme.dark,
            'ag-theme-alpine': !$cs.project.theme.dark
          }"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="rowData"
          rowSelection="single"
          @selection-changed="onGridSelection"
          @cell-value-changed="onCellValueChanged"
          @grid-ready="onGridReady"
        >
        </ag-grid-vue>
      </div>
    </template>

    <template v-if="options.defaultView === 'cards'">
      <simplebar class="full-widget">
        <isotope :options="getIsoOptions()" ref="iso" :list="items" class="isotope-grid">
          <template v-for="(element, indx) of items">
            <v-card :key="indx" class="entity-card" @click="selectEntityCard(element)">
              <component :is="getElementCard(element)" :source="source" :element="element"></component>
            </v-card>

            <!-- <v-card          
          :key="indx"
          class="entity-card"
          @click="selectEntity(entity)"
        >
          <data-info-panel
            v-if="entity"
            :data="entity.properties"
            :node="entity"
            :featureType="entity._featureType"
            panel="popup"
          ></data-info-panel>
          <v-card-actions>
            <v-btn icon @click="removeEntity(entity)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
            <v-btn icon @click="editEntity(entity)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn icon @click="graphNode(entity)"
              ><v-icon>mdi-scatter-plot</v-icon></v-btn
            >
          </v-card-actions>
        </v-card> -->
          </template>
        </isotope>
      </simplebar>
      <!-- <simplebar class="scroll">
    <v-virtual-scroll
        v-if="source"
        :items="items"
        :item-height="60"
        clientHeight="100%"
      >
        <template v-slot="{ item }">
    
          <v-card class="entity-card">      
      <data-info-panel v-if="item" :data="item.properties" :node="item" :featureType="item._featureType" panel="popup" ></data-info-panel>      
      {{ dateString(item.properties.updated_time) }}
      <v-card-actions>
      <v-btn icon @click="removeEntity(item)"><v-icon>mdi-delete</v-icon></v-btn>
      <v-btn icon @click="editEntity(item)"><v-icon>mdi-pencil</v-icon></v-btn>
      </v-card-actions>
    </v-card>
        </template>
    </v-virtual-scroll>
    </simplebar> -->
    </template>

    <div class="calendar-view" v-if="options.defaultView === 'calendar'">
      <v-toolbar flat>
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"> Today </v-btn>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
              <span>{{ typeToLabel[options.calendarOptions.type] }}</span>
              <v-icon right>mdi-expand-more</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="options.calendarOptions.type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="options.calendarOptions.type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="options.calendarOptions.type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
            <v-list-item @click="options.calendarOptions.type = '4day'">
              <v-list-item-title>4 days</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-calendar
        v-if="options.calendarOptions"
        ref="calendar"
        v-model="focus"
        color="primary"
        event-timed="timed"
        :events="items"
        event-name="properties.name"
        event-start="_startDate"
        event-stop="_endDate"
        @click:date="viewDay"
        @click:event="clickCalendarItem"
        :type="options.calendarOptions.type"
      ></v-calendar>
      <!-- :events="items" -->
      <!-- @click:event="showEvent"
          @click:more="viewDay"
          
          @change="updateRange" -->
    </div>
    <template v-if="options.defaultView === 'tree'">
      <div>
        <v-treeview
          v-model="selectedTree"
          return-object
          open-on-click
          ref="treeView"
          selection-type="independent"
          :items="treeItems"
          activatable
          @input="openTreeItem()"
          @click="selectTableItem(item.entity)"
        >
          <!-- selectable
          selection-type="leaf" -->
          <template v-slot:append="{ item }">
            <v-layout>
              <v-btn icon v-if="options.canDelete" @click.stop="removeEntity(item.entity)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
              <v-btn icon @click.stop="editEntity(item.entity)"><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn v-if="options.canGraph" icon @click.stop="graphNode(item.entity)"
                ><v-icon>mdi-scatter-plot</v-icon></v-btn
              >
              <v-menu offset-y v-if="options.defaultView === 'tree'">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon><v-icon>mdi-plus</v-icon></v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(itemtype, index) in classTypes"
                    :key="index"
                    @click.stop="addChildEntity(itemtype, item.entity)"
                  >
                    <v-list-item-title>{{ itemtype.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-layout>
          </template>
          <template v-slot:label="{ item }">
            <span v-if="options.relationToggle">
            <v-btn icon @click.stop="toggleLinked(item.entity)" >
              <v-icon v-if="item.entity._isLinked">mdi-check-circle-outline</v-icon>              
                <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
              

            </v-btn>
            <v-btn v-if="item.entity._isLinked" icon @click.stop="selectTableItem(item.entity._isLinked)" >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            </span>
            <v-btn icon @click.stop="toggleCheckbox(item.entity)" v-if="options.checkboxProperty">
              {{ item.entity[options.checkboxProperty] }}
              <v-icon v-if="item.entity.properties[options.checkboxProperty]">mdi-check-circle-outline</v-icon>
              <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
            </v-btn>
            <span @click="selectTableItem(item.entity)">
              {{ item.entity.properties.name }}
            </span>
            <!-- </v-btn> :value="item.entity._isLinked !== undefined" class="mt-3 ml-3 pa-0" :label="item.name"></v-checkbox> -->
            <!-- {{ item.entity._isLinked !== undefined}} -->
            <!-- <span class="tree-item-label" @click="selectEntity(item.entity)">{{item.name}}</span> -->
            <!-- <v-btn>{{ item.name }}</v-btn> -->
            <!-- <v-icon v-if="!item.file">
              {{ open ? "mdi-folder-open" : "mdi-folder" }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon> -->
          </template>
        </v-treeview>
      </div>
    </template>

    <!-- <v-grid
    class="list"
    theme="material"
    resize="false"
    readonly="false"
    :source="rows"
    :columns="columns"
  ></v-grid> -->
  </div>
</template>



<style lang="scss" scoped>
.ag-theme-alpine {
  /* use theme parameters where possible */
  --ag-header-background-color: transparent;
  --ag-border-color: transparent;
  --ag-border: 0px;
  --ag-padding: 0px;
}

.ag-row {
  height: 30px !important;
}

.data-table-scroll {
  height: calc(100vh - 400px) !important;
}

.ag-root-wrapper {
  border: 0 !important;
}

.ag-text-field-input {
  background: blue !important;
}

.element-card-name {
  font-size: 30px;
}

.data-row {
  padding: 4px !important;
  margin: 4px !important;
  cursor: pointer;
  // min-height: 40px !important;

  /* margin-bottom: 10px; */
}

.data-grid-title {
  font-size: 26px;
  font-weight: 600;
  padding: 10px;
}

.data-grid-component {
  height: calc(100% - 120px);
}

.calendar-view {
  height: calc(100% - 250px);
}

.table-grid {
  width: 100%;

  height: calc(100%);
}

.data-row:hover {
  background: lightgrey;

  /* margin-bottom: 10px; */
}

.scroll {
  height: 500px;
}

.tree-item-label {
  cursor: pointer;
}

.grid-sizer,
.group-column {
  width: 300px;
  max-height: 300px;
}

.entity-card {
  min-width: 300px;
  min-height: 150px;
  margin: 5px;
}

.full-widget {
  height: calc(100em - 200px);
}

.isotope-grid {
  /* width: 800px;
  height: 800px !important; */
  /* background: red; */
}
</style>

<script lang="ts">
import { Component, Ref, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { DataInfoPanel, NodeLink } from '@csnext/cs-map';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import OptionsFilter from './options-filter.vue';

// import { FeatureType } from "../../classes";
import {
  FeatureType,
  FilterGraphElement,
  GraphDatasource,
  GraphElement,
  IGraphFilter,
  PropertyType,
  PropertyValueType
} from '@csnext/cs-data';
import moment from 'moment';
import simplebar from 'simplebar-vue';
import isotope from 'vueisotope';
import { guidGenerator } from '@csnext/cs-core';
import Vue from 'vue';
// import { DocDatasource, DataGridOptions, GridView } from "./../../index";
import { DocDatasource, DataGridOptions, GridView } from '../..';
import { PropValue } from '@csnext/cs-map';
import GridPropValue from './grid-prop-value';
import OptionsCellEditor from './options-cell-editor.vue';
import NodeLinkCellEditor from './node-link-cell-editor.vue';
import { AgGridVue } from 'ag-grid-vue';
import { CellValueChangedEvent, ColDef, GridApi } from 'ag-grid-community';
import GridRowActions from './grid-row-actions.vue';
import DateCellEditor from './date-cell-editor.vue';
import DefaultElementCard from './cards/default-element-card.vue';
import { ElementCardManager } from './cards/element-card-manager';
// import Placeholder from "@tiptap/extension-placeholder";
require('isotope-packery');

@Component({
  name: 'element-data-grid',
  components: {
    'date-cell-editor': DateCellEditor,
    'grid-prop-value': GridPropValue,
    'grid-row-actions': GridRowActions,
    'options-cell-editor': OptionsCellEditor,
    'node-link-cell-editor': NodeLinkCellEditor,
    'options-filter': OptionsFilter,
    PropValue,
    AgGridVue,
    simplebar,
    DataInfoPanel,
    NodeLink,
    isotope,
    DefaultElementCard
  }
})
export default class ElementDataGrid extends WidgetBase {
  public toggle_view = 0;
  public featureType: FeatureType | null = null;
  public potentialProperties: { [key: string]: PropertyType } = {};
  public sort: PropertyType | undefined = undefined;
  public group: PropertyType | undefined | null = null;
  public classTypes: FeatureType[] = [];
  public sortOptions?: PropertyType[] | null = null;
  public groupOptions?: PropertyType[] | null = null;
  public groupKey?: null | string = null;
  public focus = '';
  public search: string = '';
  public selectedTree?: any = [];
  public items: GraphElement[] | undefined = []; // this.generateFakeDataRows(100);
  @Ref('iso')
  public iso?: any;
  @Ref('calendar')
  public calendar?: any;
  @Ref('treeView')
  public treeView?: any;

  public gridApi?: GridApi;
  public columnApi: any | null = null;

  public rowData: any | null = [];

  public columnDefs: ColDef[] | null = null;

  public typeToLabel = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
    '4day': '4 Days'
  };

  public headers: any[] = [];
  public autoGroupColumnDef = {
    headerName: 'PMSEII',
    field: 'properties.PMSEII',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: { checkbox: true }
  };
  public defaultColDef = {
    sortable: true,
    resizable: true,
    floatingFilter: true,
    filter: true
  } as ColDef;

  public treeItems: any[] = [];
  public upToDate = false;

  public get options(): DataGridOptions {
    return (this.widget?.options as DataGridOptions) || new DataGridOptions();
  }

  public isLinked(element: GraphElement) {
    return true;
  }

  public onCellValueChanged(event: CellValueChangedEvent) {
    if (!this.source || !event.data) {
      return;
    }
    console.log(event.data.properties.end);
    this.source.saveNode(event.data);
  }

  public onGridSelection() {
    if (!this.gridApi) {
      return;
    }
    const rows = this.gridApi.getSelectedRows();
    if (rows.length === 1) {
      this.selectEntity(rows[0]);
    }
  }

  public resize() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  public onGridReady(params: any) {
    this.gridApi = params.api as GridApi;
    this.columnApi = params.columnApi;
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  public selectEntity(element: GraphElement) {
    if (this.options.onSelect) {
      this.options.onSelect(element);
    } else {
      this.editEntity(element);
    }
  }

  public selectEntityCard(element: GraphElement) {
    if (this.options.onSelect) {
      this.options.onSelect(element);
    } else {
      this.source?.selectElement(element, false);
      // this.editEntity(element);
    }
  }

  public itemPropValue(prop: PropertyType, element: GraphElement) {
    if (!element?.properties || !prop.key) {
      return '';
    }
    if (prop.type === PropertyValueType.relation && prop.relation?.type && element?._outgoing) {
      const rel = element._outgoing.find((r) => r.classId === prop.relation!.type);
      return rel?.to;
    }
    return element.properties[prop.key]; //header.propType.type;
  }

  public setToday() {
    this.focus = '';
  }

  public graphNode(element: GraphElement) {
    if (!this.source) {
      return;
    }
    this.source.createKGView([element], this.options.graphPresetId);
  }

  @Watch('selectedTree')
  public treeSelectionChanged() {
    console.log(this.selectedTree);
  }

  @Watch('options.defaultView')
  public viewChanged() {
    this.updateEntities(true);
  }

  public openTreeItem(item: any) {
    console.log(this.selectedTree);
  }

  public expandTree() {
    (this.$refs.treeView as any).updateAll(true);
  }

  public collapseTree() {
    (this.$refs.treeView as any).updateAll(false);
  }

  public async toggleCheckbox(entity: GraphElement) {
    if (!this.source || !this.options.checkboxProperty || !entity.properties) {
      return;
    }
    // entity.properties[this.options.checkboxProperty] = (entity.properties[this.options.checkboxProperty] === true) ? false : true;
    Vue.set(
      entity.properties,
      this.options.checkboxProperty,
      entity.properties[this.options.checkboxProperty] === true ? false : true
    );
    this.source.saveNode(entity);
  }

  public async editLinked(entity: GraphElement) {
    
  }

  public async linkAll() {
    if (!this.treeItems) { return; }
    for (const item of this.treeItems) {
      await this.link(item);      
    }
  }

  public async unLinkAll() {
if (!this.treeItems) { return; }
    for (const item of this.treeItems) {
      await this.unlink(item);      
    }
  }

  public async unlink(entity: GraphElement) : Promise<boolean> {
    if (!this.source) {      
      return Promise.reject();
    }
    try {
    await this.source.removeEdge((entity as any)._isLinked);
    Vue.set(entity, '_isLinked', undefined);
    this.updateEntities(true);
    return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async link(entity: GraphElement) : Promise<boolean> {
    if (!this.source) {      
      return Promise.reject();
    }
    if (entity.id && this.options.relationToggle?.fromId && this.options.relationToggle.relationClassId) {
        try {
        const linkEdge = await this.source.addNewEdge(
            {
              fromId: this.options.relationToggle.fromId,
              toId: entity.id,
              classId: this.options.relationToggle.relationClassId
            } as GraphElement,
            true
          )
        Vue.set(entity, '_isLinked', linkEdge);
        this.updateEntities(true);
      }
      catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject();

  }

  public async toggleLinked(entity: GraphElement) {
    if (!this.source) {
      return;
    }
    if ((entity as any)._isLinked) {
      await this.unlink(entity);
      

      // (entity as any)._isLinked = undefined;
    } else {
      await this.link(entity);
    }
    // this.updateEntities(true);
  }

  public itemPropValues(prop: PropertyType, element: GraphElement) {
    if (!element?.properties || !prop.key) {
      return '';
    }
    if (prop.type === PropertyValueType.relation && prop.relation?.type && element?._outgoing) {
      const rel = element._outgoing.filter((r) => r.classId === prop.relation!.type);
      if (!rel) {
        return [];
      }
      return rel.map((f) => f.to);
    }
    return element.properties[prop.key]; //header.propType.type;
  }

  private filterDataTable(value: string, search: string) {
    return (
      value != null &&
      search != null &&
      typeof value === 'string' &&
      value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }
  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public selectElement(element: GraphElement, selected: boolean) {
    alert('selected');
    if (!this.source) {
      return;
    }
    // if (selected) {
    //   this.source.addElementToPreset(element);
    // } else {
    //   this.source.removeElementFromPreset(element);
    // }

    // alert('select');
  }

  public clickCalendarItem(e: any) {
    if (!this.source) {
      return;
    }
    if (e.event) {
      this.source.openElement(e.event);
    }
  }

  public updateLayout() {
    if (this.$refs.iso) {
      (this.$refs.iso as any).layout();
    }
    this.$forceUpdate();
  }

  public updateHeaders() {
    if (!this.featureType?.properties) {
      return;
    }
    if (!this.options.selectedHeaders) {
      this.options.selectedHeaders = [{ key: 'name' }];
    }
    this.headers = [];
    this.columnDefs = [];

    this.headers.push({ text: '', value: 'icon', sortable: false });
    for (const header of this.options.selectedHeaders) {
      if (header.key && this.potentialProperties.hasOwnProperty(header.key)) {
        const prop = this.potentialProperties[header.key];
        this.headers.push({
          text: prop.label,
          value: `properties.${prop.key}`,
          key: prop.key,
          sortable: true,
          filterable: !this.options.hideFilter,
          groupable: true,
          // width: header.width,
          propType: prop
        });
        let column = {
          field: `properties.${prop.key}`,
          headerName: prop.label,

          // cellRenderer: 'daysFrostRenderer',
          // cellRendererParams: {rendererImage: "frost.png"} ,
          cellRenderer: 'grid-prop-value',
          // cellRendererParams: (d) => {
          //   debugger;
          //   return {'test': 'test'};
          // },
          editable: true
        } as ColDef;
        if (prop.type === 'epoch') {
          column.cellEditor = 'date-cell-editor';
          column.cellEditorParams = {
            updatedCell: (row: GraphElement) => {
              this.source!.saveNode(row);
              // this.updateEntities();
            }
          };
          column.filter = 'agDateColumnFilter';
          column.filterParams = {
            comparator: (epochCellFilter: any, cellValue: any) => {
              var cellDate = new Date(cellValue);

              if (epochCellFilter.getTime() === cellDate.getTime()) {
                return 0;
              }
              if (cellDate < epochCellFilter) {
                return -1;
              }
              if (cellDate > epochCellFilter) {
                return 1;
              }
            },
            browserDatePicker: true,
            minValidYear: 2000
          };
        }
        if (prop.type === 'relation') {
          column.cellEditor = 'node-link-cell-editor';
          column.cellEditorParams = {
            source: this.source,
            updatedCell: (row: GraphElement) => {
              this.source!.saveNode(row);
            }
          };
        }
        if (prop.type === 'options') {
          column.cellEditor = 'options-cell-editor';
          column.floatingFilter = !this.options.hideFilter;
          column.floatingFilterComponentFramework = 'options-filter';
          column.filterFramework = 'options-filter';
          column.floatingFilterComponentParams = {
            suppressFilterButton: true,
            propType: prop
          };
          column.cellEditorParams = {
            source: this.source,
            updatedCell: (row: GraphElement) => {
              this.source!.saveNode(row);
            }
          };
        }

        // filter: 'agDateColumnFilter',
        this.columnDefs.push(column);
      }
    }
    if (this.options.canDelete || this.options.canGraph) {
      this.columnDefs.push({
        floatingFilter: false,
        sortable: false,
        width: 90,
        cellRenderer: 'grid-row-actions',
        cellRendererParams: {
          options: this.options,
          graphNode: (row: GraphElement) => {
            this.graphNode(row);
          },
          delete: (row: GraphElement) => {
            this.removeEntity(row);
          }
        }
      });
      this.headers.push({ text: 'Actions', value: 'actions', sortable: false });
    }
    this.$forceUpdate();
  }

  public setSort(prop: PropertyType) {
    if (this.iso) {
      this.iso.sort('name');
      this.iso.sort('custom');
    }
    this.sort = prop;
    this.update();
  }

  public setGroup(prop?: PropertyType | string) {
    if (typeof prop === 'string' && this.groupOptions) {
      prop = this.groupOptions.find((g) => g.key === prop);
    } else {
      return;
    }
    if (!prop) {
      return;
    }
    this.group = prop;
    this.groupKey = `properties.${this.group.key}`;
    this.update();
  }

  public selectTableItem(item: GraphElement) {
    if (!this.source) {
      return;
    }
    this.source.openElement(item);
  }

  public prev() {
    (this.$refs.calendar as any).prev();
  }
  public next() {
    (this.$refs.calendar as any).next();
  }

  public getIsoOptions() {
    return {
      itemSelector: '.entity-card',
      layoutMode: 'packery',
      sortAscending: false,
      getSortData: {
        name: (s: any) => {
          return s.properties.name;
        },
        custom: (s: any) => {
          return s.properties.updated_time;
          // if (this.sort?.key) {
          //   return s.properties[this.sort.key];
          // } else {
          //   return s.properties.name;
          // }
        }
        // updated: '.properties.updated_time',
      },
      sortBy: 'custom',
      // percentPosition: true,
      // options for cellsByRow layout mode

      // options for masonry layout mode
      masonry: {
        columnWidth: '.grid-sizer'
      }
    };
  }

  public async addChildEntity(type: FeatureType, parent?: GraphElement) {
    await this.addEntity(type, parent);
  }

  public async addEntity(type: FeatureType, parent?: GraphElement) {
    if (!this.source) {
      return;
    }
    let placeholder = `new ${type.title}`;
    if (this.options.askForName) {
      $cs.triggerInputDialog(placeholder, 'enter new name', '', placeholder).then((name) => {
        this.source
          ?.addNewNode({
            id: `${type.type}-${guidGenerator()}`,
            properties: { ...this.options.newItem, classId: type.type, name },
            classId: type.type
          })
          .then(async (e) => {
            if (this.source && parent && this.options.parentProperty) {
              try {
                const parentEdge = await this.source.addNewEdge(
                  {
                    fromId: e.id,
                    toId: parent.id,
                    classId: this.options.parentProperty
                  } as GraphElement,
                  true
                );
                if (parentEdge) {
                  try {
                    await this.source.addEdge(parentEdge);
                  } catch (e) {
                    console.log('Error adding parent edge');
                  }
                }
              } catch (e) {
                console.log('Error adding parent edge edge');
              }
              // await this.source.updateEdges();
            }
            // check if new relations should be created
            if (this.source && this.options.newRelations) {
              for (const relation of this.options.newRelations) {
                // new relation to other id
                if (relation.toId && this.potentialProperties) {
                  if (
                    this.potentialProperties.hasOwnProperty(relation.key) &&
                    this.potentialProperties[relation.key].relation?.type
                  ) {
                    try {
                      const newEdge = await this.source.addNewEdge(
                        {
                          fromId: e.id,
                          toId: relation.toId,
                          classId: this.potentialProperties[relation.key].relation?.type
                        } as GraphElement,
                        true
                      );
                    } catch (e) {
                      console.log('Error adding relation edge');
                    }
                  }
                } else if (relation.fromId) {
                  // create relation from other id
                  const fromId = typeof relation.fromId === 'function' ? relation.fromId() : relation.fromId;
                  const fromNode = this.source.getElement(fromId);
                  if (
                    fromNode?._featureType?.propertyMap &&
                    fromNode._featureType.propertyMap.hasOwnProperty(relation.key)
                  ) {
                    const prop = fromNode._featureType.propertyMap[relation.key];
                    const newEdge = await this.source.addNewEdge(
                      {
                        fromId: fromId,
                        toId: e.id,
                        classId: prop.relation?.type
                      } as GraphElement,
                      true
                    );
                  }
                }
              }
              await this.source.updateEdges();
            }
            this.updateEntities(true);
            if (this.options.onAfterAdded) {
              await this.options.onAfterAdded(e);
            } else {
              // this.source?.openElement(e);
            }
            return e;
          })
          .catch((e) => {
            alert('error creating entity');
          });
      });
    }
  }

  public editEntity(element: GraphElement) {
    this.source?.openElement(element);
  }

  public removeEntity(entity: GraphElement) {
    if (!this.source) {
      return;
    }
    this.source
      .removeNode(entity, true, true)
      .then((r) => {
        this.updateEntities(true);

        // alert('removed');
      })
      .catch((e) => {
        alert('error');
      });
  }

  constructor() {
    super();
  }

  public updateTree(
    treeItems: any[],
    // classTypes: string[],
    base?: GraphElement,
    active?: any
  ) {
    if (!this.source || !this.options.baseType) {
      return;
    }
    
    let items: any[] | undefined = [];
    if (base) {
      if (base._incomming) {
        items = [
          ...base._incomming.filter((o) => o.classId === this.options.parentProperty).map((o) => o.from)
        ];
      }
      // if (base._outgoing)
    } else {
      // const i =
      // debugger;
      items = this.source.getClassElements(this.options!.baseType)?.filter((i) => {
        return !i._outgoing || i._outgoing.findIndex((p) => p.classId === this.options.parentProperty) === -1;
      });
    }
    if (items) {
      for (const item of items) {
        if (item.id) {
          const treeItem = {
            id: item.id,
            name: item.properties.name,
            entity: item,
            children: []
          };
          if (active?.children) {
            active.children.push(treeItem);
          } else {
            treeItems.push(treeItem);
            // console.log(this.treeItems);
          }

          this.updateTree(treeItems, item, treeItem);
        }
      }
    }

    return treeItems;
  }

  public viewDay(date: string) {
    if (!this.options?.calendarOptions) {
      return;
    }
    this.focus = date;
    this.options.calendarOptions.type = 'day';
  }

  public updateEntities(force = false) {
    if (!this.options.baseType || (this.upToDate && !force)) {
      return;
    }
    const baseType = this.options.baseType;
    if (!this.source?.featureTypes || !this.source.featureTypes.hasOwnProperty(baseType)) {
      return;
    }
    this.upToDate = true;
    this.featureType = this.source.featureTypes[baseType];
    this.classTypes = Object.values(this.source.featureTypes).filter(
      (ft) => ft._inheritedTypes?.includes(baseType) && !ft.abstract
    );

    for (const type of this.classTypes) {
      if (type.properties) {
        for (const prop of type.properties) {
          if (prop.key && !this.potentialProperties.hasOwnProperty(prop.key)) {
            this.potentialProperties[prop.key] = prop;
          }
        }
      }
    }

    this.sortOptions = Object.values(this.potentialProperties).filter(
      (p) => p.type !== PropertyValueType.relation
    );
    this.groupOptions = Object.values(this.potentialProperties).filter(
      (p) => p.type !== PropertyValueType.relation
    );

    if (!this.group && this.options?.groupId) {
      this.setGroup(this.options.groupId);
    }

    if (this.options.syncMode === 'follow') {
      this.busManager.subscribe(
        this.source.events,
        IGraphFilter.GRAPH_FILTER,
        (a: string, f: FilterGraphElement) => {
          if (this.options.filter && f.id === this.options.filter) {
            Vue.set(this, 'rowData', f._visibleNodes);
            // this.items = f._visibleNodes;
          }
        }
      );

      // alert("following");
    } else {
      this.items = this.source.getClassElements(baseType, true, this.options.filter);
    }

    if (this.options.defaultView === GridView.table) {
      Vue.set(this, 'rowData', this.items);
      if (this.gridApi) {
        this.gridApi.refreshClientSideRowModel();
      }
    }

    // this.rowData = this.items;

    if (!this.sort) {
      this.sort = this.featureType.properties?.find((p) => p.key === 'updated_time');
    }

    if (this.options.defaultView === GridView.tree && this.options.parentProperty) {
      // console.log("starting update tree");
      //
      const treeItems = this.updateTree([], undefined, undefined);
      Vue.set(this, 'treeItems', treeItems);
      // console.log(this.treeItems);
      // this.$forceUpdate();
    }

    if (this.options.relationToggle) {
      this.updateLinkedEntities();
    }

    this.update();
  }

  public updateLinkedEntities() {
    if (!this.source || !this.options.relationToggle || !this.options.relationToggle.fromId) {
      return;
    }
    // debugger;
    const element = this.source.getElement(this.options.relationToggle.fromId);
    if (!element?._outgoing) {
      return;
    }
    const selected = element._outgoing.filter(
      (r) => r.classId === this.options.relationToggle!.relationClassId
    );
    if (this.items && selected) {
      for (const item of this.items) {
        (item as any)._isLinked = selected.find((i) => i.toId === item.id);
      }
    }
  }

  public update() {
    switch (this.toggle_view) {
      case 0:
        this.updateHeaders();
        break;
      case 1:
        this.updateLayout();
        break;
      case 2:
        (this.$refs.calendar as any).checkChange();
        break;
    }
  }

  public dateString(date: number): string {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  public contentLoaded(source: DocDatasource) {
    this.updateEntities(true);
    this.update();

    if (this.source?.events) {
      console.log('create subscription');

      this.source.events.subscribe(GraphDatasource.GRAPH_EVENTS, (action: string, el: GraphElement) => {
        if (action === GraphDatasource.ELEMENT_UPDATED) {
          this.updateEntities(true);
          this.$forceUpdate();
        }
      });
    }

    if (this.options) {
      if (this.options.calendarOptions) {
        this.setToday();
      }
      if (!this.options.title) {
        this.options.title = this.featureType?.title;
      }
      if (!this.options.defaultView) {
        Vue.set(this.options, 'defaultView', GridView.table);
        // this.options.defaultView = GridView.table;
      }

      // let selectionSizePlugin = new Plugin({
      //   view(editorView) {
      //     return new SelectionSizeTooltip(editorView);
      //   }
      // });
    }
  }

  private getElementCard(element: GraphElement) {
    const id = element.classId;
    if (id && ElementCardManager.cards?.hasOwnProperty(id)) {
      return ElementCardManager.cards[id];
    }
    return 'default-element-card';
  }

  mounted() {
    this.defaultColDef.filter = !this.options.hideFilter;
    this.defaultColDef.floatingFilter = !this.options.hideFilter;
    this.updateEntities();
  }
}
</script>
