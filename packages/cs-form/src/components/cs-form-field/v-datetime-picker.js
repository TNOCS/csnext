
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
                  required:false,
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
                  return this.dateModel+' '+this.timeModel + ':00'
              }
          },
          methods: {
              checkMinutes(val) {
                  if(this.$refs.timer.selectingHour===false) {
                      this.timeModel=val
                      this.$refs.timer.selectingHour = true
                      this.menu=false
                      this.$emit('input',new Date(this.actualDatetime).getTime())
                  }
              },
              checkHours(val) {
                  this.dateModel=val
              }
          },
          created(){
              let datetime = dayjs(this.$attrs.value);
              if (datetime) {
                this.dateModel = datetime.format('YYYY-MM-DD');
                this.timeModel = datetime.format('HH:mm:ss');
              }
          }
    
  });