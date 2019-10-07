import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import {
    IWidget,
    MessageBusService,
    IDatasource,
    TimeDataSource,
    Topics,
    isFunction,
    IMenu
} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-timeline.css';

import 'vis-timeline/dist/vis-timeline-graph2d.min.css';
import { LogDataSource, WidgetBase } from '@csnext/cs-client';
import { DataGroup, DataItem, Timeline, TimelineEventPropertiesResult } from 'vis-timeline';
import { TimelineGroupSelection } from '../timeline-group-selection/timeline-group-selection';
import { TimelineWidgetOptions } from '../..';
// export { TimelineOptions, DataGroup, DataItem, TimelineItem, Timeline, DataSet, TimelineEventPropertiesResult };

export interface ITimelineDataSource extends IDatasource {
    events: MessageBusService;
    timelineItems: DataItem[];
    addItem(item: DataItem): void;
    removeItem(item: DataItem): void;
}

const TOGGLE_MENU_ID = 'togglesmall';
const ZOOM_MENU_ID = 'zoom';
const GROUPS_MENU_ID = 'groups';
const NO_GROUP = 'all';
@Component({
    template: require('./cs-timeline.html')
})
export class CsTimeline extends WidgetBase {
    /** access the original widget from configuration */

    public GROUP_VISIBILITY_ID = 'timeline-group-';

    public timeline?: Timeline;
    // public datasource?: ITimelineDataSource;
    public items: DataItem[] = [];
    public groups: DataGroup[] = [];
    public currentTime: Date = new Date();
    // public log: LogManager = new LogManager();
    public logSource?: LogDataSource;
    public smallView: boolean = false;

    public $refs!: {
        timelineContainer: HTMLElement
    };

