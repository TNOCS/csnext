<template>
  <v-card class="selection-popup" v-if="source">
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
            <data-info-panel
              :data="entity._node.properties"
              :featureType="entity._node._featureType"
              panel="popup"
            ></data-info-panel>

            


            <div class="entity-node-actions">
              <v-btn icon @click="graphNode(entity)"
                ><v-icon>mdi-scatter-plot</v-icon></v-btn
              >
              <v-btn icon @click="openNode(entity)"
                ><v-icon>mdi-information-outline</v-icon></v-btn
              >
              <v-btn icon @click="deleteEntity()"
                ><v-icon>mdi-delete</v-icon></v-btn
              >

              <v-tooltip bottom v-if="entity._included">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon @click="excludeEntity()"
                    ><v-icon>mdi-minus</v-icon></v-btn
                  >
                </template>
                {{ $cs.Translate("UNLINK_ENTITY") }}
              </v-tooltip>
              <v-tooltip bottom v-else>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="includeEntity()"
                    ><v-icon>mdi-plus</v-icon></v-btn
                  >
                </template>
                {{ $cs.Translate("LINK_ENTITY") }}
              </v-tooltip>
            </div>
          </div>
          <div v-else>
            <v-card-title>{{ entity.text }}</v-card-title>
            <v-card-subtitle>{{ entity.spacy_label }}</v-card-subtitle>
            <span v-if="potentialTypes.length > 0"
              >Add new:<v-chip
                small
                outlined
                v-for="ft in potentialTypes"
                :key="ft.type"
                @click="createNewNode(ft)"
                >{{ ft.title }}</v-chip
              ></span
            >
            <v-layout class="ma-3" style="margin-top: -20px">
              <v-radio-group v-model="searchMode" class="add-node-mode">
                <v-radio label="Existing" value="KG"></v-radio>
                <v-radio label="New" value="new"></v-radio>
              </v-radio-group>

              <v-combobox
                v-if="searchMode === 'KG'"
                :items="Object.values(source.graph)"
                v-model="newEntityNode"
                item-text="properties.name"
                label="node"
                return-object
              ></v-combobox>
              <v-combobox
                v-model="newCategory"
                :items="Object.values(source.featureTypes)"
                item-text="title"
                return-object
                v-if="searchMode === 'new'"
                label="category"
              ></v-combobox>
              <v-btn @click="createNode()" fab x-small class="mt-4 primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-layout>
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
            <div class="suggestion-item" v-for="(s, i) in suggestions" :key="i">
              <v-layout
                >{{ s.item.properties.name }} ({{getScore(s.score)}})<v-btn v-if="!entity._node" icon @click="useSuggestion(s.item)"
                  ><v-icon>mdi-link-plus</v-icon></v-btn
                ></v-layout
              >
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
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
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            {{ entity._date }}
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <!-- <v-tab value="entity"><v-icon>mdi-playlist-plus_check</v-icon></v-tab>
        <v-tab value="observation"><v-icon>camera_enhance</v-icon></v-tab>
        <v-tab value="note"><v-icon>note</v-icon></v-tab>     
         <v-tab-item value="entity"><h1>entity</h1></v-tab-item>
        <v-tab-item value="observation">observation</v-tab-item>
        <v-tab-item value="note">note</v-tab-item>  
      </v-tabs> -->

    <!--     
    
    
    <div v-if="entity.text">      
      <v-card-title>{{ entity.text }}</v-card-title>
      <v-card-subtitle>{{ entity.entity_class }}</v-card-subtitle>
      <v-btn icon large class="search-button" @click="searchNode = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-container v-if="searchNode">
        <v-radio-group v-model="searchMode" row>
          <v-radio label="KG" value="KG"></v-radio>
          <v-radio label="New" value="new"></v-radio>
          <v-radio label="Online" value="online"></v-radio>
        </v-radio-group>
        <v-layout>
          <v-combobox
            v-if="searchMode === 'KG'"
            :items="Object.values(source.graph)"
            v-model="newEntityNode"
            item-text="properties.name"
            label="node"
            return-object
          ></v-combobox>
          <v-combobox
            v-model="newCategory"
            :items="source.availableNodeTypes"
            item-text="properties.name"
            return-object
            v-if="searchMode=== 'new'"
            label="category"
          ></v-combobox>
          <v-combobox
            v-if="searchMode === 'online'"
            :items="Object.values(source.graph)"
            v-model="searchOnline"
            item-text="properties.name"
            label="node"
            return-object
          ></v-combobox>

          <v-btn @click="linkNode()" fab x-small class="mt-4 primary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-layout>
        <v-spacer></v-spacer>
        
      </v-container>
    </div>    
  </v-card> -->
    <!-- <v-card v-else class="selection-popup">   
    <div v-if="text">
      
       <v-layout >
      <v-btn icon large  @click="addNote = true; searchNode = false">
        <v-icon>note_mdi-plus</v-icon>
      </v-btn>
      <v-btn icon large  @click="searchNode = true; addNote = false">
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>
      </v-layout>
      <v-container v-if="addNote">
        <h2>indicator</h2>
        <v-combobox
            v-model="newNoteSource"
            :items="source.getClassElements('source', true)"
            item-text="properties.name"
            return-object            
            label="source"
          ></v-combobox>
          <v-combobox
            v-model="newNoteEEI"
            :items="source.getClassElements('eei', true)"
            item-text="properties.name"
            return-object            
            label="EEI"
          ></v-combobox>
          <v-text-field
            v-model="newNoteUrl"
            label="Url"
            single-line            
          ></v-text-field>
      </v-container>
      <v-container v-if="searchNode">
        <h2>entity</h2>
        <v-radio-group v-model="searchMode" row>
          <v-radio label="KG" value="KG"></v-radio>
          <v-radio label="New" value="new"></v-radio>
          <v-radio label="Online" value="online"></v-radio>
        </v-radio-group>
        <v-layout>
          <v-combobox
            v-if="searchMode === 'KG'"
            :items="Object.values(source.graph)"
            v-model="newEntityNode"
            item-text="properties.name"
            label="node"
            return-object
          ></v-combobox>
          <v-combobox
            v-model="newCategory"
            :items="source.availableNodeTypes"
            item-text="properties.name"
            return-object
            v-if="searchMode=== 'new'"
            label="category"
          ></v-combobox>
          <v-combobox
            v-if="searchMode === 'online'"
            :items="Object.values(source.graph)"
            v-model="searchOnline"
            item-text="properties.name"
            label="node"
            return-object
          ></v-combobox>

          <v-btn @click="createNode()" fab x-small class="mt-4 primary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-layout>
        
      </v-container>
    </div>
  </v-card> -->
  </v-card>
