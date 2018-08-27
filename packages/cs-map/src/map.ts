import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './map.css';
import mapboxgl from 'mapbox-gl';

@Component({
    template: require('./map.html'),    
    
})
export class Map extends Vue {
    /** access the original widget from configuration */    
    @Prop()
    public widget!: IWidget;
    public map!: any;

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    created() {
        console.log(this);
        
        Vue.nextTick(() => {
          
            mapboxgl.accessToken =
              'pk.eyJ1IjoiZGFteWxlbiIsImEiOiJfdUUzLVhNIn0.7-Ogdnc6voJfUXOMBE1VPA';
            this.map = new mapboxgl.Map({
              container: 'mapbox-' + this.widget.id,
              center: [5.753699, 53.450862], // ToDo: this should be configured with the event.
              zoom: 10,
              style: 'mapbox://styles/mapbox/light-v9',
              // style: 'style.json',
              hash: false
            });
    
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
