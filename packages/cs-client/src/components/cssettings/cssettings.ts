import { csdashboard } from './../csdashboard/csdashboard';
import { Dashboard } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueRouter from 'vue-router';
import { AppState, Logger } from '../../index';
import { RouteConfig } from 'vue-router/types/router';
import { Watch } from 'vue-property-decorator';
import Vuetify from 'vuetify';

@Component(<any>{
    name: 'csapp',
    template: require('./cssettings.html'),
    components: { }
})

// tslint:disable-next-line:class-name
export class cssettings extends Vue {
    public app = AppState.Instance;
    public L = Logger.Instance;    
   
}
