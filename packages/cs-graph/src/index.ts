export *  from "./components/data-grid/data-grid-options";
export * from "./components/data-grid/data-matrix-options";
export * from "./components/document/node-entities";
export * from "./datasources/doc-datasource";
export * from "./plugins/document-plugin";
export * from "./plugins/import-plugin";
export * from "./plugins/viewer-plugin";
export * from "./classes/";
export * from "./filters/graph-cross-filter";
export * from "./components/data-grid/cards/element-card-manager";


import Vue from 'vue';
import NetworkGraph from "./components/graph/graph.vue";
import GraphElements from "./components/entity-management/graph-elements.vue";
import RecentList from "./components/entity-management/recent-list.vue";
import ElementDataGrid  from "./components/data-grid/element-data-grid.vue"
import ClassOverview from "./components/datamodel/class-overview.vue";
import ClassViewer from "./components/datamodel/class-viewer.vue";
import GraphSettings from "./components/graph/graph-settings.vue";
import ElementInfo from "./components/element/element-info.vue";
import DocumentViewer from './components/document/document-viewer.vue';
import DocumentEditor from './components/document-management/document-editor.vue';
import DocumentEntities from './components/document/document-entities.vue';
import ReportEditor from './components/document-management/report-editor.vue';
import { AppState } from '@csnext/cs-client';
import ElementValue from "./components/data-grid/element-value.vue";
import IndicatorElementCard from "./components/data-grid/cards/indicator-element-card.vue";
import DefaultElementCard from "./components/data-grid/cards/default-element-card.vue";
import User from "./components/graph/user.vue";
import Management from "./components/graph/management.vue"


const locales = require('./assets/locales.json');

for (const lang in locales) {
    if (locales.hasOwnProperty(lang) && AppState.Instance.i18n) {
        const messages = locales[lang];
        AppState.Instance.i18n.mergeLocaleMessage(lang, messages);
    }
}


export { User, Management, IndicatorElementCard, RecentList, DefaultElementCard, ElementDataGrid , ReportEditor, NetworkGraph, GraphElements, ElementValue, GraphSettings, ClassOverview, ClassViewer, ElementInfo, DocumentViewer, DocumentEditor, DocumentEntities }