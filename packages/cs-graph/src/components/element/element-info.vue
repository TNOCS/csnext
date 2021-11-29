<template>
  <div v-if="dataSource && activeElement" style="height: 100%">
    <v-toolbar flat color="primary" dark>
      <v-menu offset-y v-if="dataSource.elementHistory.length > 1">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </template>
        <v-list>
          <template v-for="elementId in dataSource.elementHistory">
            <v-list-item
              v-if="
                elementId !== activeElement.id &&
                dataSource.graph.hasOwnProperty(elementId)
              "
              :key="elementId"
              @click="dataSource.openElement(elementId)"
            >
              {{ dataSource.graph[elementId].properties.name }}
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-toolbar-title
        >{{ activeElement.properties.name }}</v-toolbar-title>
        <br />
        <div class="type-sub-title">{{ activeElement._featureType.title }}</div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-if="activeElement._originals && activeElement._originals.length > 0"
        icon
        @click="openOriginal()"
      >
        <v-icon>image</v-icon>
      </v-btn>

      <v-btn v-if="isDocument" icon @click="openDocument(activeElement.id)">
        <v-icon>folder_open</v-icon>
      </v-btn>

      <v-btn icon @click="deleteNode()">
        <v-icon>delete</v-icon>
      </v-btn>

      <v-btn icon @click="toggleBookmark()">
        <v-icon>bookmark</v-icon>
      </v-btn>

      <v-btn icon @click="graphNode()">
        <v-icon>scatter_plot</v-icon>
      </v-btn>

      <v-menu :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>add</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>follow</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item>
              <!-- <v-list-item v-if="item.items"                
                v-for="(subItem, si) in item.items"
                :key="si"
                @click="subItem.action"
              >
                <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content> -->
            </v-list-item>
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
          <!-- <v-tab href="#tab-properties">{{ $cs.Translate('PROPERTIES') }}</v-tab>
          <v-tab href="#tab-editor">{{ $cs.Translate('EDITOR')}}</v-tab>
          <v-tab href="#tab-facts">{{ $cs.Translate('FACTS') }}</v-tab> -->
          <!-- <v-tab href="#tab-instances">{{ $cs.Translate('INSTANCES') }}</v-tab> -->
          <!-- <v-tab href="#tab-documents">{{ $cs.Translate('DOCUMENTS') }}</v-tab> -->
        </v-tabs>
      </template>
    </v-toolbar>

    <simplebar class="full-height">
      <v-tabs-items v-model="tab" style="margin-bottom: 200px">
        <v-tab-item v-if="specialTab" value="tab-SPECIAL">
          <component
            :is="specialTab"
            :element="activeElement"
            :source="dataSource"
          ></component>
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
          <cs-form
            :data="activeElement.properties"
            :formdef="formDef"
            class="pa-2"
            id="detailcsform"
            @saved="updateEntity"
          ></cs-form>
        </v-tab-item>
        <v-tab-item value="tab-RELATIONS" class="full-height">
          <relation-list-sections
            class="ma-2"
            :node="activeElement"
            :source="dataSource"
          >
          </relation-list-sections>
        </v-tab-item>
        <v-tab-item value="tab-DOCUMENTS">
          <v-list two-line subheader>
            <v-list-item
              v-for="item in getDocuments()"
              :key="item.id"
              @click="openDocument(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.properties.title"
                ></v-list-item-title>
                <v-list-item-subtitle v-if="item._source">
                  {{ item._source.properties.name }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
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
        <v-tab-item value="tab-EEI">
          <cs-widget :widget="eeiWidget"></cs-widget>
        </v-tab-item>
      </v-tabs-items>
    </simplebar>

    <!-- <v-card-actions>
        <v-btn color="orange" text>Share</v-btn>

        <v-btn color="orange" text>Explore</v-btn>
    </v-card-actions>-->

    <br />

    <br />
    <!-- <div v-if="activeElement._derivatives && activeElement._derivatives.length>0">
      <h1>derivatives</h1>
      <div v-for="d in activeElement._derivatives" :key="d.id" class="feature-property">
        <v-layout>
          <div class="link-avatar" :style="{'background': getColor(d.to)}"></div>
          {{ d.from.title }} - {{ d.class.title }} - {{ d.to.title }}
          <v-spacer></v-spacer>
          <span v-if="d.properties.hasOwnProperty('reliability')">
            {{ d.properties.reliability}}
            <v-icon>remove_red_eye</v-icon>
          </span>
        </v-layout>
      </div>

      {{ JSON.stringify(link.element.properties)}} 
    

     <div v-if="element._incomming && element._incomming.length>0">
      <h1>incomming</h1>
      <div v-for="d in element._incomming" :key="d.id" class="feature-property">
        {{ d.from.title }} - {{ d.class.title }} - {{ d.to.title }}       
        </div>
    </div>

    
    <div v-if="element._outgoing && element._outgoing.length>0">
      <h1>_outgoing</h1>
      <div v-for="d in element._outgoing" :key="d.id" class="feature-property">
        {{ d.from.title }} - {{ d.class.title }} - {{ d.to.title }}        
        </div>
    </div>-->
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

.feature-property-value {
  font-size: 16px;
  text-align: right;
  justify-content: flex-end;
}

.feature-property {
  /* height: 100%;   */
}

.feature-property-key {
  position: absolute;
  cursor: pointer;
  font-size: 16px;
  width: 66%;
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
import { Component, Vue, Watch } from "vue-property-decorator";
import { WidgetBase, IframeWidget } from "@csnext/cs-client";
import {
  FeatureType,
  GraphDatasource,
  GraphElement,
  LinkInfo,
} from "@csnext/cs-data";
import simplebar from "simplebar-vue";
import { PropertyType, PropertyValueType } from "@csnext/cs-data";
import { DataInfoPanel, RelationListSections } from "@csnext/cs-map";
import { IFormOptions, IWidget } from "@csnext/cs-core";
import { DocDatasource } from "../../datasources/doc-datasource";
import { GraphDocument } from "../../classes";
import { InfoTabManager } from "../../classes/info-tab-manager";
import Axios from "axios";
import { Component as VueComponent } from "vue";

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
  public tabs = ["PROPERTIES", "EDITOR", "RELATIONS", "DOCUMENTS", "INDICATOR"];
  public tab = "EDITOR";
  public componentKey = 0;
  public history: string[] = [];
  public formDef: IFormOptions | null = null;
  public props: PropertyValue[] = [];
  public eeiWidget: IWidget | null = null;
  public isDocument?: boolean = false;
  private indicatorElements: GraphElement[] = [];

  public activeElement: GraphElement | null = null;
  private specialTab: VueComponent | null = null;

  @Watch("activeElement")
  public async updateIndicatorResults() {
    this.getIndicatorResults();
  }

  constructor() {
    super();
  }

  public get dataSource(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
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

  public updateForm() {
    if (!this.dataSource || !this.activeElement) {
      return;
    }
    this.formDef = null;
    const form = this.dataSource.elementEditorForm(this.activeElement);
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
      if (r === "YES" && this.dataSource && this.activeElement) {
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

  public editNode() {
    if (this.activeElement && this.dataSource) {
      this.dataSource.startEditElement(this.activeElement);
      $cs.triggerNotification({ title: "Editing started" });
    }
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
    if (
      !this.activeElement?.properties?.indicator_definition?.indicatorId ||
      !this.dataSource?.base_url
    ) {
      this.indicatorElements = [];
      return;
    }
    const indicatorId =
      this.activeElement!.properties!.indicator_definition!.indicatorId!;
    const results = (
      await Axios.get<any>(
        `${this.dataSource!.base_url!}/indicators/results/${indicatorId}`
      )
    ).data;
    if (results.hasOwnProperty("error") || !results.hasOwnProperty("array")) {
      this.indicatorElements = [];
    } else {
      this.indicatorElements = results["array"] as GraphElement[];
    }
  }

  public getDocuments() {
    if (!this.activeElement) {
      return [];
    }
    let res: GraphElement[] = [];
    if (this.activeElement._incomming) {
      res = this.activeElement
        ._incomming!.filter(
          (e) =>
            e.from?._featureType?._inheritedTypes &&
            e.from?._featureType?._inheritedTypes.includes("input")
        )
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
    let win = window.open(e.id, "_blank");
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

  private updateElement() {
    this.componentKey += 1;
    if (!this.widget.options || !this.dataSource || !this.activeElement) {
      return;
    }

    this.isDocument =
      this.activeElement._featureType?._inheritedTypes &&
      this.activeElement._featureType?._inheritedTypes.includes("input");

    console.log(this.activeElement);

    this.widget.title = this.activeElement.properties?.name;
    if (this.activeElement.type === "edge") {
      this.widget.options.title =
        this.activeElement.from!.properties?.name +
        " -> " +
        this.activeElement.to!.properties?.name;
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
        if (e.classId === "INSTANCE_OF") {
          res.push({
            direction: "to",
            element: e.from,
            link: e,
          });
        }
      }
    });
    element._instances = res;
    Vue.set(this, "instancesCount", element._instances.length);
    return res;
  }

  public getLinks(element: GraphElement): LinkInfo[] {
    let res: LinkInfo[] = [];
    Object.values(this.dataSource!.graph).forEach((e) => {
      if (e.toId === element.id) {
        if (e.classId !== "INSTANCE_OF") {
          res.push({
            direction: "to",
            element: e.from,
            link: e,
          });
        }
      }
      if (e.fromId === element.id) {
        res.push({
          direction: "from",
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
    this.specialTab = InfoTabManager.tabs[this.activeElement.classId] || null;
  }

  public mounted() {
    if (this.dataSource) {
      if (this.dataSource.activeElement) {
        this.activeElement = this.dataSource.activeElement;
        this.updateTabs();
        this.updateForm();
      }

      this.busManager.subscribe(
        this.dataSource.events,
        GraphDatasource.GRAPH_EVENTS,
        (a: string, e: GraphElement) => {
          if (a === GraphDatasource.ELEMENT_UPDATED) {
            if (e.id === this.activeElement?.id) {
              this.updateElement();
            }
          }
        }
      );

      this.dataSource.bus.subscribe(
        "element",
        (a: string, data: GraphElement) => {
          this.activeElement = data;
          this.updateElement();
          this.updateTabs();
        }
      );
      this.dataSource.bus.subscribe("focus", (a: string, data: any) => {
        this.activeElement = data;
        this.updateElement();
        this.updateTabs();
        this.$forceUpdate();
      });
    }
    this.updateElement();
  }
}
</script>
