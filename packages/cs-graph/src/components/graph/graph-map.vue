<template>
  <div style="height: 100%" id="map-container">
    <v-toolbar v-if="source && widget && activePreset" flat class="graph-menu">
      <v-layout id="dropdown-example-2" class="graph-toolbar-menu">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed fab icon outlined v-bind="attrs" v-on="on" raised>
              <v-icon v-if="activePreset.properties.editor_mode === 'EDIT'">mdi-pencil</v-icon>
              <v-icon v-if="activePreset.properties.editor_mode === 'VIEW'">mdi-eye</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="setEditorMode('EDIT')">
              <v-icon>mdi-pencil</v-icon>
              <v-list-item-title>Edit Mode</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setEditorMode('VIEW')">
              <v-icon>mdi-eye</v-icon>
              <v-list-item-title>View Mode</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <v-text-field
            filled
            rounded
      
            dense
            class="graph-search"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field> -->
        <div v-if="activePreset && activePreset._stats" class="map-drag-types-container">
          <draggable
            v-model="activePreset._stats"
            :options="availableItems"
            :sort="false"  
          >
            <v-chip
              @click="toggleFeatureType(id)"
              v-for="(stat, id) of activePreset._stats"
              :key="id"
              label
              :data-classId="stat._featureType.type"
              :data-source="map"
              :color="stat.color"
              class="ml-2 map-drag-type"
              :outlined="stat.hide"
            >
              <v-icon v-if="stat.pinned" left>mdi-pin-outline</v-icon>
              <v-icon v-if="stat._featureType.icon">{{ stat._featureType.icon }}</v-icon>
              {{ stat._featureType.title }}
              <v-avatar right dark class="darken-4">
                {{ stat.locations }}
              </v-avatar>
            </v-chip>
          </draggable>
        </div>
        <v-spacer></v-spacer>
        <v-btn text>
          <v-icon>mdi-selection</v-icon>
          <span v-if="activePreset._selectedElements && activePreset._selectedElements.length > 0">{{ activePreset._selectedElements.length }}</span>
        </v-btn>
        <v-btn @click="fitMap()" icon>
          <v-icon>mdi-fit-to-screen</v-icon>
        </v-btn>
        <v-btn v-if="activePreset.elementsEnabled" @click="emptyGraph()" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn @click="openSettings()" icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn @click="save()" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>

        <v-btn @click="refresh()" icon>
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <!-- <v-btn @click="openEditor()" icon>
          <v-icon>mdi-format-list-bulleted-type</v-icon>
        </v-btn> -->
        <!-- <v-overflow-btn      
      :items="featureTypes"
      label="Overflow Btn w/ segmented"
      segmented
      target="#dropdown-example-2"
    ></v-overflow-btn> -->

        <!-- <v-text-field
            label="Outlined"
            placeholder="Placeholder"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
          ></v-text-field> -->
        <!-- <span v-if="activePreset">{{ activePreset.id }} - </span> -->
      </v-layout>
    </v-toolbar>
    <draggable
      @add="onDrop"
      :sort="false"
      :options="dropItems"
      id="mapbox-map"
      ref="map-container"
      class="mapbox-map landing-area"
      style="width: 100%; height: 100%"
    >
      <!-- <div style="width: 100%; height: 100%"></div> -->
    </draggable>
    <v-menu v-model="showMenu" :position-x="menux" :position-y="menuy" absolute :close-on-content-click="false" open-on-hover offset-y>
      <v-list>
        <v-list-group v-for="(item, i) in contextMenuitems" :key="i" v-model="item.active" :prepend-icon="item.icon" no-action @click="item.action">
          <template v-slot:appendIcon>
            <span v-if="item.items && item.items.length > 0">{{ item.items.length }}</span>
            <span v-else></span>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <!-- <v-list-item v-if="item.items" v-for="(subItem, si) in item.items" :key="si" :prepend-icon="subItem.icon" @click="subItem.action">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-group>
      </v-list>
    </v-menu>

    <!-- <div v-if="lastPos" class="position-info">{{lastPos.lat}} - {{lastPos.lng}}</div> -->
    <!-- <div class="elements-list"></div> -->
    <!-- <v-checkbox v-model="filterToggle" @click="initLayers()" class="map-actions" label="toggle"></v-checkbox> -->
  </div>
