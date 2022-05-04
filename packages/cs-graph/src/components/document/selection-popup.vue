<template v-if="source">
  <!-- <div v-if="document.properties.editor_mode && document.properties.editor_mode === 'LEARN'" >
    <v-layout class="learn-popup" v-if="document.properties.learn_mode && document.properties.learn_mode === 'REVIEW'" >
    <v-btn style="background:green"><v-icon>mdi-check</v-icon></v-btn>
    <v-btn style="background:red"><v-icon>mdi-close</v-icon></v-btn>
    </v-layout>
    <v-layout v-else>
    </v-layout>
  </div> -->
   <!-- v-else -->
  <v-card class="selection-popup">
    <v-tabs vertical :value="viewtab">
      <v-tab>
        <v-icon left>mdi-tag-outline</v-icon>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-magnify</v-icon>
      </v-tab>       
      <v-tab :disabled="!entity || !entity._location">
        <v-icon left>mdi-map-marker-outline</v-icon>
      </v-tab>
      <v-tab :disabled="!entity || !entity._date">
        <v-icon left>mdi-calendar-range</v-icon>
      </v-tab>
      <v-tab>
        <v-icon left>search-web</v-icon>
      </v-tab>

      <v-tab-item>
        <div>
        <template v-if="entity">
          <div v-if="entity._node" class="entity-node">
            <!-- <component :is="getComponentCard(entity._node)" cardSize="Small" :element="entity._node" :source="source" /> -->
            <data-info-panel
              :data="entity._node.properties"
              :featureType="entity._node._featureType"
              panel="popup"
            ></data-info-panel>

            <div class="mx-auto entity-node-actions">
              <!-- <v-btn icon @click="graphNode(entity)"
                ><v-icon>mdi-scatter-plot</v-icon></v-btn
              > -->
              <v-btn outlined @click="openNode(entity)"
                ><v-icon>mdi-information-outline</v-icon>info</v-btn
              >
              <!-- <v-btn icon @click="deleteEntity()"
                ><v-icon>mdi-delete</v-icon></v-btn
              > -->

              <v-tooltip bottom v-if="entity._linked">
                <template v-slot:activator="{ on }">
                  <v-btn depressed v-on="on" @click="excludeEntity()"
                    ><v-icon>mdi-link-off</v-icon> unlink</v-btn
                  >
                </template>
                {{ $cs.Translate("UNLINK_ENTITY") }}
              </v-tooltip>
              <v-tooltip bottom v-else>
                <template v-slot:activator="{ on }">
                  <v-btn  v-on="on" class="primary" @click="includeEntity()"
                    ><v-icon>mdi-link</v-icon> link</v-btn
                  >
                </template>
                {{ $cs.Translate("LINK_ENTITY") }}
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn  v-on="on" class="primary" @click="removeEntity()"
                    ><v-icon>mdi-delete</v-icon> delete</v-btn
                  >
                </template>
                {{ $cs.Translate("LINK_ENTITY") }}
              </v-tooltip>
            </div>
          </div>
          <div v-else>
            <v-card-title>{{ entity.text }}</v-card-title>
            <v-card-subtitle>{{ entity.spacy_label }}</v-card-subtitle>
            <v-row>
              <v-col cols="4">
            <span v-if="potentialTypes.length > 0"
              ><v-chip
                small
                outlined
                class="ma-1"
                v-for="ft in potentialTypes"
                :key="ft.type"
                @click="createNewNode(ft)"
                ><v-icon small v-if="ft._icon">{{ft._icon}}</v-icon> {{ ft.title }}</v-chip
              ></span>
              </v-col>
              <v-col cols="8" v-if="suggestions">
                <v-layout v-for="(s, i) in suggestions.slice(0,5)" :key="i"><v-btn icon @click="useSuggestion(s.item)"><v-icon>mdi-link</v-icon></v-btn> <node-chip light   :node="s.item" :source="source" /></v-layout>
                 <!-- <v-list dense>
              <v-list-item @click="useSuggestion(s.item)"  v-for="(s, i) in suggestions.slice(0,5)" :key="i">
                <v-list-item-avatar>
                  <v-icon v-if="s.item._featureType.icon">{{s.item._featureType.icon}}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{s.item.properties.name}}
                  </v-list-item-title>
                
                </v-list-item-content>
                <v-list-item-action>
          
        </v-list-item-action>
              </v-list-item>
            </v-list> -->
              </v-col>
              </v-row>          
          </div>
        </template>
        <template v-else> no entity </template>
        <div v-if="suggestedby" class="suggestion-info">
              suggested by: 
              <strong><node-span :node="suggestedby" :source="source"></node-span></strong>
              </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title>{{ $cs.Translate("suggestions") }}</v-card-title>
          <v-card-text v-if="suggestions">
            <v-list two-line>
              <v-list-item @click="useSuggestion(s.item)"  v-for="(s, i) in suggestions" :key="i">
                <v-list-item-avatar>
                  <v-icon v-if="s.item._featureType.icon">{{s.item._featureType.icon}}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{s.item.properties.name}}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{s.item._featureType.title}}, {{getScore(s.score)}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
       
        </v-list-item-action>
              </v-list-item>
            </v-list>
            <!-- <div class="suggestion-item" >
              <v-layout
                >{{ s.item.properties.name }} ({{getScore(s.score)}})<v-btn v-if="!entity._node" icon @click="useSuggestion(s.item)"
                  ><v-icon>mdi-link-plus</v-icon></v-btn
                ></v-layout
              >
            </div> -->
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- <v-tab-item>
        <v-card flat>
          <v-layout class="ma-4">
            <v-btn outlined @click="locateOnMap()">
              <v-icon large>mdi-crosshairs-gps</v-icon>
              {{ $cs.Translate("LOCATE_ON_MAP") }}</v-btn
            >
            <v-btn outlined @click="nearby()">
              <v-icon large>mdi-map-marker</v-icon>
              {{ $cs.Translate("NEARBY") }}</v-btn
            >
          </v-layout>
        </v-card>
      </v-tab-item> -->
      <v-tab-item v-if="entity">
        <v-card flat>
          <v-card-text>
            {{ entity._date }}
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>    
  </v-card>
</template>

<style scoped>

.learn-popup {
  background-color: transparent;
}
.search-button {
  /* position: absolute; */
  top: 5px;
  right: 5px;
}

.suggestion-item{
  font-size: 20px;
}

.add-node-mode {
  margin-right: 10px;
}

.entity-node {
  min-height: 150px;
}

.suggestion-info {
  position: absolute;
  bottom: 0;
  left: 0;
}

.entity-node-actions {
  position: absolute;
  bottom: 0;
  /* right: 0; */
}

.selection-popup {
  width: 500px;
  /* height: 300px; */
  /* background-color: lightblue; */
}
.entity-status-icon {
  font-size: 30px;
  margin-right: 5px;
  color: gray;
}
</style>

<script lang="ts">
import { Component, Watch, Prop } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { GraphDatasource, GraphElement, WktUtils } from "@csnext/cs-data";
import { TextEntity } from "@csnext/cs-data";
import { DocDatasource } from "../../datasources/doc-datasource";
import { GraphDocument } from "../../classes/document/graph-document";
import { guidGenerator } from "@csnext/cs-core";
import { DataInfoPanel, NodeLink, NodeChip, NodeSpan } from "@csnext/cs-map";
import { DocUtils } from '../../utils/doc-utils';
import { FeatureType } from "@csnext/cs-data";
import { ElementCardManager } from "../data-grid/cards/element-card-manager";
// import turf from "@turf/turf";
// import distance from "@turf/distance";

@Component({
  components: { DataInfoPanel, NodeLink, NodeSpan, NodeChip },
})
export default class SelectionPopup extends WidgetBase {
  @Prop()
  public editor: any;

  @Prop()
  public entity?: TextEntity;

  @Prop()
  public text?: any;

  @Prop()
  public source?: DocDatasource;

  @Prop()
  public document?: GraphDocument;

  public tab = "observation";

  public viewtab = 0;

  public searchNode = false;

  public potentialTypes: FeatureType[] = [];

  public addNote = false;

  public searchOnline = { };

  public searchMode = "KG";

  @Prop()
  public from?: number;
  @Prop()
  public to?: number;

  public newCategory: FeatureType | null = null;
  public newEntityNode: GraphElement = { };

  public suggestions: any[] | null = null;

  constructor() {
    super();
  }

  public contentLoaded() {}

  @Watch("entity")
  private updateEntity() {
    if (this.entity) {
      this.updatePotentialTypes();
    }
  }

  @Watch("entity._linked")
  private updateLinked() {
    this.$forceUpdate();
  }

  public async createEntity() {
    if (!this.source || !this.source.searchEntities || !this.document) {
      return;
    }

    this.source.searchEntities.push({
      entity: this.text,
      private: true,
      ent_class: "UNKNOWN",
      id: guidGenerator(),
      aka: [this.text],
    });
    // await this.source.callEntitySearch(this.document);
  }

  private getScore(value: number) {
    return ((1-value) * 100).toFixed(0) + '%';
  }

  public updateSuggestions() {
    console.log('update suggestions');
    if (this.entity?.text && this.source?.fuse) {
      this.suggestions = this.source.searchFuse(this.entity.text, undefined, false).slice(0, 15);
      // , { nlp: this.entity?.spacy_label}
        // .search(this.entity.text, { limit: 8}).filter((x: GraphElement) => x.item._featureType.ba)        
    }
  }

  public getComponentCard() {
    if (this.entity?._node) {
      return ElementCardManager.getElementCard(this.entity._node);
    }
    return null;
  }

  public async createNewNode(ft: FeatureType) {
    if (!this.entity) {
      return;
    }
    this.addEntityAsClass(this.entity, ft);
  }

  public graphNode(entity: TextEntity) {
    if (!this.source || !entity._node) {
      return;
    }

    this.source.triggerUpdateGraph();
  }

  public locateOnMap() {
    // if (!this.source?.map?.MapControl) {
    //   return;
    // }
    // if (this.entity?._location && this.source?.map) {
    //   const location = WktUtils.PointParser(this.entity._location);
    //   if (location) {
    //     this.source?.map.MapControl.flyTo({
    //       zoom: 10,
    //       center: { lat: location[1], lng: location[0] },
    //     });
    //   }
    // }
  }

  public nearby() {
    if (!this.source || !this.entity?._location) {
      return;
    }
    // const location = WktUtils.PointParser(this.entity._location);
    // const point = turf.point([location[0], location[1]]);
    // const pois = this.source.getClassElements("poi", true);
    // for (const p of pois) {
    //   if (p.properties?.lat && p.properties.lon) {
    //     // const distance = turf.distance(point, turf.point([p.properties.lat, p.properties.lon]));
    //     // console.log(p.properties.name + ' - ' + distance);
    //   }
    // }
  }

  public async unlinkEntity() {
    if (!this.entity || !this.source || !this.document) {
      return;
    }
    try {
      this.deleteEntity();
    } catch (e) {
      console.log(e);
    }
    delete this.entity._node;
    delete this.entity._edge;
    this.searchNode = true;
    this.publishChanges();
    this.$forceUpdate();
  }

  public async includeEntity() {
    if (!this.source || !this.document || !this.entity) {
      return;
    }
    await this.source.linkEntityToDocument(this.entity, this.document);
    this.publishChanges();
  }

  public async excludeEntity() {
    if (!this.source || !this.document || !this.entity) {
      return;
    }
    await this.source.removeEntityFromDocument(this.entity, this.document);
    
    this.publishChanges();
  }

  public async useSuggestion(target: GraphElement) {
    if (!this.source || !this.entity || !this.document) {
      return;
    }
    this.entity.kg_id = target.id;
    this.entity._node = target;    
    if (!this.entity._node._alternatives) {
      this.entity._node._alternatives = [];
    }
    this.entity._node._alternatives?.push(this.entity.text!);
    await this.source.saveNode(this.entity._node);
    await this.source.linkEntityToDocument(this.entity, this.document);
    this.publishChanges();
  }

  public async createNode() {
    if (!this.document || !this.source) {
      return;
    }
    if (!this.entity) {
      this.entity = {
        text: this.text,
        id: guidGenerator(),
        // position_start: this.from,
        // position_end: this.to,
      };
      this.document!._entities?.push(this.entity);
    }
    switch (this.searchMode) {
      case "KG":
        if (this.newEntityNode && this.source) {
          (this.entity.kg_id = this.newEntityNode.id),
            (this.entity._node = this.newEntityNode);          
          if (!this.entity._node._alternatives) {
            this.entity._node._alternatives = [];
          }
          this.entity._node._alternatives?.push(this.entity.text!);
          await this.source.saveNode(this.entity._node);
          await this.source.linkEntityToDocument(this.entity, this.document);
          this.publishChanges();
        }
        break;
      case "new":
        if (this.newCategory) {
          await this.addEntityAsClass(this.entity, this.newCategory);
        }
        break;
    }
  }

  public async addEntityAsClass(entity: TextEntity, category: FeatureType) {
    if (!this.document || !this.source || !entity) {
      return;
    }
    const node = {
      classId: category.type,
      id: guidGenerator(),
      properties: {
        name: entity.text,
        description: entity.text,
        location: entity._location,
      },
      // _linked: true,
    };
    entity._node = node;
    entity.kg_id = node.id;
    this.source.addNode(node);
    await this.source.saveNode(node);    
    await this.source.linkEntityToDocument(entity, this.document);
    await this.source.parseEntities(this.document);
    this.publishChanges();
  }

  public async linkNode() {
    if (!this.entity) {
      return;
    }
    switch (this.searchMode) {
      case "KG":
        if (
          this.newEntityNode &&
          this.source &&
          this.entity.text &&
          this.document
        ) {
          this.entity.kg_id = this.newEntityNode.id;
          this.entity.id = this.newEntityNode.id;
          this.entity.spacy_label = this.newEntityNode.classId;
          this.entity._node = this.newEntityNode;          
          if (!this.document._entities?.includes(this.entity)) {
            this.document._entities?.push(this.entity);
          }
          if (!this.entity._node._alternatives) {
            this.entity._node._alternatives = [];
          }
          if (!this.entity._node._alternatives.includes(this.entity.text)) {
            this.entity._node._alternatives?.push(this.entity.text!);
            await this.source.saveNode(this.entity._node);
          }
          try {
            await this.source.linkEntityToDocument(this.entity, this.document);
            await this.source.saveDocument(this.document);
            console.log("document");
            console.log(this.document);
            this.publishChanges();
          } catch (e) {}
        }
        break;
      case "new":
        if (this.newCategory && this.source && this.source.activeDocument) {
          const node = {
            classId: this.newCategory.type,
            title: this.entity?.text ?? this.text,
            properties: {
              title: this.entity?.text ?? this.text,
            },
            _linked: true,
          };
          this.source.addNode(node);
          this.entity._node = node;
          // this.openNode(this.entity);
          await this.source.saveNode(node);
          await this.source.linkEntityToDocument(
            this.entity,
            this.source.activeDocument
          );
          await this.source.saveDocument(this.source.activeDocument);
          this.publishChanges();
          this.$forceUpdate();
        }
        break;
    }
  }

  public openNode(entity: TextEntity) {
    if (entity._node && entity._node.id) {
      this.source!.selectElementId(entity._node.id, true);
    }
  }

  public publishChanges() {
    // this.source!.bus.publish("document-entities", "updated");
    if (!this.source?.activeDocument) {
      return;
    }
    this.source.parseEntities(this.source.activeDocument);
    this.$forceUpdate();
  }

  public async deleteEntity() {
    if (this.source && this.entity && this.document && this.document._entities) {
      this.document._entities = this.document._entities.filter(
        (e) => e !== this.entity
      );
      try {
        await this.source.removeEntityFromDocument(this.entity, this.document);
      } catch (e) {
        console.log(e);
      }
      this.source.saveDocument(this.document);
      this.publishChanges();

      // const index = this.document.entities!.findIndex(e => e.id === this.entity!.id);
      // if (index>=0) {
      //   this.document.entities!.splice(index, 1);
      // }
    }
  }

  @Watch("selection")
  private selectionChanged(sel: any) {
    console.log(this.entity);

    // const text = (this.editor.doc.textContent as string).substring(sel.from, sel.to);
    // console.log(text);
  }

  private updatePotentialTypes() {
    if (!this.source) {
      return;
    }
    if (this.source?.featureTypes && this.entity?.spacy_label) {
      if (this.entity.spacy_label === "location") {
        this.potentialTypes = Object.values(this.source.featureTypes).filter(
          (ft) => ft._inheritedTypes && ft._inheritedTypes.includes("location")
        );
      
    } else if (this.source.featureTypes) {
      this.potentialTypes = Object.values(this.source.featureTypes).filter(
        (ft) =>
          ft.attributes &&
          ft.attributes.hasOwnProperty("nlp:entity_class") &&
          ft.attributes["nlp:entity_class"] === this.entity?.spacy_label
      );
    }
      if (this.potentialTypes && this.potentialTypes.length > 0) {
        this.newCategory = this.potentialTypes[0];
      } else {
        this.newCategory = Object.values(this.source.featureTypes)[0];
      }
    
    }
  }

  public suggestedby: GraphElement | null = null;
  public suggestedtime: number | null = null;

  public updateAgents() {
    if (!this.source?.graph || !this.entity?.suggested_by || this.entity.suggested_time) { return; }
    this.suggestedby = this.source.graph[this.entity.suggested_by];
    console.log('suggested');
    console.log(this.suggestedby);
    if (!this.suggestedby) { return }

  }

  mounted() {
    
    if (this.entity?.spacy_label === "location") {
      this.viewtab = 1;
    }

    if (this.source?.events) {

    this.source.events.subscribe(GraphDatasource.GRAPH_EVENTS, (a: string, e: GraphElement) => {
        if (this.document?.id && a === GraphDatasource.ELEMENT_UPDATED && e.id === this.document?.id) {
          this.$forceUpdate();
        }
      }) 
    }

      
    // this.updateAgents();
    // this.updatePotentialTypes();
    this.updateSuggestions();
    if (!this.entity?._node && this.entity?.spacy_label && !['CARDINAL','DATE', 'ORDINAL', 'QUANTITY'].includes(this.entity.spacy_label) && this.suggestions && this.suggestions.length > 0) {
      // this.viewtab = 1;
    }

  }
}
</script>
