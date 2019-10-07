import Vue from 'vue';
import Component from 'vue-class-component';
import dayjs from 'dayjs';
import { Prop, Watch, Emit } from 'vue-property-decorator';
import { debug } from 'webpack';

@Component({
    name: 'v-datetime-picker',
    template: require('./v-datetime-picker.html')
})
export class VDatetimePicker extends Vue {
    /** access the original widget from configuration */
    @Prop()
    public dateLabel?: string;
    @Prop()
    public timeLabel?: string;

    @Prop()
    public required?: boolean;

    public dateFormatted? : string = '';

    public dateModel = '';
    public timeModel = '';
    public dateMenu = false;
    public timeMenu = false;

    @Emit('change')
    emitChange() {

    }

    dateChanged() {
        Vue.nextTick(() => {
            this.emitChange();
        })

    }

    @Watch('dateModel')
    @Watch('timeModel')
    updateDateModel(n: string, o: string) {
        if (n !== o) {
            this.update();
        }
    }



    public update() {
        try {
            let d = this.dateModel;
            if (this.timeModel) {
                d += ' ' + this.timeModel;
            }
            let date = new Date(d).getTime();
            // this.$attrs.value = date.toString();
            this.$emit('input', date);
        }
        catch (e) {

        }
    }

    created() {
        this.updateModels();
    }

    parseDate(date: string) {
        if (!date) return null
        const [month, day, year] = date.split('-')        
        let str = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        this.dateMenu = false;
        this.updateModels();
        this.dateChanged();
        return str;
        
    };

    @Watch('$attrs.value')
    updateModels() {
        if (this.$attrs.value && this.$attrs.value.toString() !== "0") {
            let datetime = dayjs(this.$attrs.value);
            
            let changed = false;
            if (datetime) {
                const date = datetime.format('YYYY-MM-DD');
                this.dateFormatted = date;
                if (date !== this.dateModel) { this.dateModel = date; changed = true; }
                const time = datetime.format('HH:mm');
                if (time !== this.timeModel) { this.timeModel = time; changed = true; }
            }
        }
    }
}

Vue.component('v-datetime-picker', VDatetimePicker);

