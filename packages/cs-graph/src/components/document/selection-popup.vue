<template>
  <v-card class="selection-popup">
    <v-tabs vertical>
      <v-tab>
        <v-icon left> playlist_add_check </v-icon>
      </v-tab>
      <v-tab>
        <v-icon left> camera_enhance </v-icon>
      </v-tab>
      <v-tab>
        <v-icon left> note </v-icon>
      </v-tab>

      <v-tab-item >        
        <template v-if="entity">
          <div v-if="entity._node" class="entity-node">
   
            <data-info-panel
              :data="entity._node.properties"
              :featureType="entity._node._featureType"
              panel="popup"
            ></data-info-panel>

   
            <div class="entity-node-actions">
              <v-btn icon @click="graphNode(entity)"
                ><v-icon>scatter_plot</v-icon></v-btn
              >
              <v-btn icon @click="openNode(entity)"
                ><v-icon>info</v-icon></v-btn
              >
              <v-btn icon @click="deleteEntity()"
                ><v-icon>delete</v-icon></v-btn
              >
   

              <v-tooltip bottom v-if="entity._included">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon @click="excludeEntity()"
                    ><v-icon>remove</v-icon></v-btn
                  >
                </template>
                {{ $cs.Translate("UNLINK_ENTITY") }}
              </v-tooltip>
              <v-tooltip bottom v-else>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="includeEntity()"
                    ><v-icon>add</v-icon></v-btn
                  >
                </template>
                {{ $cs.Translate("LINK_ENTITY") }}
              </v-tooltip>
            </div>
          </div>
          <div v-else>
            <v-card-title>{{ entity.text }}</v-card-title>
            <v-card-subtitle>{{ entity.entity_class }}</v-card-subtitle>
            <span v-if="potentialTypes.length>0">Add new:<v-chip small outlined v-for="ft in potentialTypes" :key="ft.type" @click="createNewNode(ft)">{{ft.title}}</v-chip></span>
            <v-layout class="ma-3">
              <v-radio-group v-model="searchMode" class="add-node-mode">
                <v-radio label="Existing" value="KG"></v-radio>
                <v-radio label="New" value="new"></v-radio>
              </v-radio-group>

              <v-combobox
                v-if="searchMode === 'KG'"
                :items="Object.values(isrd.graph)"
                v-model="newEntityNode"
                item-text="_title"
                label="node"
                return-object
              ></v-combobox>
              <v-combobox
                v-model="newCategory"
                :items="Object.values(isrd.featureTypes)"
                item-text="title"
                return-object
                v-if="searchMode === 'new'"
                label="category"
              ></v-combobox>
              <v-btn @click="createNode()" fab x-small class="mt-4 primary">
                <v-icon>add</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </template>
        <template v-else>
          no entity
        </template>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p></p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <!-- <v-tab value="entity"><v-icon>playlist_add_check</v-icon></v-tab>
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
        <v-icon>add</v-icon>
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
            :items="Object.values(isrd.graph)"
            v-model="newEntityNode"
            item-text="_title"
            label="node"
            return-object
          ></v-combobox>
          <v-combobox
            v-model="newCategory"
            :items="isrd.availableNodeTypes"
            item-text="_title"
            return-object
            v-if="searchMode=== 'new'"
            label="category"
          ></v-combobox>
          <v-combobox
            v-if="searchMode === 'online'"
            :items="Object.values(isrd.graph)"
            v-model="searchOnline"
            item-text="_title"
            label="node"
            return-object
          ></v-combobox>

          <v-btn @click="linkNode()" fab x-small class="mt-4 primary">
            <v-icon>add</v-icon>
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
        <v-icon>note_add</v-icon>
      </v-btn>
      <v-btn icon large  @click="searchNode = true; addNote = false">
        <v-icon>playlist_add</v-icon>
      </v-btn>
      </v-layout>
      <v-container v-if="addNote">
        <h2>indicator</h2>
        <v-combobox
            v-model="newNoteSource"
            :items="isrd.getClassElements('source', true)"
            item-text="_title"
            return-object            
            label="source"
          ></v-combobox>
          <v-combobox
            v-model="newNoteEEI"
            :items="isrd.getClassElements('eei', true)"
            item-text="_title"
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
            :items="Object.values(isrd.graph)"
            v-model="newEntityNode"
            item-text="_title"
            label="node"
            return-object
          ></v-combobox>
          <v-combobox
            v-model="newCategory"
            :items="isrd.availableNodeTypes"
            item-text="_title"
            return-object
            v-if="searchMode=== 'new'"
            label="category"
          ></v-combobox>
          <v-combobox
            v-if="searchMode === 'online'"
            :items="Object.values(isrd.graph)"
            v-model="searchOnline"
            item-text="_title"
            label="node"
            return-object
          ></v-combobox>

          <v-btn @click="createNode()" fab x-small class="mt-4 primary">
            <v-icon>add</v-icon>
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

