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
import './cs-timeline.css';

import 'vis-timeline/dist/vis-timeline-graph2d.min.css';
import { LogDataSource, WidgetBase } from '@csnext/cs-client';
import { TimelineOptions, DataGroup, DataItem, Timeline, TimelineEventPropertiesResult } from 'vis-timeline';
import { TimelineGroupSelection } from '../timeline-group-selection/timeline-group-selection';
// export { TimelineOptions, DataGroup, DataItem, TimelineItem, Timeline, DataSet, TimelineEventPropertiesResult };


export interface TimelineWidgetOptions extends WidgetOptions {
    timelineOptions?: TimelineOptions;
    logSource?: string;
    smallView?: boolean;
    showFitButton?: boolean;
    toggleSmallButton?: boolean;
    showGroupSelectionButton?: boolean;
}

export interface ITimelineDataSource extends IDatasource {
    events: MessageBusService;
    timelineItems: DataItem[];
    addItem(item: DataItem): void;
    removeItem(item: DataItem): void;
}

const TOGGLE_MENU_ID = 'togglesmall';
const ZOOM_MENU_ID = 'zoom';
const GROUPS_MENU_ID = 'groups';
@Component({
    template: require('./cs-timeline.html')
})
export class CsTimeline extends WidgetBase {
    /** access the original widget from configuration */

    GROUP_VISIBILITY_ID = 'timeline-group-';

    public timeline?: Timeline;
    // public datasource?: ITimelineDataSource;
    public items: DataItem[] = [];
    public groups: DataGroup[] = [];
    public currentTime: Date = new Date();
    // public log: LogManager = new LogManager();
    public logSource?: LogDataSource;

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

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public smallView: boolean = false;

    public async update() {
        this.updateItems();
        if (this.timeline) {
            this.timeline.setData({ groups: this.groups, items: this.items });
            this.timeline.setGroups(this.groups);
            this.timeline.setItems(this.items);
            this.timeline.redraw();
        }
    }

    toggleView() {
        this.smallView = !this.smallView;
        this.update();
    }

    private updateItems() {
        let items: DataItem[] = [];
        let height = this.smallView ? '5px' : '30px;';
        if (this.logSource && this.logSource.items) {
            for (const item of this.logSource.items) {
                item.content = item.content;
                // item.style = "height:" + height;
                // if (this.smallView) item.style+=';color:transparent';
                if (item.startDate) { item.start = new Date(item.startDate); }
                if (item.endDate) { item.end = new Date(item.endDate); }
                if (item.group) {
                    this.addGroup(item.group);
                }
                items.push(item as DataItem);
            }
        }
        this.items = items; // new DataSet(items);
    }

    public setGroupVisibility(group: DataGroup, value: boolean = true) {
        localStorage.setItem(this.GROUP_VISIBILITY_ID + group.id, value.toString());
        this.update();
    }

    private addGroup(groupName: string) {
        if (!this.groupExists(groupName)) {

            const visible = localStorage.getItem(this.GROUP_VISIBILITY_ID + groupName);
            this.groups.push({
                id: groupName,
                content: groupName,
                visible: (!visible) ? true : (visible.toLowerCase() === 'true')
            } as DataGroup);
        }
    }

    private groupExists(id: string) {
        return this.groups.find(g => g.id === id);
    }

    public async initTimeline() {
        if (this.timeline) {
            //Timeline already exists, update instead of initialize
            return this.update();
        }
        if (!this.widget || !this.widget.id) {
            return console.warn('Could not find widget container of timeline');
        }
        var container = document.getElementById(this.widget.id);
        if (!container) {
            return console.warn(
                'Could not find timeline container ' + this.widget.id
            );
        }

        let options: TimelineWidgetOptions =
            (this.widget.options as TimelineWidgetOptions) ||
            ({} as TimelineWidgetOptions);
        if (options.timelineOptions) {
            options.timelineOptions!.onAdd = (item, callback) => {
                if (item) {
                    if (this.logSource) {
                        // this.logSource.addItem(item);
                    }
                }
                callback(item);
            }
            options.timelineOptions!.onMove = (item, callback) => {
                if (item) {
                    if (this.logSource) {
                        let it = this.logSource.items.find(i => i.id === item.id);
                        if (it) {
                            it.start = new Date(item.start);
                            it.startDate = it.start.getTime();
                            if (item.group) {
                                it.group = item.group.toString();
                            }
                            if (item.end) {
                                it.end = new Date(item.end);
                                it.endDate = it.end.getTime();
                            }
                            this.logSource.updateItem(it);
                        }
                    }
                }
                callback(item);
            }

            options.timelineOptions!.onRemove = (item, callback) => {
                if (item) {
                    if (this.logSource) {
                        let it = this.logSource.items.find(i => i.id === item.id);
                        if (it) {
                            this.logSource.removeItem(it);
                        }
                    }
                }
                callback(item);
            }

        }

        options.timelineOptions = { ...{ locale: 'en' }, ...options.timelineOptions };

        this.timeline = new Timeline(
            container,
            this.items as DataItem[],
            this.groups,
            options.timelineOptions
        );
        this.setTimelineEvents();
    }