</template>

<style scoped>
.map-container {
}

.mapbox-map {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 64px;
}

.position-info {
  position: absolute;
  top: 70px;
  left: 16px;
  padding: 10px;
  background: white;
  width: 200px;
  z-index: 1000;
}

.map-drag-type {
  cursor: crosshair;
}

.graph-menu {
  position: absolute;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: gray;

  left: 0;
  right: 0;
  top: 0;
}

.elements-list {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background: white;
}

.map-actions {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { AppState, WidgetBase } from '@csnext/cs-client';
import mapboxgl, { MapboxOptions, GeoJSONSource, GeoJSONSourceRaw, SymbolLayer, LngLat } from 'mapbox-gl';
import { ILayerStyle, MapboxStyleDefinition, MapboxStyleSwitcherControl, MapOptions } from '@csnext/cs-map';
// import { GraphMapOptions, GraphSettings, ITool, DefaultElementCard, DocDatasource } from '@csnext/cs-graph';
// import interact from 'interactjs';
import GraphSettings from './graph-settings.vue';
import { ITool, DefaultElementCard, DocDatasource, GraphMapOptions } from '../..';

import Vue from 'vue';
import { FilterGraphElement, GraphDatasource, GraphElement, GraphPreset, IGraphFilter } from '@csnext/cs-data';
import { guidGenerator } from '@csnext/cs-core';
// import ElementEditor from './element-editor.vue';
import draggable from 'vuedraggable';

@Component({
  components: {
    draggable,
  },
})
export default class GraphMap extends WidgetBase {
  public map: mapboxgl.Map | null = null;
  public styles: MapboxStyleDefinition[] = MapboxStyleSwitcherControl.DEFAULT_STYLES;
  public popup?: mapboxgl.Popup;
  public activePreset?: FilterGraphElement | null = null;
  public filterToggle: boolean | null = false;
  public dragInitialized: boolean = false;
  private isMounted: boolean = false;
  private lastPos?: LngLat | null = null;
  private showMenu: boolean = false;
  private menux = 200;
  public contextMenuitems: any[] = [];
  private menuy = 200;
  private activeElement?: GraphElement;

  public get options(): GraphMapOptions {
    if (this.widget && this.widget.options) {
      return this.widget.options as MapOptions;
    }
    return new MapOptions();
  }

  public dropItems = {
    group: 'items',
  };

  public availableItems = {
    group: {
      name: 'items',
      pull: 'clone',
      put: false,
    },
    sort: false,
  };

  public save() {
    if (this.source && this.activePreset) {
      this.source.saveNode(this.activePreset);
    }
  }


  public set options(options: MapOptions) {
    if (this.widget) {
      this.widget.options = options;
    }
  }

  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public async onDrop(e: any, d: any, s: any) {
    if (!this.map || !this.source) {
      return;
    }
    console.log(e);
    const originalEvent = e.originalEvent;
    const clientPos = { x: originalEvent.clientX, y: originalEvent.clientY };
    const viewportOffset = this.map.getCanvasContainer().getBoundingClientRect();
    const classId = e.item?.dataset?.classid;
    if (!classId || !clientPos || !viewportOffset) { return; }
    let po = this.map.unproject([clientPos.x - viewportOffset.left, clientPos.y - viewportOffset.top]);
    console.log(po, clientPos, viewportOffset);
    const newNode = await this.source.addNewNode({
      id: `${classId}-${guidGenerator()}`,
      properties: { name: `new ${classId}`, lat: po.lng, lon: po.lat },
      classId,
    });
    this.refresh();
  }


  constructor() {
    super();
  }

  public destroyed() {
    if (this.map) {
      this.map.remove();
    }
  }

  public setEditorMode(mode: string) {
    if (this.activePreset?.properties) {
      Vue.set(this.activePreset!.properties!, 'editor_mode', mode);
    }
  }

  public fitMap() {
    if (this.map) {
      // this.map
    }
  }

  public toggleFeatureType(id: string) {
    if (!this.activePreset?._stats || !this.source?.graph) {
      return;
    }
    if (this.activePreset._stats.hasOwnProperty(id)) {
      this.activePreset._stats[id].hide = !this.activePreset._stats[id].hide;
      this.initLayers();
      this.$forceUpdate();
    }
  }

  public openSettings() {
    $cs.openRightSidebarWidget(
      {
        component: GraphSettings,
        datasource: this.source!.id,
        data: {
          preset: this.activePreset?.id,
        },
        options: {
          title: 'Settings',
        },
      },
      { open: true },
      'graphsettings'
    );
  }

  private getStyleUri(styleId: string): string {
    const style = this.styles.find((s) => s.id === styleId);
    if (style) {
      return style.uri;
    }
    return '';
  }

  public initPreset() {
    if (!this.source || !this.options) {
      return;
    }

    if (!this.options?.preset && this.source.activeDocument) {
      this.options.preset = this.source.activeDocument as unknown as GraphPreset;
    }

    if (!this.options.preset) {
      return;
    }

    if (typeof this.options.preset === 'string') {
      this.activePreset = this.source.getGraphPreset(this.options.preset);
      if (!this.activePreset) {
        this.activePreset = new GraphPreset(this.source);
        this.activePreset.id = this.options.preset;
      }
    } else {
      this.activePreset = {
        ...new GraphPreset(this.source),
        ...this.options.preset,
      };
    }

    if (this.activePreset && !this.activePreset._stats) {
      this.activePreset._stats = {};
    }
  }

  private getRouteOptions(): mapboxgl.MapboxOptions {
    const options = {} as MapboxOptions;
    const q = this.$route.query;
    if (q.hasOwnProperty('lat') && q.hasOwnProperty('lng')) {
      const lng = parseFloat(q.lng as string);
      const lat = parseFloat(q.lat as string);
      options.center = [lng, lat];
    }
    if (q.hasOwnProperty('z')) {
      options.zoom = parseFloat(q.z as string);
    }
    if (q.hasOwnProperty('style')) {
      const styleId = q.style as string;
      this.options.style = styleId;
      options.style = this.getStyleUri(styleId);
    }
    return options;
  }

  private initStyles() {
    if (!this.widget || !this.widget.options || !this.widget.options) return;
    const opts = this.widget.options as MapOptions;
    if (opts.styleList && opts.styleList.length > 0) {
      Vue.set(this, 'styles', opts.styleList);
      console.log(`Set styles: ${JSON.stringify(opts.styleList)}`);
    }
  }

  public initMap() {
    if (this.map !== null) {
      return;
    }
    if (this.options.token) {
      mapboxgl.accessToken = this.options.token;
    }

    if (!this.options.style) {
      this.options.style = this.styles[0].id;
    }

    // if (!this.options.mbOptions) this.options.mbOptions = {};
    this.options.mbOptions = {
      ...{
        container: 'mapbox-map', // + this.widget.id,
        style: this.getStyleUri(this.options.style),
        center: [5.753699, 53.450862],
        zoom: 10,
        localIdeographFontFamily: 'Material Design Icons',
      },
      ...this.options.mbOptions,
      ...this.getRouteOptions(),
    };

    // init map
    this.map = new mapboxgl.Map(this.options.mbOptions as any);
    this.map.on('load', (e) => {
      this.initLayers();
    });

    this.map.on('mousemove', (e) => {
      this.lastPos = e.lngLat;
      // console.log(this.lastPos);
    });

    this.map.on('contextmenu', (e) => {
      console.log(e);
      var mapRect = this.map!.getCanvasContainer().getBoundingClientRect();
      this.showMenu = true;
      this.menux = e.point.x + mapRect.left;
      this.menuy = e.point.y + mapRect.top;
      const el = this.activeElement;

      this.contextMenuitems = [];
      if (this.activeElement) {
        this.contextMenuitems.push({
          title: 'delete',
          icon: 'mdi-delete',
          action: async () => {
            if (this.source && el?.id) {
              await this.source.removeNode(el, true);
              this.refresh();
              this.showMenu = false;
            }
          },
        });
        this.contextMenuitems.push({
          title: 'details',
          icon: 'mdi-information-outline',
          action: async () => {
            if (this.source && el?.id) {
              await this.source.selectElement(el, true);
            }
          },
        });
        this.contextMenuitems.push({
          title: 'edit',
          icon: 'mdi-pencil',
          action: async () => {
            if (this.source && el?.id) {
              // AppState.Instance.triggerDialog({
              //   widget: { component: ElementEditor, options: { class: 'element-editor' }, content: this.source, data: { element: el } },
              // });
              await this.source.startEditElement(el);
            }
          },
        });
      } else {
        this.contextMenuitems.push({
          title: 'create',
          icon: 'mdi-eye-off',
          action: () => {
            alert('create');
            // if (element && this.activePreset?.id) {
            //   this.source!.removeElementFromPreset(element, this.activePreset.id);
            // }
          },
        });
      }
    });

    this.map.on('moveend', (e) => {
      const bounds = this.map!.getBounds();
      if (this.filter?.properties && bounds) {
        this.filter.properties.geoFilter = bounds.toArray();
      }
      console.log('A moveend event occurred.');
    });

    this.initStyles();
  }

  public resize() {
    console.log('resized');
    if (this.map) {
      this.map.resize();
    }
  }

  public refresh() {
    if (!this.source || !this.activePreset) {
      return;
    }

    this.activePreset._visibleNodes = [];

    if (this.activePreset.properties?.graphLayout?.nodeRules) {
      this.source.applyGraphPresetRules(this.activePreset, this.activePreset.properties.graphLayout.nodeRules);
    }
    this.initLayers();

    this.$forceUpdate();
  }

  public initTools() {
    if (!this.source) {
      return;
    }
    this.source.addTool({
      id: 'location_lookup',
      title: 'Location lookup',
      widget: this.widget,
      // subtitle: 'Entity Recognition, Search, Linking, Geo/time recognition',
      image: 'images/entity_analysis.png',
      action: async () => {
        try {
          return Promise.resolve(true);
        } catch (e) {
          return Promise.resolve(false);
        }
      },
    } as ITool);
  }

  public beforeDestroy() {
    if (this.source) {
      this.source.removeWidgetTools(this.widget.id!);
    }

    if (this.map) {
      // this.map.remove();
    }
  }

  public initFeatureTypeLayer(featureTypeId: string) {
    if (!this.source || !this.map || !this.activePreset?._visibleNodes || !this.activePreset?._stats) {
      return;
    }
    console.log('init ' + featureTypeId);
    const featureType = this.source.findObservation(featureTypeId);

    if (featureType) {
      if (featureType.style) {
        const style = featureType.style as ILayerStyle;
        // create source
        const features: any[] = [];
        const stat = this.activePreset._stats[featureTypeId];

        if (style && stat) {
          let paint = {};
          stat.locations = 0;
          if (!stat.hide) {
            for (const element of this.activePreset._visibleNodes.filter((e) => e.classId === featureTypeId)) {
              // if (this.filter?.properties?._visibleNodes) {
              // let fall = this.filter._visibleNodes.filter(
              //   (e) => e._outgoing && e._outgoing.findIndex((o) => o.toId === element.id) !== -1
              // );
              // if (fall.length > 0) {
              let sum = 0;
              // fall.map((i) => i.properties?.count).forEach((i) => (sum += i));
              let color = Math.max(0, Math.min(sum / 100, 7)).toString();              
              switch (style.type) {
                case 'fill':
                  if (element.properties?.shape) {
                    stat.locations += 1;
                    const collection = element.properties.shape;
                    if (collection?.features && collection.features.length > 0) {
                      features.push({
                        type: 'Feature',
                        properties: {
                          id: element.id,
                          color: color,
                        },
                        geometry: collection.features[0].geometry,
                      });
                    }
                  }
                  paint = { ...{ 'fill-opacity': 0.5, 'fill-color': featureType.color }, ...(style as any).mapbox.fillPaint };
                  break;
                case 'circle':
                  if (element.properties?.lat && element.properties.lon) {
                    stat.locations += 1;
                    features.push({
                      type: 'Feature',
                      properties: {
                        id: element.id,
                        color: color,
                      },
                      geometry: {
                        type: 'Point',
                        coordinates: [element.properties.lat, element.properties.lon],
                        sum,
                      },
                    });
                  }
                  paint = {
                    ...{
                      'circle-radius': 15,
                      'circle-color': featureType.color ?? '#eb4034',
                    },
                    // ...(style as any).mapbox.circlePaint,
                  };
                  // paint['circle-radius'] = {
                  //   base: 10.75,
                  //   stops: [
                  //     [12, 20],
                  //     [22, 180],
                  //   ],
                  // };
                  // paint['circle-color'] = [
                  //   'match',
                  //   ['get', 'color'],
                  //   '0',
                  //   '#fff7fb',
                  //   '1',
                  //   '#ece7f2',
                  //   '2',
                  //   '#a6bddb',
                  //   '3',
                  //   '#74a9cf',
                  //   '4',
                  //   '#3690c0',
                  //   '5',
                  //   '#0570b0',
                  //   '6',
                  //   '#045a8d',
                  //   '7',
                  //   '#023858',
                  //   /* other */ '#ccc',
                  // ];
                  break;
              }
              // }
              // }
            }
          }

          const geojson = { type: 'FeatureCollection', features };
          let source = this.map.getSource(featureTypeId) as GeoJSONSource | GeoJSONSourceRaw;
          if (source) {
            (source as GeoJSONSource).setData(geojson as any);
          } else {
            source = { type: 'geojson', data: geojson } as GeoJSONSourceRaw;
            // this.map.removeLayer(featureTypeId);
            this.map.addSource(featureTypeId, source);

            const layerId = featureTypeId;
            const layer = {
              id: layerId,
              type: style.type as any,
              source: featureTypeId,
              paint: paint,
            };

            // const c = parseInt('\F03EB', 16);

            const symbolLayer = {
              id: layerId + '-symbol',
              type: 'symbol',
              source: featureTypeId,
              paint: {
                'text-color': '#FFFF00',
              },
              layout: {
                'text-line-height': 1, // this is to avoid any padding around the "icon"
                'text-padding': 0,
                'text-anchor': 'bottom', // change if needed, "bottom" is good for marker style icons like in my screenshot,
                'text-allow-overlap': true, // assuming you want this, you probably do
                'text-field': String.fromCodePoint(0xe592), //\F03EB   '\f073', // IMPORTANT SEE BELOW: -- this should be the unicode character you're trying to render as a string -- NOT the character code but the actual character,
                'icon-optional': true, // since we're not using an icon, only text.
                'text-font': ['Material Design Icons'], // see step 1 -- whatever the icon font name,
                'text-size': 18, // or whatever you want -- dont know if this can be data driven...
              },
            } as SymbolLayer;

            // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
            this.map.on('mouseenter', layerId, (e) => {
              this.map!.getCanvas().style.cursor = 'pointer';
              if (this.popup) {
                this.popup.remove();
              }
              if (e.features && e.features?.length > 0) {
                const id = e.features[0].properties?.id;
                const feature = e.features[0];

                if (this.source && this.map && this.source.graph.hasOwnProperty(id)) {
                  this.activeElement = this.source.graph[id];
                  const app = new DefaultElementCard();
                  (app as any).source = this.source;
                  (app as any).element = this.activeElement;

                  // let popupContainer = document.createElement('span');
                  // app.$mount(popupContainer);
                  // this.popup = new mapboxgl.Popup({ closeOnClick: false }).setLngLat(e.lngLat).setDOMContent(app.$el).addTo(this.map);
                }
              }

              //   this.popup = new mapboxgl.Popup({ closeOnClick: false })
              //     .setLngLat(e.lngLat)
              //     .setHTML('<h1>Hello World!</h1>')
              //     .addTo(this.map);
            });

            // Change it back to a pointer when it leaves.
            this.map.on('mouseleave', layerId, () => {
              this.activeElement = undefined;
              this.map!.getCanvas().style.cursor = '';
              if (this.popup) {
                this.popup.remove();
              }
            });

            this.map.addLayer(layer);
            // this.map.addLayer(symbolLayer);

            this.map.on('click', layerId, (e: mapboxgl.MapLayerMouseEvent) => {
              if (this.map && source && e.features && e.features.length > 0) {
                const feature = e.features[0];
                this.map.flyTo({
                  center: e.lngLat,
                });
                this.source!.selectElementId(feature.properties!.id!, false);
              }
            });
          }
        }
      }
    }
  }

  public initLayers() {
    if (!this.source || !this.activePreset?._stats) {
      return;
    }
    // this.activePreset._visibleNodes = [];
    for (const ft of Object.keys(this.activePreset._stats)) {
      this.initFeatureTypeLayer(ft);
    }
    // if (this.source && this.options.filter) {
    //   const filter = this.source.getGraphPreset(this.options.filter);

    //   // find all layers
    //   if (!filter?.properties?.layers) {
    //     return;
    //   }
    //   for (const layer of filter.properties.layers) {
    //     this.initLayer(layer);
    //   }

    //   console.log(filter);
    // }
  }

  public filter?: FilterGraphElement;

  initDragging() {
    if (this.dragInitialized) {
      return;
    }
    this.dragInitialized = true;
    const position = { x: 0, y: 0 };
  }

  // public initDragging2() {
  //     interact('#mapbox-map')
  //     .dropzone({
  //       ondrop: async (e) => {
  //         e.stopImmediatePropagation();
  //         let pos = { x: 100, y: 100 };
  //         if (e._interaction?.coords?.cur?.client && this.map) {
  //           // pos = this.graph!.getPointByClient(e._interaction.coords.cur.client.x, e._interaction.coords.cur.client.y);
  //           console.log(e._interaction?.coords?.cur?.client);
  //           // const p = e._interaction.coords.cur.client;

  //           const p = e._interaction.coords.cur.client;
  //           // const p = {x: event.dragEvent.rect.left, y: event.dragEvent.rect.top };

  //           var viewportOffset = this.map.getCanvasContainer().getBoundingClientRect();

  //           let posx = p.x - viewportOffset.left;
  //           let posy = p.y - viewportOffset.top;

  //           let po = this.map.unproject([posx, posy]);
  //           // if (this.lastPos) {

  //             // let po = this.lastPos;

  //            if (e.interaction?.element) {
  //               e.interaction.element.remove();
  //             }

  //           if (po && e.relatedTarget?.dataset?.id) {
  //             const type = e.relatedTarget?.dataset?.id;

  //             const ft = this.source.getFeatureTypeById(type);
  //             if (ft?.type) {
  //               const newNode = await this.source.addNewNode({
  //                 id: `${ft.type}-${guidGenerator()}`,
  //                 properties: { type, name: ft.title, lat: po.lng, lon: po.lat },
  //                 classId: type,
  //               });

  //               this.refresh();
  //               //   this.updateGraph(this.source!.graph);
  //               //   this.source.selectElement(newNode, this.options.openElementDetails)
  //               // }
  //             }

  //           // }
  //           console.log(po)
  //           }
  //           // console.log(this.map);

  //         }

  //         if (e.relatedTarget?.dataset?.elementid) {
  //           // find element
  //           const existingElement = this.source!.getElement(e.relatedTarget.dataset.elementid);
  //           // if (existingElement?.id && this.activePreset?.properties?.graphLayout?.nodes) {
  //           //   this.activePreset.properties.graphLayout.nodes[existingElement.id] = {
  //           //     x: pos.x,
  //           //     y: pos.y,
  //           //   };

  //           //   // this.addElement(existingElement);

  //           //   // this.updateGraph(this.source!.graph);
  //           // }
  //         }
  //         if (e.relatedTarget?.dataset?.id) {

  //           // if (type && this.graph && this.source) {

  //           //

  //           // this.graph.getCanvasByPoint()

  //           // if (newNode?.id && element.id && props?.relation?.type) {
  //           //   await this.source.addEdge({
  //           //     classId: props.relation.type,
  //           //     fromId: element.id,
  //           //     toId: newNode.id,
  //           //   } as GraphElement);

  //           // this.source.createKGView([newNode], this.activePreset.id, true);
  //           // }

  //           // alert(ft.title)
  //         }

  //         // console.log(e.draggable.featureType);
  //         // console.log();

  //         // console.log(e);
  //       },
  //     })
  //     .on('dropactivate', () => {
  //       // event.target.classList.add('drop-activated')
  //     });

  //   interact('.map-drag-type')
  //     .draggable({
  //       manualStart: true,
  //       listeners: {
  //         move(event) {
  //           // console.log(event)
  //           position.x += event.dx;
  //           position.y += event.dy;
  //           event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;

  //         },
  //       },
  //     })

  //     // This only gets called when we trigger it below using interact.start(...)
  //     .on('move', (event) => {
  //       const { currentTarget, interaction } = event;
  //       let element = currentTarget;

  //       // If we are dragging an item from the sidebar, its transform value will be ''
  //       // We need to clone it, and then start moving the clone
  //       if (interaction.pointerIsDown && !interaction.interacting() && currentTarget.style.transform === '') {
  //         element = currentTarget.cloneNode(true);

  //       const { offsetTop, offsetLeft } = currentTarget;
  //         // Add absolute positioning so that cloned object lives right on top of the original object
  //         element.style.position = 'absolute';
  //         element.style.left = 0; //offsetLeft;
  //         element.style.top = 0; //offsetTop;
  //         // event.interactable.featureType = 'testje';

  //         // Add the cloned object to the document
  //         const container = document.querySelector('#map-container');
  //         container && container.appendChild(element);

  //         position.x = offsetLeft;
  //         position.y = offsetTop;

  //         // If we are moving an already existing item, we need to make sure the position object has
  //         // the correct values before we start dragging it
  //       } else if (interaction.pointerIsDown && !interaction.interacting()) {
  //         const regex = /translate\(([\d]+)px, ([\d]+)px\)/i;
  //         const transform = regex.exec(currentTarget.style.transform);

  //         if (transform && transform.length > 1) {
  //           position.x = Number(transform[1]);
  //           position.y = Number(transform[2]);
  //         }
  //       }

  //       // Start the drag event
  //       interaction.start({ name: 'drag' }, event.interactable, element);
  //     });
  // }

  // }
  public contentLoaded() {
    if (!this.source || !this.isMounted) {
      return;
    }
    // Vue.nextTick(() => {
    this.initPreset();
    if (this.activePreset?.properties?.graphLayout?.nodeRules) {
      this.source.applyGraphPresetRules(this.activePreset, this.activePreset.properties.graphLayout.nodeRules);
    }

    this.initMap();

    this.initTools();
    this.initDragging();
    this.busManager.subscribe(this.source!.events, IGraphFilter.GRAPH_FILTER, () => {
      // this.activePreset._visibleNodes = [];
      // this.source.applyGraphPresetRules(this.activePreset, this.activePreset.properties.graphLayout.nodeRules);
      this.initLayers();
    });
    this.busManager.subscribe(this.source!.events, GraphDatasource.PRESET_EVENTS, (a: string, d: GraphPreset) => {
      if (!this.source?.graph) {
        return;
      }
      if (d.id === this.activePreset?.id) {
        if (a === GraphDatasource.PRESET_CHANGED) {
          this.activePreset = d;
          this.initLayers();
        }
        if (a === GraphDatasource.PRESET_LAYOUT_CHANGED) {
          // this.updateGraphLayout();
          this.initLayers();
          // this.graph.refresh();
        }
        if (a === GraphDatasource.PRESET_ACTIVATED) {
          this.initLayers();
        }
      }
    });
    // });
    // this.filter = this.source.getGraphPreset(this.options.filter);
    // if (this.source?.events) {
    //   this.busManager.subscribe(
    //     this.source.events,
    //     FilterGraphElement.GRAPH_FILTER,
    //     (a: string, f: FilterGraphElement) => {
    //       this.filter = f;
    //       this.initLayers();
    //     }
    //   );
    // }

    // });

    // this.initLayers();
  }

  public mounted() {
    this.isMounted = true;
    if (this.source) {
      this.contentLoaded();
    }

    // setTimeout(() => {
    //   if (this.source) {
    //     this.initMap();
    //     this.initTools();
    //     // this.initLayers();
    //   }
    //   // this.initMap();
    // }, 100);
  }
}
</script>
