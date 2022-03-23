export * from './components/data-grid/data-grid-options';
export * from './components/data-grid/data-matrix-options';
export * from './components/document/node-entities';
export * from './datasources/doc-datasource';
export * from './datasources/storage/server-storage';
export * from './datasources/storage/device-storage';
export * from './datasources/storage/graph-storage';
export * from './components/graph/graph-widget-options';
export * from './plugins/document-plugin';
export * from './plugins/import-plugin';
export * from './plugins/viewer-plugin';
export * from './plugins/search-plugin';
export * from './classes/';
export * from './filters/graph-cross-filter';
export * from './filters/cross-graph-manager';
export * from './components/graph/graph-map-options';
export * from './filters/cross-graph-options';
export * from './components/data-grid/cards/element-card-manager';
export * from './utils/doc-utils';
export * from './utils/cache-requests';
export * from './components/document/plugins/text-mention';
export * from './utils/graph-utils';
export * from "./components/search/search-manager";

import TextExtension from './components/document/plugins/text-extension';
import ParagraphExtension from './components/document/plugins/paragraph-extension';
import suggestion from './components/document/plugins/suggestion';


import NetworkGraph from './components/graph/graph.vue';
import GraphElements from './components/entity-management/graph-elements.vue';
import RecentList from './components/entity-management/recent-list.vue';
import ElementDataGrid from './components/data-grid/element-data-grid.vue';
import ClassOverview from './components/datamodel/class-overview.vue';
import ClassViewer from './components/datamodel/class-viewer.vue';
import GraphSettings from './components/graph/graph-settings.vue';
import ElementInfo from './components/element/element-info.vue';
import DocumentViewer from './components/document/document-viewer.vue';
import DocumentEditor from './components/document-management/document-editor.vue';
import DocumentEntities from './components/document/document-entities.vue';
import ReportEditor from './components/document-management/report-editor.vue';
import { AppState } from '@csnext/cs-client';
import ElementValue from './components/data-grid/element-value.vue';
import IndicatorElementCard from './components/data-grid/cards/indicator-element-card.vue';
import DefaultElementCard from './components/data-grid/cards/default-element-card.vue';
import User from './components/graph/user.vue';
import Management from './components/graph/management.vue';
import GraphMap from './components/graph/graph-map.vue';
import mdiFont from './assets/mdfont.json';
import Suggestions from './components/insights/suggestions.vue';
import VueScrollStop from "vue-scroll-stop";
import Vue from "vue";
import MentionList from './components/document/plugins/mention-list.vue';
import SelectionPopup from './components/document/selection-popup.vue';
import Search from "./components/search/search.vue";





Vue.use(VueScrollStop);

import './assets/styles.css';

const locales = require('./assets/locales.json');

for (const lang in locales) {
  if (locales.hasOwnProperty(lang) && AppState.Instance.i18n) {
    const messages = locales[lang];
    AppState.Instance.i18n.mergeLocaleMessage(lang, messages);
  }
}

export {
  mdiFont,
  Suggestions,
  GraphMap,
  User,
  suggestion,
  Management,
  IndicatorElementCard,
  RecentList,
  DefaultElementCard,
  ElementDataGrid,
  ReportEditor,
  NetworkGraph,
  GraphElements,
  ElementValue,
  GraphSettings,
  SelectionPopup,
  ClassOverview,
  ClassViewer,
  ElementInfo,
  DocumentViewer,
  DocumentEditor,
  DocumentEntities,
  MentionList,
  ParagraphExtension,
  TextExtension,
  Search
};