    private setTimelineEvents() {
        if (!this.timeline) return console.log('Could not set timeline events');
        this.timeline.on('click', this.handleTimelineClick);
        this.timeline.on('select', this.handleEventSelect);
        this.timeline.on('timechanged', this.handleTimeChanged);
        this.currentTime = new Date(this.timeline.getWindow().start);
        this.timeline.addCustomTime(this.currentTime, 'focustime');
        if (this.TimeDatasource.events) {
            // this.TimeDatasource.events.publish(
            //     Topics.TIME_TOPIC,
            //     'moved',
            //     this.currentTime
            // );
            this.busManager.subscribe(this.TimeDatasource.events, Topics.TIME_TOPIC, this.handleIncomingTimeEvent);            
        }

    }

    private handleTimeChanged(d: { id: string; time: Date }) {
        if (d && d.id === 'focustime' && d.time && this.TimeDatasource.events) {
            this.TimeDatasource.events.publish(Topics.TIME_TOPIC, Topics.TIMELINE_MOVED, d.time);
        }
    }

    private handleEventSelect(data: any) {
        if (
            (data as any).event.type === 'tap' &&
            data.items &&
            data.items.length === 1 &&
            this.TimeDatasource.events
        ) {
            let id = data.items[0];
            console.log('Selected item ' + id);
            if (this.logSource && isFunction(this.logSource.selectItemId)) {
                this.logSource.selectItemId(id.toString());
                // this.logSource.selectItemId(id);
            }
            this.TimeDatasource.events.publish(
                Topics.TIME_TOPIC,
                'moved',
                this.currentTime
            );
        }
    }

    private handleTimelineClick(data: TimelineEventPropertiesResult) {
        if (data.item === null) { // (data.what === 'background' || data.what === 'axis') {
            this.setDate(data.time);
        }
    }

    private setDate(date: Date) {
        Vue.nextTick(() => {
            this.timeline!.setCustomTime(date, 'focustime');
        });
        this.currentTime = new Date(date);
        if (this.TimeDatasource.events) {
            this.TimeDatasource.focusTime = this.currentTime.getTime();
            this.TimeDatasource.events.publish(
                Topics.TIME_TOPIC,
                'moved',
                this.currentTime
            );
        }
    }

    private handleIncomingTimeEvent(action: string, data: any) {
        debugger;
        if (!this.TimeDatasource) return;
        switch (action) {
            // case 'add-item':
            //     this.datasource.addItem(data as DataItem);
            //     break;
            case Topics.SET_FOCUS_TIME:
                this.setDate(data);
                break;
            case Topics.SET_TIME_RANGE:
                if (this.timeline) {
                    this.timeline.setOptions({ start: data.start, end: data.end });
                }
                break;
            case 'update':
                this.update();
                break;
            default:
                break;
        }
    }

    public initLogSource() {
        if (this.WidgetOptions.logSource) {
            this.$cs.loadDatasource<LogDataSource>(this.WidgetOptions.logSource).then(r => {
                this.logSource = r;
                this.logSource.bus.subscribe('updated', () => {
                    this.update();
                })
                Vue.nextTick(() => {

                    console.log(r);
                    this.update();
                })
            }).catch(() => {

            })
        }
    }

    fitAll() {
        if (this.timeline) {
            this.timeline.fit({ animation: false });
        }
    }

    mounted() {
        if (this.widget) {

            this.busManager.subscribe(this.widget.events, Topics.RESIZE, ()=> {
                this.timeline!.redraw();
            });
            this.initLogSource();
            this.initTimeline();

            if (!this.widget.options) this.widget.options = {};
            if (!this.widget.options.menus) this.widget.options.menus = [];
            this.widget.options.showToolbar = true;

            if (this.WidgetOptions.showFitButton) {
                // check if already exists
                if (this.widget.options.menus.findIndex((m: IMenu) => m.id === ZOOM_MENU_ID) === -1) {
                    this.widget.options.menus.push({
                        id: ZOOM_MENU_ID,
                        toolTip: 'FIT_TIMELINE_ZOOM',
                        icon: 'zoom_out_map',
                        action: () => {
                            this.fitAll();
                        },
                        visible: true
                    })
                }
            }

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

            if (this.WidgetOptions.showGroupSelectionButton) {
                // check if already exists
                if (this.widget.options.menus.findIndex((m: IMenu) => m.id === GROUPS_MENU_ID) === -1) {
                    this.widget.options.menus.push({
                        id: GROUPS_MENU_ID,
                        icon: 'list',
                        component: TimelineGroupSelection,
                        data: this,
                        visible: true
                    })
                }
            }
        }
    }
}
