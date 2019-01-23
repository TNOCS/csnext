import {Watch, Prop} from 'vue-property-decorator';
import Vue from 'vue';
import {IWidget, MessageBusService, IDatasource, WidgetOptions} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-timeline.css';
import {Timeline, DataGroup, DataItem, TimelineOptions, TimelineTooltipOption, DataSet, VisSelectProperties, TimelineEventPropertiesResult} from 'timeline-plus';
export {Timeline, DataGroup, DataItem, TimelineOptions, TimelineTooltipOption, DataSet, VisSelectProperties, TimelineEventPropertiesResult} from 'timeline-plus';
import 'timeline-plus/dist/timeline.min.css';

export const TIME_TOPIC = 'time';

export interface TimelineWidgetOptions extends WidgetOptions {
    timelineOptions: TimelineOptions;
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
    public datasource?: ITimelineDataSource;
    public groups: DataGroup[] = [];
    public currentTime: Date = new Date();

    @Prop()
    public widget!: IWidget;

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
            let items = await this.getItems();
            this.timeline.setGroups(this.groups);
            this.timeline.setItems(items);
        }
    }

    toggleView() {
        this.smallView = !this.smallView;
        this.update();
    }

    private async getItems(): Promise<DataSet<DataItem>> {
        let items: DataItem[] = [];
        let tags: string[] = [];
        let height = this.smallView ? '5px' : '30px;';
        if (this.datasource && this.datasource.timelineItems) {
            this.datasource.timelineItems.forEach((i: DataItem) => {
                items.push(i);
                this.addGroup(i.group);
            });
        }
        return new DataSet(items);
    }

    private addGroup(groupName: string) {
        if (!this.groupExists(groupName)) {
            this.groups.push({id: groupName, content: groupName} as DataGroup);
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
            return console.warn('Could not find timeline container ' + this.widget.id);
        }

        let items = await this.getItems();
        let options: TimelineWidgetOptions = (this.widget.options as TimelineWidgetOptions) || ({} as TimelineWidgetOptions);
        this.timeline = new Timeline(container, items, this.groups, options.timelineOptions || {});
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
        if (this.datasource && this.datasource.events) {
            this.datasource.events.publish(TIME_TOPIC, 'moved', this.currentTime);
            this.datasource.events.subscribe(TIME_TOPIC, this.handleIncomingTimeEvent);
        }
    }

    private handleTimeChanged(d: {id: string; time: Date}) {
        if (d && d.id === 'focustime' && d.time && this.datasource && this.datasource.events) {
            this.datasource.events.publish(TIME_TOPIC, 'moved', d.time);
        }
    }

    private handleEventSelect(data: VisSelectProperties) {
        if (data.items && data.items.length === 1 && this.datasource && this.datasource.events) {
            let id = data.items[0];
            console.log('Selected item ' + id);
            this.datasource.events.publish(TIME_TOPIC, 'moved', this.currentTime);
        }
    }

    private handleTimelineClick(data: TimelineEventPropertiesResult) {
        if (data.what === 'background' || data.what === 'axis') {
            this.setDate(data.time);
        }
    }

    private setDate(date: Date) {
        Vue.nextTick(() => {
            this.timeline!.setCustomTime(date, 'focustime');
        });
        this.currentTime = new Date(date);
        if (this.datasource && this.datasource.events) {
            this.datasource.events.publish(TIME_TOPIC, 'moved', this.currentTime);
        }
    }

    private handleIncomingTimeEvent(action: string, data: any) {
        if (!this.datasource) return;
        switch (action) {
            case 'add-item':
                this.datasource.addItem(data as DataItem);
                break;
            case 'set-time':
                this.setDate(data);
                break;
            default:
                break;
        }
    }

    mounted() {
        if (this.widget && this.widget.datasource) {
            this.$cs.loadDatasource<ITimelineDataSource>(this.widget.datasource).then(d => {
                this.datasource = d;
                this.initTimeline();
            });
        }
    }
}
