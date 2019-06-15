import Vue from 'vue';
import Component from 'vue-class-component';
import dayjs from 'dayjs';
import { Prop, Watch } from 'vue-property-decorator';

@Component({
    name: 'v-datetime-picker',
    template: require('./v-datetime-picker.html')
})
export class VDatetimePicker extends Vue {
    /** access the original widget from configuration */
    @Prop()
    public label?: string;

    @Prop()
    public required?: boolean;

    public dateModel = '';
    public timeModel = '';
    public dateMenu = false;
    public timeMenu = false;

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
                d += ' ' + this.timeModel + ':00';
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

    @Watch('$attrs.value')
    updateModels() {
        if (this.$attrs.value && this.$attrs.value.toString() !== "0") {
            let datetime = dayjs(this.$attrs.value);
            if (datetime) {
                const date = datetime.format('YYYY-MM-DD');
                if (date !== this.dateModel) { this.dateModel = date; }
                const time = datetime.format('HH:mm:ss');
                if (time !== this.timeModel) this.timeModel = time;
            }
        }
    }
}

Vue.component('v-datetime-picker', VDatetimePicker);

