<template>
  <div v-if="dataSource && activeElement" style="height: 100%">
    <v-toolbar flat color="primary" dark>
      <v-menu offset-y v-if="dataSource.elementHistory.length > 1">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <v-list>
          <template v-for="elementId in dataSource.elementHistory">
            <v-list-item
              v-if="elementId !== activeElement.id && dataSource.graph.hasOwnProperty(elementId)"
              :key="elementId"
              @click="dataSource.openElement(elementId)"
            >
              {{ dataSource.graph[elementId].properties.name }}
              {{ activeElement.classId }}
            </v-list-item>
          </template>
        </v-list>
      </v-menu>

      <v-toolbar-title
        ><v-icon v-if="activeElement._featureType.icon">{{ activeElement._featureType.icon }}</v-icon>
        {{ activeElement.properties.name }}</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn v-if="activeElement._originals && activeElement._originals.length > 0" icon @click="openOriginal()">
        <v-icon>image</v-icon>
      </v-btn>

      <v-btn v-if="isDocument" icon @click="openDocument(activeElement.id)">
        <v-icon>mdi-folder-outline</v-icon>
      </v-btn>

      <!-- <v-btn icon @click="deleteNode()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn icon @click="editFeatureType()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn> -->

      <!-- <v-btn icon @click="toggleBookmark()">
        <v-icon>mdi-bookmark</v-icon>
      </v-btn> -->

      <!-- <v-btn icon @click="graphNode()">
        <v-icon>mdi-scatter-plot</v-icon>
      </v-btn> -->

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed v-bind="attrs" icon elevation="0" v-on="on" @click="openContextMenu()">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-group
            v-for="(item, i) in contextMenuitems"
            :key="i"
            v-model="item.active"
            :prepend-icon="item.icon"
            no-action
            @click="callContextAction(item)"
          >
            <template v-slot:appendIcon>
              <span v-if="item.items && item.items.length > 0">{{ item.items.length }}</span>
              <span v-else></span>
            </template>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title :color="item.color" v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <template v-if="item.items">
              <v-list-item v-for="(subItem, si) in item.items" :key="si" :prepend-icon="subItem.icon" @click="subItem.action">
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs v-model="tab" class="elevation-2">
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-if="specialTab" key="SPECIAL" href="#tab-SPECIAL">
            {{ activeElement._featureType.title }}
          </v-tab>
          <v-tab v-for="tab in tabs" :key="tab" :href="`#tab-${tab}`">
            {{ $cs.Translate(tab) }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <simplebar class="full-height">
      <v-tabs-items v-model="tab" class="info-tab-items">
        <v-tab-item v-if="specialTab" value="tab-SPECIAL">
          <cs-widget v-if="specialTab.id" :widget="specialTab" :element="activeElement"></cs-widget>
          <component v-else :is="specialTab" :element="activeElement" :source="dataSource"></component>
        </v-tab-item>

        <v-tab-item value="tab-PROPERTIES">
          <data-info-panel
            class="element-data-info-panel"
            :key="componentKey"
            :data="activeElement.properties"
            :source="dataSource"
            :node="activeElement"
            :featureType="activeElement._featureType"
            panel="details"
          ></data-info-panel>
        </v-tab-item>
        <v-tab-item value="tab-EDITOR">
          <cs-form :data="activeElement.properties" :formdef="formDef" class="pa-2" id="detailcsform" @saved="updateEntity"></cs-form>
        </v-tab-item>
        <v-tab-item value="tab-RELATIONS" class="full-height">
          <relation-list-sections class="ma-2" :node="activeElement" :source="dataSource"> </relation-list-sections>
        </v-tab-item>
        <v-tab-item value="tab-WRITE" class="full-height">
          <cs-widget :widget="editorWidget" v-if="editorWidget"></cs-widget>
        </v-tab-item>
        <v-tab-item value="tab-DOCUMENTS">
          <cs-widget :widget="documentsWidget" v-if="documentsWidget" ref="docWidget"></cs-widget>
          <!-- <v-list two-line subheader>
            <v-list-item v-for="item in getDocuments()" :key="item.id" @click="openDocument(item.id)">
              <v-list-item-content>
                <v-list-item-title v-text="item.properties.title"></v-list-item-title>
                <v-list-item-subtitle v-if="item._source"> {{ item._source.properties.name }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list> -->
        </v-tab-item>
        <v-tab-item value="tab-INDICATOR">
          <v-list two-line subheader>
            <v-list-item v-for="item in indicatorElements" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.properties.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </simplebar>
  </div>
</template>

<style>
.element-info-facts {
  margin: 14px;
}
.element-data-info-panel {
  margin: 4px;
}

.type-sub-title {
  font-size: 14px;
  display: block;
}

.short-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.link-avatar {
  background: red;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  margin-top: 5px;
  border-radius: 5px;
  float: left;
}

.from-tag:hover {
  background: lightgray;
}

.to-tag:hover {
  background: lightgray;
}

.rel-tag:hover {
  background: lightgray;
}

.info-tab-items {
  /* position: absolute; */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 300px;
}

.feature-property-value {
  font-size: 16px;
  text-align: right;
  max-width: 66%;
  justify-content: flex-end;
}

.feature-property-key {
  position: absolute;
  cursor: pointer;
  font-size: 16px;
  /* width: 66%; */
}

.prop-key {
  font-weight: 700;
}

.prop-value {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.info-image {
  /* width: 28px; */
  height: 28px;
}
</style>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator';
import { WidgetBase, IframeWidget } from '@csnext/cs-client';
import { GraphDatasource, GraphElement, LinkInfo } from '@csnext/cs-data';
import simplebar from 'simplebar-vue';
import { PropertyType } from '@csnext/cs-data';
import { DataInfoPanel, RelationListSections } from '@csnext/cs-map';
import { IFormOptions, IMenu, IWidget } from '@csnext/cs-core';
import { DocDatasource } from '../../datasources/doc-datasource';
import { GraphDocument } from '../../classes';
import { InfoTabManager } from '../../classes/info-tab-manager';
import Axios from 'axios';
import { Component as VueComponent } from 'vue';
import ElementDataGrid from '../data-grid/element-data-grid.vue';
import { DataGridOptions } from '../data-grid/data-grid-options';
import DocumentViewer from './../document/document-viewer.vue';
import { ElementActions } from './element-actions';
// import IndicatorEditor from "../indicator/indicator-editor.vue";

export class PropertyValue {
  public key?: string;
  public value?: string;
  public propertyType?: PropertyType;
}

@Component({
  components: { simplebar, IframeWidget, DataInfoPanel, RelationListSections },
})
export default class ElementInfo extends WidgetBase {
  public instancesCount = 0;
  public tabs = ['PROPERTIES', 'EDITOR', 'RELATIONS', 'WRITE', 'DOCUMENTS'];
  public tab = 'EDITOR';
  public componentKey = 0;
  public history: string[] = [];
  public formDef: IFormOptions | null = null;
  public props: PropertyValue[] = [];
  public isDocument?: boolean = false;
  private indicatorElements: GraphElement[] = [];
  private documentsWidget: IWidget | null = null;
  private editorWidget: IWidget | null = null;

  public activeElement: GraphElement | null = null;
  private specialTab: VueComponent | null = null;
  private elementInfoTab = 'eitab';

  public showContextMenu = false;
  public contextMenuitems: IMenu[] = [];

  @Ref('docWidget')
  private docWidget: HTMLElement | null = null;

  @Watch('activeElement')
  public async updateIndicatorResults() {
    this.getIndicatorResults();
  }

  constructor() {
    super();
  }

  @Watch('tab')
  public updateTab() {
    if (this.tab === null) {
      $cs.removeRouteQueryParam(this.elementInfoTab);
    } else {
      $cs.addRouteQueryParam(this.elementInfoTab, this.tab.toString());

      if (this.tab === 'WRITE') {
        this.updateEditor();
      }
    }
  }

  public get dataSource(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public openContextMenu(e) {
    if (!this.activeElement || !this.dataSource) {
      return;
    }
    this.showContextMenu = true;
    this.contextMenuitems = ElementActions.getElementActions(this.activeElement, this.dataSource, undefined, (i, m) => {
      this.$forceUpdate();
    });
  }

  public async callContextAction(i: IMenu) {
    this.showContextMenu = false;
    if (i.action && typeof i.action === 'function') {
      await i.action(i);
    }
  }

  public setLegend(p: any) {
    // find layer
    if (!this.dataSource?.layers || !this.activeElement?.classId) {
      return;
    }
    if (this.dataSource.layers.hasOwnProperty(this.activeElement.classId)) {
      let l = this.dataSource.layers[this.activeElement.classId];
      l.setLegend(p.key);
    }
    // this.dataSource.layers
    // debugger;
  }

  public updateEntity() {
    if (this.dataSource && this.activeElement) {
      this.dataSource.saveNode(this.activeElement);
    }
  }

  public editFeatureType() {
    if (this.dataSource && this.activeElement?._featureType) {
      this.dataSource.openFeatureTypeEditor(this.activeElement._featureType);
    }
  }

  // public editNode() {
  //   if (this.dataSource && this.activeElement && this.widget._dashboard) {
  //     if (!this.widget._dashboard.options) {
  //       this.widget._dashboard.options = {};
  //     }
  //     this.widget._dashboard.options.sidebarExpanded = true;
  //   }
  // }

  public updateForm() {
    if (!this.dataSource || !this.activeElement) {
      return;
    }
    this.formDef = null;
    const form = this.dataSource.elementEditorForm(this.activeElement, true, true);
    Vue.nextTick(() => {
      this.formDef = form;
    });
    // Vue.set(this, "formDef", form);
  }

  public toggleBookmark() {
    if (!this.dataSource || !this.activeElement) {
      return;
    }
    this.dataSource.toggleBookmark(this.activeElement);
  }

  public deleteNode() {
    $cs.triggerYesNoQuestionDialog(`DELETE_NODE`, `ARE_YOU_SURE`).then((r) => {
      if (r === 'YES' && this.dataSource && this.activeElement) {
        (this.dataSource as DocDatasource).removeNode(this.activeElement, true);
        $cs.closeRightSidebar();
      } else {
        // alert('no');
      }
    });
  }

  public getColor(el: GraphElement): string {
    return GraphElement.getBackgroundColor(el);
  }

  public saveNode() {
    if (this.activeElement && this.dataSource) {
      this.dataSource.stopEditElement(this.activeElement);
    }
  }

  public graphNode() {
    if (this.activeElement && this.dataSource) {
      this.dataSource.createKGView([this.activeElement]);
    }
  }

  public async getIndicatorResults() {
    if (!this.activeElement?.properties?.indicator_definition?.indicatorId || !this.dataSource?.base_url) {
      this.indicatorElements = [];
      return;
    }
    const indicatorId = this.activeElement!.properties!.indicator_definition!.indicatorId!;
    const results = (await Axios.get<any>(`${this.dataSource!.base_url!}/indicators/results/${indicatorId}`)).data;
    if (results.hasOwnProperty('error') || !results.hasOwnProperty('array')) {
      this.indicatorElements = [];
    } else {
      this.indicatorElements = results['array'] as GraphElement[];
    }
  }

  public getDocuments() {
    if (!this.activeElement) {
      return [];
    }
    let res: GraphElement[] = [];
    if (this.activeElement._incomming) {
      res = this.activeElement
        ._incomming!.filter((e) => e.from?._featureType?._inheritedTypes && e.from?._featureType?._inheritedTypes.includes('input'))
        .map((e) => e.from) as GraphElement[];
    }
    // if (this.activeElement._outgoing) {
    //   res = [...res, ...this.activeElement._outgoing.filter(e => e.classId === 'document')];
    // }

    return res;
  }

  public getOriginal(): GraphElement | undefined {
    if (!this.activeElement) {
      return;
    }
    const doc = this.activeElement as GraphDocument;
    if (doc._originals && doc._originals.length > 0) {
      return doc._originals[0];
    }
    return;
  }

  public selectExternal(e: GraphElement) {
    let win = window.open(e.id, '_blank');
    if (win) {
      win.focus();
    }

    // this.$cs.OpenRightSidebarWidget(
    //   {
    //     id: "source",
    //     component: IframeWidget,
    //     data: {
    //       url: e.id
    //     }
    //   },
    //   { open: true },
    //   "sources"
    // );
  }

  private updateEditor() {
    if (!this.activeElement || !this.dataSource) {
      return;
    }
    if (!this.editorWidget) {
      this.editorWidget = {
        id: `${this.activeElement.id}-viewer`,
        component: DocumentViewer,
        datasource: this.dataSource.id,
        data: {
          elementId: this.activeElement.id,
        },
        options: {
          showToolbar: false,

          toolbarOptions: {
            dense: true,
            hideIcon: true,
            elevation: 0,
          },
        },
      };
    } else if (this.editorWidget?._component?.openElement) {
      this.editorWidget._component.openElement(this.activeElement);
    }
  }

  private updateElement() {
    this.componentKey += 1;
    if (!this.widget.options || !this.dataSource || !this.activeElement) {
      return;
    }

    $cs.updateRouteQuery({ nodedetails: this.activeElement.id });

    this.updateEditor();

    const docWidget = {
      component: ElementDataGrid,
      datasource: this.dataSource.id,
      data: {
        elementId: this.activeElement.id,
      },
      options: {
        defaultView: 'table',
        baseType: 'input',
        title: 'Related documents',
        canAdd: true,
        canSearch: true,
        filter: { hasObjectTypeRelation: { HAS_REFERENCE: this.activeElement.id } },
        newRelations: [
          {
            key: 'reference',
            toId: this.activeElement.id,
          },
        ],
      } as DataGridOptions,
    };

    this.documentsWidget = docWidget;

    this.isDocument = this.activeElement._featureType?._inheritedTypes && this.activeElement._featureType?._inheritedTypes.includes('input');

    this.widget.title = this.activeElement.properties?.name;
    if (this.activeElement.type === 'edge') {
      this.widget.options.title = this.activeElement.from!.properties?.name + ' -> ' + this.activeElement.to!.properties?.name;
    } else {
      this.widget.options.title = this.activeElement.properties?.name;
    }
    this.updateForm();
    this.$forceUpdate();
  }

  public openOriginal() {
    const o = this.getOriginal();
    if (!this.dataSource || !this.activeElement || !o) {
      return;
    }
    this.dataSource.openViewer(o, this.activeElement);
  }

  public openDocument(id: string) {
    $cs.router?.push(`/document?id=${id}`);
  }

  public getInstances(element: GraphElement): LinkInfo[] {
    if (element._instances) {
      return element._instances;
    }
    let res: LinkInfo[] = [];
    Object.values(this.dataSource!.graph).forEach((e: GraphElement) => {
      if (e.toId === element.id) {
        if (e.classId === 'INSTANCE_OF') {
          res.push({
            direction: 'to',
            element: e.from,
            link: e,
          });
        }
      }
    });
    element._instances = res;
    Vue.set(this, 'instancesCount', element._instances.length);
    return res;
  }

  public getLinks(element: GraphElement): LinkInfo[] {
    let res: LinkInfo[] = [];
    Object.values(this.dataSource!.graph).forEach((e) => {
      if (e.toId === element.id) {
        if (e.classId !== 'INSTANCE_OF') {
          res.push({
            direction: 'to',
            element: e.from,
            link: e,
          });
        }
      }
      if (e.fromId === element.id) {
        res.push({
          direction: 'from',
          element: e.to,
          link: e,
        });
      }
    });
    return res;
  }

  public selectElement(element: GraphElement) {
    // this.dataSource!.selectElement(element);
    this.activeElement = element;
    this.updateElement();
  }

  public updateTabs() {
    if (!this.activeElement?.classId) {
      this.specialTab = null;
      return;
    }

    let tabs = InfoTabManager.tabs[this.activeElement.classId];
    if (Array.isArray(tabs)) {
      this.specialTab = InfoTabManager.tabs[this.activeElement.classId][0] || null;
    } else {
      let tab = InfoTabManager.tabs[this.activeElement.classId] as IWidget;
      this.specialTab = tab;
    }

    this.$forceUpdate();
  }

  public mounted() {
    let qtab = $cs.getRouteQuery(this.elementInfoTab);
    if (qtab && qtab !== this.tab) {
      this.tab = qtab;
    }
    if (this.dataSource) {
      if (this.dataSource.activeElement) {
        this.activeElement = this.dataSource.activeElement;
        this.updateTabs();
        this.updateForm();
      }

      this.busManager.subscribe(this.dataSource.events, GraphDatasource.GRAPH_EVENTS, (a: string, e: GraphElement) => {
        if (a === GraphDatasource.ELEMENT_UPDATED) {
          if (e.id === this.activeElement?.id) {
            this.updateElement();
          }
        }
      });

      this.busManager.subscribe(this.dataSource.bus, 'element', (a: string, data: GraphElement) => {
        this.activeElement = data;
        if (a === 'edit-element') {
          this.tab = 'tab-EDITOR';
        }
        this.updateElement();
        this.updateTabs();
      });
      this.busManager.subscribe(this.dataSource.bus, 'focus', (a: string, data: any) => {
        this.activeElement = data;
        this.updateElement();
        this.updateTabs();
      });
    }
    this.updateElement();
  }
}
</script>