    public get TimeDatasource(): TimeDataSource {
        if (!this.widget.content) { return new TimeDataSource(); }
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

    public beforeDestroy() {
        super.beforeDestroy();
        if (this.timeline) {
            this.timeline.off('select', this.handleEventSelect);
            this.timeline.off('timechanged', this.handleTimeChanged);
            this.timeline.off('timechange', this.handleTimeChange);
        }
    }

    public update() {
        this.updateItems();
        if (this.timeline && this.groups && this.items) {
            this.timeline.setData({ groups: this.groups, items: this.items });
        }
    }

    public toggleView() {
        this.smallView = !this.smallView;
        this.update();
    }

    public setGroupVisibility(group: DataGroup, value: boolean = true) {
        localStorage.setItem(this.GROUP_VISIBILITY_ID + group.id, value.toString());
        this.update();
    }

    public async initTimeline() {
        if (this.timeline) {
            // Timeline already exists, update instead of initialize
            return this.update();
        }
        if (!this.widget || !this.widget.id) {
            return console.warn('Could not find widget container of timeline');
        }
        // var container = document.getElementById(`timeline-${this.widget.id}`);
        // if (!container) {
        //     return console.warn(
        //         'Could not find timeline container ' + this.widget.id
        //     );
        // }

        const options: TimelineWidgetOptions =
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
            };
            options.timelineOptions!.onMove = (item, callback) => {
                if (item) {
                    if (this.logSource) {
                        const it = this.logSource.items.find(i => i.id === item.id);
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
            };

            options.timelineOptions!.onRemove = (item, callback) => {
                if (item) {
                    if (this.logSource) {
                        const it = this.logSource.items.find(i => i.id === item.id);
                        if (it) {
                            this.logSource.removeItem(it);
                        }
                    }
                }
                callback(item);
            };

        }

        options.timelineOptions = {
            ...{
                locale: 'en', margin: { item: 2 }
            }, ...options.timelineOptions
        };

        this.timeline = new Timeline(
            this.$refs.timelineContainer,
            this.items as DataItem[],

            options.timelineOptions
        );
        this.setTimelineEvents();
    }

    public initLogSource() {
        if (this.WidgetOptions.logSource) {
            this.$cs.loadDatasource<LogDataSource>(this.WidgetOptions.logSource).then(r => {
                this.logSource = r;
                this.busManager.subscribe(this.logSource.bus, 'updated', () => {
                    this.update();
                });
                Vue.nextTick(() => {
                    this.update();
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    public fitAll() {
        if (this.timeline) {
            this.timeline.fit({ animation: false });
        }
    }

    public setWindow(start: Date, end: Date) {
        if (this.timeline) {
            this.timeline.setWindow(start, end);
        }
    }

    public initToolbar() {
        if (!this.widget.options) { this.widget.options = {}; }
        const menus: IMenu[] = [];

        if (this.WidgetOptions.showFitButton) {
            menus.push({
                id: 'today',
                toolTip: 'TODAY',
                icon: 'today',
                items: [
                    {
                        title: 'TODAY',
                        action: () => {
                            const todayStart = new Date();
                            todayStart.setHours(0);
                            const todayEnd = new Date();
                            todayEnd.setHours(24);
                            this.setWindow(todayStart, todayEnd);
                        }
                    },
                    {
                        title: 'WEEK',
                        action: () => {
                            const curr = new Date();
                            this.setWindow(new Date(curr.setDate(curr.getDate() - curr.getDay())), new Date(curr.setDate(curr.getDate() - curr.getDay() + 7)));
                        }
                    },
                    {
                        title: 'MONTH',
                        action: () => {
                            const date = new Date();
                            this.setWindow(new Date(date.getFullYear(),
                                date.getMonth(), 1), new Date(date.getFullYear(),
                                    date.getMonth(), this.daysInMonth(date.getMonth() + 1,
                                        date.getFullYear())));
                        }
                    },
                    {
                        title: 'YEAR',
                        action: () => {
                            const date = new Date();
                            this.setWindow(new Date(date.getFullYear(), 0, 1), new Date(date.getFullYear(), 11, 31));
                        }
                    }
                ],
                visible: true
            } as IMenu);
        }

        // this.widget.options.menus ? this.widget.options.menus :
        if (this.WidgetOptions.showFitButton) {
            menus.push({
                id: ZOOM_MENU_ID,
                toolTip: 'FIT_TIMELINE_ZOOM',
                icon: 'zoom_out_map',
                action: () => {
                    this.fitAll();
                },
                visible: true
            } as IMenu);
        }

        if (this.WidgetOptions.toggleSmallButton) {
            // check if already exists
            if (menus.findIndex((m: IMenu) => m.id === TOGGLE_MENU_ID) === -1) {
                menus.push({
                    id: TOGGLE_MENU_ID,
                    icon: 'line_weight',
                    action: () => {
                        this.toggleView();
                    },
                    visible: true
                });
            }
        }

        if (this.WidgetOptions.showGroupSelectionButton) {
            // check if already exists
            if (menus.findIndex((m: IMenu) => m.id === GROUPS_MENU_ID) === -1) {
                menus.push({
                    id: GROUPS_MENU_ID,
                    icon: 'list',
                    component: TimelineGroupSelection,
                    data: this,
                    visible: true
                });
            }
        }

        Vue.set(this.widget.options, 'menus', menus);
    }

    public mounted() {
        this.initToolbar();
        this.initTimeline();
        this.initLogSource();
        this.busManager.subscribe(this.widget.events, Topics.RESIZE, () => {
            this.timeline!.redraw();
        });
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

    private setTimelineEvents() {
        if (!this.timeline) { return console.log('Could not set timeline events'); }
        // this.timeline.on('click', this.handleTimelineClick);
        if (this.WidgetOptions.showFocusTime) {
            this.timeline.addCustomTime(this.currentTime, 'focustime');
            this.timeline.on('click', this.handleTimelineClick);
        }
        this.timeline.on('select', this.handleEventSelect);
        this.timeline.on('timechanged', this.handleTimeChanged);
        this.timeline.on('timechange', this.handleTimeChange);

        this.currentTime = new Date(this.timeline.getWindow().start);

        if (this.TimeDatasource.events) {
            // this.TimeDatasource.events.publish(
            //     Topics.TIME_TOPIC,
            //     'moved',
            //     this.currentTime
            // );
            this.busManager.subscribe(this.TimeDatasource.events, Topics.TIME_TOPIC, this.handleIncomingTimeEvent);
        }
    }

    private handleTimeChange(d: { id: string; time: Date }) {
        if (d && d.id === 'focustime' && d.time && this.TimeDatasource.events) {
            this.TimeDatasource.events.publish(Topics.TIME_TOPIC, Topics.TIMELINE_MOVING, d.time);
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
            const id = data.items[0];
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

    private daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    private updateItems() {
        const items: DataItem[] = [];
        const height = this.smallView ? '5px' : '30px;';
        if (this.logSource && this.logSource.items) {
            for (const item of this.logSource.items) {
                // item.content = item.content;
                if (!item.style) {
                    item.style = 'height:' + height;
                }
                if (this.smallView) { item.style += ''; }
                if (item.startDate) { item.start = new Date(item.startDate); }
                if (item.endDate) { item.end = new Date(item.endDate); }
                if (!item.group) { item.group = NO_GROUP; }
                this.addGroup(item.group);
                items.push(item as DataItem);
            }
        }
        this.items = items; // new DataSet(items);
    }

    private handleIncomingTimeEvent(action: string, data: any) {
        if (!this.TimeDatasource) { return; }
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
}
