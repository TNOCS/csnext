import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget, guidGenerator } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-timeline.css';
import * as timeline from 'timeline-plus';
import 'timeline-plus/dist/timeline.min.css';

// import 'https://unpkg.com/timeline-plus/dist/timeline.js';
// import 'https://unpkg.com/timeline-plus/dist/timeline.css';

@Component({
    template: require('./cs-timeline.html')
})
export class CsTimeline extends Vue {
    /** access the original widget from configuration */

    public timeline: any;
    initalized = false;
    public minimize = false;
    public showMenu = false;
    public showFilterMenu = false;
    

    @Prop()
    public widget!: IWidget;

    @Watch('widget.content')
    dataLoaded() {}

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    mounted() {        
        this.initTimeline();
    }

    public destroyed() {
        //    this.map.remove();
    }

    public initTimeline() {
        if (this.initalized) return;
        Vue.nextTick(()=> {

        
        
            if (this.widget && this.widget.id) {
                this.initalized = true;

                // console.log(this.project.ActiveEvent.eventItems);
                // if (this.project.ActiveEvent.eventItems) {
                //   console.log(this.project.ActiveEvent.locations);
                //   for (const ei of this.project.ActiveEvent.eventItems) {
                //     if (this.groups.findIndex(g => g.id === ei.locationId) === -1) {
                //       this.groups.push({
                //         id: ei.locationId,
                //         content: ei.locationId
                //         // Optional: a field 'className', 'style', 'order', [properties]
                //       });
                //     }
                //   }
                // }

                var container = document.getElementById(this.widget.id);

                var follow_options = {
                    tooltip: {
                        followMouse: true
                    }
                };

                // specify options
                var options = {
                    editable: false,
                    height: '100%',
                    start: new Date(2015, 0, 1),
                    end: new Date(2030, 0, 1), // this.event.endDate),
                    moveable: true,
                    verticalScroll: false,
                    margin: {
                        item: 2
                    }
                    // timeAxis: { scale: "year", step: 2 }
                };

                let items = []; //this.getItems();
                if (container) {
                    console.log('Timeline');
                    console.log(timeline);
                    
                    this.timeline = new timeline.Timeline(container, items, options);
                }
                // this.timeline.on('contextmenu', (props: any) => {
                //     console.log(props);
                //     this.showMenu = false;
                //     this.x = props.event.clientX;
                //     this.y = props.event.clientY;
                //     this.$nextTick(() => {
                //         this.showMenu = true;
                //     });
                //     props.event.preventDefault();
                // });
                // this.timeline.on('click', (data: any) => {
                //     // if (
                //     //     this.project &&
                //     //     (data.what === 'background' || data.what === 'axis')
                //     // ) {
                //     //     Vue.nextTick(() => {
                //     //         this.timeline.setCustomTime(data.time, 'focustime');
                //     //     });

                //     //     this.project.ActiveTime = new Date(data.time);
                //     //     this.project.bus.publish(
                //     //         'time',
                //     //         'moved',
                //     //         this.project.ActiveTime
                //     //     );
                //     // }
                // });
                // this.timeline.on('select', (data: any) => {
                //     if (data.items && data.items.length === 1) {
                //     }
                // });
            }

            // this.timeline.on('timechanged', (d: any) => {
            //     // if (d.id === 'focustime' && this.project) {
            //     //     let time = d.time;
            //     //     this.project.ActiveTime = time;
            //     //     this.project.bus.publish('time', 'moved', time);
            //     // }
            // });
        });
    }
}
