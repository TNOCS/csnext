import Vue from 'vue';

export { CsMarkdown } from './cs-markdown/cs-markdown';
// export * from './cs-markdown/md-widget-options';
export { CsInfo } from './cs-info/cs-info';
export * from './cs-info/cs-info-dashboard-manager';
import InfoWidget from './info-widget.vue'

export { InfoWidget };

import VueShowdown from 'vue-showdown'

Vue.use(VueShowdown, {
    // set default flavor of showdown
    flavor: 'github',
    // set default options of showdown (will override the flavor options)
    options: {
        emoji: false,
    },
})
