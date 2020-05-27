import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import {
    IWidget,
    MessageBusService,
    IDatasource,
    WidgetOptions,
    TimeDataSource,
    Topics,
    MessageBusHandle,
    isFunction,
    IMenu
} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-agenda.css';

import { LogDataSource, WidgetBase } from '@csnext/cs-client';
import { TimelineWidgetOptions } from '../..';
// export { TimelineOptions, DataGroup, DataItem, TimelineItem, Timeline, DataSet, TimelineEventPropertiesResult };


@Component({
    template: require('./cs-agenda.html')
})
export class CsAgenda extends WidgetBase {
    /** access the original widget from configuration */

    public logSource?: LogDataSource;

    public $refs!: {
        calendar: any;
    };

    GROUP_VISIBILITY_ID = 'timeline-group-';

    public today = '2019-01-01';
    public focus = '2019-01-01';
    public type = 'month';
    public typeToLabel = {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
    };
    public start? : any = null;
    public end? : any= null;
    public selectedEvent = {};
    public selectedElement = null;
    public selectedOpen = false;

    private getDate(date?: Date): string {
        if (date) {
            const s = date.toISOString();
            return s.substr(0, 10) + ' ' + s.substr(11,5) ; //getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
        } else return "";
    }

    public title() : string {
        
        if (!this.start || !this.end) {
          return ''
        }
        

        const startMonth = this.monthFormatter()(this.start);
        const endMonth = this.monthFormatter()(this.end);
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = this.start.year
        const endYear = this.end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = this.start.day + this.nth(this.start.day)
        const endDay = this.end.day + this.nth(this.end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      };
      
      monthFormatter() : Function {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      };

    public getEvents() {
        let res: any[] = [];
        if (this.logSource && this.logSource.items) {
            for (const item of this.logSource.items) {
                res.push({
                    name: item.content,
                    start: (item.start) ? this.getDate(item.start) : undefined,
                    end: (item.end) ? this.getDate(item.end) : undefined
                })
            }

        };



        return res;
        // return [{
        //     name: 'Weekly Meeting',
        //     start: '2019-01-07 09:00',
        //     end: '2019-01-07 10:00',
        // },
        // {
        //     name: 'Thomas\' Birthday',
        //     start: '2019-01-10',
        // },
        // {
        //     name: 'Mash Potatoes',
        //     start: '2019-01-09 12:30',
        //     end: '2019-01-09 15:30',
        // }]
    }

    // public timeline?: Timeline;
    // // public datasource?: ITimelineDataSource;
    // public items: DataItem[] = [];
    // public groups: DataGroup[] = [];
    // public currentTime: Date = new Date();
    // // public log: LogManager = new LogManager();
    // public logSource?: LogDataSource;

    // private timeHandle?: MessageBusHandle;
    // private resizeHandle?: MessageBusHandle;

    public get TimeDatasource(): TimeDataSource {
        if (!this.widget.content) return new TimeDataSource();
        return this.widget.content as TimeDataSource;
    }

    @Prop()
    public widget!: IWidget;
    public get WidgetOptions(): TimelineWidgetOptions {
        if (this.widget.options) {
            return this.widget.options as TimelineWidgetOptions;
        } else {
            return {};
        }
    }

    public viewDay({ date }) {
        this.focus = date
        this.type = 'day'
    };
    public getEventColor(event) {
        return 'red'; //event.color
    };
    public setToday() {
        this.focus = this.today
    };
    public prev() {
        this.$refs.calendar.prev()
    };
    public next() {
        this.$refs.calendar.next()
    };
    public showEvent({ nativeEvent, event }) {
        const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
            this.selectedOpen = false
            setTimeout(open, 10)
        } else {
            open()
        }

        nativeEvent.stopPropagation()
    };
    public updateRange({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
    };
    public nth(d) {
        return d > 3 && d < 21
            ? 'th'
            : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    };


    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public async update() {
        this.updateItems();
    }

    public initLogSource() {
        if (this.WidgetOptions.logSource) {
            this.$cs.loadDatasource<LogDataSource>(this.WidgetOptions.logSource).then(r => {
                this.logSource = r;
                this.logSource.bus.subscribe('updated', () => {
                    this.$forceUpdate();
                })
                Vue.nextTick(() => {
                    this.$forceUpdate();
                })
            }).catch(() => {

            })
        }
    }


    private updateItems() {
        // let items: DataItem[] = [];
        // let height = this.smallView ? '5px' : '30px;';
        // if (this.logSource && this.logSource.items) {
        //     for (const item of this.logSource.items) {
        //         item.content = item.content;
        //         // item.style = "height:" + height;
        //         // if (this.smallView) item.style+=';color:transparent';
        //         if (item.startDate) { item.start = new Date(item.startDate); }
        //         if (item.endDate) { item.end = new Date(item.endDate); }
        //         if (item.group) {
        //             this.addGroup(item.group);
        //         }
        //         items.push(item as DataItem);
        //     }
        // }
        // this.items = items; // new DataSet(items);
    }



    private handleIncomingTimeEvent(action: string, data: any) {

        // if (!this.TimeDatasource) return;
        // switch (action) {
        //     // case 'add-item':
        //     //     this.datasource.addItem(data as DataItem);
        //     //     break;
        //     case Topics.SET_FOCUS_TIME:
        //         // this.setDate(data);
        //         break;
        //     case Topics.SET_TIME_RANGE:
        //         if (this.timeline) {
        //             this.timeline.setOptions({ start: data.start, end: data.end });
        //         }
        //         break;
        //     case 'update':
        //         this.update();
        //         break;
        //     default:
        //         break;
        // }
    }



    mounted() {
        if (this.widget) {

            this.initLogSource();

            // this.busManager.subscribe(this.widget.events, Topics.RESIZE, ()=> {
            //     this.timeline!.redraw();
            // });

            // if (!this.widget.options) this.widget.options = {};
            // if (!this.widget.options.menus) this.widget.options.menus = [];
            // this.widget.options.showToolbar = true;

            // if (this.WidgetOptions.showFitButton) {
            //     // check if already exists
            //     if (this.widget.options.menus.findIndex((m: IMenu) => m.id === ZOOM_MENU_ID) === -1) {
            //         this.widget.options.menus.push({
            //             id: ZOOM_MENU_ID,
            //             toolTip: 'FIT_TIMELINE_ZOOM',
            //             icon: 'zoom_out_map',
            //             action: () => {
            //                 this.fitAll();
            //             },
            //             visible: true
            //         })
            //     }
            // }

            // if (this.WidgetOptions.toggleSmallButton) {
            //     // check if already exists
            //     if (this.widget.options.menus.findIndex((m: IMenu) => m.id === TOGGLE_MENU_ID) === -1) {
            //         this.widget.options.menus.push({
            //             id: TOGGLE_MENU_ID,
            //             icon: 'line_weight',
            //             action: () => {
            //                 this.toggleView();
            //             },
            //             visible: true
            //         })
            //     }
            // }

            // if (this.WidgetOptions.showGroupSelectionButton) {
            //     // check if already exists
            //     if (this.widget.options.menus.findIndex((m: IMenu) => m.id === GROUPS_MENU_ID) === -1) {
            //         this.widget.options.menus.push({
            //             id: GROUPS_MENU_ID,
            //             icon: 'list',
            //             component: TimelineGroupSelection,
            //             data: this,
            //             visible: true
            //         })
            //     }
            // }
        }
    }
}
