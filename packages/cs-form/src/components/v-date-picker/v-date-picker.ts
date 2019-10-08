import Vue from 'vue';
import Component from 'vue-class-component';
import dayjs from 'dayjs';
import { Prop, Watch, Emit } from 'vue-property-decorator';

@Component({
    name: 'v-date-picker',
    template: require('./v-date-picker.html')
})
export class VDatePicker extends Vue {
    /** access the original widget from configuration */
    @Prop()
    public dateLabel?: string;

    @Prop()
    public required?: boolean;

    public dateFormatted?: string = '';

    public dateModel = '';
    public dateMenu = true;

    @Emit('change')
    public emitChange() {

    }

    public dateChanged() {
        Vue.nextTick(() => {
            this.emitChange();
        });

    }

    @Watch('dateModel')
    public updateDateModel(n: string, o: string) {
        if (n !== o) {
            this.update();
        }
    }

    public update() {
        try {
            const d = this.dateModel;
            const date = new Date(d).getTime();
            // this.$attrs.value = date.toString();
            this.$emit('input', date);
        } catch (e) {
            console.log(e);
        }
    }

    public created() {
        this.updateModels();
    }

    public parseDate(date: string) {
        if (!date) { return null; }
        const [year, month, day] = date.split('-');
        const str = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        this.dateMenu = false;
        this.updateModels();
        this.dateChanged();
        return str;

    }

    @Watch('$attrs.value')
    public updateModels() {
        if (this.$attrs.value && this.$attrs.value.toString() !== '0') {
            const datetime = dayjs(this.$attrs.value);

            let changed = false;
            if (datetime) {
                const date = datetime.format('YYYY-MM-DD');
                this.dateFormatted = date;
                if (date !== this.dateModel) { this.dateModel = date; changed = true; }
            }
        }
    }
}

Vue.component('v-date-picker', VDatePicker);