.add-node-mode {
  margin-right: 10px;
}

.entity-node {
  min-height: 150px;
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
import { GraphElement } from "@csnext/cs-data";
import { TextEntity } from "@csnext/cs-data";
import { DocDatasource } from "../../datasources/doc-datasource";
import { GraphDocument } from "../../classes/document/graph-document";
import { guidGenerator } from "@csnext/cs-core";
import { DataInfoPanel } from "@csnext/cs-map";
import { FeatureType } from "@csnext/cs-data";

@Component({
  components: { DataInfoPanel },
})
export default class SelectionPopup extends WidgetBase {
  @Prop()
  public editor: any;

  @Prop()
  public entity?: TextEntity;

  @Prop()
  public text?: any;

  @Prop()
  public isrd?: DocDatasource;

  @Prop()
  public document?: GraphDocument;

  public tab = "observation";

  public searchNode = false;

  public potentialTypes: FeatureType[] = [];

  public addNote = false;

  public searchOnline = { _title: "" };

  public searchMode = "KG";

  @Prop()
  public from?: number;
  @Prop()
  public to?: number;

  public newCategory: FeatureType | null = null;

  public newNoteSource: GraphElement = { _title: "" };
  public newNoteEEI: GraphElement = { _title: "" };
  public newNoteUrl: string = "";

  public newEntityNode: GraphElement = { _title: "" };

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
    if (!this.isrd || !this.isrd.searchEntities || !this.document) {
      return;
    }

    this.isrd.searchEntities.push({
      entity: this.text,
      private: true,
      ent_class: "UNKNOWN",
      id: guidGenerator(),
      aka: [this.text],
    });
    // await this.isrd.callEntitySearch(this.document);
  }

  public async createNewNode(ft: FeatureType) {
    if (!this.entity) { return; }
    this.addEntityAsClass(this.entity, ft);    
  }

  public graphNode(entity: TextEntity) {
    if (!this.isrd || !entity._node) { return; }
    entity._node._included = true;
    this.isrd.triggerUpdateGraph();    
  }

  public async unlinkEntity() {
    if (!this.entity || !this.isrd || !this.document) {
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
    if (!this.isrd || !this.document || !this.entity) {
      return;
    }
    await this.isrd.linkEntityToDocument(this.entity, this.document);
    this.publishChanges();    
  }

  public async excludeEntity() {
    if (!this.isrd || !this.document || !this.entity) {
      return;
    }
    await this.isrd.removeEntityFromDocument(this.entity, this.document);
    this.publishChanges();
  }

  public async createNode() {
    if (!this.document || !this.isrd) {
      return;
    }
    if (!this.entity) {
      this.entity = {
        text: this.text,
        id: guidGenerator(),
        position_start: this.from,
        position_end: this.to,
      };
      this.document!.entities?.push(this.entity);
    }
    switch (this.searchMode) {
      case "KG":
        if (this.newEntityNode && this.isrd) {
          (this.entity.node_id = this.newEntityNode.id),
            (this.entity._node = this.newEntityNode);
          this.entity._node._included = true;
          if (!this.entity._node._alternatives) {
            this.entity._node._alternatives = [];
          }
          this.entity._node._alternatives?.push(this.entity.text!);
          await this.isrd.saveNode(this.entity._node);
          await this.isrd.linkEntityToDocument(this.entity, this.document);
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
    if (!this.document || !this.isrd) { return; }
    const node = {
      classId: category.type,
      id: guidGenerator(),            
      properties: {
        name: entity.text,
        description: entity.text,
      },
      _included: true,
    };
    entity._node = node;
    entity.node_id = node.id;
    this.isrd.addNode(node);
    await this.isrd.saveNode(node);
    this.isrd.updateNode(node);
    await this.isrd.linkEntityToDocument(entity, this.document);
    await this.isrd.parseEntities();
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
          this.isrd &&
          this.entity.text &&
          this.document
        ) {
          this.entity.node_id = this.newEntityNode.id;
          this.entity.id = this.newEntityNode.id;
          this.entity.class = this.newEntityNode.classId;
          this.entity._node = this.newEntityNode;
          this.entity._node._included = true;
          if (!this.document.entities?.includes(this.entity)) {
            this.document.entities?.push(this.entity);
          }
          if (!this.entity._node._alternatives) {
            this.entity._node._alternatives = [];
          }
          if (!this.entity._node._alternatives.includes(this.entity.text)) {
            this.entity._node._alternatives?.push(this.entity.text!);
            await this.isrd.saveNode(this.entity._node);
          }
          try {
            await this.isrd.linkEntityToDocument(this.entity, this.document);
            await this.isrd.saveDocument(this.document);
            console.log("document");
            console.log(this.document);
            this.publishChanges();
          } catch (e) {}
        }
        break;
      case "new":
        if (this.newCategory && this.isrd && this.isrd.activeDocument) {
          const node = {
            classId: this.newCategory.type,
            title: this.entity?.text ?? this.text,
            properties: {
              title: this.entity?.text ?? this.text,
            },
            _included: true,
          };
          this.isrd.addNode(node);
          this.entity._node = node;
          // this.openNode(this.entity);
          await this.isrd.saveNode(node);
          await this.isrd.linkEntityToDocument(
            this.entity,
            this.isrd.activeDocument
          );
          await this.isrd.saveDocument(this.isrd.activeDocument);
          this.publishChanges();
          this.$forceUpdate();
        }
        break;
    }
  }

  public openNode(entity: TextEntity) {
    if (entity._node && entity._node.id) {
      this.isrd!.selectElementId(entity._node.id, true);
    }
  }

  public publishChanges() {
    // this.isrd!.bus.publish("document-entities", "updated");
    if (!this.isrd?.activeDocument) { return; }    
    this.isrd.syncEntities(this.isrd.activeDocument, this.isrd.activeDocument.doc.content, true);
    this.$forceUpdate();
  }

  public async deleteEntity() {
    if (this.isrd && this.entity && this.document && this.document.entities) {
      this.document.entities = this.document.entities.filter(
        (e) => e !== this.entity
      );
      try {
        await this.isrd.removeEntityFromDocument(this.entity, this.document);
      } catch (e) {
        console.log(e);
      }
      this.isrd.saveDocument(this.document);
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
    if (this.isrd?.featureTypes && this.entity?.entity_class) {
      this.potentialTypes = Object.values(this.isrd.featureTypes).filter(
        (ft) =>
          ft.attributes &&
          ft.attributes.hasOwnProperty("nlp:entity_class") &&
          ft.attributes["nlp:entity_class"] === this.entity?.entity_class
      );
      if (this.potentialTypes && this.potentialTypes.length > 0) {
        this.newCategory = this.potentialTypes[0];
      } else {
        this.newCategory = Object.values(this.isrd.featureTypes)[0];
      }
    }
  }

  mounted() {    
    this.updatePotentialTypes();
  }
}
</script>
