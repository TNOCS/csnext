import Vue from 'vue';
import {
    IFormFieldOptions,
    IDialog
} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-form-field.css';
import 'reflect-metadata';
import { CsForm } from '../..';

@Component({
    name: 'cs-formfield',
    template: require('./cs-form-field.html'),
    components: { CsForm },
    props: {
        field: undefined,
        target: undefined
    } as any
})
export class CsFormField extends Vue {
    /** access the original widget from configuration */

    public target?: object;
    public field?: IFormFieldOptions;
    public timepickermenu = false;

    public deleteKeyFromObject(key: string, field: IFormFieldOptions) {
        if (
            key !== undefined &&
            field !== undefined &&
            this.target !== undefined &&
            field._key &&
            this.target.hasOwnProperty(field._key)
        ) {
            if (this.target[field._key].hasOwnProperty(key)) {
                delete this.target[field._key][key];
                this.$forceUpdate();
            }
        }
    }

    public updateKey(key: string, field: IFormFieldOptions) {
        console.log('Update key');
        if (
            key !== undefined &&
            field !== undefined &&
            this.target !== undefined &&
            field._key &&
            this.target.hasOwnProperty(field._key)
        ) {
            if (this.target[field._key].hasOwnProperty(key)) {
                // delete this.target[field._key][key];
                this.$forceUpdate();
            }
        }
    }

    public addKeyObject(field: IFormFieldOptions) {
        if (
            !this.target ||
            !field._key ||
            !field.keyValuesType           
        ) {
            return;
        }
        // check if field already exists, if not create one       
        if (this.target[field._key] === undefined) {
            this.target[field._key] = {};
        }

        this.target[field._key]['new'] = field.keyValuesType();
        if (field.addUsingDialog) {
            // let form = new CsForm();
            // this.$cs.TriggerDialog({
            //     component: CsForm,
            //     data: this.target[field._key]['new'],
            //     toolbar: true,
            //     title: field.title
            // } as IDialog);
        }
        this.$forceUpdate();
    }

    keyObjectChange(field: IFormFieldOptions, oldValue: string, newValue: string) {
        let renameProp = (
            oldProp,
            newProp,
        { [oldProp]: old, ...others }
        ) => ({
            [newProp]: old,
            ...others
        });

        if (
            !this.target ||
            !field._key ||
            !field.keyValuesType ||
            !this.target.hasOwnProperty(field._key)
        ) {
            return;
        }

        this.target[field._key] = renameProp(oldValue, newValue, this.target[field._key]);

        console.log('Key event');
        console.log(oldValue + ' -> ' + newValue);
    }

    mounted() {
        if (this.field && this.field.type === 'form') {
        }
    }
}

Vue.component('cs-formfield', CsFormField);

Vue.component('v-datetime-picker',{
    name:'v-datetime-picker',
    template: `
    <v-menu
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="v-scale-transition"
              offset-y
              :nudge-left="40">
          <v-text-field
                  slot="activator"
                  :label="label"
                  v-model="actualDatetime"
                  readonly
          ></v-text-field>
          <v-layout>
                  <v-date-picker
                          v-model="dateModel"
                          no-title
                          scrollable
                          actions
                          @input="checkHours"
                  ></v-date-picker>
                  <v-time-picker
                          ref="timer"
                          v-model="timeModel"
                          no-title
                          scrollable
                          format="24hr"
                          actions
                          @input="checkMinutes"
                  ></v-time-picker>
              </v-layout>
      </v-menu>
    `,
            props: {
              datetime: {
                  type:Date,
                  required:true,
              },
              label: {
                  type:String,
                  default:''
              }
          },
          data(){
              return {
                  dateModel: '',
                  timeModel: '',
                  menu:false
              }
          },
          watch: {
              menu(val) {
                  if (val) {
                      if(this.$refs.timer)
                          this.$refs.timer.selectingHour=true
                  }
              }
          },
          computed: {
              actualDatetime() {
                  return this.dateModel+' '+this.timeModel+':00'
              }
          },
          methods: {
              checkMinutes(val) {
                  if(this.$refs.timer.selectingHour===false) {
                      this.timeModel=val
                      this.$refs.timer.selectingHour = true
                      this.menu=false
                      this.$emit('input',this.actualDatetime)
                  }
              },
              checkHours(val) {
                  this.dateModel=val
              }
          },
          created(){
              let datetime = new Date(this.$attrs.value);
              if (datetime) {
                this.dateModel = datetime.toISOString().split(' ')[0];
                this.timeModel = datetime.toISOString().split(' ')[1];
              }
          }
    
  });