</template>

<style scoped>
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
  right: 0;
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
import { GraphElement, WktUtils } from "@csnext/cs-data";
import { TextEntity } from "@csnext/cs-data";
import { DocDatasource } from "../../datasources/doc-datasource";
import { GraphDocument } from "../../classes/document/graph-document";
import { guidGenerator } from "@csnext/cs-core";
import { DataInfoPanel, NodeLink, NodeSpan } from "@csnext/cs-map";
import { DocUtils } from '../../utils/doc-utils';
import { FeatureType } from "@csnext/cs-data";
// import turf from "@turf/turf";
// import distance from "@turf/distance";

@Component({
  components: { DataInfoPanel, NodeLink, NodeSpan },
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

  public newNoteSource: GraphElement = { };
  public newNoteEEI: GraphElement = { };
  public newNoteUrl: string = "";

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
    return value.toFixed(2);
  }

  public updateSuggestions() {
    if (this.entity?.text && this.source?.fuse) {
      this.suggestions = this.source.fuse
        .search(this.entity.text)        
    }
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
      this.document!.entities?.push(this.entity);
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
      _included: true,
    };
    entity._node = node;
    entity.kg_id = node.id;
    this.source.addNode(node);
    await this.source.saveNode(node);    
    await this.source.linkEntityToDocument(entity, this.document);
    await this.source.parseEntities();
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
          if (!this.document.entities?.includes(this.entity)) {
            this.document.entities?.push(this.entity);
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
            _included: true,
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
    DocUtils.syncEntities(
      this.source.activeDocument,
      this.source.activeDocument.properties!.doc!.content,
      true,
      this.source
    );
    this.$forceUpdate();
  }

  public async deleteEntity() {
    if (this.source && this.entity && this.document && this.document.entities) {
      this.document.entities = this.document.entities.filter(
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
      }
    } else if (this.source.featureTypes) {
      this.potentialTypes = Object.values(this.source.featureTypes).filter(
        (ft) =>
          ft.attributes &&
          ft.attributes.hasOwnProperty("spacy_label") &&
          ft.attributes["spacy_label"] === this.entity?.spacy_label
      );
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
    this.updateAgents();
    this.updatePotentialTypes();
    this.updateSuggestions();
  }
}
</script>
