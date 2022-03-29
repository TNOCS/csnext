<template>
  <v-card flat v-if="type" style="height: 100%">
    <v-toolbar color="cyan" dark flat>
      <v-toolbar-title>{{ type.title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="createInstance()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <!-- <v-btn icon @click="deleteNode()">
        <v-icon>mdi-delete</v-icon>
      </v-btn> -->

      <!-- 
      <v-btn v-else icon @click="saveNode()">
        <v-icon>save</v-icon>
      </v-btn>

      <v-btn icon @click="graphNode()">
        <v-icon>mdi-scatter-plot</v-icon>
      </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>note_mdi-plus</v-icon>
      </v-btn> -->

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="deleteAllInstances()">
            <v-list-item-title>Delete all instances</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs v-model="tab" class="elevation-2">
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#tab-editor">{{ $cs.Translate('EDITOR') }}</v-tab>
          <v-tab href="#tab-items">{{ $cs.Translate('ENTITIES') }}</v-tab>
          <v-tab href="#tab-template">{{ $cs.Translate('TEMPLATES') }}</v-tab>
          <!-- <v-tab href="#tab-instances">{{ $cs.Translate('INSTANCES') }}</v-tab> -->
          <!-- <v-tab href="#tab-documents">{{ $cs.Translate('DOCUMENTS') }}</v-tab> -->
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab" class="full-height">
      <v-tab-item value="tab-editor">
        <simplebar style="height: 65em">
          <cs-form
            :data="type"
            :formdef="formDef"
            class="pt-2 pa-3"
            style="padding-bottom: 300px; height: 100%"
            id="detailcsform"
            @saved="updateFeatureType"
          ></cs-form>
        </simplebar>
      </v-tab-item>
      <v-tab-item value="tab-items">
        <simplebar style="background: red !important; height: 100%">
          <cs-widget :widget="elementsWidget" style="height: calc(100em - 465px)"></cs-widget>
        </simplebar>
      </v-tab-item>
      <v-tab-item value="tab-template">
        <simplebar style="height: 100%">
          <h2>Keywords</h2>
          <v-combobox multiple small-chips v-model="type.attributes.keywords"></v-combobox>

          <h2>Relations</h2>

          <div v-for="prop in type.properties" :key="prop.key">
            <h3>{{ prop.key }}</h3>

            <div v-if="prop.attributes && prop.attributes.keywords">
              <v-combobox multiple small-chips v-model="prop.attributes.keywords"></v-combobox>
            </div>
          </div>
        </simplebar>
      </v-tab-item>
    </v-tabs-items>

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
  </v-card>
</template>

<style>
.element-info-facts {
  margin: 14px;
}
.ei-link {
  /* cursor: pointer; */
}

.model-elements-widget {
  height: calc(100em -200px);
  background: blue;
}

.link-avatar {
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { DocDatasource } from '../../datasources/doc-datasource';
import simplebar from 'simplebar-vue';
import { SearchEntity } from '../../classes/document/search-entity';
import { FeatureType, PropertyType, PropertyValueType } from '@csnext/cs-data';
import { GraphElements, DataGridOptions, ElementDataGrid, GridView } from '../..';
import { IFormObject, IWidget } from '@csnext/cs-core';

@Component({
  components: { simplebar, GraphElements },
})
export default class FeatureTypeEditor extends WidgetBase {
  public elementsWidget: IWidget = {
    component: ElementDataGrid,
    datasource: this.widget.datasource,
    options: {
      askForName: true,
      defaultView: GridView.list,
      canAdd: true,
      canDelete: true,
      canGraph: true,
      baseType: this.type?.type,
      canEdit: true,
    } as DataGridOptions,
  };

  public tab = '';

  public search = '';
  public headers = [
    { text: 'title', value: 'title', groupable: false },
    { text: 'Actions', value: 'actions', groupable: false, sortable: false },
  ];

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public async deleteAllInstances() {
    if (this.type?.type && this.source) {
      if ((await $cs.triggerYesNoQuestionDialog('REMOVE_ELEMENTS', 'REMOVE_ALL_INSTANCES_OF_TYPE')) === 'YES') {
        this.source!.removeNodeByType(this.type!.type!);
      }
    }
  }

  public get type(): FeatureType | undefined {
    return this.widget.data.type._originalFeatureType;
  }

  public propertyForm = { ...(new PropertyType() as any)._form };

  public createInstance() {
    if (this.type && this.source) {
      this.source
        ?.addNewNode({ classId: this.type.type })
        .then((e) => {
          this.source?.startEditElement(e);
        })
        .catch((e) => {
          alert('error creating entity');
        });
    }
  }

  public get formDef(): IFormObject {
    return {
      hideTitle: true,
      isPanel: false,

      fields: [
        {
          title: 'TYPE',
          _key: 'type',
          type: 'string',
          icon: 'mdi-bulletin-board',
          readonly: true,
        },
        {
          title: 'IS EDGE',
          _key: 'isEdge',
          icon: 'mdi-arrow-bottom-right-thick',
          type: 'boolean',
        },
        {
          title: 'TITLE',
          _key: 'title',
          type: 'string',

          hint: 'title',
        },
        {
          title: 'ICON',
          _key: 'icon',
          type: 'string',
          icon: 'mdi-image'
        },
        {
          title: 'ICON_PROPERTY',
          _key: 'iconProperty',
          type: 'string',
          // options: () => {
          //   return this.type?.properties ? this.type.properties.filter(pt => pt.type === 'image').map(pt => pt.key) : [];
          // },
        },
        {
          title: 'BASE_URI',
          _key: 'baseUri',
          type: 'string',
          
        },
        {
          title: 'BASETYPES',
          _key: 'baseType',
          type: 'chips',
          options: () => {
            return this.source?.featureTypes ? Object.keys(this.source.featureTypes) : [];
          },
        },
        {
          title: 'PROPERTIES',
          _key: 'properties',
          canAdd: true,
          canDelete: true,
          arrayFieldType: 'object',
          arrayFilter: (v: PropertyType[]) => {
            return v.filter((pt) => pt._originalType === undefined || pt._originalType === this.type?.type);
          },
          newItem: () => {
            return new PropertyType();
          },
          keyValuesType: PropertyType,
          type: 'array',
          arrayType2: this.propertyForm,
          arrayType: {
            showToolbar: false,
            hideTitle: true,
            isPanel: false,
            canAdd: true,
            canDelete: true,
            fields: [
              {
                title: 'key',
                _key: 'key',
                type: 'string',
                group: 'label',
              },
              {
                title: 'label',
                _key: 'label',
                type: 'string',
                group: 'label',
              },
              {
                title: 'type',
                _key: 'type',
                type: 'selection',
                group: 'label',
                optional: false,
                options: () => {
                  return Object.keys(PropertyValueType);
                }, // [ 'string', 'number', 'boolean', 'url', 'date', 'relation']
              },
              {
                title: 'min',
                _key: 'min',
                type: 'number',
                group: 'number',
                optional: false,
                requirements: PropertyType.isNumber,
              },
              {
                title: 'max',
                _key: 'max',
                type: 'number',
                group: 'number',
                optional: false,
                requirements: PropertyType.isNumber,
              },
              {
                title: 'unit',
                _key: 'unit',
                type: 'string',
                group: 'number',
                optional: false,
                requirements: PropertyType.isNumber,
              },
              {
                title: 'url template',
                _key: 'urlTemplate',
                type: 'string',
                group: 'url',
                optional: false,
                requirements: PropertyType.isUrl,
              },
              {
                title: 'required',
                _key: 'required',
                type: 'boolean',
                group: 'label',
                optional: false,
              },
              {
                requirements: PropertyType.isRelation,
                title: 'RELATION',
                _key: 'relation',
                type: 'object',
                form: {
                  hideTitle: true,
                  isPanel: true,
                  fields: [
                    {
                      _key: 'type',
                      type: 'string',
                      title: 'type',
                      group: 'relation-def',
                    },
                    {
                      _key: 'objectType',
                      type: 'selection',
                      title: 'object type',
                      group: 'relation-def',
                      options: () => {
                        return this.source?.featureTypes ? Object.keys(this.source.featureTypes) : [];
                      },
                    },
                    {
                      _key: 'multiple',
                      type: 'boolean',
                      title: 'multiple',
                      group: 'relation-def',
                    },
                  ],
                },
              },
              {
                // requirements: PropertyType.isOptions,
                title: 'OPTIONS',
                _key: 'options',
                requirements: PropertyType.isOptions,
                // canAdd: true,
                // canDelete: true,
                newItem: () => {
                  return '';
                },
                arrayFieldType: 'string',
                type: 'chips',
              },
              {
                // requirements: PropertyType.isOptions,
                title: 'LIST',
                _key: 'optionsList',
                requirements: PropertyType.isListItem,
                // canAdd: true,
                // canDelete: true,
                // newItem: ()=> { return ''; },
                type: 'selection',
              },
            ],
          },
        },
        {
          showToolbar: false,
          hideTitle: true,
          isPanel: false,
          title: 'ATTRIBUTES',
          _key: 'attributes',
          canEditKey: true,
          keyValuesType: String,
          type: 'keysobject',
        },
      ],
    } as IFormObject;
  }

  public updateFeatureType() {
    if (!this.source || !this.widget.data.type) {
      return;
    }
    this.source.saveFeatureType(this.widget.data.type);
  }

  public addEntity() {
    const newEntity = {
      id: 'new entity',
      entity: 'new entity',
      ent_class: '',
      aka: [],
    };
    this.source?.searchEntities?.push(newEntity);
    this.source?.openEntityEditor(newEntity);
  }

  public editEntity(entity: SearchEntity) {
    console.log(entity);
    this.source?.openEntityEditor(entity);
  }

  public deleteEntity(entity: SearchEntity) {
    alert('delete');
  }

  constructor() {
    super();
  }

  public contentLoaded() {
    this.$forceUpdate();
    if (this.type) {
      this.elementsWidget.data.nodeFilters = this.type.type;
    }
  }

  mounted() {
    console.log(' value types');
    // console.log(Object.keys(PropertyValueType));
  }
}
</script>
