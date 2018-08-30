import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './map.css';
import mapboxgl from 'mapbox-gl';
import { MapOptions } from './map-options';

@Component({
    template: require('./map.html')
})
export class Map extends Vue {
    /** access the original widget from configuration */

    @Prop()
    public widget!: IWidget;
    public map!: any;

    public get options(): MapOptions {
        if (this.widget && this.widget.options) {
            return this.widget.options as MapOptions;
        }
        return new MapOptions();
    }

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    created() {
        console.log(this);

        Vue.nextTick(() => {
            if (this.options.token) {
                mapboxgl.accessToken = this.options.token;
            }

            if (!this.options.mbOptions) this.options.mbOptions = {};
            this.options.mbOptions = {
                ...{
                    container: 'mapbox-' + this.widget.id,
                    style: 'mapbox://styles/mapbox/basic-v9',
                    center: [5.753699, 53.450862],
                    zoom: 10
                },
                ...this.options.mbOptions
            };

            
            this.map = new mapboxgl.Map(this.options.mbOptions);
            
            var nav = new mapboxgl.NavigationControl();
            this.map.addControl(nav, 'top-left');

            if (this.widget.events) {
                this.widget.events.subscribe('resize', (a: string, data: any) => {                    
                    this.map.resize();
                });
            }

            // this.map.addLayer('ameland');

            this.map.on('mousedown', (e: any) => {
                // var features = this.map.queryRenderedFeatures(e.point, {
                //   layers: ['venues']
                // });
                // if (features.length > 0) {
                //   let fid = features[0].properties.ID.toString();
                // }
            });
        });
    }
}
