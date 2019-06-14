import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import {
    IWidget,
    MessageBusService,
    IDatasource,
    WidgetOptions,
    TimeDataSource,
    Topics,
    MessageBusHandle,
    isFunction
} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-timeline.css';
import {
    Timeline,
    DataGroup,
    DataItem,
    TimelineOptions,
    DataSet,
    VisSelectProperties,
    TimelineEventPropertiesResult
} from 'timeline-plus';
export {
    Timeline,
    DataGroup,
    DataItem,
    TimelineOptions,
    TimelineTooltipOption,
    DataSet,
    VisSelectProperties,
    TimelineEventPropertiesResult
} from 'timeline-plus';

import 'timeline-plus/dist/timeline.min.css';
import { LogDataSource, LogManager, ILogItem } from '@csnext/cs-client';

export interface TimelineWidgetOptions extends WidgetOptions {
    timelineOptions?: TimelineOptions;
    logSource?: string;
}

export interface ITimelineDataSource extends IDatasource {
    events: MessageBusService;
    timelineItems: DataItem[];
    addItem(item: DataItem): void;
    removeItem(item: DataItem): void;
}

@Component({
    template: require('./cs-timeline.html')
})
export class CsTimeline extends Vue {
    /** access the original widget from configuration */

    public timeline?: Timeline;
    // public datasource?: ITimelineDataSource;
    public items = new DataSet();
    public groups: DataGroup[] = [];
    public currentTime: Date = new Date();
    // public log: LogManager = new LogManager();
    public logSource?: LogDataSource;

    private timeHandle?: MessageBusHandle;
    private resizeHandle?: MessageBusHandle;

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

    get smallView(): boolean {
        if (this.widget.data) return this.widget.data.smallView;
        return false;
    }

    set smallView(value: boolean) {
        if (this.widget.data) {
            this.widget.data.smallView = value;
        }
    }

    private async update() {
        if (this.timeline) {
            console.log('Updating timeline');
            this.updateItems();
            this.timeline.setGroups(this.groups);
            this.timeline.setItems(this.items);
            // this.timeline.fit();
            this.timeline.redraw();
        }
    }

    toggleView() {
        this.smallView = !this.smallView;
        this.update();
    }

    private updateItems() {
        let items: DataItem[] = [];
        let groups: DataGroup[] = [];
        let tags: string[] = [];
        let height = this.smallView ? '5px' : '30px;';
        if (this.logSource && this.logSource.items) {
            for (const item of this.logSource.items) {
                item.content = item.title;
                if (item.startDate) { item.start = new Date(item.startDate); }
                if (item.endDate) { item.end = new Date(item.endDate); }
                if (item.group) {
                    this.addGroup(item.group);
                }
                items.push(item as DataItem);
            }
        }
        // if (this.log && this.log.items) {
        //     this.log.items.forEach(i => {
        //         // make sure id is unique
        //         if (items.findIndex(item => item.id === i.id) === -1) {
        //             i.start = new Date(i.start);
        //             items.push(i);
        //         }
        //     })
        // }
        // if (this.datasource && this.datasource.timelineItems) {
        //     this.datasource.timelineItems.forEach((i: DataItem) => {
        //         items.push(i);
        //         this.addGroup(i.group);
        //     });
        // }
        this.items = new DataSet(items);
    }

    private addGroup(groupName: string) {
        if (!this.groupExists(groupName)) {
            this.groups.push({
                id: groupName,
                content: groupName
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

        let items = await this.updateItems();
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
        this.timeline = new Timeline(
            container,
            this.items,
            this.groups,
            options.timelineOptions || {}
        );
        this.setTimelineEvents();
    }

    private handleCalendarChanged(action: string, data: any) {
        // this.calendarSource!.getCalendarItems().then(items => {
        //     this.calendarItems = items;
        //     this.update();
        // });
    }

    private setTimelineEvents() {
        if (!this.timeline) return console.log('Could not set timeline events');
        this.timeline.on('click', this.handleTimelineClick);
        this.timeline.on('select', this.handleEventSelect);
        this.timeline.on('timechanged', this.handleTimeChanged);
        this.currentTime = new Date(this.timeline.getWindow().start);
        this.timeline.addCustomTime(this.currentTime, 'focustime');
        if (this.TimeDatasource.events) {
            this.TimeDatasource.events.publish(
                Topics.TIME_TOPIC,
                'moved',
                this.currentTime
            );
            this.timeHandle = this.TimeDatasource.events.subscribe(
                Topics.TIME_TOPIC,
                this.handleIncomingTimeEvent
            );
        }

    }

    private handleTimeChanged(d: { id: string; time: Date }) {
        if (d && d.id === 'focustime' && d.time && this.TimeDatasource.events) {
            this.TimeDatasource.events.publish(Topics.TIME_TOPIC, 'moved', d.time);
        }
    }

    private handleEventSelect(data: VisSelectProperties) {
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
        if (!this.TimeDatasource) return;
        switch (action) {
            // case 'add-item':
            //     this.datasource.addItem(data as DataItem);
            //     break;
            case 'set-time':
                this.setDate(data);
                break;
            case 'update':
                this.update();
                break;
            default:
                break;
        }
    }

    public beforeDestroy() {
        if (this.timeHandle && this.TimeDatasource.events) {
            this.TimeDatasource.events.unsubscribe(this.timeHandle);
        }

        if (this.widget && this.widget.events && this.resizeHandle) {
            this.widget.events.unsubscribe(this.resizeHandle);
        }
    }

    public initLogSource() {
        if (this.WidgetOptions.logSource) {
            this.$cs.loadDatasource<LogDataSource>(this.WidgetOptions.logSource).then(r => {
                this.logSource = r;
                this.logSource.bus.subscribe('updated', (a: string, e: any) => {
                    this.update();
                })
                Vue.nextTick(() => {

                    console.log(r);
                    this.update();
                })
            }).catch(e => {

            })
        }
    }

    mounted() {
        if (this.widget) {

            this.resizeHandle = this.widget.events!.subscribe('resize', (d, a) => {
                this.timeline!.redraw();
            });
            this.initLogSource();
            this.initTimeline();


        }
    }
}
