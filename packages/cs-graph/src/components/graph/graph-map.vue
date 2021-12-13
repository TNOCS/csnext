<template>
  <div v-if="source" style="height: 100%">
    <div :id="'mapbox-' + widget.id" style="width: 100%; height: 100%"></div>
    <!-- <div class="elements-list"></div> -->
    <!-- <v-checkbox v-model="filterToggle" @click="initLayers()" class="map-actions" label="toggle"></v-checkbox> -->
  </div>
</template>

<style scoped>
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
import { WidgetBase } from '@csnext/cs-client';
import { ITool, DefaultElementCard, DocDatasource } from '../..';
import mapboxgl, { MapboxOptions, GeoJSONSource, GeoJSONSourceRaw } from 'mapbox-gl';
import { ILayerStyle, MapboxStyleDefinition, MapboxStyleSwitcherControl, MapOptions } from '@csnext/cs-map';
import { GraphMapOptions } from './graph-map-options';
import Vue from 'vue';
import { FilterGraphElement } from '@csnext/cs-data';

@Component({
  components: {}
})
export default class GraphMap extends WidgetBase {
  public map: mapboxgl.Map | null = null;
  public styles: MapboxStyleDefinition[] = MapboxStyleSwitcherControl.DEFAULT_STYLES;
  public popup?: mapboxgl.Popup;
  public filterToggle: boolean | null = false;

  public get options(): GraphMapOptions {
    if (this.widget && this.widget.options) {
      return this.widget.options as MapOptions;
    }
    return new MapOptions();
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

  constructor() {
    super();
  }

  public destroyed() {
    if (this.map) {
      this.map.remove();
    }
  }

  private getStyleUri(styleId: string): string {
    const style = this.styles.find((s) => s.id === styleId);
    if (style) {
      return style.uri;
    }
    return '';
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
        container: 'mapbox-' + this.widget.id,
        style: this.getStyleUri(this.options.style),
        center: [5.753699, 53.450862],
        zoom: 10
      },
      ...this.options.mbOptions,
      ...this.getRouteOptions()
    };

    // init map
    this.map = new mapboxgl.Map(this.options.mbOptions as any);
    this.map.on('load', (e) => {
      this.initLayers();
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

  public initLayer(featureTypeId: string) {
    if (!this.source || !this.map) {
      return;
    }
    const featureType = this.source.findObservation(featureTypeId);

    if (featureType) {
      if (featureType.style) {
        const style = featureType.style as ILayerStyle;
        // create source
        const features: any[] = [];
        if (style) {
          for (const element of this.source.getClassElements(featureTypeId)) {
            if (this.filter?.properties?._visibleNodes) {
              let fall = this.filter._visibleNodes.filter(
                (e) => e._outgoing && e._outgoing.findIndex((o) => o.toId === element.id) !== -1
              );
              if (fall.length > 0) {
                let sum = 0;
                fall.map((i) => i.properties?.count).forEach((i) => (sum += i));
                let color = Math.max(0, Math.min(sum / 100, 7)).toString();
                console.log(color);
                switch (style.type) {
                  case 'circle':
                    if (element.properties?.lat && element.properties.lon) {
                      features.push({
                        type: 'Feature',
                        properties: {
                          id: element.id,
                          color: color
                        },
                        geometry: {
                          type: 'Point',
                          coordinates: [element.properties.lon, element.properties.lat],
                          sum
                        }
                      });
                    }
                    break;
                }
              }
            }
          }
          const geojson = { type: 'FeatureCollection', features };
          let source = this.map.getSource(featureTypeId) as GeoJSONSource | GeoJSONSourceRaw;
          if (source) {
            (source as GeoJSONSource).setData(geojson as any);
          } else {
            source = { type: 'geojson', data: geojson } as GeoJSONSourceRaw;
            this.map.addSource(featureTypeId, source);
            const paint = {
              ...{
                'circle-radius': 15,
                'circle-color': featureType.color ?? '#eb4034'
              },
              ...(style as any).mapbox.circlePaint
            };
            paint['circle-radius'] = {
              base: 10.75,
              stops: [
                [12, 20],
                [22, 180]
              ]
            };
            paint['circle-color'] = [
              'match',
              ['get', 'color'],
              '0',
              '#fff7fb',
              '1',
              '#ece7f2',
              '2',
              '#a6bddb',
              '3',
              '#74a9cf',
              '4',
              '#3690c0',
              '5',
              '#0570b0',
              '6',
              '#045a8d',
              '7',
              '#023858',
              /* other */ '#ccc'
            ];
            const layerId = featureTypeId;
            const layer = {
              id: layerId,
              type: style.type as any,
              source: featureTypeId,
              paint: paint
            };

            // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
            this.map.on('mouseenter', layerId, (e) => {
              this.map!.getCanvas().style.cursor = 'pointer';
              if (this.popup) {
                this.popup.remove();
              }
              if (e.features && e.features?.length > 0) {
                const id = e.features[0].properties?.id;
                const feature = e.features[0];
                console.log(feature);

                if (this.source && this.map && this.source.graph.hasOwnProperty(id)) {
                  const app = new DefaultElementCard();
                  (app as any).source = this.source;
                  (app as any).element = this.source.graph[id];

                  let popupContainer = document.createElement('span');
                  app.$mount(popupContainer);
                  this.popup = new mapboxgl.Popup({ closeOnClick: false })
                    .setLngLat(e.lngLat)
                    .setDOMContent(app.$el)
                    .addTo(this.map);
                }
              }

              // this.popup = new mapboxgl.Popup({ closeOnClick: false })
              //   .setLngLat(e.lngLat)
              //   .setHTML('<h1>Hello World!</h1>')
              //   .addTo(this.map);
            });

            // Change it back to a pointer when it leaves.
            this.map.on('mouseleave', layerId, () => {
              this.map!.getCanvas().style.cursor = '';
              if (this.popup) {
                this.popup.remove();
              }
            });

            this.map.addLayer(layer);

            this.map.on('click', layerId, (e: mapboxgl.MapLayerMouseEvent) => {
              if (this.map && source && e.features && e.features.length > 0) {
                const feature = e.features[0];
                this.map.flyTo({
                  center: (feature.geometry as any).coordinates
                });
                this.source!.selectElementId(feature.properties!.id!, true);
              }
            });
          }
        }
      }
    }
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
      }
    } as ITool);
  }

  public beforeDestroy() {
    if (this.source) {
      this.source.removeWidgetTools(this.widget.id!);
    }

    if (this.map) {
      this.map.remove();
    }
  }

  public initLayers() {
    if (this.source && this.options.filter) {
      const filter = this.source.getGraphPreset(this.options.filter);

      // find all layers
      if (!filter?.properties?.layers) {
        return;
      }
      for (const layer of filter.properties.layers) {
        this.initLayer(layer);
      }

      console.log(filter);
    }
  }

  public filter?: FilterGraphElement;

  public contentLoaded() {
    if (!this.source || !this.options.filter) {
      return;
    }
    this.initTools();
    this.filter = this.source.getGraphPreset(this.options.filter);
    if (this.source?.events) {
      this.busManager.subscribe(
        this.source.events,
        FilterGraphElement.GRAPH_FILTER,
        (a: string, f: FilterGraphElement) => {
          this.filter = f;
          this.initLayers();
        }
      );
    }

    Vue.nextTick(() => {
      this.initMap();
    });

    // this.initLayers();
  }

  public mounted() {
    setTimeout(() => {
      if (this.source) {
        this.initMap();
        this.initTools();
        // this.initLayers();
      }
      // this.initMap();
    }, 100);
  }
}
</script>
