import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
// tslint:disable-next-line:align
export const vuetify = new Vuetify({
    // lang: {
    //     t: (key, ...params) => i18n.t(key, params)
    // },
    icons: {
        iconfont: 'mdi'
    }
});
